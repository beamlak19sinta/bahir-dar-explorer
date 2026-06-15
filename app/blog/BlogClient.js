'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FiSearch, FiClock, FiHeart, FiBookmark, FiShare2, FiArrowRight, FiTag,
} from 'react-icons/fi';
import { blogPosts } from '@/lib/data';
import SectionHeader from '@/components/SectionHeader';

const allCategories = ['All', ...new Set(blogPosts.map(p => p.category))];

function useLocalStorage(key, initial) {
  const [value, setValue] = useState(initial);
  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored) setValue(JSON.parse(stored));
    } catch {}
  }, [key]);
  const set = (v) => {
    setValue(v);
    try { localStorage.setItem(key, JSON.stringify(v)); } catch {}
  };
  return [value, set];
}

export default function BlogClient() {
  const [search, setSearch]       = useState('');
  const [category, setCategory]   = useState('All');
  const [likes, setLikes]         = useLocalStorage('bde-likes', {});
  const [bookmarks, setBookmarks] = useLocalStorage('bde-bookmarks', []);

  const toggleLike = (id) => {
    setLikes({ ...likes, [id]: !likes[id] });
  };
  const toggleBookmark = (id) => {
    setBookmarks(bookmarks.includes(id) ? bookmarks.filter(b => b !== id) : [...bookmarks, id]);
  };

  const filtered = blogPosts.filter(p => {
    const matchCat  = category === 'All' || p.category === category;
    const matchText = p.title.toLowerCase().includes(search.toLowerCase()) ||
                      p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchText;
  });

  const featured = blogPosts[0];

  return (
    <>
      {/* Hero */}
      <section className="relative h-72 flex items-end overflow-hidden">
        <Image
          src="/images/lake-tana-hero.jpg"
          alt="Blog"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">Stories & Guides</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mt-2">Travel Blog</h1>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Featured Post */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="relative h-[440px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-teal-500 text-white text-xs font-bold rounded-full">{featured.category}</span>
                    <span className="text-white/70 text-sm flex items-center gap-1"><FiClock size={12} /> {featured.readTime}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-teal-300 transition-colors">{featured.title}</h2>
                  <p className="text-slate-300 line-clamp-2 mb-4 max-w-2xl">{featured.excerpt}</p>
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden">
                      <Image src={featured.authorAvatar} alt={featured.author} fill className="object-cover" sizes="32px" />
                    </div>
                    <span className="text-white/80 text-sm font-medium">{featured.author}</span>
                    <span className="text-white/40 text-sm">{new Date(featured.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                  ✦ Featured Article
                </div>
              </div>
            </Link>
          </motion.div>

          <SectionHeader
            badge="All Articles"
            title="More Stories &"
            highlight="Guides"
            description="Practical guides, cultural insights, and inspiring stories from Bahir Dar."
          />

          {/* Search + Categories */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search articles…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 text-sm"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {allCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    category === cat
                      ? 'bg-teal-500 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-teal-50 hover:text-teal-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Posts grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 card-hover border border-slate-100 dark:border-slate-700 flex flex-col"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 bg-teal-500 text-white text-xs font-bold rounded-lg">{post.category}</span>
                    </div>
                  </div>
                </Link>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-3">
                    <span className="flex items-center gap-1"><FiClock size={11} /> {post.readTime}</span>
                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2 line-clamp-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors leading-snug">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-3 mb-4 flex-1">{post.excerpt}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="flex items-center gap-1 px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-xs rounded-md">
                        <FiTag size={9} /> {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      <div className="relative w-7 h-7 rounded-full overflow-hidden">
                        <Image src={post.authorAvatar} alt={post.author} fill className="object-cover" sizes="28px" />
                      </div>
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={`flex items-center gap-1 text-xs transition-colors ${likes[post.id] ? 'text-red-500' : 'text-slate-400 hover:text-red-400'}`}
                      >
                        <FiHeart size={14} fill={likes[post.id] ? 'currentColor' : 'none'} />
                        {post.likes + (likes[post.id] ? 1 : 0)}
                      </button>
                      <button
                        onClick={() => toggleBookmark(post.id)}
                        className={`transition-colors ${bookmarks.includes(post.id) ? 'text-teal-500' : 'text-slate-400 hover:text-teal-500'}`}
                      >
                        <FiBookmark size={14} fill={bookmarks.includes(post.id) ? 'currentColor' : 'none'} />
                      </button>
                      <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                        <FiShare2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              <FiSearch size={40} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No articles found</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
