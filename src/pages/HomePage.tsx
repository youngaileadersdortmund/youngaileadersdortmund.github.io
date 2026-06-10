import HeroSection from '../components/layout/HeroSection';
import EventsCarousel from '../components/layout/EventsCarousel';
import AboutSection from '../components/layout/AboutSection';
import JoinSection from '../components/layout/JoinSection';
import MembersSection from '../components/layout/MembersSection';

function HomePage() {
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
