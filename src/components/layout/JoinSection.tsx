import { useTranslation } from 'react-i18next';
import '../../App.css';

function JoinSection() {
  const { t } = useTranslation();

  return (
    <section id="join" className="join-section">
      <div className="join-container join-container--static">
        <div className="join-label">{t('join.label')}</div>
        <h2 className="join-headline">{t('join.headline')}</h2>
        <p className="join-intro" dangerouslySetInnerHTML={{ __html: t('join.intro') }} />
        <p className="join-intro" dangerouslySetInnerHTML={{ __html: t('join.details') }} />
        <p className="join-intro" dangerouslySetInnerHTML={{ __html: t('join.call') }} />
        <a className="join-email" href="mailto:dortmundhub.youngaileaders@gmail.com">
          dortmundhub.youngaileaders [ at ] gmail.com
        </a>
      </div>
    </section>
  );
}

export default JoinSection;
