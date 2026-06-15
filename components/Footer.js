'use client';
import Link from 'next/link';
import { useState } from 'react';
import {
  FiCompass, FiMail, FiPhone, FiMapPin,
  FiFacebook, FiTwitter, FiInstagram, FiYoutube,
  FiSend, FiArrowRight,
} from 'react-icons/fi';

const footerLinks = {
  Explore: [
    { href: '/destinations', label: 'Destinations' },
    { href: '/attractions',  label: 'Attractions' },
    { href: '/gallery',      label: 'Gallery' },
    { href: '/culture',      label: 'Culture' },
  ],
  Information: [
    { href: '/blog',    label: 'Travel Blog' },
    { href: '/about',   label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '#',        label: 'Travel Tips' },
  ],
  Destinations: [
    { href: '/destinations#lake-tana',       label: 'Lake Tana' },
    { href: '/destinations#blue-nile-falls', label: 'Blue Nile Falls' },
    { href: '/destinations#monasteries',     label: 'Monasteries' },
    { href: '/destinations#bezawit-hill',    label: 'Bezawit Hill' },
  ],
};

const socials = [
  { icon: FiFacebook,  href: '#', label: 'Facebook' },
  { icon: FiTwitter,   href: '#', label: 'Twitter' },
  { icon: FiInstagram, href: '#', label: 'Instagram' },
  { icon: FiYoutube,   href: '#', label: 'YouTube' },
];

export default function Footer() {
  const [email, setEmail]     = useState('');
  const [subscribed, setSub]  = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSub(true); setEmail(''); }
  };

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Newsletter banner */}
      <div className="bg-gradient-to-r from-teal-600 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white text-2xl font-bold">Stay Inspired</h3>
              <p className="text-teal-100 mt-1">Get travel tips, new discoveries, and exclusive deals straight to your inbox.</p>
            </div>
            {subscribed ? (
              <div className="flex items-center gap-2 bg-white/20 text-white px-6 py-3 rounded-full font-semibold">
                <FiSend /> You&apos;re subscribed — thank you!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 md:w-72 px-5 py-3 rounded-full bg-white/20 text-white placeholder-teal-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-teal-700 font-semibold rounded-full text-sm hover:bg-teal-50 transition-colors flex items-center gap-2"
                >
                  Subscribe <FiArrowRight />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-green-500 flex items-center justify-center">
                <FiCompass className="text-white text-lg" />
              </div>
              <span className="font-bold text-lg text-white">
                Bahir Dar <span className="text-teal-400">Explorer</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              Your premier guide to discovering the breathtaking beauty of Bahir Dar — Lake Tana, Blue Nile Falls, ancient monasteries, and vibrant Ethiopian culture.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-slate-400"><FiMapPin size={14} className="text-teal-400 flex-shrink-0" /> Bahir Dar, Amhara Region, Ethiopia</div>
              <div className="flex items-center gap-2 text-slate-400"><FiMail    size={14} className="text-teal-400 flex-shrink-0" /> info@bahirdareexplorer.com</div>
              <div className="flex items-center gap-2 text-slate-400"><FiPhone   size={14} className="text-teal-400 flex-shrink-0" /> +251 58 220 0000</div>
            </div>
            {/* Socials */}
            <div className="flex gap-3 mt-6">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-slate-800 hover:bg-teal-600 flex items-center justify-center transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white font-semibold mb-4">{section}</h4>
              <ul className="space-y-2">
                {links.map(({ href, label }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-slate-400 hover:text-teal-400 text-sm transition-colors inline-flex items-center gap-1 group"
                    >
                      <FiArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Bahir Dar Explorer. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
