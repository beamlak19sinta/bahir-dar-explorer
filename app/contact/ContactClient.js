'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  FiMail, FiPhone, FiMapPin, FiSend, FiCheck,
  FiUser, FiMessageSquare, FiClock,
} from 'react-icons/fi';

const contactInfo = [
  { icon: FiMapPin, title: 'Our Location',    value: 'Bahir Dar, Amhara Region, Ethiopia', sub: 'Near Lake Tana Waterfront' },
  { icon: FiMail,   title: 'Email Us',        value: 'info@bahirdareexplorer.com',          sub: 'We reply within 24 hours' },
  { icon: FiPhone,  title: 'Call Us',         value: '+251 58 220 0000',                    sub: 'Mon–Sat, 9am–6pm EAT' },
  { icon: FiClock,  title: 'Working Hours',   value: 'Monday – Saturday',                  sub: '9:00 AM – 6:00 PM EAT' },
];

export default function ContactClient() {
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent]     = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Name is required';
    if (!form.email.trim())   e.email   = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 20) e.message = 'Message must be at least 20 characters';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  return (
    <>
      {/* Hero */}
      <section className="relative h-72 flex items-end overflow-hidden">
        <Image
          src="/images/monasteries.jpg"
          alt="Contact"
          fill className="object-cover" priority sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">Plan Your Trip</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mt-2">Get In Touch</h1>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Contact info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {contactInfo.map((info, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-green-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <info.icon className="text-white" size={20} />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{info.title}</h3>
                <p className="text-slate-700 dark:text-slate-300 text-sm font-medium">{info.value}</p>
                <p className="text-slate-500 text-xs mt-1">{info.sub}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Send Us a Message</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">We&apos;d love to help you plan your perfect Bahir Dar adventure.</p>

              {sent ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center mx-auto mb-5">
                    <FiCheck className="text-teal-500" size={36} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Message Sent!</h3>
                  <p className="text-slate-500 dark:text-slate-400 mb-6">Thank you, {form.name || 'friend'}! We&apos;ll get back to you within 24 hours.</p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                    className="px-6 py-3 bg-teal-500 text-white rounded-full text-sm font-semibold hover:bg-teal-600 transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        <span className="flex items-center gap-1.5"><FiUser size={13} /> Full Name *</span>
                      </label>
                      <input
                        type="text" value={form.name} onChange={set('name')}
                        placeholder="Your name"
                        className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 text-sm transition-colors ${errors.name ? 'border-red-400 focus:ring-red-400/30' : 'border-slate-200 dark:border-slate-600 focus:border-teal-500 focus:ring-teal-500/20'}`}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        <span className="flex items-center gap-1.5"><FiMail size={13} /> Email Address *</span>
                      </label>
                      <input
                        type="email" value={form.email} onChange={set('email')}
                        placeholder="your@email.com"
                        className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 text-sm transition-colors ${errors.email ? 'border-red-400 focus:ring-red-400/30' : 'border-slate-200 dark:border-slate-600 focus:border-teal-500 focus:ring-teal-500/20'}`}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Subject *</label>
                    <select
                      value={form.subject} onChange={set('subject')}
                      className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 text-sm transition-colors ${errors.subject ? 'border-red-400 focus:ring-red-400/30' : 'border-slate-200 dark:border-slate-600 focus:border-teal-500 focus:ring-teal-500/20'}`}
                    >
                      <option value="">Select a subject</option>
                      <option value="trip-planning">Trip Planning</option>
                      <option value="destination-info">Destination Information</option>
                      <option value="accommodation">Accommodation Recommendations</option>
                      <option value="guided-tours">Guided Tours</option>
                      <option value="partnership">Partnership / Press</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      <span className="flex items-center gap-1.5"><FiMessageSquare size={13} /> Message *</span>
                    </label>
                    <textarea
                      rows={5} value={form.message} onChange={set('message')}
                      placeholder="Tell us about your travel plans, questions, or how we can help…"
                      className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 text-sm transition-colors resize-none ${errors.message ? 'border-red-400 focus:ring-red-400/30' : 'border-slate-200 dark:border-slate-600 focus:border-teal-500 focus:ring-teal-500/20'}`}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                    <p className="text-slate-400 text-xs mt-1 text-right">{form.message.length} characters</p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-teal-500 to-green-500 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-green-600 transition-all shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <><FiSend size={16} /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Map + extra info */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              {/* Map embed placeholder */}
              <div className="rounded-3xl overflow-hidden shadow-xl bg-slate-100 dark:bg-slate-800">
                <div className="relative h-80">
                  <Image
                    src="/images/lake-tana.jpg"
                    alt="Bahir Dar map"
                    fill
                    className="object-cover"
                    sizes="600px"
                  />
                  <div className="absolute inset-0 bg-teal-900/30 flex items-center justify-center">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl px-6 py-4 shadow-xl text-center">
                      <FiMapPin className="text-teal-500 mx-auto mb-2" size={28} />
                      <p className="font-bold text-slate-900 dark:text-white">Bahir Dar, Ethiopia</p>
                      <p className="text-slate-500 text-sm">11.5742° N, 37.3614° E</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick facts */}
              <div className="bg-gradient-to-br from-teal-500 to-green-500 rounded-3xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4">Plan Your Visit</h3>
                <div className="space-y-3 text-sm">
                  {[
                    { label: 'Best Time to Visit', value: 'October – February' },
                    { label: 'Nearest Airport',    value: 'Bahir Dar Airport (BJR)' },
                    { label: 'Currency',           value: 'Ethiopian Birr (ETB)' },
                    { label: 'Language',           value: 'Amharic (English widely spoken)' },
                    { label: 'Timezone',           value: 'EAT (UTC+3)' },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between items-start border-b border-white/20 pb-3">
                      <span className="text-white/70">{item.label}</span>
                      <span className="font-semibold text-right ml-4">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
