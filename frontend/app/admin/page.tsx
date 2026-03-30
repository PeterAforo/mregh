'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FolderOpen, Wrench, Users, BookOpen, Star, MessageSquare, TrendingUp, Eye, ArrowRight } from 'lucide-react';
import { getProjects, getServices, getTeam, getBlogPosts, getTestimonials, getContactMessages } from '@/lib/api';

interface Stats { projects: number; services: number; team: number; blog: number; testimonials: number; messages: number; }

const cards = [
  { label: 'Projects', key: 'projects', href: '/admin/projects', icon: FolderOpen, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { label: 'Services', key: 'services', href: '/admin/services', icon: Wrench, color: 'text-green-400', bg: 'bg-green-400/10' },
  { label: 'Team Members', key: 'team', href: '/admin/team', icon: Users, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { label: 'Blog Posts', key: 'blog', href: '/admin/blog', icon: BookOpen, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  { label: 'Testimonials', key: 'testimonials', href: '/admin/testimonials', icon: Star, color: 'text-orange-400', bg: 'bg-orange-400/10' },
  { label: 'Messages', key: 'messages', href: '/admin/messages', icon: MessageSquare, color: 'text-brand-red', bg: 'bg-brand-red/10' },
];

const quickLinks = [
  { label: 'Add New Project', href: '/admin/projects/new' },
  { label: 'Add Blog Post', href: '/admin/blog/new' },
  { label: 'Add Team Member', href: '/admin/team/new' },
  { label: 'Add Testimonial', href: '/admin/testimonials/new' },
  { label: 'Update Hero Slides', href: '/admin/hero' },
  { label: 'Manage Settings', href: '/admin/settings' },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ projects: 0, services: 0, team: 0, blog: 0, testimonials: 0, messages: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [p, s, t, b, te, m] = await Promise.all([
          getProjects(), getServices(), getTeam(), getBlogPosts(), getTestimonials(), getContactMessages(),
        ]);
        setStats({
          projects: p.length, services: s.length, team: t.length,
          blog: b.length, testimonials: te.length, messages: m.length,
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-black font-display text-white mb-1">Dashboard</h2>
        <p className="text-gray-500 text-sm">Welcome back. Here's an overview of your content.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.key} href={card.href}
              className="bg-dark-100 border border-white/5 p-6 hover:border-brand-red/30 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 ${card.bg} flex items-center justify-center`}>
                  <Icon size={20} className={card.color} />
                </div>
                <ArrowRight size={16} className="text-gray-600 group-hover:text-brand-red transition-colors" />
              </div>
              <div className="text-3xl font-black font-display text-white mb-1">
                {loading ? <span className="text-gray-600">—</span> : stats[card.key as keyof Stats]}
              </div>
              <div className="text-gray-500 text-sm">{card.label}</div>
            </Link>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Quick Links */}
        <div className="bg-dark-100 border border-white/5 p-6">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-brand-red" /> Quick Actions
          </h3>
          <div className="space-y-2">
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className="flex items-center justify-between py-2.5 px-4 bg-dark-200 hover:bg-brand-red/10 hover:border-brand-red/30 border border-transparent text-gray-400 hover:text-white text-sm transition-all duration-200">
                {link.label}
                <ArrowRight size={14} className="text-gray-600" />
              </Link>
            ))}
          </div>
        </div>

        {/* Website Links */}
        <div className="bg-dark-100 border border-white/5 p-6">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <Eye size={18} className="text-brand-red" /> View Website Pages
          </h3>
          <div className="space-y-2">
            {[
              { label: 'Homepage', href: '/' },
              { label: 'About Page', href: '/about' },
              { label: 'Services Page', href: '/services' },
              { label: 'Projects Page', href: '/projects' },
              { label: 'Blog Page', href: '/blog' },
              { label: 'Contact Page', href: '/contact' },
            ].map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-between py-2.5 px-4 bg-dark-200 hover:bg-dark-300 border border-transparent text-gray-400 hover:text-white text-sm transition-all duration-200">
                {link.label}
                <Eye size={14} className="text-gray-600" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
