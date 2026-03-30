'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { resolveProjectImage } from '@/lib/imageUrl';

const FALLBACK_PROJECTS = [
  { title: 'Accra Business Hub', category: 'Commercial', location: 'Accra, Ghana', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80', slug: 'accra-business-hub' },
  { title: 'Kumasi Residence Estate', category: 'Residential', location: 'Kumasi, Ghana', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', slug: 'kumasi-residence-estate' },
  { title: 'Takoradi Civil Infrastructure', category: 'Civil Engineering', location: 'Takoradi, Ghana', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80', slug: 'takoradi-civil-infrastructure' },
  { title: 'Tema Industrial Complex', category: 'Commercial', location: 'Tema, Ghana', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80', slug: 'tema-industrial-complex' },
  { title: 'East Legon Villa', category: 'Residential', location: 'East Legon, Accra', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80', slug: 'east-legon-villa' },
  { title: 'Cantonments Office Tower', category: 'Architectural Design', location: 'Cantonments, Accra', image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&q=80', slug: 'cantonments-office-tower' },
];

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function ProjectsSection() {
  const [projects, setProjects] = useState<typeof FALLBACK_PROJECTS>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/projects?published=true`)
      .then(r => r.ok ? r.json() : [])
      .then((data: any[]) => {
        if (data && data.length > 0) {
          const mapped = data.slice(0, 6).map(p => ({
            title: p.title,
            category: p.category || 'Construction',
            location: p.location || 'Ghana',
            image: resolveProjectImage(p, FALLBACK_PROJECTS[0].image),
            slug: p.slug,
          }));
          setProjects(mapped);
        } else {
          setProjects(FALLBACK_PROJECTS);
        }
      })
      .catch(() => { setProjects(FALLBACK_PROJECTS); })
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <section className="section-padding bg-dark-DEFAULT">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-brand-red" />
              <span className="text-brand-red text-sm font-semibold uppercase tracking-widest">Our Portfolio</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black font-display text-white">
              Featured <span className="text-gradient">Projects</span>
            </h2>
          </div>
          <Link href="/projects" className="btn-outline flex-shrink-0">
            All Projects <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={`animate-pulse bg-white/5 ${i === 0 ? 'sm:col-span-2 lg:col-span-1 lg:row-span-2 min-h-[400px]' : 'h-64'}`} />
              ))
            : projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={i === 0 ? 'sm:col-span-2 lg:col-span-1 lg:row-span-2' : ''}
            >
            <Link
              href={`/projects/${project.slug}`}
              className="group relative overflow-hidden block"
            >
              <div className={`relative ${i === 0 ? 'h-80 lg:h-full min-h-[400px]' : 'h-64'} overflow-hidden`}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-brand-red/0 group-hover:bg-brand-red/20 transition-all duration-500" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block bg-brand-red text-white text-xs font-bold uppercase tracking-wider px-3 py-1 mb-3">
                  {project.category}
                </span>
                <h3 className="text-white font-bold text-xl font-display mb-2 group-hover:text-brand-red transition-colors duration-300">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <MapPin size={14} className="text-brand-red" />
                  {project.location}
                </div>
              </div>
              <div className="absolute top-4 right-4 w-10 h-10 bg-brand-red flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <ArrowRight size={18} className="text-white" />
              </div>
            </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
