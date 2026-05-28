import { useTranslation } from 'react-i18next';
import '../../App.css';

function AboutSection() {
  const { t } = useTranslation();

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-label">{t('about.label')}</div>
        
        <h1 className="about-headline">
          {t('about.headline')}
          <span className="about-headline-colored"> {t('about.headlineColored')}</span>
        </h1>

        <div className="about-content">
          <div className="about-who">
            <h3 className="about-subsection-title">{t('about.whoWeAre')}</h3>
            <p>{t('about.description1')}</p>
            <p>{t('about.description2')}</p>
            <p>{t('about.description3')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
