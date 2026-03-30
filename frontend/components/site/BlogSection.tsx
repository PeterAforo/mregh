'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { resolveImageUrl, formatDate } from '@/lib/imageUrl';

const FALLBACK_POSTS = [
  { title: 'The Future of Sustainable Construction in Ghana', excerpt: 'Exploring how green building practices are reshaping Ghana\'s construction landscape and driving economic growth.', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80', date: 'Mar 15, 2024', author: 'MRE Team', category: 'Sustainability', slug: 'sustainable-construction-ghana' },
  { title: '5 Architectural Trends Transforming Accra\'s Skyline', excerpt: 'From smart buildings to mixed-use developments, discover the architectural innovations changing Accra\'s urban fabric.', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80', date: 'Feb 28, 2024', author: 'MRE Team', category: 'Architecture', slug: 'architectural-trends-accra' },
  { title: 'Interior Design Tips for Tropical Homes in Ghana', excerpt: 'Expert advice on creating beautiful, functional interiors that work with Ghana\'s tropical climate and vibrant culture.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', date: 'Feb 10, 2024', author: 'MRE Team', category: 'Interior Design', slug: 'interior-design-tips-ghana' },
];

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function BlogSection() {
  const [posts, setPosts] = useState<typeof FALLBACK_POSTS>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/blog?published=true`)
      .then(r => r.ok ? r.json() : [])
      .then((data: any[]) => {
        if (data && data.length > 0) {
          const mapped = data.slice(0, 3).map(p => ({
            title: p.title,
            excerpt: p.excerpt || '',
            image: resolveImageUrl(p.coverImage, FALLBACK_POSTS[0].image),
            date: formatDate(p.publishedAt || p.createdAt),
            author: 'MRE Team',
            category: p.category || 'News',
            slug: p.slug,
          }));
          setPosts(mapped);
        } else {
          setPosts(FALLBACK_POSTS);
        }
      })
      .catch(() => { setPosts(FALLBACK_POSTS); })
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <section className="section-padding bg-dark-DEFAULT">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-brand-red" />
              <span className="text-brand-red text-sm font-semibold uppercase tracking-widest">Latest News</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black font-display text-white">
              Insights & <span className="text-gradient">Articles</span>
            </h2>
          </div>
          <Link href="/blog" className="btn-outline flex-shrink-0">View All Posts <ArrowRight size={16} /></Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-dark-100 border border-white/5 overflow-hidden flex flex-col">
                  <div className="h-52 bg-white/5" />
                  <div className="p-6 flex flex-col flex-1 space-y-3">
                    <div className="h-3 bg-white/5 w-2/3" />
                    <div className="h-5 bg-white/10 w-full" />
                    <div className="h-5 bg-white/10 w-4/5" />
                    <div className="space-y-2 pt-1">
                      <div className="h-3 bg-white/5 w-full" />
                      <div className="h-3 bg-white/5 w-11/12" />
                    </div>
                  </div>
                </div>
              ))
            : posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-dark-100 border border-white/5 hover:border-brand-red/30 transition-all duration-500 overflow-hidden flex flex-col">
              <div className="relative h-52 overflow-hidden">
                <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 left-4">
                  <span className="bg-brand-red text-white text-xs font-bold uppercase tracking-wider px-3 py-1">{post.category}</span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                  <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                </div>
                <h3 className="text-white font-bold text-lg font-display mb-3 group-hover:text-brand-red transition-colors duration-300 leading-snug">{post.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-1">{post.excerpt}</p>
                <div className="flex items-center gap-2 text-brand-red text-sm font-semibold mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  Read More <ArrowRight size={14} />
                </div>
              </div>
              <div className="h-0.5 w-0 bg-brand-red group-hover:w-full transition-all duration-500" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
