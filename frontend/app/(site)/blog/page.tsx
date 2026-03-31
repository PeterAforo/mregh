import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { resolveImageUrl, formatDate } from '@/lib/imageUrl';
import BlogPostsGrid from '@/components/site/BlogPostsGrid';

export const metadata: Metadata = {
  title: 'Blog & News',
  description: 'Read the latest insights, news, and articles from MRE Construction on architecture, construction trends, interior design, and Ghana real estate.',
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

async function getBlogPosts() {
  try {
    const res = await fetch(`${API_BASE}/blog?published=true`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data || !data.length) return null;
    return data.map((p: any) => ({
      title: p.title,
      excerpt: p.excerpt || '',
      image: resolveImageUrl(p.coverImage, 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80'),
      date: formatDate(p.publishedAt || p.createdAt),
      author: 'MRE Team',
      category: p.category || 'News',
      slug: p.slug,
      readTime: '5 min read',
    }));
  } catch { return null; }
}

const STATIC_POSTS = [
  { title: 'The Future of Sustainable Construction in Ghana', excerpt: 'Exploring how green building practices are reshaping Ghana\'s construction landscape and driving economic growth while protecting the environment.', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80', date: 'March 15, 2024', author: 'Ama Owusu', category: 'Sustainability', slug: 'sustainable-construction-ghana', readTime: '5 min read' },
  { title: '5 Architectural Trends Transforming Accra\'s Skyline', excerpt: 'From smart buildings to mixed-use developments, discover the key architectural innovations changing Accra\'s urban fabric and setting new standards.', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80', date: 'February 28, 2024', author: 'Kofi McAforo', category: 'Architecture', slug: 'architectural-trends-accra', readTime: '7 min read' },
  { title: 'Interior Design Tips for Tropical Homes in Ghana', excerpt: 'Expert advice on creating beautiful, functional interiors that work with Ghana\'s tropical climate and embrace the country\'s rich cultural heritage.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', date: 'February 10, 2024', author: 'Akosua Boateng', category: 'Interior Design', slug: 'interior-design-tips-ghana', readTime: '6 min read' },
  { title: 'Understanding Ghana\'s Real Estate Market in 2024', excerpt: 'A comprehensive analysis of Ghana\'s property market, investment opportunities, and what to expect in the coming year for buyers and investors.', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', date: 'January 22, 2024', author: 'Kweku Mensah', category: 'Real Estate', slug: 'ghana-real-estate-market-2024', readTime: '8 min read' },
  { title: 'How to Choose the Right Construction Company in Ghana', excerpt: 'Key factors to consider when selecting a construction partner — from certifications and portfolio to communication and project management processes.', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80', date: 'January 8, 2024', author: 'Kofi McAforo', category: 'Construction', slug: 'choosing-construction-company-ghana', readTime: '5 min read' },
  { title: 'Modern Civil Engineering Solutions for Ghana\'s Infrastructure', excerpt: 'An overview of innovative civil engineering approaches being deployed across Ghana\'s road, bridge, and water infrastructure projects.', image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80', date: 'December 18, 2023', author: 'Kweku Mensah', category: 'Civil Engineering', slug: 'civil-engineering-ghana-infrastructure', readTime: '6 min read' },
];

const categories = ['All', 'Architecture', 'Interior Design', 'Construction', 'Civil Engineering', 'Real Estate', 'Sustainability'];

export default async function BlogPage() {
  const apiPosts = await getBlogPosts();
  const posts = apiPosts || STATIC_POSTS;
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-72 overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80" alt="Blog" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/60" />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red" />
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-brand-red" />
              <span className="text-brand-red text-sm font-semibold uppercase tracking-widest">Latest News</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black font-display text-white">Blog & Insights</h1>
            <p className="text-gray-300 mt-4 text-lg">Expert knowledge from Ghana's construction leaders.</p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="bg-dark-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href={posts.length > 0 ? `/blog/${posts[0].slug}` : '/blog'} className="group grid lg:grid-cols-2 gap-0 overflow-hidden border border-white/5 hover:border-brand-red/30 transition-all duration-500">
            <div className="relative h-72 lg:h-96 overflow-hidden">
              {posts.length > 0 && <Image src={posts[0].image} alt={posts[0].title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-dark-100/80 hidden lg:block" />
              <div className="absolute top-6 left-6">
                <span className="bg-brand-red text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5">Featured</span>
              </div>
            </div>
            <div className="bg-dark-200 p-10 flex flex-col justify-center">
              {posts.length > 0 && <><span className="text-brand-red text-xs font-bold uppercase tracking-wider mb-4">{posts[0].category}</span>
              <h2 className="text-3xl font-black font-display text-white mb-4 group-hover:text-brand-red transition-colors leading-tight">{posts[0].title}</h2>
              <p className="text-gray-400 leading-relaxed mb-6">{posts[0].excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <span className="flex items-center gap-2"><User size={14} className="text-brand-red" />{posts[0].author}</span>
                <span className="flex items-center gap-2"><Calendar size={14} className="text-brand-red" />{posts[0].date}</span>
              </div></>}
              <div className="flex items-center gap-2 text-brand-red font-semibold text-sm">Read Article <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></div>
            </div>
          </Link>
        </div>
      </section>

      {/* All Posts */}
      <section className="section-padding bg-dark-DEFAULT">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories */}
          <BlogPostsGrid posts={posts} />
        </div>
      </section>
    </div>
  );
}
