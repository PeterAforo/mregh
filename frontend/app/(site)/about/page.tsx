import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import TeamSection from '@/components/site/TeamSection';
import { CheckCircle2, Award, Users, Building2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: "Learn about MRE Construction — Ghana's leading construction company with 15+ years of excellence, award-winning designs, and 500+ completed projects.",
};

const values = [
  { title: 'Excellence', desc: 'We set the highest standards in everything we do, from design to delivery.' },
  { title: 'Integrity', desc: 'Honest, transparent dealings with every client, partner, and community.' },
  { title: 'Innovation', desc: 'Embracing modern techniques and sustainable practices for future-ready buildings.' },
  { title: 'Community', desc: 'Building not just structures, but contributing to Ghana\'s growth and prosperity.' },
];

const milestones = [
  { year: '2009', event: 'MRE Construction founded in Accra, Ghana' },
  { year: '2012', event: 'First major commercial project — Accra Business Park completed' },
  { year: '2015', event: 'Expanded into civil engineering and infrastructure projects' },
  { year: '2018', event: 'Launched Interior Design division; 100th project milestone' },
  { year: '2021', event: 'ISO certification achieved; expanded to Kumasi and Takoradi' },
  { year: '2024', event: '150+ projects completed across Ghana; 500+ satisfied clients' },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-80 sm:h-96 overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80" alt="About MRE" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/50" />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red" />
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-brand-red" />
              <span className="text-brand-red text-sm font-semibold uppercase tracking-widest">About MRE</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black font-display text-white">Our Story</h1>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-dark-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-brand-red" />
                <span className="text-brand-red text-sm font-semibold uppercase tracking-widest">Who We Are</span>
              </div>
              <h2 className="text-4xl font-black font-display text-white mb-6">
                Building Ghana's Future, <span className="text-gradient">One Structure at a Time</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Founded in 2009 in Accra, MRE Construction has grown into Ghana's most trusted name in construction and real estate. We combine world-class expertise with deep local knowledge to deliver exceptional results.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                Our multidisciplinary team of architects, engineers, interior designers, and project managers work in harmony to bring every client's vision to life — on time, within budget, and beyond expectations.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-dark-200 p-6 border border-white/5">
                  <div className="text-4xl font-black text-brand-red font-display mb-1">150+</div>
                  <div className="text-gray-400 text-sm uppercase tracking-wide">Projects Completed</div>
                </div>
                <div className="bg-dark-200 p-6 border border-white/5">
                  <div className="text-4xl font-black text-brand-red font-display mb-1">500+</div>
                  <div className="text-gray-400 text-sm uppercase tracking-wide">Happy Clients</div>
                </div>
                <div className="bg-dark-200 p-6 border border-white/5">
                  <div className="text-4xl font-black text-brand-red font-display mb-1">15+</div>
                  <div className="text-gray-400 text-sm uppercase tracking-wide">Years Experience</div>
                </div>
                <div className="bg-dark-200 p-6 border border-white/5">
                  <div className="text-4xl font-black text-brand-red font-display mb-1">50+</div>
                  <div className="text-gray-400 text-sm uppercase tracking-wide">Expert Team</div>
                </div>
              </div>
            </div>
            <div className="relative h-[500px]">
              <Image src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80" alt="MRE Construction" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-100/50 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-dark-DEFAULT">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black font-display text-white">Our Core <span className="text-gradient">Values</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-dark-100 border border-white/5 p-8 hover:border-brand-red/30 transition-all duration-300 group">
                <div className="w-12 h-12 bg-brand-red/10 border border-brand-red/20 flex items-center justify-center mb-4 group-hover:bg-brand-red transition-all duration-300">
                  <CheckCircle2 size={22} className="text-brand-red group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-white font-bold text-lg font-display mb-3 group-hover:text-brand-red transition-colors">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-dark-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black font-display text-white">Our <span className="text-gradient">Journey</span></h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-px bg-brand-red/30" />
            {milestones.map((m, i) => (
              <div key={m.year} className={`relative flex items-start gap-8 mb-12 ${i % 2 === 0 ? 'sm:flex-row-reverse' : ''}`}>
                <div className="absolute left-8 sm:left-1/2 -translate-x-1/2 w-4 h-4 bg-brand-red rounded-full border-4 border-dark-100 z-10" />
                <div className={`ml-16 sm:ml-0 sm:w-[45%] ${i % 2 === 0 ? 'sm:mr-[10%]' : 'sm:ml-[10%]'}`}>
                  <div className="bg-dark-200 border border-white/5 p-6 hover:border-brand-red/30 transition-all duration-300">
                    <div className="text-brand-red font-black text-xl font-display mb-2">{m.year}</div>
                    <p className="text-gray-300 text-sm">{m.event}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team section */}
      <div id="team">
        <TeamSection />
      </div>

      {/* CTA */}
      <section className="py-24 bg-brand-red">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black font-display text-white mb-4">Ready to Work With Us?</h2>
          <p className="text-red-100 text-lg mb-8">Let's build something extraordinary together.</p>
          <Link href="/contact" className="btn-white inline-flex">
            Get In Touch <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
