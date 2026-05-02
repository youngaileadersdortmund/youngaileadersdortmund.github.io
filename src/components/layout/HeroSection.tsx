
import { useTranslation } from 'react-i18next';
import '../../App.css';

function HeroSection() {
  const { t } = useTranslation();
  return (
    <section className="hero-section">
      <div className="hero-bg"><img src="tu_dortmunder.jpg" alt="" /></div>
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1 className="hero-headline">{t('hero.headline')}</h1>
        <h2 className="hero-subheadline">{t('hero.subheadline')}</h2>
      </div>
    </section>
  );
}

export default HeroSection