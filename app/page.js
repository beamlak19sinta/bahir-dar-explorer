import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import FeaturedDestinations from '@/components/home/FeaturedDestinations';
import PopularAttractions from '@/components/home/PopularAttractions';
import TravelHighlights from '@/components/home/TravelHighlights';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import NewsletterSection from '@/components/home/NewsletterSection';

export const metadata = {
  title: 'Bahir Dar Explorer — Discover Ethiopia\'s Northern Gem',
  description:
    'Explore Bahir Dar, Lake Tana, Blue Nile Falls, ancient monasteries, and vibrant Ethiopian culture. Start your journey today.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturedDestinations />
      <TravelHighlights />
      <PopularAttractions />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
}
