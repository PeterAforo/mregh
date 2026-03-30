import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for MRE Construction — the rules and guidelines governing use of our website and services.',
};

export default function TermsPage() {
  return (
    <div className="pt-28 pb-20 bg-dark-DEFAULT min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-brand-red" />
            <span className="text-brand-red text-sm font-semibold uppercase tracking-widest">Legal</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black font-display text-white mb-4">
            Terms of <span className="text-gradient">Service</span>
          </h1>
          <p className="text-gray-400">Last updated: January 1, 2025</p>
        </div>

        <div className="prose prose-invert prose-red max-w-none space-y-8 text-gray-300 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using the MRE Construction website (www.mregh.com), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Use of Website</h2>
            <p>You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others. You must not:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-400 mt-2">
              <li>Use the site in any way that violates applicable laws or regulations</li>
              <li>Transmit unsolicited or unauthorised advertising material</li>
              <li>Attempt to gain unauthorised access to any part of the website</li>
              <li>Reproduce or distribute any content without prior written permission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Intellectual Property</h2>
            <p>All content on this website — including text, images, logos, graphics, and design — is the property of MRE Construction and is protected by applicable copyright and intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written consent.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Service Enquiries</h2>
            <p>Information provided on this website is for general informational purposes only. Submitting an enquiry through our contact form does not constitute a binding contract. All project agreements are formalised through separate written contracts signed by both parties.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Disclaimer of Warranties</h2>
            <p>This website is provided "as is" without any representations or warranties, express or implied. MRE Construction makes no representations or warranties regarding the accuracy, completeness, or suitability of the information on this site.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, MRE Construction shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of this website or reliance on any information provided herein.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Third-Party Links</h2>
            <p>Our website may contain links to third-party websites. These links are provided for your convenience only. MRE Construction has no control over the content of those sites and accepts no responsibility for them or for any loss or damage that may arise from your use of them.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">8. Changes to Terms</h2>
            <p>MRE Construction reserves the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after any changes constitutes your acceptance of the new terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">9. Governing Law</h2>
            <p>These terms are governed by and construed in accordance with the laws of the Republic of Ghana. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Ghana.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">10. Contact Us</h2>
            <p>For any questions about these Terms of Service, please contact us:</p>
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
