'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiStar, FiClock, FiMapPin, FiFilter } from 'react-icons/fi';
import { attractions } from '@/lib/data';
import SectionHeader from '@/components/SectionHeader';

const categories = ['All', 'Nature', 'Heritage', 'Culture', 'Scenic'];

export default function AttractionsClient() {
  const [search, setSearch]     = useState('');
  const [category, setCategory] = useState('All');

  const filtered = attractions.filter(a => {
    const matchCat  = category === 'All' || a.category === category;
    const matchText = a.name.toLowerCase().includes(search.toLowerCase()) ||
                      a.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchText;
  });

  return (
    <>
      {/* Hero */}
      <section className="relative h-72 flex items-end overflow-hidden">
        <Image
          src="/images/blue-nile-falls-hero.jpg"
          alt="Attractions"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">Things To Do</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mt-2">Top Attractions</h1>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Explore"
            title="Discover Amazing"
            highlight="Experiences"
            description="Search and filter through Bahir Dar's top attractions to build your perfect itinerary."
          />

          {/* Search + Filter bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search attractions…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 text-sm"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <FiFilter className="text-slate-500 hidden sm:block" size={16} />
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    category === cat
                      ? 'bg-teal-500 text-white shadow-md shadow-teal-500/25'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:text-teal-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
            Showing <span className="font-semibold text-teal-600">{filtered.length}</span> attraction{filtered.length !== 1 ? 's' : ''}
          </p>

          {/* Grid */}
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {filtered.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="col-span-full text-center py-20 text-slate-400"
                >
                  <FiSearch size={40} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">No attractions found</p>
                  <p className="text-sm">Try a different search term or category</p>
                </motion.div>
              ) : filtered.map((att, i) => (
                <motion.div
                  key={att.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 card-hover border border-slate-100 dark:border-slate-700"
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={att.image}
                      alt={att.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 bg-white/95 dark:bg-slate-800/95 text-teal-600 text-xs font-bold rounded-lg shadow">
                        {att.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 bg-black/60 text-yellow-400 text-xs font-bold rounded-lg">
                      <FiStar size={11} fill="currentColor" /> {att.rating}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {att.name}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
                      {att.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 rounded-xl p-3">
                      <span className="flex items-center gap-1.5">
                        <FiClock size={12} className="text-teal-500" /> {att.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FiMapPin size={12} className="text-teal-500" /> {att.price}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
