import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface NavBarProps {
  onToggleLang: () => void;
}

function NavBar({ onToggleLang }: NavBarProps) {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const navItems = [
    { label: t('nav.about'), href: '/#about' },
    { label: t('nav.events'), href: '/#events' },
    { label: t('nav.members'), href: '/#members' },
    { label: t('nav.join'), href: '/#join' },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link className="navbar-brand" to="/#home" onClick={closeMenu}>
          <img
            src="/Dortmund Hub- Coloured Logo.png"
            alt=""
            className="navbar-logo"
            aria-hidden="true"
          />
          <span>{t('nav.brand')}</span>
        </Link>

        <button
          className="navbar-menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <ul id="site-navigation" className={`navbar-menu ${menuOpen ? 'is-open' : ''}`}>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link to={item.href} onClick={closeMenu}>{item.label}</Link>
            </li>
          ))}
        </ul>
        <button
          className="lang-toggle"
          type="button"
          onClick={() => {
            onToggleLang();
            closeMenu();
          }}
        >
          <span className="lang-toggle-full">
            {i18n.language === 'de' ? t('nav.english') : t('nav.deutsch')}
          </span>
          <span className="lang-toggle-short" aria-hidden="true">
            {i18n.language === 'de' ? 'EN' : 'DE'}
          </span>
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
