import Hero from '@/components/site/Hero';
import ServicesSection from '@/components/site/ServicesSection';
import AboutSection from '@/components/site/AboutSection';
import ProjectsSection from '@/components/site/ProjectsSection';
import TestimonialsSection from '@/components/site/TestimonialsSection';
import TeamSection from '@/components/site/TeamSection';
import BlogSection from '@/components/site/BlogSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "MRE Construction | Building Creative Communities",
  description: "Ghana's premier construction company delivering world-class architectural design, interior decoration, residential & commercial construction, civil engineering and project management.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <AboutSection />
      <ProjectsSection />
      <TestimonialsSection />
      <TeamSection />
      <BlogSection />
    </>
  );
}
