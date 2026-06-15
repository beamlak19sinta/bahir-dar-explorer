'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiStar, FiClock, FiCalendar, FiActivity, FiCheckCircle, FiMapPin } from 'react-icons/fi';
import { destinations } from '@/lib/data';
import SectionHeader from '@/components/SectionHeader';

function PageHero() {
  return (
    <section className="relative h-80 flex items-end overflow-hidden">
      <Image
        src="/images/lake-tana-hero.jpg"
        alt="Destinations"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">Bahir Dar, Ethiopia</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-2">Our Destinations</h1>
        </motion.div>
      </div>
    </section>
  );
}

export default function DestinationsClient() {
  return (
    <>
      <PageHero />
      <section className="section-padding bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Explore"
            title="Discover Every"
            highlight="Hidden Gem"
            description="From sacred island monasteries to thundering waterfalls, each destination around Bahir Dar holds a lifetime of memories."
          />
          <div className="space-y-24">
            {destinations.map((dest, i) => (
              <motion.div
                key={dest.id}
                id={dest.slug}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
              >
                {/* Image side */}
                <div className={`${i % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-2xl group">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width:1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    {/* Gallery thumbnails */}
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      {dest.gallery.slice(0, 3).map((img, j) => (
                        <div key={j} className="relative w-14 h-14 rounded-xl overflow-hidden border-2 border-white/60">
                          <Image src={img} alt="" fill className="object-cover" sizes="56px" />
                        </div>
                      ))}
                    </div>
                    {/* Rating badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 bg-white/90 dark:bg-slate-800/90 rounded-full shadow">
                      <FiStar size={13} className="text-amber-400 fill-amber-400" />
                      <span className="font-bold text-sm text-slate-900 dark:text-white">{dest.rating}</span>
                      <span className="text-slate-500 text-xs">({dest.reviews.toLocaleString()})</span>
                    </div>
                  </div>
                </div>

                {/* Text side */}
                <div className={`${i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 text-xs font-semibold rounded-full">
                      {dest.category}
                    </span>
                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-medium rounded-full flex items-center gap-1">
                      <FiClock size={11} /> {dest.duration}
                    </span>
                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-medium rounded-full">
                      {dest.difficulty}
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">{dest.name}</h2>
                  <p className="text-teal-600 dark:text-teal-400 font-semibold text-lg mb-4">{dest.tagline}</p>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">{dest.description}</p>

                  {/* Facts */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                      <FiCheckCircle className="text-teal-500" /> Interesting Facts
                    </h4>
                    <ul className="space-y-2">
                      {dest.facts.map((fact, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 flex-shrink-0" />
                          {fact}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Activities */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                      <FiActivity className="text-teal-500" /> Tourist Activities
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {dest.activities.map((act, j) => (
                        <span key={j} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded-full">
                          {act}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-2xl">
                    <FiCalendar className="text-teal-500 flex-shrink-0" size={20} />
                    <div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Best Season to Visit</div>
                      <div className="font-semibold text-slate-900 dark:text-white text-sm">{dest.bestSeason}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
