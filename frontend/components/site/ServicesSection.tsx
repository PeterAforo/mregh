'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { DraftingCompass, Sofa, Home, Building2, HardHat, Hammer, Landmark, ClipboardList, Armchair, Factory, ArrowRight } from 'lucide-react';

const FALLBACK_SERVICES = [
  { icon: DraftingCompass, title: 'Architectural Design', slug: 'architectural-design', description: 'Innovative, functional, and aesthetically stunning architectural designs tailored to your vision.', color: 'from-red-600/20 to-transparent' },
  { icon: Sofa, title: 'Interior Decoration', slug: 'interior-decoration', description: 'Transform interiors into beautiful, functional spaces that reflect your personality and style.', color: 'from-orange-600/20 to-transparent' },
  { icon: Home, title: 'Residential Construction', slug: 'residential-construction', description: 'Building dream homes for Ghanaian families — from luxury villas to cozy family residences.', color: 'from-yellow-600/20 to-transparent' },
  { icon: Building2, title: 'Commercial Construction', slug: 'commercial-construction', description: 'Expert construction of offices, hotels, shopping centers, and industrial facilities.', color: 'from-green-600/20 to-transparent' },
  { icon: HardHat, title: 'Civil Engineering', slug: 'civil-engineering', description: 'Roads, bridges, drainage systems, and infrastructure development across Ghana.', color: 'from-blue-600/20 to-transparent' },
  { icon: Hammer, title: 'Building Renovation', slug: 'building-renovation', description: 'Revitalizing and retrofitting existing structures with modern upgrades and aesthetics.', color: 'from-purple-600/20 to-transparent' },
  { icon: Landmark, title: 'Real Estate Consultancy', slug: 'real-estate-consultancy', description: 'Professional advisory services for smart property investment decisions in Ghana.', color: 'from-pink-600/20 to-transparent' },
  { icon: ClipboardList, title: 'Project Management', slug: 'project-management', description: 'End-to-end project management ensuring delivery on time, on budget, to highest standards.', color: 'from-cyan-600/20 to-transparent' },
  { icon: Armchair, title: 'Bespoke Furniture & Joinery', slug: 'bespoke-furniture-joinery', description: 'Custom-crafted furniture and precision joinery tailored to your space, lifestyle, and aesthetic vision.', color: 'from-amber-600/20 to-transparent' },
  { icon: Factory, title: 'Steel Structures & Metal Fabrication', slug: 'steel-structures-metal-fabrication', description: 'Precision engineering of structural steelwork, gates, canopies, and bespoke metal components for any project.', color: 'from-slate-600/20 to-transparent' },
];

const ICON_MAP: Record<string, any> = {
  'architectural-design': DraftingCompass, 'interior-decoration': Sofa,
  'residential-construction': Home, 'commercial-construction': Building2,
  'civil-engineering': HardHat, 'building-renovation': Hammer,
  'real-estate-consultancy': Landmark, 'project-management': ClipboardList,
  'bespoke-furniture-joinery': Armchair, 'steel-structures-metal-fabrication': Factory,
};
const COLOR_LIST = ['from-red-600/20','from-orange-600/20','from-yellow-600/20','from-green-600/20','from-blue-600/20','from-purple-600/20','from-pink-600/20','from-cyan-600/20','from-amber-600/20','from-slate-600/20'];

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function ServicesSection() {
  const [services, setServices] = useState<typeof FALLBACK_SERVICES>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/services?published=true`)
      .then(r => r.ok ? r.json() : [])
      .then((data: any[]) => {
        if (data && data.length > 0) {
          const mapped = data
            .sort((a, b) => a.order - b.order)
            .map((s, i) => ({
              icon: ICON_MAP[s.slug] || DraftingCompass,
              title: s.title,
              slug: s.slug,
              description: s.description || '',
              color: `${COLOR_LIST[i % COLOR_LIST.length]} to-transparent`,
            }));
          setServices(mapped);
        } else {
          setServices(FALLBACK_SERVICES);
        }
      })
      .catch(() => { setServices(FALLBACK_SERVICES); })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section className="section-padding bg-dark-DEFAULT relative overflow-hidden">
      {/* Animated architectural blueprint background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Fine blueprint grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(rgba(204,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(204,0,0,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        {/* Architectural drawing overlays */}
        <svg className="absolute left-4 top-8 w-64 h-64 opacity-[0.05]"
          viewBox="0 0 240 240" fill="none" stroke="#CC0000" strokeWidth="1" strokeLinecap="round">
          {/* Floor plan outline */}
          <rect x="20" y="20" width="200" height="200" />
          <rect x="40" y="40" width="70" height="70" />
          <rect x="130" y="40" width="70" height="70" />
          <rect x="40" y="130" width="160" height="70" />
          {/* Door arcs */}
          <path d="M 40,110 Q 70,110 70,80" />
          <path d="M 130,110 Q 160,110 160,80" />
          {/* Dimension lines */}
          <line x1="20" y1="10" x2="220" y2="10" strokeDasharray="4 2" />
          <line x1="20" y1="8" x2="20" y2="12" />
          <line x1="220" y1="8" x2="220" y2="12" />
          <line x1="230" y1="20" x2="230" y2="220" strokeDasharray="4 2" />
          <line x1="228" y1="20" x2="232" y2="20" />
          <line x1="228" y1="220" x2="232" y2="220" />
          {/* Center cross */}
          <line x1="120" y1="0" x2="120" y2="240" strokeDasharray="2 6" />
          <line x1="0" y1="120" x2="240" y2="120" strokeDasharray="2 6" />
        </svg>
        {/* Right-side building elevation */}
        <svg className="absolute right-4 bottom-8 w-72 h-48 opacity-[0.05]"
          viewBox="0 0 280 180" fill="none" stroke="#CC0000" strokeWidth="1" strokeLinecap="round">
          {/* Building elevation */}
          <rect x="20" y="30" width="240" height="140" />
          <rect x="30" y="40" width="50" height="70" />
          <rect x="90" y="40" width="50" height="70" />
          <rect x="150" y="40" width="50" height="70" />
          <rect x="210" y="40" width="40" height="70" />
          {/* Windows on upper level */}
          <rect x="30" y="120" width="20" height="25" />
          <rect x="60" y="120" width="20" height="25" />
          <rect x="90" y="120" width="20" height="25" />
          <rect x="120" y="120" width="20" height="25" />
          <rect x="150" y="120" width="20" height="25" />
          <rect x="180" y="120" width="20" height="25" />
          <rect x="210" y="120" width="20" height="25" />
          {/* Roof line detail */}
          <line x1="20" y1="30" x2="260" y2="30" />
          <rect x="100" y="10" width="80" height="20" />
          {/* Baseline */}
          <line x1="0" y1="170" x2="280" y2="170" />
          {/* Dimension ticks */}
          {[20,70,120,170,220,260].map(x => (
            <line key={x} x1={x} y1="172" x2={x} y2="178" />
          ))}
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-brand-red" />
            <span className="text-brand-red text-sm font-semibold uppercase tracking-widest">What We Do</span>
            <div className="h-px w-12 bg-brand-red" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display text-white">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
            Comprehensive construction and real estate solutions, from architectural design to civil engineering — all under one roof.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-dark-100 p-8">
                  <div className="w-14 h-14 bg-white/5 mb-6" />
                  <div className="h-5 bg-white/10 w-3/4 mb-3" />
                  <div className="space-y-2">
                    <div className="h-3 bg-white/5 w-full" />
                    <div className="h-3 bg-white/5 w-11/12" />
                    <div className="h-3 bg-white/5 w-4/5" />
                  </div>
                </div>
              ))
            : services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
              <Link
                href={`/services/${service.slug}`}
                className="group relative bg-dark-100 p-8 hover:bg-dark-200 transition-all duration-300 overflow-hidden h-full flex flex-col"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-brand-red/10 border border-brand-red/20 flex items-center justify-center mb-6 group-hover:bg-brand-red group-hover:border-brand-red transition-all duration-300">
                    <Icon size={24} className="text-brand-red group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3 font-display group-hover:text-brand-red transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 group-hover:text-gray-300 transition-colors duration-300">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 text-brand-red text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    Learn More <ArrowRight size={14} />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-red group-hover:w-full transition-all duration-500" />
              </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/services" className="btn-outline">
            View All Services <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
