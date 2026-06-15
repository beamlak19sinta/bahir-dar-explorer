'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FiClock, FiHeart, FiBookmark, FiShare2, FiArrowLeft,
  FiTwitter, FiFacebook, FiLink, FiTag,
} from 'react-icons/fi';

export default function BlogPostClient({ post, related }) {
  const [liked,     setLiked]     = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [copied,    setCopied]    = useState(false);

  useEffect(() => {
    try {
      const likes = JSON.parse(localStorage.getItem('bde-likes') || '{}');
      const bms   = JSON.parse(localStorage.getItem('bde-bookmarks') || '[]');
      setLiked(!!likes[post.id]);
      setBookmarked(bms.includes(post.id));
    } catch {}
  }, [post.id]);

  const toggleLike = () => {
    const next = !liked;
    setLiked(next);
    try {
      const l = JSON.parse(localStorage.getItem('bde-likes') || '{}');
      localStorage.setItem('bde-likes', JSON.stringify({ ...l, [post.id]: next }));
    } catch {}
  };

  const toggleBookmark = () => {
    const next = !bookmarked;
    setBookmarked(next);
    try {
      const bms = JSON.parse(localStorage.getItem('bde-bookmarks') || '[]');
      const updated = next ? [...bms, post.id] : bms.filter(b => b !== post.id);
      localStorage.setItem('bde-bookmarks', JSON.stringify(updated));
    } catch {}
  };

  const copyLink = () => {
    navigator.clipboard?.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const paragraphs = post.content.split('\n\n');

  return (
    <article className="pt-20 pb-20 bg-white dark:bg-slate-900 min-h-screen">
      {/* Hero image */}
      <div className="relative h-[50vh] min-h-[340px] mb-12">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-4 sm:px-6 pb-10">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/blog" className="flex items-center gap-1 text-white/70 hover:text-white text-sm transition-colors">
              <FiArrowLeft size={14} /> Back to Blog
            </Link>
            <span className="text-white/40">•</span>
            <span className="px-3 py-1 bg-teal-500 text-white text-xs font-bold rounded-full">{post.category}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">{post.title}</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Meta bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-slate-200 dark:border-slate-700 mb-10">
          <div className="flex items-center gap-4">
            <div className="relative w-11 h-11 rounded-full overflow-hidden">
              <Image src={post.authorAvatar} alt={post.author} fill className="object-cover" sizes="44px" />
            </div>
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">{post.author}</div>
              <div className="text-slate-500 text-sm">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
            </div>
            <div className="flex items-center gap-1 text-slate-500 text-sm ml-2">
              <FiClock size={13} /> {post.readTime}
            </div>
          </div>
          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLike}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                liked ? 'border-red-300 bg-red-50 text-red-500 dark:bg-red-900/20 dark:border-red-800' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-red-300 hover:text-red-500'
              }`}
            >
              <FiHeart size={14} fill={liked ? 'currentColor' : 'none'} />
              {post.likes + (liked ? 1 : 0)}
            </button>
            <button
              onClick={toggleBookmark}
              className={`p-2.5 rounded-full border transition-all ${
                bookmarked ? 'border-teal-300 bg-teal-50 text-teal-500 dark:bg-teal-900/20 dark:border-teal-800' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-teal-300 hover:text-teal-500'
              }`}
            >
              <FiBookmark size={14} fill={bookmarked ? 'currentColor' : 'none'} />
            </button>
            <button onClick={copyLink} className="p-2.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-400 transition-all">
              {copied ? <span className="text-teal-500 text-xs px-1">Copied!</span> : <FiLink size={14} />}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          {paragraphs.map((para, i) => {
            if (para.startsWith('**') && para.endsWith('**')) {
              return (
                <h3 key={i} className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
                  {para.replace(/\*\*/g, '')}
                </h3>
              );
            }
            return (
              <p key={i} className="text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                {para}
              </p>
            );
          })}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {post.tags.map(tag => (
            <span key={tag} className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm rounded-full">
              <FiTag size={11} /> {tag}
            </span>
          ))}
        </div>

        {/* Share */}
        <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Share this article</h4>
            <p className="text-slate-500 text-sm">Help others discover Bahir Dar</p>
          </div>
          <div className="flex gap-3">
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white text-sm rounded-full hover:opacity-90 transition-opacity">
              <FiTwitter size={14} /> Twitter
            </a>
            <a href={`https://facebook.com/sharer/sharer.php?u=`} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#4267B2] text-white text-sm rounded-full hover:opacity-90 transition-opacity">
              <FiFacebook size={14} /> Facebook
            </a>
          </div>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map(p => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="group flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:shadow-lg transition-shadow">
                  <div className="relative w-24 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-110 transition-transform duration-300" sizes="96px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-teal-600 text-xs font-semibold">{p.category}</span>
                    <h4 className="font-semibold text-slate-900 dark:text-white text-sm line-clamp-2 mt-1 group-hover:text-teal-600 transition-colors">{p.title}</h4>
                    <span className="text-slate-500 text-xs flex items-center gap-1 mt-2"><FiClock size={10} /> {p.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
