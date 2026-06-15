'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiArrowRight, FiCheck } from 'react-icons/fi';

export default function NewsletterSection() {
  const [email, setEmail]   = useState('');
  const [sent, setSent]     = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  return (
    <section className="section-padding bg-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block px-4 py-1.5 bg-teal-900/50 text-teal-400 text-xs font-semibold uppercase tracking-widest rounded-full mb-6">
            Newsletter
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Stay Updated with{' '}
            <span className="gradient-text">Bahir Dar Explorer</span>
          </h2>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            Get the latest travel guides, destination highlights, cultural insights, and exclusive tips delivered straight to your inbox.
          </p>

          {sent ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-teal-500/20 border border-teal-500/50 text-teal-400 rounded-full font-semibold text-lg"
            >
              <FiCheck size={20} /> Thank you for subscribing!
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-6 py-4 rounded-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-sm"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-4 bg-gradient-to-r from-teal-500 to-green-500 text-white font-semibold rounded-full hover:from-teal-600 hover:to-green-600 transition-all disabled:opacity-70 flex items-center gap-2 justify-center"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <><FiSend size={16} /> Subscribe</>
                )}
              </button>
            </form>
          )}
          <p className="text-slate-600 text-xs mt-4">No spam, ever. Unsubscribe at any time.</p>
        </motion.div>
      </div>
    </section>
  );
}
