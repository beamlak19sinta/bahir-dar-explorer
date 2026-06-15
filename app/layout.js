import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata = {
  metadataBase: new URL('https://bahir-dar-explorer.vercel.app'),
  title: {
    default: 'Bahir Dar Explorer — Discover Ethiopia\'s Northern Gem',
    template: '%s | Bahir Dar Explorer',
  },
  description:
    'Explore Bahir Dar, Lake Tana, Blue Nile Falls, ancient monasteries, and vibrant Ethiopian culture. Your ultimate travel guide to one of Africa\'s most beautiful destinations.',
  keywords: [
    'Bahir Dar',
    'Lake Tana',
    'Blue Nile Falls',
    'Ethiopia tourism',
    'Ethiopian monasteries',
    'Tis Abay',
    'Amhara region',
    'Ethiopia travel guide',
  ],
  authors: [{ name: 'Bahir Dar Explorer' }],
  creator: 'Bahir Dar Explorer',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bahir-dar-explorer.vercel.app',
    siteName: 'Bahir Dar Explorer',
    title: 'Bahir Dar Explorer — Discover Ethiopia\'s Northern Gem',
    description:
      'Explore Bahir Dar, Lake Tana, Blue Nile Falls, ancient monasteries, and vibrant Ethiopian culture.',
    images: [
      {
        url: 'https://bahir-dar-explorer.vercel.app/images/blue-nile-falls-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Bahir Dar Explorer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bahir Dar Explorer — Discover Ethiopia\'s Northern Gem',
    description:
      'Explore Bahir Dar, Lake Tana, Blue Nile Falls, ancient monasteries, and vibrant Ethiopian culture.',
    images: ['https://bahir-dar-explorer.vercel.app/images/blue-nile-falls-hero.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
