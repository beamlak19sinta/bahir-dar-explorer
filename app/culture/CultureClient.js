'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiMusic, FiHeart, FiStar, FiZap } from 'react-icons/fi';
import { cultureSections } from '@/lib/data';
import SectionHeader from '@/components/SectionHeader';

const iconMap = {
  utensils: FiHeart,
  star: FiStar,
  shirt: FiZap,
  music: FiMusic,
};

const colorMap = {
  'from-orange-500 to-amber-400': 'bg-gradient-to-br from-orange-500 to-amber-400',
  'from-purple-600 to-pink-500': 'bg-gradient-to-br from-purple-600 to-pink-500',
  'from-teal-500 to-green-400': 'bg-gradient-to-br from-teal-500 to-green-400',
  'from-blue-500 to-indigo-400': 'bg-gradient-to-br from-blue-500 to-indigo-400',
};

export default function CultureClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-80 flex items-end overflow-hidden">
        <Image
          src="/images/gal-08.jpg"
          alt="Ethiopian Culture"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">Heritage & Traditions</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mt-2">Ethiopian Culture</h1>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block px-4 py-1.5 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 text-xs font-semibold uppercase tracking-widest rounded-full mb-4">
                Living Heritage
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-5">
                A Culture Thousands of{' '}
                <span className="gradient-text">Years in the Making</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                Bahir Dar and the surrounding Amhara region are home to one of the world's most ancient and continuous cultures. The Amhara people have preserved their language, Orthodox Christian faith, artistic traditions, and culinary heritage for millennia.
              </p>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Visiting Bahir Dar is not just seeing beautiful landscapes — it is stepping into a living civilisation where ancient traditions are practised daily with pride and joy, from the daily coffee ceremony to spectacular religious festivals that draw thousands.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                '/images/avatar-1.jpg',
                '/images/gal-08.jpg',
                '/images/monasteries.jpg',
                '/images/bahir-dar-city.jpg',
              ].map((src, i) => (
                <div key={i} className={`relative rounded-2xl overflow-hidden shadow-lg ${i === 1 || i === 2 ? 'mt-6' : ''}`}>
                  <Image src={src} alt="Culture" width={300} height={220} className="w-full object-cover h-40" sizes="150px" />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Culture sections */}
          <SectionHeader
            badge="Traditions"
            title="Explore Ethiopian"
            highlight="Traditions"
            description="Dive deep into the food, festivals, music, and fashion that define the Amhara cultural identity."
          />

          <div className="space-y-20">
            {cultureSections.map((section, si) => {
              const Icon = iconMap[section.icon] || FiStar;
              const gradClass = colorMap[section.color] || 'bg-teal-500';
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Section header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`w-12 h-12 rounded-2xl ${gradClass} flex items-center justify-center shadow-lg`}>
                      <Icon className="text-white" size={22} />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">{section.title}</h3>
                  </div>

                  {/* Items grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {section.items.map((item, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: j * 0.08 }}
                        className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 hover:shadow-lg transition-shadow border border-slate-100 dark:border-slate-700"
                      >
                        <div className={`w-8 h-8 rounded-xl ${gradClass} flex items-center justify-center mb-4`}>
                          <span className="text-white text-xs font-bold">{j + 1}</span>
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-2">{item.name}</h4>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{item.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
