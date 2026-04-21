import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import AIChangeBot from '@/components/site/AIChangeBot';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <AIChangeBot />
    </>
  );
}
