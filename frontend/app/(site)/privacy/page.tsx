import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for MRE Construction — how we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-20 bg-dark-DEFAULT min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-brand-red" />
            <span className="text-brand-red text-sm font-semibold uppercase tracking-widest">Legal</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black font-display text-white mb-4">
            Privacy <span className="text-gradient">Policy</span>
          </h1>
          <p className="text-gray-400">Last updated: January 1, 2025</p>
        </div>

        <div className="prose prose-invert prose-red max-w-none space-y-8 text-gray-300 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Information We Collect</h2>
            <p>When you contact us through our website, we collect the following information:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-400 mt-2">
              <li>Your name and email address</li>
              <li>Phone number (if provided)</li>
              <li>Message content and subject</li>
              <li>Technical data such as IP address and browser type</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-400 mt-2">
              <li>Respond to your enquiries and service requests</li>
              <li>Send project updates and relevant communications</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Data Sharing</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share data with trusted service providers who assist us in operating our website, provided they agree to keep your information confidential.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Data Security</h2>
            <p>We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Cookies</h2>
            <p>Our website may use cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, though this may affect certain functionality of the site.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-400 mt-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction or deletion of your data</li>
              <li>Withdraw consent to data processing at any time</li>
              <li>Lodge a complaint with a data protection authority</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <div className="mt-3 p-4 bg-dark-100 border border-white/5 text-gray-400 space-y-1">
              <p><span className="text-white font-semibold">MRE Construction</span></p>
              <p>D75 Salamanda Close, Comm 18, Accra, Ghana</p>
              <p>Email: <a href="mailto:info@mregh.com" className="text-brand-red hover:underline">info@mregh.com</a></p>
              <p>Tel: +233 502 210 601</p>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <Link href="/" className="text-brand-red hover:underline text-sm">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
