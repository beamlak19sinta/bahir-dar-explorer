'use client';
import { motion } from 'framer-motion';
import { FiUsers, FiAward, FiEye, FiDroplet } from 'react-icons/fi';

const stats = [
  { icon: FiUsers,   value: '500K+', label: 'Annual Visitors',    color: 'text-teal-500' },
  { icon: FiAward,   value: '20+',   label: 'Island Monasteries', color: 'text-green-500' },
  { icon: FiEye,     value: '200+',  label: 'Bird Species',       color: 'text-blue-500' },
  { icon: FiDroplet, value: '3,600', label: 'Sq km Lake Area',    color: 'text-indigo-500' },
];

export default function StatsSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-teal-600 via-teal-500 to-green-500 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ icon: Icon, value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm mb-4 mx-auto">
                <Icon className="text-white" size={26} />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">{value}</div>
              <div className="text-teal-100 text-sm font-medium">{label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
