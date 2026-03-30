import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { DraftingCompass, Sofa, Home, Building2, HardHat, Hammer, Landmark, ClipboardList, Armchair, Factory, ArrowRight } from 'lucide-react';
import { resolveImageUrl } from '@/lib/imageUrl';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'MRE Construction offers architectural design, interior decoration, residential & commercial construction, civil engineering, renovation and project management across Ghana.',
};

const ICON_MAP: Record<string, any> = {
  'architectural-design': DraftingCompass, 'interior-decoration': Sofa,
  'residential-construction': Home, 'commercial-construction': Building2,
  'civil-engineering': HardHat, 'building-renovation': Hammer,
  'real-estate-consultancy': Landmark, 'project-management': ClipboardList,
  'bespoke-furniture-joinery': Armchair, 'steel-structures-metal-fabrication': Factory,
};

const STATIC_IMAGES = [
  '1486325212027-8081e485255e','1600585154340-be6161a56a0c','1541888946425-d81bb19240f5',
  '1503387762-592deb58ef4e','1504307651254-35680f356dfd','1577495508048-b635879837f1',
  '1486406146926-c627a92ad1ab','1507003211169-0a1dd7228f2d','1555041469-a586c61ea9bc','1504328345606-18bbc8c9d7d1',
];

const STATIC_SERVICES = [
  { icon: DraftingCompass, title: 'Architectural Design', slug: 'architectural-design', description: 'From concept to blueprint, our award-winning architects create innovative, functional, and aesthetically stunning designs that honor both modern sensibility and local culture. We deliver 2D/3D drawings, site plans, and permit documentation.', features: ['Conceptual Design', '3D Visualizations', 'Working Drawings', 'Planning Permits', 'Site Plans', 'Green Building Design'] },
  { icon: Sofa, title: 'Interior Decoration', slug: 'interior-decoration', description: 'Our interior design team transforms spaces into inspiring environments. Whether a home, office, or hotel, we blend functionality with beauty to create interiors that truly reflect your vision and elevate daily living.', features: ['Space Planning', 'Furniture Selection', 'Color Consultation', 'Lighting Design', 'Custom Finishes', 'Project Coordination'] },
  { icon: Home, title: 'Residential Construction', slug: 'residential-construction', description: 'We build dream homes for Ghanaian families — from cozy bungalows to sprawling luxury estates. Every home is constructed with premium materials, skilled craftsmanship, and meticulous attention to quality and safety.', features: ['Single-Family Homes', 'Luxury Villas', 'Townhouses', 'Apartment Buildings', 'Site Preparation', 'Finishing Works'] },
  { icon: Building2, title: 'Commercial Construction', slug: 'commercial-construction', description: 'Expert construction of commercial buildings including offices, hotels, shopping centers, schools, and industrial facilities. We deliver complex commercial projects with precision, efficiency, and excellence.', features: ['Office Buildings', 'Shopping Centers', 'Hotels & Hospitality', 'Schools & Hospitals', 'Warehouses', 'Industrial Facilities'] },
  { icon: HardHat, title: 'Civil Engineering', slug: 'civil-engineering', description: 'Comprehensive civil engineering solutions including roads, bridges, drainage systems, water supply infrastructure, and large-scale development projects. We combine technical expertise with practical experience.', features: ['Road Construction', 'Bridge Engineering', 'Drainage Systems', 'Water Infrastructure', 'Site Earthworks', 'Structural Engineering'] },
  { icon: Hammer, title: 'Building Renovation', slug: 'building-renovation', description: 'Breathe new life into existing structures with our renovation and retrofitting services. From minor upgrades to complete overhauls, we modernize buildings while preserving their character and structural integrity.', features: ['Full Renovations', 'Structural Repairs', 'Facade Upgrades', 'MEP Upgrades', 'Extensions', 'Heritage Restoration'] },
  { icon: Landmark, title: 'Real Estate Consultancy', slug: 'real-estate-consultancy', description: 'Navigate Ghana\'s real estate market with confidence. Our expert consultants provide market analysis, property valuation, investment advisory, and due diligence services to help you make informed decisions.', features: ['Market Analysis', 'Property Valuation', 'Investment Advisory', 'Due Diligence', 'Land Acquisition', 'Portfolio Management'] },
  { icon: ClipboardList, title: 'Project Management', slug: 'project-management', description: 'End-to-end project management ensuring your construction project is delivered on time, within budget, and to the highest standards. Our PMs are CIOB-certified with extensive local and international experience.', features: ['Project Planning', 'Cost Management', 'Schedule Control', 'Quality Assurance', 'Risk Management', 'Contractor Coordination'] },
  { icon: Armchair, title: 'Bespoke Furniture & Joinery', slug: 'bespoke-furniture-joinery', description: 'Our skilled craftsmen design and manufacture custom furniture and precision joinery for residential and commercial clients. From fitted wardrobes and kitchen cabinetry to statement pieces, every item is built to exact specifications using premium materials.', features: ['Custom Kitchen Cabinetry', 'Fitted Wardrobes & Storage', 'Office & Commercial Fit-out', 'Solid Wood Furniture', 'Decorative Joinery & Panelling', 'Upholstery & Finishing'] },
  { icon: Factory, title: 'Steel Structures & Metal Fabrication', slug: 'steel-structures-metal-fabrication', description: 'We engineer, fabricate, and install structural steelwork and bespoke metal components for construction and industrial projects. Our fabrication shop delivers precision-cut steel frames, security gates, canopies, staircases, and specialist metalwork to exact drawings.', features: ['Structural Steel Frames', 'Security Gates & Railings', 'Canopies & Roofing Structures', 'Industrial Staircases & Platforms', 'Bespoke Metal Fabrication', 'On-site Erection & Installation'] },
];

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

async function getServices() {
  try {
    const res = await fetch(`${API_BASE}/services?published=true`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data || !data.length) return null;
    return data.sort((a: any, b: any) => a.order - b.order).map((s: any, i: number) => ({
      icon: ICON_MAP[s.slug] || DraftingCompass,
      title: s.title,
      slug: s.slug,
      description: s.description || '',
      features: s.content ? s.content.split('\n').filter(Boolean).slice(0, 6) : [],
      image: resolveImageUrl(s.image, `https://images.unsplash.com/photo-${STATIC_IMAGES[i % STATIC_IMAGES.length]}?w=800&q=80`),
    }));
  } catch { return null; }
}

export default async function ServicesPage() {
  const apiServices = await getServices();
  const services = apiServices || STATIC_SERVICES;
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-80 overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80" alt="Our Services" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/60" />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red" />
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-brand-red" />
              <span className="text-brand-red text-sm font-semibold uppercase tracking-widest">What We Offer</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black font-display text-white">Our Services</h1>
            <p className="text-gray-300 mt-4 max-w-xl text-lg">Comprehensive construction and real estate solutions for every need.</p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding bg-dark-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {services.map((service: any, i: number) => {
            const Icon = service.icon;
            const imgSrc = (service as any).image || `https://images.unsplash.com/photo-${STATIC_IMAGES[i % STATIC_IMAGES.length]}?w=800&q=80`;
            return (
              <div key={service.slug} className={`grid lg:grid-cols-2 gap-12 items-start ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`} id={service.slug}>
                <div className={i % 2 !== 0 ? 'lg:order-2' : ''}>
                  <div className="w-16 h-16 bg-brand-red/10 border border-brand-red/30 flex items-center justify-center mb-6">
                    <Icon size={30} className="text-brand-red" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black font-display text-white mb-4">{service.title}</h2>
                  <p className="text-gray-400 leading-relaxed mb-8 text-lg">{service.description}</p>
                  {service.features.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {service.features.map((f: string) => (
                        <div key={f} className="flex items-center gap-2 text-gray-300 text-sm">
                          <div className="w-1.5 h-1.5 bg-brand-red rounded-full flex-shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>
                  )}
                  <Link href="/contact" className="btn-primary inline-flex">
                    Get a Quote <ArrowRight size={16} />
                  </Link>
                </div>
                <div className={`relative h-80 lg:h-96 overflow-hidden ${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
                  <Image
                    src={imgSrc}
                    alt={service.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-100/50 to-transparent" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-brand-red">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black font-display text-white mb-4">Ready to Start Your Project?</h2>
          <p className="text-red-100 text-lg mb-8">Contact us today for a free consultation and quote.</p>
          <Link href="/contact" className="btn-white inline-flex">Get Free Consultation <ArrowRight size={18} /></Link>
        </div>
      </section>
    </div>
  );
}
