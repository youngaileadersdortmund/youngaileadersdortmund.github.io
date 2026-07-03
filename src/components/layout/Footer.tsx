import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-container">
        <div className="site-footer-brand">
          <strong>Young AI Leaders – Dortmund Hub</strong>
          <span className="site-footer-copy">© {year}</span>
        </div>
        <nav className="site-footer-links" aria-label={t('footer.legalNav')}>
          <Link to="/impressum">{t('footer.impressum')}</Link>
          <span className="site-footer-divider" aria-hidden="true">·</span>
          <Link to="/datenschutz">{t('footer.datenschutz')}</Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
