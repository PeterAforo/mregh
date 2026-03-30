'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Globe, Facebook, Instagram, Linkedin, Twitter, ArrowRight } from 'lucide-react';

const services = [
  { label: 'Architectural Design', href: '/services/architectural-design' },
  { label: 'Interior Decoration', href: '/services/interior-decoration' },
  { label: 'Residential Construction', href: '/services/residential-construction' },
  { label: 'Commercial Construction', href: '/services/commercial-construction' },
  { label: 'Civil Engineering', href: '/services/civil-engineering' },
  { label: 'Building Renovation', href: '/services/building-renovation' },
  { label: 'Bespoke Furniture & Joinery', href: '/services/bespoke-furniture-joinery' },
  { label: 'Steel Structures & Metal Fabrication', href: '/services/steel-structures-metal-fabrication' },
];

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Our Projects', href: '/projects' },
  { label: 'Meet the Team', href: '/about#team' },
  { label: 'Blog & News', href: '/blog' },
  { label: 'Careers', href: '/contact' },
  { label: 'Contact Us', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-dark-100 border-t border-white/5">
      {/* CTA Banner */}
      <div className="bg-brand-red py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-display">Ready to Start Your Project?</h2>
            <p className="text-red-100 mt-2 text-lg">Let's build something extraordinary together.</p>
          </div>
          <Link
            href="/contact"
            className="flex-shrink-0 bg-white text-brand-red px-10 py-4 font-bold uppercase tracking-wider hover:bg-gray-100 transition-all duration-300 flex items-center gap-2"
          >
            Get Free Consultation <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-6">
              <div className="relative w-28 h-28">
                <Image src="/logo/logo.png" alt="MRE Logo" fill sizes="112px" className="object-contain" />
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Ghana's premier construction company, delivering excellence in architectural design, construction, and engineering across West Africa since 2009.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Facebook, href: 'https://facebook.com' },
                { Icon: Instagram, href: 'https://instagram.com' },
                { Icon: Linkedin, href: 'https://linkedin.com' },
                { Icon: Twitter, href: 'https://twitter.com' },
              ].map(({ Icon, href }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 bg-dark-300 hover:bg-brand-red border border-white/10 hover:border-brand-red flex items-center justify-center transition-all duration-300"
                >
                  <Icon size={16} className="text-gray-400 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6 pl-3 border-l-2 border-brand-red">Our Services</h3>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-gray-400 hover:text-brand-red text-sm flex items-center gap-2 transition-colors duration-200 group">
                    <ArrowRight size={12} className="text-brand-red opacity-0 group-hover:opacity-100 transition-opacity" />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6 pl-3 border-l-2 border-brand-red">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-gray-400 hover:text-brand-red text-sm flex items-center gap-2 transition-colors duration-200 group">
                    <ArrowRight size={12} className="text-brand-red opacity-0 group-hover:opacity-100 transition-opacity" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6 pl-3 border-l-2 border-brand-red">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={18} className="text-brand-red flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">D75 Salamanda Close, Comm 18, Accra, Ghana</span>
              </li>
              <li>
                <a href="tel:+233502210601" className="flex gap-3 text-gray-400 hover:text-brand-red text-sm transition-colors">
                  <Phone size={18} className="text-brand-red flex-shrink-0" />
                  Tel: +233 502 210 601
                </a>
              </li>
              <li>
                <a href="tel:+233249116439" className="flex gap-3 text-gray-400 hover:text-brand-red text-sm transition-colors">
                  <Phone size={18} className="text-brand-red flex-shrink-0" />
                  Mob: +233 249 116 439
                </a>
              </li>
              <li>
                <a href="mailto:info@mregh.com" className="flex gap-3 text-gray-400 hover:text-brand-red text-sm transition-colors break-all">
                  <Mail size={18} className="text-brand-red flex-shrink-0" />
                  info@mregh.com
                </a>
              </li>
              <li>
                <a href="https://www.mregh.com" target="_blank" rel="noopener noreferrer" className="flex gap-3 text-gray-400 hover:text-brand-red text-sm transition-colors">
                  <Globe size={18} className="text-brand-red flex-shrink-0" />
                  www.mregh.com
                </a>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-dark-200 border border-white/5">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Business Hours</p>
              <p className="text-sm text-gray-300">Mon – Fri: 8:00 AM – 6:00 PM</p>
              <p className="text-sm text-gray-300">Sat: 9:00 AM – 2:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} MRE Construction. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-gray-500 hover:text-brand-red text-xs transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-500 hover:text-brand-red text-xs transition-colors">Terms of Service</Link>
            <Link href="/admin" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
