'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSun, FiMoon, FiMenu, FiX, FiCompass, FiMapPin,
  FiCamera, FiBookOpen, FiMail, FiHome, FiUsers, FiStar,
} from 'react-icons/fi';
import { useTheme } from './ThemeProvider';

const navLinks = [
  { href: '/',             label: 'Home',         icon: FiHome },
  { href: '/destinations', label: 'Destinations', icon: FiMapPin },
  { href: '/attractions',  label: 'Attractions',  icon: FiStar },
  { href: '/culture',      label: 'Culture',      icon: FiCompass },
  { href: '/blog',         label: 'Blog',         icon: FiBookOpen },
  { href: '/gallery',      label: 'Gallery',      icon: FiCamera },
  { href: '/about',        label: 'About',        icon: FiUsers },
  { href: '/contact',      label: 'Contact',      icon: FiMail },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const { theme, toggleTheme }    = useTheme();
  const pathname                  = usePathname();
  const isHome                    = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const navBg = scrolled || !isHome
    ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg'
    : 'bg-transparent';

  const textColor = scrolled || !isHome
    ? 'text-slate-700 dark:text-slate-200'
    : 'text-white';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-green-500 flex items-center justify-center shadow-lg">
              <FiCompass className="text-white text-lg" />
            </div>
            <span className={`font-bold text-lg tracking-tight transition-colors ${textColor}`}>
              Bahir Dar <span className="text-teal-500">Explorer</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group ${
                    active
                      ? 'text-teal-500'
                      : `${textColor} hover:text-teal-500`
                  }`}
                >
                  {label}
                  {active && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-x-1 -bottom-0.5 h-0.5 bg-teal-500 rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${
                scrolled || !isHome
                  ? 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  : 'text-white hover:bg-white/20'
              }`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>

            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-green-500 text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg hover:from-teal-600 hover:to-green-600 transition-all duration-200"
            >
              Plan Your Trip
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                scrolled || !isHome
                  ? 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  : 'text-white hover:bg-white/20'
              }`}
              aria-label="Toggle menu"
            >
              {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map(({ href, label, icon: Icon }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      active
                        ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon size={18} />
                    {label}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                className="mt-2 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-teal-500 to-green-500 text-white text-sm font-semibold rounded-xl"
              >
                Plan Your Trip
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
