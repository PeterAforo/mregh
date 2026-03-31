import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, Home } from 'lucide-react';

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark-DEFAULT flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="text-brand-red font-black font-display text-[120px] leading-none mb-4">404</div>
        <div className="w-16 h-1 bg-brand-red mx-auto mb-8" />
        <h1 className="text-3xl font-black font-display text-white mb-4">Page Not Found</h1>
        <p className="text-gray-400 mb-10">
          The page you are looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-brand-red text-white px-8 py-3 font-bold uppercase tracking-wider hover:bg-red-700 transition-colors"
          >
            <Home size={18} /> Back to Home
          </Link>
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 border border-white/20 text-gray-300 px-8 py-3 font-bold uppercase tracking-wider hover:border-brand-red hover:text-white transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
