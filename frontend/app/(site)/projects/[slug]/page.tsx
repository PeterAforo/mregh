import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { MapPin, Calendar, Tag, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

const projects: Record<string, any> = {
  'accra-business-hub': { title: 'Accra Business Hub', category: 'Commercial', location: 'Airport City, Accra', year: '2023', client: 'Asante Group Ltd', duration: '18 months', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80', description: 'A landmark 12-storey commercial complex featuring modern office spaces, retail units, and a state-of-the-art conference center. Designed to LEED Silver standards with smart building technology throughout.', features: ['12-storey commercial tower', 'LEED Silver certified', 'Smart building automation', '50,000 sqm gross floor area', 'Underground parking for 400 vehicles', 'Grade-A office fit-out'], images: ['https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80', 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&q=80', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'] },
  'kumasi-residence-estate': { title: 'Kumasi Residence Estate', category: 'Residential', location: 'Kumasi, Ashanti Region', year: '2023', client: 'Private Developer', duration: '24 months', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80', description: 'A gated community of 50 luxury townhouses with world-class amenities including a swimming pool, gym, and landscaped gardens. Each unit features 4 bedrooms, smart home integration, and high-end finishes.', features: ['50 luxury townhouses', 'Gated community with 24/7 security', 'Communal pool and gym', 'Smart home integration', 'Landscaped gardens', 'Underground utilities'], images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'] },
  'east-legon-villa': { title: 'East Legon Luxury Villa', category: 'Residential', location: 'East Legon, Accra', year: '2023', client: 'Private Client', duration: '14 months', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80', description: 'A stunning 7-bedroom luxury villa with infinity pool, home gym, cinema room, and comprehensive smart home system. Built to the highest international standards with imported Italian marble and custom millwork throughout.', features: ['7 bedrooms, 8 bathrooms', 'Infinity pool and jacuzzi', 'Home cinema and gym', 'Full smart home system', 'Italian marble finishes', 'Landscaped 1-acre plot'], images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'] },
};

const fallback = { title: 'Project', category: 'Construction', location: 'Ghana', year: '2024', client: 'Private Client', duration: 'Ongoing', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80', description: 'Project details coming soon.', features: [], images: [] };

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
const UPLOADS_BASE = API_BASE.replace('/api', '');

async function fetchApiProject(slug: string) {
  try {
    const res = await fetch(`${API_BASE}/projects/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const d = await res.json();
    let imgs: string[] = [];
    try { imgs = JSON.parse(d.images || '[]'); } catch {}
    const resolveImg = (src: string | null) => !src ? '' : src.startsWith('http') ? src : `${UPLOADS_BASE}/${src}`;
    return {
      title: d.title,
      category: d.category || 'Construction',
      location: d.location || 'Ghana',
      year: d.year || '',
      client: d.client || 'Private Client',
      duration: '',
      image: resolveImg(d.coverImage || imgs[0]) || fallback.image,
      description: d.description || '',
      features: d.content ? d.content.split('\n').filter(Boolean).slice(0, 6) : [],
      images: imgs.map(resolveImg).filter(Boolean),
    };
  } catch { return null; }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const api = await fetchApiProject(slug);
  const p = api || projects[slug] || fallback;
  return { title: p.title, description: p.description };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const api = await fetchApiProject(slug);
  const p = api || projects[slug] || { ...fallback, title: slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-80 sm:h-[500px] overflow-hidden">
        <Image src={p.image} alt={p.title} fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <span className="inline-block bg-brand-red text-white text-xs font-bold uppercase tracking-wider px-3 py-1 mb-4">{p.category}</span>
            <h1 className="text-4xl sm:text-6xl font-black font-display text-white leading-tight">{p.title}</h1>
            <div className="flex flex-wrap items-center gap-6 mt-4 text-gray-300 text-sm">
              <span className="flex items-center gap-2"><MapPin size={14} className="text-brand-red" />{p.location}</span>
              <span className="flex items-center gap-2"><Calendar size={14} className="text-brand-red" />{p.year}</span>
              <span className="flex items-center gap-2"><Tag size={14} className="text-brand-red" />{p.client}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-dark-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-black font-display text-white mb-6">Project Overview</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-10">{p.description}</p>

              {p.features.length > 0 && (
                <>
                  <h3 className="text-xl font-bold font-display text-white mb-6">Key Features</h3>
                  <div className="grid sm:grid-cols-2 gap-4 mb-10">
                    {p.features.map((f: string) => (
                      <div key={f} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-brand-red flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm">{f}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {p.images?.length > 1 && (
                <>
                  <h3 className="text-xl font-bold font-display text-white mb-6">Gallery</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {p.images.slice(1).map((img: string, i: number) => (
                      <div key={i} className="relative h-48 overflow-hidden">
                        <Image src={img} alt={`${p.title} ${i + 2}`} fill sizes="(max-width: 1024px) 50vw, 33vw" className="object-cover hover:scale-105 transition-transform duration-500" />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-dark-200 border border-white/5 p-6 mb-6">
                <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Project Details</h3>
                <dl className="space-y-4">
                  {[{ label: 'Category', value: p.category }, { label: 'Location', value: p.location }, { label: 'Year', value: p.year }, { label: 'Client', value: p.client }, { label: 'Duration', value: p.duration }].map(({ label, value }) => (
                    <div key={label}>
                      <dt className="text-gray-500 text-xs uppercase tracking-wider mb-1">{label}</dt>
                      <dd className="text-gray-200 text-sm font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="bg-brand-red p-6">
                <h3 className="text-white font-bold mb-2">Start a Similar Project</h3>
                <p className="text-red-100 text-sm mb-4">Contact us to discuss your vision.</p>
                <Link href="/contact" className="flex items-center gap-2 bg-white text-brand-red px-4 py-2 text-sm font-bold hover:bg-gray-100 transition-colors">
                  Get a Quote <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <Link href="/projects" className="flex items-center gap-2 text-brand-red hover:text-red-400 font-semibold transition-colors">
              <ArrowLeft size={18} /> Back to All Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
