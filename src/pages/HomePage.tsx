import { useTranslation } from 'react-i18next';
import HeroSection from '../components/layout/HeroSection';
import EventsCarousel from '../components/layout/EventsCarousel';
import AboutSection from '../components/layout/AboutSection';
import JoinSection from '../components/layout/JoinSection';
import MembersSection from '../components/layout/MembersSection';

function HomePage() {
  const { t, i18n } = useTranslation();

  return (
    <>
      <HeroSection />
      <AboutSection />
      <EventsCarousel />
      <MembersSection />
      <JoinSection />
    </>
  );
}

export default HomePage;
