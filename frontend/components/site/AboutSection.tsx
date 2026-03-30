'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const compassTicks = [0,15,30,45,60,75,90,105,120,135,150,165,180,195,210,225,240,255,270,285,300,315,330,345].map(deg => {
  const rad = (deg * Math.PI) / 180;
  return {
    deg,
    x1: parseFloat((200 + 185 * Math.cos(rad)).toFixed(4)),
    y1: parseFloat((200 + 185 * Math.sin(rad)).toFixed(4)),
    x2: parseFloat((200 + 170 * Math.cos(rad)).toFixed(4)),
    y2: parseFloat((200 + 170 * Math.sin(rad)).toFixed(4)),
  };
});

const highlights = [
  '15+ years of excellence in Ghana',
  'ISO-certified construction processes',
  'Award-winning architectural designs',
  'Sustainable building practices',
  'End-to-end project management',
  'Post-completion support & warranty',
];

export default function AboutSection() {
  return (
    <section className="section-padding bg-dark-100 relative overflow-hidden">
      {/* Animated engineering / compass-rose SVG background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute -right-24 top-1/2 -translate-y-1/2 w-[480px] h-[480px] opacity-[0.04]"
          viewBox="0 0 400 400" fill="none" stroke="#CC0000" strokeWidth="1">
          {/* Large outer circles */}
          <circle cx="200" cy="200" r="190" strokeDasharray="8 4" className="animate-[spin_60s_linear_infinite]" />
          <circle cx="200" cy="200" r="150" />
          <circle cx="200" cy="200" r="100" strokeDasharray="4 4" />
          <circle cx="200" cy="200" r="50" />
          {/* Cross hairs */}
          <line x1="200" y1="10" x2="200" y2="390" />
          <line x1="10" y1="200" x2="390" y2="200" />
          {/* Diagonal lines */}
          <line x1="66" y1="66" x2="334" y2="334" />
          <line x1="334" y1="66" x2="66" y2="334" />
          {/* Tick marks */}
          {compassTicks.map(({ deg, x1, y1, x2, y2 }) => (
            <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} />
          ))}
          {/* Compass rose diamond */}
          <polygon points="200,140 210,200 200,260 190,200" />
          <polygon points="140,200 200,210 260,200 200,190" />
          {/* Inner detail squares */}
          <rect x="175" y="175" width="50" height="50" transform="rotate(45 200 200)" />
        </svg>
        {/* Left-side blueprint measuring lines */}
        <svg className="absolute left-0 top-0 w-48 h-full opacity-[0.04]"
          viewBox="0 0 120 600" preserveAspectRatio="none" fill="none" stroke="#CC0000" strokeWidth="1">
          <line x1="110" y1="0" x2="110" y2="600" />
          {[0,30,60,90,120,150,180,210,240,270,300,330,360,390,420,450,480,510,540,570,600].map(y => (
            <line key={y} x1="90" y1={y} x2="110" y2={y} />
          ))}
          {[0,60,120,180,240,300,360,420,480,540,600].map(y => (
            <line key={`l${y}`} x1="70" y1={y} x2="110" y2={y} />
          ))}
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative h-[500px] lg:h-[600px]">
              <div className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80"
                  alt="MRE Construction Team at Work"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-100/80 to-transparent" />
              </div>
              {/* Overlay card */}
              <div className="absolute -bottom-8 -right-8 bg-brand-red p-8 shadow-2xl z-10 hidden lg:block">
                <div className="text-white">
                  <div className="text-5xl font-black font-display">15+</div>
                  <div className="text-red-100 text-sm uppercase tracking-widest mt-1">Years of Excellence</div>
                </div>
              </div>
              {/* Second overlay */}
              <div className="absolute top-8 -left-8 bg-dark-200 border border-white/10 p-6 shadow-2xl z-10 hidden lg:block">
                <div className="text-white">
                  <div className="text-3xl font-black font-display text-brand-red">150+</div>
                  <div className="text-gray-400 text-xs uppercase tracking-wider mt-1">Projects Delivered</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-brand-red" />
              <span className="text-brand-red text-sm font-semibold uppercase tracking-widest">Who We Are</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black font-display text-white mb-6 leading-tight">
              Ghana's Premier <br />
              <span className="text-gradient">Construction Partner</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Founded in Accra, MRE Construction has been the cornerstone of Ghana's built environment for over 15 years. We combine world-class expertise with deep local knowledge to deliver exceptional results across every project.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              From luxury residential villas to landmark commercial towers, our team of architects, engineers, and craftsmen bring unwavering dedication to quality, sustainability, and innovation in every structure we build.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {highlights.map((h, i) => (
                <motion.div
                  key={h}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 size={18} className="text-brand-red flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{h}</span>
                </motion.div>
              ))}
            </div>

            <Link href="/about" className="btn-primary inline-flex">
              Discover Our Story <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
