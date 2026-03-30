import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Calendar, User, Clock, ArrowLeft, Tag } from 'lucide-react';

const posts: Record<string, any> = {
  'sustainable-construction-ghana': {
    title: 'The Future of Sustainable Construction in Ghana',
    excerpt: 'Exploring how green building practices are reshaping Ghana\'s construction landscape.',
    content: `Ghana's construction industry is undergoing a remarkable transformation as sustainable building practices gain momentum across the country. From solar-powered housing developments in Accra to green-certified commercial towers in Kumasi, the shift toward eco-friendly construction is both an economic opportunity and an environmental imperative.

**The Green Building Movement in Ghana**

Over the past decade, Ghana has seen a 40% increase in construction projects incorporating sustainable elements — from passive cooling designs to rainwater harvesting systems. This growth is driven by rising energy costs, government incentives, and increasing demand from environmentally-conscious investors.

**Key Sustainable Practices We're Adopting**

At MRE Construction, we've integrated several green building principles into our workflow:

1. **Passive Design** — Orienting buildings to maximize natural ventilation and minimize solar heat gain, reducing air conditioning loads by up to 35%.
2. **Local Materials** — Sourcing laterite stone, bamboo, and timber locally reduces transportation emissions and supports Ghanaian suppliers.
3. **Solar Integration** — All our new residential projects include provisions for solar panel installation, with 60% opting for full solar systems.
4. **Water Management** — Rainwater harvesting and grey-water recycling systems are now standard in our luxury villa projects.

**The Economic Case**

Sustainable buildings command 15-20% higher resale values in Ghana's property market and achieve 30% lower operational costs over their lifetime. For developers and homeowners alike, green construction is increasingly the financially sound choice.

**Looking Ahead**

As Ghana works toward its carbon neutrality goals and international climate commitments, sustainable construction will move from niche to norm. MRE is proud to be at the forefront of this movement, building a greener Ghana one structure at a time.`,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80',
    date: 'March 15, 2024',
    author: 'Ama Owusu',
    category: 'Sustainability',
    readTime: '5 min read',
  },
  'architectural-trends-accra': {
    title: '5 Architectural Trends Transforming Accra\'s Skyline',
    excerpt: 'From smart buildings to mixed-use developments, discover the key architectural innovations changing Accra.',
    content: `Accra's skyline is evolving rapidly. The city that was once defined by colonial-era bungalows and mid-century apartment blocks is now home to bold, contemporary structures that rival any African metropolis. Here are five architectural trends reshaping the capital.

**1. Mixed-Use Vertical Developments**

The traditional separation of residential, commercial, and retail spaces is giving way to integrated vertical communities. Projects like the Airport City developments combine offices, apartments, retail, and hospitality under one roof — reducing commute times and creating vibrant urban hubs.

**2. Biophilic Design**

Incorporating natural elements — green walls, internal courtyards, water features — into urban buildings has gained huge popularity. Biophilic design improves occupant wellbeing and connects the built environment with Ghana's lush natural landscape.

**3. Smart Building Technology**

Intelligent building management systems, automated lighting, and IoT-enabled security are becoming standard in Accra's premium commercial properties. These technologies reduce operational costs and improve the tenant experience.

**4. Afro-Contemporary Architecture**

There's a growing pride in blending traditional Ghanaian architectural motifs — kente-inspired facades, courtyard layouts, deep overhangs — with contemporary design language. This style creates buildings that are distinctly African yet globally competitive.

**5. Adaptive Reuse**

Rather than demolishing older structures, developers are increasingly repurposing colonial-era buildings into boutique hotels, creative offices, and cultural spaces. This approach preserves Accra's heritage while meeting modern demands.`,
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80',
    date: 'February 28, 2024',
    author: 'Kofi McAforo',
    category: 'Architecture',
    readTime: '7 min read',
  },
  'interior-design-tips-ghana': {
    title: 'Interior Design Tips for Tropical Homes in Ghana',
    excerpt: 'Expert advice on creating beautiful, functional interiors that work with Ghana\'s tropical climate.',
    content: `Designing a home in Ghana presents unique opportunities and challenges. The tropical climate — with its heat, humidity, and abundant natural light — demands thoughtful design decisions that balance aesthetics with practicality. Here are our top interior design tips for Ghanaian homes.

**Embrace Natural Light — Strategically**

Ghana enjoys 6-8 hours of bright sunshine daily. Rather than fighting it with heavy curtains, use it wisely. Position living areas to capture morning light, install shading devices on west-facing windows, and use light-diffusing sheer fabrics to soften harsh midday sun.

**Choose Heat-Appropriate Materials**

Natural materials like terracotta tiles, bamboo furniture, and linen fabrics are not just beautiful — they're functional. They stay cooler to the touch and regulate humidity better than synthetic alternatives.

**Celebrate Local Craftsmanship**

Ghana has a wealth of skilled artisans producing stunning kente textiles, brass work, and carved furniture. Incorporating these pieces into your interior creates a space that is authentically Ghanaian and truly unique.

**Optimize Airflow**

Open floor plans, high ceilings, and strategic window placement can create natural cross-ventilation that dramatically reduces the need for air conditioning. This is particularly effective in courtyard-style homes.

**Bold Colour with Purpose**

Ghana's vibrant culture invites bold colour choices. Deep terracotta, warm ochre, and rich emerald green can all work beautifully against neutral walls. Use colour in textiles and accessories for flexibility.`,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    date: 'February 10, 2024',
    author: 'Akosua Boateng',
    category: 'Interior Design',
    readTime: '6 min read',
  },
};

const fallbackPost = {
  title: 'Article Not Found',
  excerpt: '',
  content: 'This article is coming soon.',
  image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80',
  date: '',
  author: 'MRE Team',
  category: 'General',
  readTime: '1 min read',
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
const UPLOADS_BASE = API_BASE.replace('/api', '');

async function fetchApiPost(slug: string) {
  try {
    const res = await fetch(`${API_BASE}/blog/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const d = await res.json();
    const resolveImg = (src: string | null) => !src ? fallbackPost.image : src.startsWith('http') ? src : `${UPLOADS_BASE}/${src}`;
    return {
      title: d.title,
      excerpt: d.excerpt || '',
      content: d.content || '',
      image: resolveImg(d.coverImage),
      date: d.publishedAt ? new Date(d.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '',
      author: 'MRE Team',
      category: d.category || 'News',
      readTime: `${Math.max(1, Math.ceil((d.content || '').split(' ').length / 200))} min read`,
    };
  } catch { return null; }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const api = await fetchApiPost(slug);
  const post = api || posts[slug] || fallbackPost;
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const api = await fetchApiPost(slug);
  const post = api || posts[slug] || fallbackPost;

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-72 sm:h-96 overflow-hidden">
        <Image src={post.image} alt={post.title} fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <span className="inline-block bg-brand-red text-white text-xs font-bold uppercase tracking-wider px-3 py-1 mb-4">{post.category}</span>
            <h1 className="text-3xl sm:text-5xl font-black font-display text-white leading-tight">{post.title}</h1>
          </div>
        </div>
      </section>

      {/* Meta */}
      <div className="bg-dark-200 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center gap-6 text-sm text-gray-400">
          <span className="flex items-center gap-2"><User size={14} className="text-brand-red" />{post.author}</span>
          {post.date && <span className="flex items-center gap-2"><Calendar size={14} className="text-brand-red" />{post.date}</span>}
          <span className="flex items-center gap-2"><Clock size={14} className="text-brand-red" />{post.readTime}</span>
          <span className="flex items-center gap-2"><Tag size={14} className="text-brand-red" />{post.category}</span>
        </div>
      </div>

      {/* Content */}
      <section className="section-padding bg-dark-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-300 text-xl leading-relaxed mb-10 border-l-4 border-brand-red pl-6 italic">{post.excerpt}</p>
          <div className="prose prose-invert prose-lg max-w-none">
            {post.content.split('\n\n').map((para: string, i: number) => {
              if (para.startsWith('**') && para.endsWith('**') && !para.slice(2).includes('**')) {
                return <h2 key={i} className="text-2xl font-black font-display text-white mt-10 mb-4">{para.replace(/\*\*/g, '')}</h2>;
              }
              if (para.startsWith('**')) {
                return <p key={i} className="text-gray-300 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />;
              }
              if (para.match(/^\d\./)) {
                const lines = para.split('\n');
                return <ol key={i} className="list-decimal list-inside space-y-3 mb-6 text-gray-300">{lines.map((l, j) => <li key={j} dangerouslySetInnerHTML={{ __html: l.replace(/^\d+\.\s/, '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />)}</ol>;
              }
              return <p key={i} className="text-gray-300 leading-relaxed mb-6">{para}</p>;
            })}
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between">
            <Link href="/blog" className="flex items-center gap-2 text-brand-red hover:text-red-400 font-semibold transition-colors">
              <ArrowLeft size={18} /> Back to Blog
            </Link>
            <Link href="/contact" className="btn-primary">Get In Touch</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
