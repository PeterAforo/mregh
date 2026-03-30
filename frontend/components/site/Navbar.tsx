'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Phone, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { gsap } from 'gsap';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Services', href: '/services',
    children: [
      { label: 'Architectural Design', href: '/services/architectural-design' },
      { label: 'Interior Decoration', href: '/services/interior-decoration' },
      { label: 'Residential Construction', href: '/services/residential-construction' },
      { label: 'Commercial Construction', href: '/services/commercial-construction' },
      { label: 'Civil Engineering', href: '/services/civil-engineering' },
      { label: 'Building Renovation', href: '/services/building-renovation' },
    ],
  },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
      );
    }
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-dark-100/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-28">
            {/* Logo */}
            <Link href="/" className="flex items-center py-2 group">
              <div className="relative w-24 h-24 flex-shrink-0">
                <Image src="/logo/logo.png" alt="MRE Logo" fill sizes="96px" className="object-contain" />
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div key={link.label} className="relative group"
                  onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 uppercase tracking-wide"
                  >
                    {link.label}
                    {link.children && <ChevronDown size={14} className="transition-transform duration-200 group-hover:rotate-180" />}
                  </Link>
                  {/* Dropdown */}
                  {link.children && (
                    <AnimatePresence>
                      {activeDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 w-64 bg-dark-100 border border-white/10 shadow-2xl py-2"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-5 py-3 text-sm text-gray-400 hover:text-white hover:bg-brand-red/10 hover:pl-7 transition-all duration-200 border-l-2 border-transparent hover:border-brand-red"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            {/* CTA + Mobile */}
            <div className="flex items-center gap-4">
              <a href="tel:+233502210601" className="hidden lg:flex items-center gap-2 text-brand-red hover:text-red-400 transition-colors text-sm font-medium">
                <Phone size={16} />
                <span>+233 502 210 601</span>
              </a>
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="w-9 h-9 flex items-center justify-center border border-white/10 text-gray-400 hover:text-brand-red hover:border-brand-red/40 transition-all duration-300"
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <Link href="/contact" className="hidden lg:block bg-brand-red text-white px-6 py-2.5 text-sm font-semibold uppercase tracking-wider hover:bg-brand-red-dark transition-all duration-300">
                Get Quote
              </Link>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-white p-2">
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-dark-100 pt-20 overflow-y-auto"
          >
            <div className="px-6 py-8 space-y-2">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-4 text-xl font-bold text-white border-b border-white/10 hover:text-brand-red transition-colors uppercase tracking-wide"
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="pl-4 mt-2 space-y-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-2 text-sm text-gray-400 hover:text-brand-red transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-8">
                <Link href="/contact" onClick={() => setMobileOpen(false)} className="btn-primary w-full justify-center">
                  Get a Free Quote
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
