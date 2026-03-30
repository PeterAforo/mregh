'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { resolveImageUrl } from '@/lib/imageUrl';

const FALLBACK_TESTIMONIALS = [
  { name: 'Kwame Asante', position: 'CEO, Asante Group Ltd', content: 'MRE Construction delivered our office complex ahead of schedule and beyond our expectations. The quality of workmanship is exceptional. Highly recommended!', rating: 5, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80' },
  { name: 'Abena Mensah', position: 'Property Developer', content: 'Working with MRE was a pleasure from start to finish. Their architectural team understood our vision perfectly and the interior decoration was stunning.', rating: 5, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80' },
  { name: 'Kojo Boateng', position: 'Director, Boateng Construction Co.', content: 'Their civil engineering expertise is top-notch. The infrastructure project was completed efficiently and the quality is outstanding.', rating: 5, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80' },
  { name: 'Efua Darko', position: 'Homeowner, Accra', content: 'My dream home was built by MRE Construction and it exceeded all my expectations. The team was professional, communicative, and delivered a beautiful home.', rating: 5, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80' },
];

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<typeof FALLBACK_TESTIMONIALS>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/testimonials?published=true`)
      .then(r => r.ok ? r.json() : [])
      .then((data: any[]) => {
        if (data && data.length > 0) {
          const mapped = data
            .sort((a, b) => a.order - b.order)
            .map(t => ({
              name: t.name,
              position: [t.position, t.company].filter(Boolean).join(', '),
              content: t.content,
              rating: t.rating || 5,
              image: resolveImageUrl(t.image, FALLBACK_TESTIMONIALS[0].image),
            }));
          setTestimonials(mapped);
        } else {
          setTestimonials(FALLBACK_TESTIMONIALS);
        }
      })
      .catch(() => { setTestimonials(FALLBACK_TESTIMONIALS); })
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <section className="section-padding bg-dark-100 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 25% 25%, #CC0000 0%, transparent 50%), radial-gradient(circle at 75% 75%, #CC0000 0%, transparent 50%)',
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-brand-red" />
            <span className="text-brand-red text-sm font-semibold uppercase tracking-widest">Testimonials</span>
            <div className="h-px w-12 bg-brand-red" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black font-display text-white">
            What Our <span className="text-gradient">Clients Say</span>
          </h2>
          <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
            Our reputation is built on results. Here's what some of our valued clients across Ghana have to say.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-dark-200 border border-white/5 p-8">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((__, j) => <div key={j} className="w-4 h-4 bg-brand-red/20" />)}
                  </div>
                  <div className="space-y-2 mb-6">
                    <div className="h-4 bg-white/5 w-full" />
                    <div className="h-4 bg-white/5 w-11/12" />
                    <div className="h-4 bg-white/5 w-4/5" />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex-shrink-0" />
                    <div className="space-y-2">
                      <div className="h-4 bg-white/10 w-28" />
                      <div className="h-3 bg-white/5 w-36" />
                    </div>
                  </div>
                </div>
              ))
            : testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative bg-dark-200 border border-white/5 p-8 hover:border-brand-red/30 transition-all duration-500 group"
            >
              <div className="absolute top-6 right-6 text-brand-red/20 group-hover:text-brand-red/40 transition-colors duration-300">
                <Quote size={48} />
              </div>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={16} className="text-brand-red fill-brand-red" />
                ))}
              </div>
              <p className="text-gray-300 leading-relaxed mb-6 relative z-10">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image src={t.image} alt={t.name} fill sizes="48px" className="object-cover" />
                </div>
                <div>
                  <div className="text-white font-bold">{t.name}</div>
                  <div className="text-gray-500 text-sm">{t.position}</div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-red group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
