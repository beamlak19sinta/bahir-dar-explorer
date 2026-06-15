'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiStar, FiClock, FiMapPin, FiArrowRight } from 'react-icons/fi';
import { attractions } from '@/lib/data';
import SectionHeader from '@/components/SectionHeader';

export default function PopularAttractions() {
  const top = attractions.slice(0, 6);

  return (
    <section className="section-padding bg-slate-50 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Top Attractions"
          title="Popular Things"
          highlight="To Do"
          description="From boat trips on ancient lake waters to hiking through gorges and visiting sacred monasteries — there's something extraordinary for every traveller."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {top.map((att, i) => (
            <motion.div
              key={att.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 card-hover"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={att.image}
                  alt={att.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-white/90 dark:bg-slate-800/90 text-teal-600 text-xs font-bold rounded-lg">
                    {att.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/50 text-yellow-400 text-xs font-bold rounded-lg">
                  <FiStar size={10} fill="currentColor" /> {att.rating}
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {att.name}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-4">
                  {att.description}
                </p>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <FiClock size={12} /> {att.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiMapPin size={12} className="text-teal-500" /> {att.price}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/attractions"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-green-500 text-white font-semibold rounded-full shadow-lg hover:shadow-teal-500/30 hover:from-teal-600 hover:to-green-600 transition-all group"
          >
            View All Attractions
            <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
