import { useTranslation } from 'react-i18next';
import '../App.css';

function DatenschutzPage() {
  const { t } = useTranslation();

  return (
    <main className="legal-page">
      <div className="legal-container">
        <h1 className="legal-title">{t('privacy.title')}</h1>

        <p dangerouslySetInnerHTML={{ __html: t('privacy.hosting') }} />
        <p dangerouslySetInnerHTML={{ __html: t('privacy.analytics') }} />
        <p dangerouslySetInnerHTML={{ __html: t('privacy.links') }} />
        <p dangerouslySetInnerHTML={{ __html: t('privacy.summary') }} />
      </div>
    </main>
  );
}

export default DatenschutzPage;
