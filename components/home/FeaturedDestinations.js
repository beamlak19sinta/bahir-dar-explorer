'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiArrowRight, FiMapPin, FiClock, FiStar } from 'react-icons/fi';
import { destinations } from '@/lib/data';
import SectionHeader from '@/components/SectionHeader';

export default function FeaturedDestinations() {
  const featured = destinations.slice(0, 3);

  return (
    <section className="section-padding bg-slate-50 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Top Destinations"
          title="Must-Visit Places in"
          highlight="Bahir Dar"
          description="From the sacred island monasteries of Lake Tana to the thundering Blue Nile Falls, every corner of Bahir Dar holds a new wonder."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((dest, i) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <Link href={`/destinations#${dest.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-2xl transition-all duration-500 card-hover">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    {/* Category badge */}
                    <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-slate-800/90 text-teal-600 text-xs font-bold rounded-full">
                      {dest.category}
                    </span>
                    {/* Rating */}
                    <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-black/40 backdrop-blur-sm rounded-full text-yellow-400 text-xs font-bold">
                      <FiStar size={11} fill="currentColor" />
                      {dest.rating}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs mb-2">
                      <FiMapPin size={12} className="text-teal-500" />
                      Bahir Dar, Ethiopia
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {dest.name}
                    </h3>
                    <p className="text-teal-600 dark:text-teal-400 text-sm font-medium mb-3">{dest.tagline}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-5">
                      {dest.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs">
                        <FiClock size={12} />
                        {dest.duration}
                      </div>
                      <span className="flex items-center gap-1 text-teal-600 dark:text-teal-400 text-sm font-semibold group-hover:gap-2 transition-all">
                        Explore <FiArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-teal-500 text-teal-600 dark:text-teal-400 font-semibold rounded-full hover:bg-teal-500 hover:text-white transition-all duration-300 group"
          >
            View All Destinations
            <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
