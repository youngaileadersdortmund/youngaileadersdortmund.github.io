import { useTranslation } from 'react-i18next';
import '../../App.css';

const socialLinks = [
  {
    name: 'LinkedIn',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/young-ai-leaders-dortmund/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M6.94 8.99A1.94 1.94 0 1 0 6.94 4.11a1.94 1.94 0 0 0 0 3.88ZM5.32 9.81h3.24v9.98H5.32zM10.45 9.81h3.11v1.36h.04c.43-.82 1.49-1.69 3.06-1.69 3.28 0 3.88 2.16 3.88 4.97v5.34h-3.24v-5.02c0-1.2-.02-2.74-1.67-2.74-1.68 0-1.93 1.31-1.93 2.66v5.1H10.45z" />
      </svg>
    ),
  },
  {
    name: 'Discord',
    label: 'Discord',
    href: 'https://discord.gg/QZBnSG7w9z',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M19.27 5.33A17.1 17.1 0 0 0 15.04 4l-.2.37a15.65 15.65 0 0 1 3.92 1.86 13.66 13.66 0 0 0-10.96 0A15.9 15.9 0 0 1 11.72 4l-.2-.37a17.1 17.1 0 0 0-4.23 1.33C4.7 8.05 3.77 11.7 4.08 15.3a17.9 17.9 0 0 0 5.3 2.7l.42-.56a14.2 14.2 0 0 1-2.35-1.13l.18-.13a.88.88 0 0 0 .1-.08 11.8 11.8 0 0 0 9.75 0l.1.08.18.13a14.1 14.1 0 0 1-2.35 1.13l.42.56a17.9 17.9 0 0 0 5.3-2.7c.37-3.82-.44-7.47-2.3-9.97ZM9.36 13.35c-1.02 0-1.86-.95-1.86-2.12s.83-2.12 1.86-2.12c1.03 0 1.87.95 1.87 2.12s-.84 2.12-1.87 2.12Zm5.28 0c-1.02 0-1.86-.95-1.86-2.12s.83-2.12 1.86-2.12c1.03 0 1.87.95 1.87 2.12s-.84 2.12-1.87 2.12Z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/youngaileaders_dortmund/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm4.5 3.25A4.25 4.25 0 1 1 7.75 11.5 4.25 4.25 0 0 1 12 7.25Zm0 2A2.25 2.25 0 1 0 14.25 11.5 2.25 2.25 0 0 0 12 9.25Zm5.5-2.5a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    label: 'TikTok',
    href: 'https://www.tiktok.com/@youngaileaders_dortmund/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M14.5 2h2.18a4.67 4.67 0 0 0 4.67 4.67v2.47A7.16 7.16 0 0 1 15.19 15.3a7.16 7.16 0 0 1-7.16-7.16V8.31h2.47a4.68 4.68 0 0 0 4.68 4.68V15.5a7.17 7.17 0 1 1-7.17 7.17h-.01V15.5a4.69 4.69 0 0 0 4.68-4.68H8.35V8.31a7.16 7.16 0 0 1 6.15-7.1Z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    label: 'GitHub',
    href: 'https://github.com/youngaileadersdortmund',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 2C6.48 2 2 6.58 2 12.23a10.2 10.2 0 0 0 6.88 9.68c.5.1.68-.22.68-.49v-1.7c-2.8.62-3.39-1.22-3.39-1.22-.46-1.16-1.12-1.47-1.12-1.47-.92-.63.07-.62.07-.62 1.02.07 1.56 1.05 1.56 1.05.9 1.56 2.37 1.11 2.95.85.09-.66.35-1.11.64-1.37-2.24-.26-4.59-1.13-4.59-5.03 0-1.11.38-2.02 1.01-2.73-.1-.25-.44-1.27.1-2.64 0 0 .82-.26 2.69 1.01a9.21 9.21 0 0 1 4.9 0c1.87-1.27 2.69-1.01 2.69-1.01.54 1.37.2 2.39.1 2.64.63.71 1.01 1.62 1.01 2.73 0 3.91-2.35 4.77-4.59 5.03.36.31.68.93.68 1.87v2.77c0 .27.18.6.69.49A10.2 10.2 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
      </svg>
    ),
  },
  {
    name: 'Email',
    label: 'E-Mail',
    href: 'mailto:youngaileadersdortmund@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm0 2v.2l8 5.2 8-5.2V7H4Zm16 12V9.8l-7.2 4.7a1 1 0 0 1-.8 0L4 9.8V19h16Z" />
      </svg>
    ),
  },
];

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
            <p dangerouslySetInnerHTML={{ __html: t('about.description') }} />
          </div>
        </div>

        <div className="about-social-box">
          <h2 className="about-social-box__title">{t('about.socialBox.title')}</h2>
          <div className="about-social-links">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                className="about-social-link"
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
              >
                <span className="about-social-link__icon">{link.icon}</span>
                <span className="about-social-link__label">{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
