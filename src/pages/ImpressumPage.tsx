import { useTranslation } from 'react-i18next';
import '../App.css';

function ImpressumPage() {
  const { t } = useTranslation();

  return (
    <main className="legal-page">
      <div className="legal-container">
        <h1 className="legal-title">{t('legal.title')}</h1>

        <p className="legal-lede">{t('legal.lede')}</p>

        <p>
          <strong>{t('legal.hubName')}</strong>
          <br />
          {t('legal.communityIntro')}{' '}
          <a href="https://aiforgood.itu.int/young-ai-leaders-community/" target="_blank" rel="noreferrer">
            {t('legal.communityLink')}
          </a>
        </p>

        <h2 className="legal-subtitle">{t('legal.representedBy')}</h2>
        <p>
          Raphael Fischer
          <br />
          {t('legal.institute')}
          <br />
          {t('legal.addressLine1')}
          <br />
          {t('legal.addressLine2')}
        </p>

        <h2 className="legal-subtitle">{t('legal.contact')}</h2>
        <p>
          {t('legal.emailLabel')} dortmundhub.youngaileaders [at] gmail.com
          <br />
          {t('legal.phoneLabel')} +49 231 755 5148
        </p>

        <h2 className="legal-subtitle">{t('legal.editorial')}</h2>
        <p>Raphael Fischer</p>
      </div>
    </main>
  );
}

export default ImpressumPage;
