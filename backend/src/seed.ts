import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  const hash = await bcrypt.hash('Admin@MRE2024', 10);
  await prisma.user.upsert({
    where: { email: 'admin@mrerealestate.com' },
    update: {},
    create: { email: 'admin@mrerealestate.com', password: hash, name: 'MRE Admin', role: 'admin' },
  });
  console.log('✅ Admin user created: admin@mrerealestate.com / Admin@MRE2024');

  const services = [
    { title: 'Architectural Design', slug: 'architectural-design', description: 'Innovative and functional architectural designs tailored to your vision. From conceptual drawings to detailed blueprints, we bring structures to life.', icon: 'drafting-compass', order: 1 },
    { title: 'Interior Decoration', slug: 'interior-decoration', description: 'Transform your spaces with our expert interior design services. We create beautiful, functional interiors that reflect your personality and style.', icon: 'sofa', order: 2 },
    { title: 'Residential Construction', slug: 'residential-construction', description: 'Building dream homes for Ghanaian families. From single-family homes to luxury estates, we deliver quality construction on time.', icon: 'home', order: 3 },
    { title: 'Commercial Construction', slug: 'commercial-construction', description: 'Expert construction of commercial buildings including offices, shopping centers, hotels, and industrial facilities across Ghana.', icon: 'building-2', order: 4 },
    { title: 'Civil Engineering', slug: 'civil-engineering', description: 'Comprehensive civil engineering solutions including roads, bridges, drainage systems, and infrastructure development projects.', icon: 'hard-hat', order: 5 },
    { title: 'Building Renovation', slug: 'building-renovation', description: 'Revitalizing existing structures with modern upgrades. We specialize in renovation, retrofitting, and restoring buildings to their former glory.', icon: 'hammer', order: 6 },
    { title: 'Real Estate Consultancy', slug: 'real-estate-consultancy', description: 'Professional real estate consulting and advisory services to help you make informed property investment decisions in Ghana.', icon: 'landmark', order: 7 },
    { title: 'Project Management', slug: 'project-management', description: 'End-to-end project management ensuring your construction project is delivered on time, within budget, and to the highest standards.', icon: 'clipboard-list', order: 8 },
  ];

  for (const service of services) {
    await prisma.service.upsert({ where: { slug: service.slug }, update: {}, create: service });
  }
  console.log('✅ Services seeded');

  const heroSlides = [
    { title: 'Building Ghana\'s Future', subtitle: 'Excellence in Construction & Real Estate', description: 'MRE Real Estate & Construction delivers world-class architectural, construction, and engineering solutions across Ghana.', ctaText: 'Explore Our Work', ctaLink: '/projects', order: 1, published: true },
    { title: 'Transforming Spaces', subtitle: 'Interior Design & Architecture', description: 'From concept to completion, we design and build spaces that inspire and endure. Your vision, our expertise.', ctaText: 'Our Services', ctaLink: '/services', order: 2, published: true },
    { title: 'Your Dream, Our Blueprint', subtitle: 'Residential & Commercial Construction', description: 'Trusted by hundreds of clients across Ghana for quality construction, on-time delivery, and exceptional craftsmanship.', ctaText: 'Get Started', ctaLink: '/contact', order: 3, published: true },
  ];

  for (const slide of heroSlides) {
    await prisma.heroSlide.create({ data: slide }).catch(() => {});
  }
  console.log('✅ Hero slides seeded');

  const testimonials = [
    { name: 'Kwame Asante', position: 'CEO', company: 'Asante Group Ltd', content: 'MRE Construction delivered our office complex ahead of schedule and beyond our expectations. The quality of workmanship is exceptional. Highly recommended!', rating: 5, order: 1 },
    { name: 'Abena Mensah', position: 'Property Developer', company: 'Mensah Properties', content: 'Working with MRE was a pleasure from start to finish. Their architectural team understood our vision perfectly and the interior decoration was stunning.', rating: 5, order: 2 },
    { name: 'Kojo Boateng', position: 'Director', company: 'Boateng Construction Co.', content: 'Their civil engineering expertise is top-notch. The infrastructure project was completed efficiently and the quality is outstanding.', rating: 5, order: 3 },
    { name: 'Efua Darko', position: 'Homeowner', company: 'Accra', content: 'My dream home was built by MRE and it exceeded all my expectations. The team was professional, communicative, and delivered a beautiful home.', rating: 5, order: 4 },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t }).catch(() => {});
  }
  console.log('✅ Testimonials seeded');

  const settings = [
    { key: 'company_name', value: 'MRE Real Estate & Construction', group: 'general' },
    { key: 'company_tagline', value: 'Building Ghana\'s Future', group: 'general' },
    { key: 'company_email', value: 'info@mrerealestate.com', group: 'contact' },
    { key: 'company_phone', value: '+233 24 000 0000', group: 'contact' },
    { key: 'company_address', value: 'Accra, Greater Accra Region, Ghana', group: 'contact' },
    { key: 'company_facebook', value: 'https://facebook.com/mrerealestate', group: 'social' },
    { key: 'company_instagram', value: 'https://instagram.com/mrerealestate', group: 'social' },
    { key: 'company_linkedin', value: 'https://linkedin.com/company/mrerealestate', group: 'social' },
    { key: 'company_twitter', value: 'https://twitter.com/mrerealestate', group: 'social' },
    { key: 'stats_projects', value: '150+', group: 'stats' },
    { key: 'stats_years', value: '15+', group: 'stats' },
    { key: 'stats_clients', value: '500+', group: 'stats' },
    { key: 'stats_team', value: '50+', group: 'stats' },
  ];

  for (const s of settings) {
    await prisma.setting.upsert({ where: { key: s.key }, update: { value: s.value }, create: s });
  }
  console.log('✅ Settings seeded');

  const team = [
    { name: 'Kofi McAforo', position: 'Founder & CEO', bio: 'A visionary leader with over 20 years of experience in real estate and construction across West Africa.', order: 1 },
    { name: 'Ama Owusu', position: 'Chief Architect', bio: 'Award-winning architect specializing in sustainable and culturally-inspired design for modern Ghana.', order: 2 },
    { name: 'Kweku Mensah', position: 'Head of Civil Engineering', bio: 'Expert civil engineer with extensive experience in infrastructure development and construction management.', order: 3 },
    { name: 'Akosua Boateng', position: 'Interior Design Director', bio: 'Creative interior designer who blends African aesthetics with contemporary design to create stunning spaces.', order: 4 },
  ];

  for (const m of team) {
    await prisma.teamMember.create({ data: m }).catch(() => {});
  }
  console.log('✅ Team seeded');

  console.log('🎉 Database seeded successfully!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
