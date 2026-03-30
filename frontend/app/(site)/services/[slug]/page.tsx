import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight, CheckCircle2, DraftingCompass, Sofa, Home, Building2, HardHat, Hammer, Landmark, ClipboardList, Armchair, Factory } from 'lucide-react';

const iconMap: Record<string, any> = {
  'architectural-design': DraftingCompass,
  'interior-decoration': Sofa,
  'residential-construction': Home,
  'commercial-construction': Building2,
  'civil-engineering': HardHat,
  'building-renovation': Hammer,
  'real-estate-consultancy': Landmark,
  'project-management': ClipboardList,
  'bespoke-furniture-joinery': Armchair,
  'steel-structures-metal-fabrication': Factory,
};

const services: Record<string, any> = {
  'architectural-design': { title: 'Architectural Design', tagline: 'From concept to blueprint — we design structures that inspire.', description: 'Our award-winning architects create innovative, functional, and aesthetically stunning designs that honor both modern sensibility and local Ghanaian culture. We deliver comprehensive documentation from initial concept through to planning approval and construction drawings.', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80', features: ['Conceptual & schematic design', '3D visualizations & renders', 'Working drawings & specifications', 'Planning & building permit applications', 'Site plans & masterplanning', 'Sustainable / green building design', 'Structural coordination', 'Interior architecture'], process: ['Initial consultation & brief', 'Concept development', '3D visualization & client approval', 'Working drawings', 'Permit submission', 'Construction supervision'] },
  'interior-decoration': { title: 'Interior Decoration', tagline: 'Spaces that reflect your personality and elevate daily life.', description: 'Our interior design team transforms any space into an inspiring environment. Whether a private residence, corporate office, or hospitality venue, we blend functionality with beauty to create interiors that truly reflect your vision.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80', features: ['Space planning & layout', 'Furniture selection & procurement', 'Colour & material consultation', 'Custom millwork & cabinetry', 'Lighting design & specification', 'Art & accessories curation', 'Project management & installation', 'Soft furnishings & drapery'], process: ['Site survey & brief', 'Mood board & concept', 'Detailed design & specification', 'Procurement', 'Installation & styling', 'Final handover'] },
  'residential-construction': { title: 'Residential Construction', tagline: 'Building dream homes for Ghanaian families.', description: 'We build dream homes across Ghana — from cozy family bungalows to sprawling luxury estates. Every home is constructed with premium materials, skilled craftsmanship, and meticulous attention to quality, safety, and on-time delivery.', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80', features: ['Single-family homes & bungalows', 'Luxury villas & estates', 'Townhouse developments', 'Apartment blocks', 'Site preparation & earthworks', 'Full MEP installation', 'Finishing & external works', 'Post-completion warranty'], process: ['Design brief & planning', 'Site preparation', 'Structural works', 'MEP installation', 'Finishing works', 'Handover & warranty'] },
  'commercial-construction': { title: 'Commercial Construction', tagline: 'Expert delivery of complex commercial projects across Ghana.', description: 'Expert construction of commercial buildings including offices, hotels, shopping centers, schools, and industrial facilities. We deliver complex commercial projects with precision, efficiency, and excellence, meeting the most demanding client and regulatory requirements.', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80', features: ['Office buildings & towers', 'Retail & shopping centers', 'Hotels & hospitality', 'Schools & healthcare facilities', 'Warehouses & industrial', 'Mixed-use developments', 'Fit-out & refurbishment', 'Base build & shell works'], process: ['Pre-construction planning', 'Mobilisation & setup', 'Structural & civil works', 'MEP & specialist installations', 'Finishing & commissioning', 'Testing & handover'] },
  'civil-engineering': { title: 'Civil Engineering', tagline: 'Infrastructure that drives Ghana\'s development forward.', description: 'Comprehensive civil engineering solutions including roads, bridges, drainage systems, water supply infrastructure, and large-scale development projects. We combine deep technical expertise with extensive practical experience on Ghana\'s most challenging infrastructure projects.', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80', features: ['Road construction & rehabilitation', 'Bridge design & construction', 'Drainage & stormwater systems', 'Water supply & sanitation', 'Site development & earthworks', 'Structural engineering', 'Environmental assessment', 'Project management'], process: ['Feasibility study', 'Detailed design', 'Tendering & procurement', 'Construction', 'Testing & commissioning', 'Maintenance handover'] },
  'building-renovation': { title: 'Building Renovation', tagline: 'Breathing new life into existing structures.', description: 'Breathe new life into existing structures with our renovation and retrofitting services. From minor upgrades to complete overhauls, we modernize buildings while preserving their character and ensuring their structural integrity for the next generation.', image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1200&q=80', features: ['Full building renovation', 'Structural repairs & strengthening', 'Facade upgrades & waterproofing', 'MEP system upgrades', 'Extensions & additions', 'Heritage & conservation works', 'Interior refurbishment', 'Energy efficiency upgrades'], process: ['Condition survey & assessment', 'Design & specification', 'Tender & contractor selection', 'Phased construction', 'Quality inspection', 'Handover'] },
  'real-estate-consultancy': { title: 'Real Estate Consultancy', tagline: 'Expert guidance to navigate Ghana\'s property market.', description: 'Navigate Ghana\'s dynamic real estate market with confidence. Our expert consultants provide market analysis, property valuation, investment advisory, and due diligence services to help you make informed property investment decisions.', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80', features: ['Property market analysis', 'Independent valuations', 'Investment advisory & strategy', 'Due diligence & legal coordination', 'Land acquisition support', 'Portfolio management', 'Feasibility studies', 'Developer advisory'], process: ['Initial consultation', 'Market & property research', 'Report & recommendations', 'Transaction support', 'Post-acquisition advisory', 'Portfolio review'] },
  'project-management': { title: 'Project Management', tagline: 'On time, on budget, to the highest standards.', description: 'End-to-end project management ensuring your construction project is delivered on time, within budget, and to the highest quality standards. Our CIOB-certified project managers bring international best practice and deep local knowledge to every engagement.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80', features: ['Project planning & programming', 'Cost management & reporting', 'Schedule control & EVM', 'Quality assurance & inspection', 'Risk identification & mitigation', 'Contractor coordination', 'Client reporting & governance', 'Dispute avoidance & resolution'], process: ['Project initiation & charter', 'Planning & scheduling', 'Procurement management', 'Construction monitoring', 'Change management', 'Closeout & lessons learned'] },
  'bespoke-furniture-joinery': { title: 'Bespoke Furniture & Joinery', tagline: 'Handcrafted pieces built to last a lifetime.', description: 'Our master craftsmen design and manufacture custom furniture and precision joinery for residential and commercial clients across Ghana. Every piece is built to exact specifications using premium-grade timber and materials, combining traditional craftsmanship with contemporary design sensibility.', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80', features: ['Custom kitchen cabinetry & vanities', 'Fitted wardrobes & built-in storage', 'Office desks, shelving & fit-out', 'Solid wood dining & living furniture', 'Decorative joinery & wall panelling', 'Staircases & balustrades', 'Upholstery & soft furnishings', 'Site measurement & installation'], process: ['Design consultation & brief', 'Material selection & sampling', 'Technical drawings & approval', 'Workshop fabrication', 'Quality inspection & finishing', 'Delivery & installation'] },
  'steel-structures-metal-fabrication': { title: 'Steel Structures & Metal Fabrication', tagline: 'Precision-engineered steelwork for every application.', description: 'We engineer, fabricate, and erect structural steelwork and bespoke metal components for construction and industrial projects throughout Ghana. Our in-house fabrication facility delivers precision-cut structural frames, ornamental metalwork, and heavy-duty installations from certified drawings to completed structure.', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=80', features: ['Structural steel frames & portals', 'Security gates, fences & railings', 'Canopies, pergolas & shade structures', 'Industrial staircases & mezzanine platforms', 'Roof trusses & purlins', 'Bespoke architectural metalwork', 'Welding, cutting & surface treatment', 'On-site erection & installation'], process: ['Engineering design & drawings', 'Material procurement & certification', 'Workshop fabrication & QC', 'Surface treatment & coating', 'Logistics & site delivery', 'Erection, alignment & sign-off'] },
};

const fallback = { title: 'Service', tagline: '', description: 'Service details coming soon.', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80', features: [], process: [] };

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

async function fetchApiService(slug: string) {
  try {
    const res = await fetch(`${API_BASE}/services/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const api = await fetchApiService(slug);
  const s = api || services[slug] || fallback;
  return { title: s.title, description: s.description };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const api = await fetchApiService(slug);
  const staticData = services[slug];
  const s = api
    ? {
        title: api.title,
        tagline: staticData?.tagline || '',
        description: api.description || staticData?.description || '',
        image: api.image?.startsWith('http') ? api.image : (api.image ? `${API_BASE.replace('/api', '')}/${api.image}` : (staticData?.image || fallback.image)),
        features: staticData?.features || [],
        process: staticData?.process || [],
      }
    : (staticData || { ...fallback, title: slug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()) });
  const Icon = iconMap[slug] || CheckCircle2;

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-72 sm:h-96 overflow-hidden">
        <Image src={s.image} alt={s.title} fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 to-black/60" />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-14 h-14 bg-brand-red flex items-center justify-center mb-6">
              <Icon size={26} className="text-white" />
            </div>
            <h1 className="text-4xl sm:text-6xl font-black font-display text-white leading-tight">{s.title}</h1>
            {s.tagline && <p className="text-gray-300 text-xl mt-4 max-w-2xl">{s.tagline}</p>}
          </div>
        </div>
      </section>

      <section className="section-padding bg-dark-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-2xl font-black font-display text-white mb-4">About This Service</h2>
                <p className="text-gray-300 text-lg leading-relaxed">{s.description}</p>
              </div>

              {s.features.length > 0 && (
                <div>
                  <h2 className="text-2xl font-black font-display text-white mb-6">What's Included</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {s.features.map((f: string) => (
                      <div key={f} className="flex items-start gap-3 bg-dark-200 border border-white/5 p-4">
                        <CheckCircle2 size={18} className="text-brand-red flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {s.process.length > 0 && (
                <div>
                  <h2 className="text-2xl font-black font-display text-white mb-6">Our Process</h2>
                  <div className="space-y-4">
                    {s.process.map((step: string, i: number) => (
                      <div key={step} className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-brand-red flex items-center justify-center text-white font-black text-sm flex-shrink-0">{i + 1}</div>
                        <div className="text-gray-300 font-medium">{step}</div>
                        {i < s.process.length - 1 && <div className="flex-1 h-px bg-white/10" />}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-brand-red p-8">
                <h3 className="text-white font-black text-xl font-display mb-2">Get a Free Quote</h3>
                <p className="text-red-100 text-sm mb-6">Tell us about your project and we'll provide a detailed, no-obligation quote within 48 hours.</p>
                <Link href="/contact" className="flex items-center gap-2 bg-white text-brand-red px-5 py-3 font-bold hover:bg-gray-100 transition-colors text-sm">
                  Start a Conversation <ArrowRight size={14} />
                </Link>
              </div>
              <div className="bg-dark-200 border border-white/5 p-6">
                <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Our Other Services</h3>
                <ul className="space-y-2">
                  {Object.entries(services).filter(([s]) => s !== slug).slice(0, 5).map(([s, svc]: [string, any]) => (
                    <li key={s}>
                      <Link href={`/services/${s}`} className="text-gray-400 hover:text-brand-red text-sm transition-colors flex items-center gap-2">
                        <ArrowRight size={12} className="text-brand-red" />{svc.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <Link href="/services" className="flex items-center gap-2 text-brand-red hover:text-red-400 font-semibold transition-colors">
              <ArrowLeft size={18} /> Back to All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
