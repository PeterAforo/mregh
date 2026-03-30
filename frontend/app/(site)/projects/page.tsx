import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { MapPin, ArrowRight } from 'lucide-react';
import { resolveProjectImage } from '@/lib/imageUrl';

export const metadata: Metadata = {
  title: 'Our Projects',
  description: 'Explore MRE Construction portfolio — 150+ completed projects across Ghana including residential, commercial, civil engineering, and interior design.',
};

const categories = ['All', 'Residential', 'Commercial', 'Civil Engineering', 'Interior Design', 'Renovation'];

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

async function getProjects() {
  try {
    const res = await fetch(`${API_BASE}/projects?published=true`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data || !data.length) return null;
    return data.map((p: any) => ({
      title: p.title,
      category: p.category || 'Construction',
      location: p.location || 'Ghana',
      year: p.year || '',
      image: resolveProjectImage(p, 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80'),
      slug: p.slug,
      description: p.description || '',
    }));
  } catch { return null; }
}

const STATIC_PROJECTS = [
  { title: 'Accra Business Hub', category: 'Commercial', location: 'Airport City, Accra', year: '2023', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80', slug: 'accra-business-hub', description: 'A landmark 12-storey commercial complex featuring modern office spaces and retail units.' },
  { title: 'Kumasi Residence Estate', category: 'Residential', location: 'Kumasi, Ashanti Region', year: '2023', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', slug: 'kumasi-residence-estate', description: 'A gated community of 50 luxury townhouses with world-class amenities.' },
  { title: 'Takoradi Bridge Project', category: 'Civil Engineering', location: 'Takoradi, Western Region', year: '2022', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80', slug: 'takoradi-bridge-project', description: 'Major infrastructure bridge spanning 200m over the Pra River.' },
  { title: 'Tema Industrial Complex', category: 'Commercial', location: 'Tema, Greater Accra', year: '2022', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80', slug: 'tema-industrial-complex', description: 'State-of-the-art warehousing and manufacturing facility on 5 acres.' },
  { title: 'East Legon Luxury Villa', category: 'Residential', location: 'East Legon, Accra', year: '2023', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80', slug: 'east-legon-villa', description: 'A stunning 7-bedroom luxury villa with pool, gym, and smart home integration.' },
  { title: 'Cantonments Office Tower', category: 'Commercial', location: 'Cantonments, Accra', year: '2021', image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&q=80', slug: 'cantonments-office-tower', description: 'Award-winning 20-storey office tower with LEED gold certification.' },
  { title: 'Osu Boutique Hotel', category: 'Interior Design', location: 'Osu, Accra', year: '2023', image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80', slug: 'osu-boutique-hotel', description: 'Full interior fit-out of a 40-room boutique hotel blending African and contemporary aesthetics.' },
  { title: 'Spintex Road Apartments', category: 'Residential', location: 'Spintex, Accra', year: '2022', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', slug: 'spintex-road-apartments', description: 'Modern 6-storey residential building with 48 units and green spaces.' },
  { title: 'Accra Ring Road Upgrade', category: 'Civil Engineering', location: 'Accra, Ghana', year: '2021', image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80', slug: 'accra-ring-road-upgrade', description: '12km road rehabilitation project including drainage and pedestrian infrastructure.' },
  { title: 'Airport Residential Estate', category: 'Residential', location: 'Airport Hills, Accra', year: '2020', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', slug: 'airport-residential-estate', description: 'Exclusive 30-unit estate with modern Ghanaian architectural motifs.' },
  { title: 'Makola Market Renovation', category: 'Renovation', location: 'Central Accra', year: '2022', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80', slug: 'makola-market-renovation', description: 'Complete renovation of historic market structure improving safety and capacity.' },
  { title: 'Labadi Beach Hotel Interior', category: 'Interior Design', location: 'Labadi, Accra', year: '2023', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80', slug: 'labadi-beach-hotel-interior', description: 'Comprehensive interior redesign of premier beachfront hotel property.' },
];

export default async function ProjectsPage() {
  const apiProjects = await getProjects();
  const projects = apiProjects || STATIC_PROJECTS;
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-80 overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80" alt="Our Projects" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/60" />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red" />
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-brand-red" />
              <span className="text-brand-red text-sm font-semibold uppercase tracking-widest">Portfolio</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black font-display text-white">Our Projects</h1>
            <p className="text-gray-300 mt-4 text-lg">150+ completed projects across Ghana and West Africa.</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-dark-200 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/5">
            {[{ v: '150+', l: 'Projects Completed' }, { v: '15+', l: 'Years Experience' }, { v: '6', l: 'Service Areas' }, { v: '500+', l: 'Happy Clients' }].map((s) => (
              <div key={s.l} className="px-6 py-8 text-center">
                <div className="text-brand-red text-3xl font-black font-display">{s.v}</div>
                <div className="text-gray-400 text-xs uppercase tracking-wider mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-dark-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project: any) => (
              <Link key={project.slug} href={`/projects/${project.slug}`}
                className="group bg-dark-DEFAULT border border-white/5 hover:border-brand-red/30 overflow-hidden transition-all duration-500">
                <div className="relative h-60 overflow-hidden">
                  <Image src={project.image} alt={project.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-DEFAULT via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-brand-red text-white text-xs font-bold uppercase tracking-wider px-3 py-1">{project.category}</span>
                    <span className="bg-black/60 text-gray-300 text-xs px-3 py-1">{project.year}</span>
                  </div>
                  <div className="absolute top-4 right-4 w-10 h-10 bg-brand-red flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <ArrowRight size={18} className="text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-white font-bold text-lg font-display mb-2 group-hover:text-brand-red transition-colors">{project.title}</h3>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                    <MapPin size={13} className="text-brand-red" />{project.location}
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
                </div>
                <div className="h-0.5 w-0 bg-brand-red group-hover:w-full transition-all duration-500" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-red">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black font-display text-white mb-4">Have a Project in Mind?</h2>
          <p className="text-red-100 mb-8">Let's discuss your vision and make it a reality.</p>
          <Link href="/contact" className="btn-white inline-flex">Start Your Project <ArrowRight size={18} /></Link>
        </div>
      </section>
    </div>
  );
}
