import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://mregh-frontend.vercel.app'),
  title: {
    default: "MRE Construction | Building Creative Communities",
    template: '%s | MRE Construction',
  },
  description: "MRE Construction — Ghana's premier construction and real estate company. Expert architectural design, interior decoration, residential & commercial construction, civil engineering, and project management.",
  keywords: ['MRE', 'construction Ghana', 'architectural design Accra', 'interior decoration Ghana', 'civil engineering Ghana', 'building construction Ghana'],
  authors: [{ name: 'MRE Construction' }],
  creator: 'MRE Construction',
  openGraph: {
    type: 'website',
    locale: 'en_GH',
    url: 'https://mreconstruction.com',
    siteName: 'MRE Construction',
    title: "MRE Construction | Building Creative Communities",
    description: "Ghana's premier construction company delivering world-class architectural, construction, and engineering solutions.",
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'MRE Construction' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MRE Construction',
    description: "Building Creative Communities — Premier construction company in Ghana.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <body className={inter.className}>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('mre_theme');if(t==='light'){document.documentElement.classList.remove('dark');}else{document.documentElement.classList.add('dark');}}catch(e){document.documentElement.classList.add('dark');}})();`,
          }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
