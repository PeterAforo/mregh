import Hero from '@/components/site/Hero';
import ServicesSection from '@/components/site/ServicesSection';
import AboutSection from '@/components/site/AboutSection';
import ProjectsSection from '@/components/site/ProjectsSection';
import TestimonialsSection from '@/components/site/TestimonialsSection';
import TeamSection from '@/components/site/TeamSection';
import BlogSection from '@/components/site/BlogSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "MRE Constructions Ghana | Building Creative Communities",
  description: "MRE Constructions is a Ghanaian company delivering architectural, civil and structural engineering, interior decor, property management, and residential/commercial construction solutions.",
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
