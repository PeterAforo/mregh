'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

const categories = ['All', 'Architecture', 'Interior Design', 'Construction', 'Civil Engineering', 'Real Estate', 'Sustainability', 'News'];

interface Post {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
  slug: string;
  readTime: string;
}

export default function BlogPostsGrid({ posts }: { posts: Post[] }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? posts
    : posts.filter(p => p.category === activeCategory);

  const rest = filtered.length > 1 ? filtered.slice(1) : filtered;

  return (
    <>
      <div className="flex flex-wrap gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 text-sm font-semibold uppercase tracking-wider border transition-all duration-300 ${
              activeCategory === cat
                ? 'bg-brand-red border-brand-red text-white'
                : 'border-white/10 text-gray-400 hover:border-brand-red hover:text-brand-red'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {rest.length === 0 ? (
        <div className="text-center py-16 text-gray-500">No posts found in this category.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-dark-100 border border-white/5 hover:border-brand-red/30 transition-all duration-500 overflow-hidden flex flex-col"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-brand-red text-white text-xs font-bold uppercase tracking-wider px-3 py-1">{post.category}</span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1.5"><Calendar size={12} className="text-brand-red" />{post.date}</span>
                  <span className="flex items-center gap-1.5"><Tag size={12} className="text-brand-red" />{post.readTime}</span>
                </div>
                <h3 className="text-white font-bold text-lg font-display mb-3 group-hover:text-brand-red transition-colors leading-snug flex-shrink-0">{post.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-1">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/5">
                  <span className="text-gray-500 text-xs flex items-center gap-1.5"><User size={12} />{post.author}</span>
                  <span className="text-brand-red text-xs font-semibold flex items-center gap-1">Read More <ArrowRight size={12} /></span>
                </div>
              </div>
              <div className="h-0.5 w-0 bg-brand-red group-hover:w-full transition-all duration-500" />
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
