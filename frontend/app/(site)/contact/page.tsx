'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { submitContact } from '@/lib/api';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await submitContact(form);
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-64 overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80" alt="Contact Us" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/60" />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red" />
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-12 bg-brand-red" />
              <span className="text-brand-red text-sm font-semibold uppercase tracking-widest">Contact Us</span>
            </div>
            <h1 className="text-5xl font-black font-display text-white">Get In Touch</h1>
          </div>
        </div>
      </section>

      <section className="section-padding bg-dark-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-brand-red" />
                <span className="text-brand-red text-sm font-semibold uppercase tracking-widest">Reach Us</span>
              </div>
              <h2 className="text-4xl font-black font-display text-white mb-6">
                Let's Start a <span className="text-gradient">Conversation</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-10">
                Whether you have a project in mind, need a quote, or simply want to learn more about our services — we'd love to hear from you. Our team is ready to assist.
              </p>

              <div className="space-y-6">
                {[
                  { Icon: MapPin, title: 'Our Office', info: 'D75 Salamanda Close, Comm 18, Accra, Ghana' },
                  { Icon: Phone, title: 'Tel / Mobile', info: 'Tel: +233 502 210 601 | Mob: +233 249 116 439' },
                  { Icon: Mail, title: 'Email', info: 'info@mregh.com' },
                  { Icon: Clock, title: 'Business Hours', info: 'Mon – Fri: 8AM–6PM | Sat: 9AM–2PM' },
                ].map(({ Icon, title, info }) => (
                  <div key={title} className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-brand-red/10 border border-brand-red/20 flex items-center justify-center flex-shrink-0">
                      <Icon size={20} className="text-brand-red" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">{title}</div>
                      <div className="text-gray-400 text-sm mt-0.5">{info}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="mt-10 h-60 bg-dark-200 border border-white/5 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={40} className="text-brand-red mx-auto mb-3" />
                    <p className="text-gray-400 text-sm">Accra, Ghana</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <div className="bg-dark-DEFAULT border border-white/5 p-8">
                <h3 className="text-2xl font-bold font-display text-white mb-6">Send Us a Message</h3>

                {success ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle2 size={64} className="text-green-500 mx-auto mb-4" />
                    <h4 className="text-white text-xl font-bold mb-2">Message Sent!</h4>
                    <p className="text-gray-400">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                    <button onClick={() => setSuccess(false)} className="mt-6 text-brand-red hover:text-red-400 text-sm font-semibold">Send another message</button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-gray-400 text-sm block mb-2">Full Name *</label>
                        <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                          className="w-full bg-dark-100 border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-red focus:outline-none transition-colors placeholder-gray-600"
                          placeholder="Your name" />
                      </div>
                      <div>
                        <label className="text-gray-400 text-sm block mb-2">Email *</label>
                        <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                          className="w-full bg-dark-100 border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-red focus:outline-none transition-colors placeholder-gray-600"
                          placeholder="your@email.com" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-gray-400 text-sm block mb-2">Phone</label>
                        <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                          className="w-full bg-dark-100 border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-red focus:outline-none transition-colors placeholder-gray-600"
                          placeholder="+233 ..." />
                      </div>
                      <div>
                        <label className="text-gray-400 text-sm block mb-2">Subject *</label>
                        <select required value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                          className="w-full bg-dark-100 border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-red focus:outline-none transition-colors">
                          <option value="">Select service</option>
                          <option>Architectural Design</option>
                          <option>Interior Decoration</option>
                          <option>Residential Construction</option>
                          <option>Commercial Construction</option>
                          <option>Civil Engineering</option>
                          <option>Building Renovation</option>
                          <option>Real Estate Consultancy</option>
                          <option>Project Management</option>
                          <option>Bespoke Furniture &amp; Joinery</option>
                          <option>Steel Structures &amp; Metal Fabrication</option>
                          <option>General Inquiry</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm block mb-2">Message *</label>
                      <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                        className="w-full bg-dark-100 border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-red focus:outline-none transition-colors resize-none placeholder-gray-600"
                        placeholder="Tell us about your project..." />
                    </div>
                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    <button type="submit" disabled={loading}
                      className="btn-primary w-full justify-center disabled:opacity-70 disabled:cursor-not-allowed">
                      {loading ? 'Sending...' : (<><Send size={16} /> Send Message</>)}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
