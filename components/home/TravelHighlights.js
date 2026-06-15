'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiArrowRight } from 'react-icons/fi';

const highlights = [
  'Over 20 ancient island monasteries to explore',
  '200+ bird species around Lake Tana',
  'World-class Blue Nile Falls experience',
  'Rich Ethiopian Orthodox culture & art',
  'Authentic traditional cuisine & coffee ceremony',
  'Friendly locals and expert local guides',
];

export default function TravelHighlights() {
  return (
    <section className="section-padding bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image grid */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="relative h-56 rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="/images/blue-nile-falls.jpg"
                  alt="Blue Nile Falls"
                  fill
                  className="object-cover"
                  sizes="250px"
                />
              </div>
              <div className="relative h-40 rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="/images/monasteries.jpg"
                  alt="Ethiopian Monastery"
                  fill
                  className="object-cover"
                  sizes="250px"
                />
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="relative h-40 rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="/images/lake-tana.jpg"
                  alt="Lake Tana"
                  fill
                  className="object-cover"
                  sizes="250px"
                />
              </div>
              <div className="relative h-56 rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="/images/bahir-dar-city.jpg"
                  alt="Bahir Dar"
                  fill
                  className="object-cover"
                  sizes="250px"
                />
              </div>
            </div>
            {/* floating badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-teal-500 to-green-500 text-white px-5 py-3 rounded-2xl shadow-2xl text-sm font-bold z-10 whitespace-nowrap hidden lg:block"
            >
              🌍 UNESCO Biosphere Reserve
            </motion.div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 text-xs font-semibold uppercase tracking-widest rounded-full mb-4">
              Why Visit Bahir Dar
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
              An Unforgettable{' '}
              <span className="gradient-text">African Adventure</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed mb-8">
              Bahir Dar is where natural wonders meet ancient civilisation. Home to one of Africa&apos;s great lakes, dramatic waterfalls, and millennia of spiritual heritage, it offers an experience unlike anywhere else on earth.
            </p>

            <ul className="space-y-3 mb-10">
              {highlights.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-center gap-3 text-slate-600 dark:text-slate-300"
                >
                  <FiCheckCircle className="text-teal-500 flex-shrink-0" size={18} />
                  {item}
                </motion.li>
              ))}
            </ul>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-green-500 text-white font-semibold rounded-full shadow-lg hover:shadow-teal-500/30 hover:from-teal-600 hover:to-green-600 transition-all duration-300 group"
            >
              Learn More About Bahir Dar
              <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
