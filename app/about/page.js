'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight, FiMapPin, FiHeart, FiAward, FiUsers } from 'react-icons/fi';

const team = [
  { name: 'Almaz Bekele',     role: 'Lead Travel Writer',   avatar: '/images/team-avatar.jpg', bio: 'Born in Bahir Dar, Almaz has spent 10 years sharing the beauty of her home city with the world.' },
  { name: 'Yohannes Tadesse', role: 'Photography Director', avatar: '/images/team-avatar.jpg', bio: 'Award-winning photographer who has documented Ethiopia\'s landscapes for National Geographic.' },
  { name: 'Selamawit Girma',  role: 'Cultural Researcher',  avatar: '/images/team-avatar.jpg', bio: 'Ethnographer and cultural expert specialising in Amhara traditions, music, and food.' },
];

const values = [
  { icon: FiHeart,  title: 'Authentic Experiences', desc: 'We celebrate real culture and genuine local life, not tourist performances.' },
  { icon: FiAward,  title: 'Expert Knowledge',       desc: 'Our content is researched, fact-checked, and written by locals who know the region deeply.' },
  { icon: FiUsers,  title: 'Community First',        desc: 'We promote sustainable tourism that benefits local communities and preserves heritage.' },
  { icon: FiMapPin, title: 'Responsible Travel',     desc: 'We encourage respectful, eco-conscious travel that protects Bahir Dar\'s natural wonders.' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-80 flex items-end overflow-hidden">
        <Image
          src="/images/bahir-dar-hero.jpg"
          alt="About"
          fill className="object-cover" priority sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">Our Story</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mt-2">About Bahir Dar Explorer</h1>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <span className="inline-block px-4 py-1.5 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 text-xs font-semibold uppercase tracking-widest rounded-full mb-5">Our Mission</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                Sharing Bahir Dar's{' '}
                <span className="gradient-text">Hidden Magic</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-5">
                Bahir Dar Explorer was founded by a group of passionate locals and travel writers who believed that one of Africa's most extraordinary destinations deserved a world-class digital platform to match.
              </p>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
                Our mission is simple: to inspire, inform, and guide travellers to discover the breathtaking beauty of Bahir Dar — its ancient lake, sacred monasteries, spectacular falls, and warm, welcoming culture — in a way that is authentic, respectful, and deeply human.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-green-500 text-white font-semibold rounded-full shadow-lg hover:shadow-teal-500/30 transition-all group">
                Get In Touch <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-2xl">
                <Image src="/images/lake-tana.jpg" alt="Lake Tana" fill className="object-cover" sizes="600px" />
              </div>
            </motion.div>
          </div>

          {/* Values */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 text-xs font-semibold uppercase tracking-widest rounded-full mb-4">What We Stand For</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">Our Core Values</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="text-center p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-green-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <v.icon className="text-white" size={22} />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">{v.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 text-xs font-semibold uppercase tracking-widest rounded-full mb-4">The Team</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">Meet Our Team</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {team.map((member, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                  className="text-center p-8 bg-slate-50 dark:bg-slate-800 rounded-3xl hover:shadow-xl transition-shadow">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-teal-500/20">
                    <Image src={member.avatar} alt={member.name} fill className="object-cover" sizes="96px" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">{member.name}</h3>
                  <p className="text-teal-600 dark:text-teal-400 text-sm font-medium mb-3">{member.role}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
