'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { resolveImageUrl } from '@/lib/imageUrl';

const FALLBACK_SLIDES = [
  {
    title: 'Building',
    titleAccent: "Ghana's Future",
    subtitle: 'Building Creative Communities',
    description: 'MRE Construction delivers world-class architectural, construction, and engineering solutions across Ghana.',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80',
    cta: { text: 'Explore Our Projects', href: '/projects' },
  },
  {
    title: 'Transforming',
    titleAccent: 'Spaces',
    subtitle: 'Building Creative Communities',
    description: 'From concept to completion, we design and build spaces that inspire and endure. Your vision, our expertise.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
    cta: { text: 'Our Services', href: '/services' },
  },
  {
    title: 'Your Dream,',
    titleAccent: 'Our Blueprint',
    subtitle: 'Building Creative Communities',
    description: 'Quality construction, on-time delivery, and exceptional craftsmanship. Building homes and commercial spaces that last a lifetime.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80',
    cta: { text: 'Get Free Quote', href: '/contact' },
  },
];

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function Hero() {
  const [slides, setSlides] = useState(FALLBACK_SLIDES);
  const [current, setCurrent] = useState(0);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`${API_BASE}/hero?published=true`)
      .then(r => r.ok ? r.json() : [])
      .then((data: any[]) => {
        if (data && data.length > 0) {
          const mapped = data
            .sort((a, b) => a.order - b.order)
            .map(s => ({
              title: '',
              titleAccent: s.title,
              subtitle: s.subtitle || 'Building Creative Communities',
              description: s.description || '',
              image: resolveImageUrl(s.image, FALLBACK_SLIDES[0].image),
              cta: { text: s.ctaText || 'Learn More', href: s.ctaLink || '/projects' },
            }));
          setSlides(mapped);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    animateIn();
  }, [current]);

  const animateIn = () => {
    if (!titleRef.current) return;
    gsap.timeline()
      .fromTo('.hero-title-word',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.12, ease: 'power3.out' }
      )
      .fromTo('.hero-subtitle',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.4'
      )
      .fromTo('.hero-desc',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.3'
      )
      .fromTo('.hero-cta',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.1, ease: 'power2.out' }, '-=0.3'
      );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden bg-dark-DEFAULT">
      {/* Background Images — gravity-zoom: drop in from 1.35 scale with expo.out */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ scale: 1.35, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          transition={{
            scale: { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.7, ease: 'easeInOut' },
          }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Red accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red z-10" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {/* Tag */}
            <motion.div
              key={`tag-${current}`}
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="h-px w-12 bg-brand-red" />
              <span className="text-brand-red text-sm font-semibold uppercase tracking-widest hero-subtitle">
                {slide.subtitle}
              </span>
            </motion.div>

            {/* Title — reduced from xl:text-9xl → xl:text-7xl */}
            <div ref={titleRef} className="mb-5 overflow-hidden">
              <h1 className="font-display font-black leading-none">
                <span className="hero-title-word block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white">
                  {slide.title}
                </span>
                <span className="hero-title-word block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-brand-red">
                  {slide.titleAccent}
                </span>
              </h1>
            </div>

            {/* Description — white for better readability over overlay */}
            <p className="hero-desc text-white/90 text-base sm:text-lg max-w-xl mb-8 leading-relaxed">
              {slide.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href={slide.cta.href}
                className="hero-cta btn-primary group"
              >
                {slide.cta.text}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/about"
                className="hero-cta btn-outline"
              >
                About MRE
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="bg-black/60 backdrop-blur-md border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
              {[
                { label: 'Projects Completed', value: '150+' },
                { label: 'Years Experience', value: '15+' },
                { label: 'Happy Clients', value: '500+' },
                { label: 'Expert Team', value: '50+' },
              ].map((stat) => (
                <div key={stat.label} className="px-6 py-5 text-center">
                  <div className="text-brand-red text-2xl sm:text-3xl font-black font-display">{stat.value}</div>
                  <div className="text-gray-400 text-xs uppercase tracking-wider mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-1 transition-all duration-300 rounded-full ${
              i === current ? 'h-10 bg-brand-red' : 'h-4 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-28 right-8 z-10 hidden lg:flex flex-col items-center gap-2">
        <div className="text-xs text-gray-500 uppercase tracking-widest rotate-90 mb-8">Scroll</div>
        <ChevronDown size={20} className="text-gray-500 animate-bounce" />
      </div>
    </section>
  );
}
