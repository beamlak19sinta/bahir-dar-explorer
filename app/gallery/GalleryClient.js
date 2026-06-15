'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight, FiZoomIn } from 'react-icons/fi';
import { galleryImages } from '@/lib/data';
import SectionHeader from '@/components/SectionHeader';

// Fallback component for broken images
function GalleryImage({ src, alt, title, category, onClick }) {
  const [error, setError] = useState(false);
  const fallback = `/images/lake-tana.jpg`;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={error ? fallback : src}
      alt={alt}
      onError={() => setError(true)}
      onClick={onClick}
      className="w-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
      loading="lazy"
    />
  );
}

const cats = ['All', 'Nature', 'Lake', 'Heritage', 'Culture', 'City'];

export default function GalleryClient() {
  const [selected,  setSelected]  = useState('All');
  const [lightbox,  setLightbox]  = useState(null); // index into filtered

  const filtered = selected === 'All' ? galleryImages : galleryImages.filter(i => i.category === selected);

  const prev = () => setLightbox(i => (i - 1 + filtered.length) % filtered.length);
  const next = () => setLightbox(i => (i + 1) % filtered.length);

  return (
    <>
      {/* Hero */}
      <section className="relative h-72 flex items-end overflow-hidden">
        <Image
          src="/images/gal-05.jpg"
          alt="Gallery"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">Visual Journey</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mt-2">Photo Gallery</h1>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Gallery"
            title="Explore Through"
            highlight="Our Lens"
            description="A visual collection of Bahir Dar's most stunning landscapes, cultural moments, and sacred places."
          />

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {cats.map(cat => (
              <button
                key={cat}
                onClick={() => setSelected(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  selected === cat
                    ? 'bg-teal-500 text-white shadow-md shadow-teal-500/25'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-teal-50 hover:text-teal-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry grid */}
          <div className="masonry">
            <AnimatePresence>
              {filtered.map((img, i) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className="masonry-item group relative cursor-pointer overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow"
                  onClick={() => setLightbox(i)}
                >
                  <GalleryImage
                    src={img.src}
                    alt={img.alt}
                    title={img.title}
                    category={img.category}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center pointer-events-none">
                    <FiZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={32} />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/70 to-transparent">
                    <p className="text-white text-sm font-medium">{img.title}</p>
                    <span className="text-teal-300 text-xs">{img.category}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              onClick={() => setLightbox(null)}
            >
              <FiX size={24} />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              onClick={e => { e.stopPropagation(); prev(); }}
            >
              <FiChevronLeft size={24} />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              onClick={e => { e.stopPropagation(); next(); }}
            >
              <FiChevronRight size={24} />
            </button>

            <motion.div
              key={lightbox}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl max-h-[80vh] w-full"
              onClick={e => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={filtered[lightbox].src}
                alt={filtered[lightbox].alt}
                className="w-full h-full object-contain rounded-2xl max-h-[75vh]"
                onError={e => { e.target.src = '/images/lake-tana.jpg'; }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent rounded-b-2xl">
                <p className="text-white font-semibold">{filtered[lightbox].title}</p>
                <p className="text-teal-300 text-sm">{filtered[lightbox].category}</p>
              </div>
            </motion.div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm">
              {lightbox + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
