'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Mail } from 'lucide-react';
import { resolveImageUrl } from '@/lib/imageUrl';

const FALLBACK_TEAM = [
  { name: 'Kofi McAforo', position: 'Founder & CEO', bio: 'Visionary leader with 20+ years of experience in real estate and construction across West Africa.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', linkedin: '#', email: '#' },
  { name: 'Ama Owusu', position: 'Chief Architect', bio: 'Award-winning architect specializing in sustainable, culturally-inspired design for modern Ghana.', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80', linkedin: '#', email: '#' },
  { name: 'Kweku Mensah', position: 'Head of Civil Engineering', bio: 'Expert civil engineer with extensive experience in infrastructure development and construction management.', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80', linkedin: '#', email: '#' },
  { name: 'Akosua Boateng', position: 'Interior Design Director', bio: 'Creative interior designer blending African aesthetics with contemporary design to create stunning spaces.', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80', linkedin: '#', email: '#' },
];

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function TeamSection() {
  const [team, setTeam] = useState<typeof FALLBACK_TEAM>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/team?published=true`)
      .then(r => r.ok ? r.json() : [])
      .then((data: any[]) => {
        if (data && data.length > 0) {
          const mapped = data
            .sort((a, b) => a.order - b.order)
            .map(m => ({
              name: m.name,
              position: m.position,
              bio: m.bio || '',
              image: resolveImageUrl(m.image, FALLBACK_TEAM[0].image),
              linkedin: m.linkedin || '#',
              email: m.email ? `mailto:${m.email}` : '#',
            }));
          setTeam(mapped);
        } else {
          setTeam(FALLBACK_TEAM);
        }
      })
      .catch(() => { setTeam(FALLBACK_TEAM); })
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <section className="section-padding bg-dark-DEFAULT">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-brand-red" />
            <span className="text-brand-red text-sm font-semibold uppercase tracking-widest">Our People</span>
            <div className="h-px w-12 bg-brand-red" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black font-display text-white">
            Meet Our <span className="text-gradient">Team</span>
          </h2>
          <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
            Driven by passion, guided by expertise. Our team of professionals brings your vision to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-dark-100 border border-white/5">
                  <div className="h-72 bg-white/5" />
                  <div className="p-6 space-y-3">
                    <div className="h-5 bg-white/10 w-3/4" />
                    <div className="h-4 bg-brand-red/20 w-1/2" />
                    <div className="space-y-2 pt-1">
                      <div className="h-3 bg-white/5 w-full" />
                      <div className="h-3 bg-white/5 w-4/5" />
                    </div>
                  </div>
                </div>
              ))
            : team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative overflow-hidden bg-dark-100 border border-white/5 hover:border-brand-red/30 transition-all duration-500">
              <div className="relative h-72 overflow-hidden">
                <Image src={member.image} alt={member.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-100 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-brand-red/0 group-hover:bg-brand-red/10 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex gap-3 justify-center">
                  {member.linkedin && member.linkedin !== '#' && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-brand-red flex items-center justify-center text-white hover:bg-red-700 transition-colors">
                      <Linkedin size={16} />
                    </a>
                  )}
                  {member.email && member.email !== '#' && (
                    <a href={member.email} className="w-9 h-9 bg-dark-300 flex items-center justify-center text-white hover:bg-brand-red transition-colors">
                      <Mail size={16} />
                    </a>
                  )}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-white font-bold text-lg font-display group-hover:text-brand-red transition-colors duration-300">{member.name}</h3>
                <p className="text-brand-red text-sm font-semibold uppercase tracking-wider mt-1 mb-3">{member.position}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-red group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
