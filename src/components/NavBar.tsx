import { useTranslation } from 'react-i18next';

interface NavBarProps {
  onToggleLang: () => void;
}

function NavBar({ onToggleLang }: NavBarProps) {
  const { t, i18n } = useTranslation();
  
  const navItems = [
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.team'), href: '#team' },
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.contact'), href: '#contact' },
    { label: t('nav.join'), href: '#join' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h2>{t('nav.brand')}</h2>
        </div>
        <ul className="navbar-menu">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
        <button className="lang-toggle" onClick={() => { i18n.changeLanguage(i18n.language === 'de' ? 'en' : 'de'); onToggleLang(); }}>
          <span>{i18n.language === 'de' ? t('nav.english') : t('nav.deutsch')}</span>
        </button>
      </div>
    </nav>
  );
}

export default NavBar;