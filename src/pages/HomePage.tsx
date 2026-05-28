import { useTranslation } from 'react-i18next';
import HeroSection from '../components/layout/HeroSection';
import EventsCarousel from '../components/layout/EventsCarousel';
import AboutSection from '../components/layout/AboutSection';
import JoinSection from '../components/layout/JoinSection';

function HomePage() {
  const { t, i18n } = useTranslation();

  return (
    <>
      <HeroSection />
      <EventsCarousel />
      <AboutSection />

      <section className="intro-section">
        <div className="intro-container">
          <h2 className="intro-headline">{t('hero.title')}</h2>
          <div className="intro-content">
            <img
              src="/Dortmund Hub- Coloured Logo.png"
              alt="Young AI Leaders Hub Logo"
              className="intro-logo"
            />
            <div className="intro-text">
              <p dangerouslySetInnerHTML={{
                __html: t('hero.intro', {
                  linkedin: '<a href="https://www.linkedin.com/company/young-ai-leaders-dortmund/" target="_blank" rel="noreferrer">LinkedIn</a>',
                  discord: '<a href="https://discord.gg/QZBnSG7w9z" target="_blank" rel="noreferrer">Discord</a>',
                  instagram: '<a href="https://www.instagram.com/youngaileaders_dortmund/" target="_blank" rel="noreferrer">Instagram</a>',
                  tiktok: i18n.language === 'de'
                    ? '<a href="https://www.tiktok.com/@youngaileaders_dortmund/" target="_blank" rel="noreferrer">TikTok</a> aktiv!'
                    : '<a href="https://www.tiktok.com/@youngaileaders_dortmund/" target="_blank" rel="noreferrer">TikTok!</a>',
                  election: '<a href="https://dortmund-wahl-ki.de" target="_blank" rel="noreferrer">Dortmunder Kommunalwahl mit KI.</a>',
                  christmas: '<a href="https://discord.com/events/1349697708495077386/1444343137802911754" target="_blank" rel="noreferrer">Weihnachtsmarkt am 7.12.</a>',
                  seminar: '<a href="https://discord.com/events/1349697708495077386/1445518703465726022" target="_blank" rel="noreferrer">Seminar am 10.12.</a>',
                })
              }} />
              <p dangerouslySetInnerHTML={{
                __html: t('hero.call', {
                  collaboration: `<strong>${t('links.community')}</strong>`,
                  apply: `<a href="https://aiforgood.itu.int/young-ai-leaders-community/" target="_blank" rel="noreferrer">${t('links.apply')}</a>`,
                })
              }} />
            </div>
          </div>
        </div>
      </section>

      <section className="info-section">
        <div className="info-container">
          <h2 className="info-headline">{t('info.title')}</h2>
          <p dangerouslySetInnerHTML={{
            __html: t('info.description1', {
              charter: '<a href="https://aiforgood.itu.int/young-ai-leaders-community/community-charter/" target="_blank" rel="noreferrer">Community Charter</a>',
              homepage: '<a href="https://aiforgood.itu.int/young-ai-leaders-community/" target="_blank" rel="noreferrer">AI for Good</a>',
            })
          }} />
          <p dangerouslySetInnerHTML={{
            __html: t('info.description2', {
              form: '<a href="https://aiforgood.itu.int/young-ai-leaders-community/#apply" target="_blank" rel="noreferrer">AI for Good webform</a>',
            })
          }} />
          <p dangerouslySetInnerHTML={{
            __html: t('info.description3', {
              raphael: '<a href="https://lamarr.cs.tu-dortmund.de/team/raphael-fischer" target="_blank" rel="noreferrer">Raphael Fischer</a>',
              nico: '<a href="https://www.linkedin.com/in/nico-koltermann/" target="_blank" rel="noreferrer">Nico Koltermann</a>',
              bahavathy: '<a href="https://www.linkedin.com/in/bahavathy-kathirgamanathan/" target="_blank" rel="noreferrer">Bahavathy Kathirgamanathan</a>',
            })
          }} />
          <p className="info-contact"><strong>{t('info.contact')}</strong></p>
        </div>
      </section>

      <JoinSection />
    </>
  );
}

export default HomePage;
