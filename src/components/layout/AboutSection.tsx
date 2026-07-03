import { useTranslation } from 'react-i18next';
import '../../App.css';

const socialLinks = [
  {
    name: 'LinkedIn',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/young-ai-leaders-dortmund/',
    icon: (
      <svg viewBox="11 12 35 35" aria-hidden="true" focusable="false">
        <path d="M33.099 26.441c-2.201 0-3.188 1.209-3.74 2.061v.041h-.027c.01-.012.02-.027.027-.041v-1.768h-4.15c.055 1.17 0 12.484 0 12.484h4.15v-6.973c0-.375.027-.744.137-1.012.301-.744.984-1.52 2.129-1.52 1.504 0 2.104 1.146 2.104 2.824v6.68h4.15V32.06c0-3.836-2.049-5.619-4.779-5.619z" />
        <path d="M20.864 20.712c-1.419 0-2.349.934-2.349 2.159 0 1.197.9 2.158 2.294 2.158h.027c1.447 0 2.348-.961 2.348-2.158 0-1.225-.873-2.159-2.293-2.159z" />
        <rect x="18.762" y="26.734" width="4.151" height="12.484" />
      </svg>
    ),
  },
  {
    name: 'Discord',
    label: 'Discord',
    href: 'https://discord.gg/QZBnSG7w9z',
    icon: (
      <svg viewBox="0 -2 24 24" aria-hidden="true" focusable="false">
        <path d="M19.27 5.33A17.1 17.1 0 0 0 15.04 4l-.2.37a15.65 15.65 0 0 1 3.92 1.86 13.66 13.66 0 0 0-10.96 0A15.9 15.9 0 0 1 11.72 4l-.2-.37a17.1 17.1 0 0 0-4.23 1.33C4.7 8.05 3.77 11.7 4.08 15.3a17.9 17.9 0 0 0 5.3 2.7l.42-.56a14.2 14.2 0 0 1-2.35-1.13l.18-.13a.88.88 0 0 0 .1-.08 11.8 11.8 0 0 0 9.75 0l.1.08.18.13a14.1 14.1 0 0 1-2.35 1.13l.42.56a17.9 17.9 0 0 0 5.3-2.7c.37-3.82-.44-7.47-2.3-9.97ZM9.36 13.35c-1.02 0-1.86-.95-1.86-2.12s.83-2.12 1.86-2.12c1.03 0 1.87.95 1.87 2.12s-.84 2.12-1.87 2.12Zm5.28 0c-1.02 0-1.86-.95-1.86-2.12s.83-2.12 1.86-2.12c1.03 0 1.87.95 1.87 2.12s-.84 2.12-1.87 2.12Z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/youngaileaders_dortmund/',
    icon: (
      <svg viewBox="11 12 35 35" aria-hidden="true" focusable="false">
        <circle cx="28.1" cy="30" r="4.4" />
        <path d="M33.6 19.2h-11c-1.6 0-3 .5-3.9 1.4-.9.9-1.4 2.3-1.4 3.9v11c0 1.6.5 3 1.5 4 1 .9 2.3 1.4 3.9 1.4h10.9c1.6 0 3-.5 3.9-1.4 1-.9 1.5-2.3 1.5-3.9v-11c0-1.6-.5-2.9-1.4-3.9-.9-.9-2.2-1.4-3.9-1.4zM28.1 36.8c-3.8 0-6.8-3.1-6.8-6.8 0-3.8 3.1-6.8 6.8-6.8S35 26.2 35 30c0 3.8-3.1 6.8-6.9 6.8zm7.1-12.3c-.9 0-1.6-.7-1.6-1.6s.7-1.6 1.6-1.6 1.6.7 1.6 1.6-.7 1.6-1.6 1.6z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    label: 'TikTok',
    href: 'https://www.tiktok.com/@youngaileaders_dortmund/',
    icon: (
      <svg viewBox="1 1 25 25" aria-hidden="true" focusable="false">
        <path d="M13.9 4a4.3 4.3 0 0 0 4.3 4.3V7.2a3.1 3.1 0 0 1-2.4-1.1 3.1 3.1 0 0 1-1.1-2.3h-1.9a4.3 4.3 0 0 0 1.1 3.1v8.1a4.5 4.5 0 1 0 4.5 4.5v-4.8a3.2 3.2 0 0 1-2.3-1.2 3.2 3.2 0 0 1-.2-3.2 3.2 3.2 0 0 1 2.5-1.5V8.7A5.4 5.4 0 0 1 13.9 4Z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    label: 'GitHub',
    href: 'https://github.com/youngaileadersdortmund',
    icon: (
      <svg viewBox="-91 49.217 56.693 56.693" aria-hidden="true" focusable="false">
        <path fillRule="evenodd" clipRule="evenodd" d="M-62.2607 54.1551c-13.6897 0-24.7909 11.0987-24.7909 24.7909 0 10.9532 7.1033 20.2458 16.9536 23.524 1.2388.2293 1.6938-.538 1.6938-1.1927 0-.5909-.0229-2.5441-.0337-4.6156-6.8968 1.4998-8.3521-2.925-8.3521-2.925-1.1277-2.8653-2.7526-3.6274-2.7526-3.6274-2.2495-1.5387.1695-1.507.1695-1.507 2.4892.1748 3.8002 2.555 3.8002 2.555 2.211 3.7897 5.7995 2.6941 7.2143 2.0606.2225-1.6021.8648-2.6961 1.574-3.3151-5.5065-.6266-11.2952-2.7526-11.2952-12.2517 0-2.7065.9686-4.9181 2.5546-6.6542-.2574-.6246-1.1061-3.1459.2402-6.5609 0 0 2.0819-.6659 6.819 2.5415 1.9777-.5494 4.0985-.8248 6.2052-.8345 2.1068.0097 4.2292.2851 6.2105.8345 4.7319-3.2075 6.8106-2.5415 6.8106-2.5415 1.3494 3.4149.5007 5.9362.2434 6.5609 1.5896 1.7361 2.5513 3.9477 2.5513 6.6542 0 9.522-5.7995 11.6183-11.32 12.2321.8892.7694 1.6814 2.278 1.6814 4.5908 0 3.3171-.0285 5.9867-.0285 6.8034 0 .6599.4462 1.4329 1.7026 1.1895 9.8451-3.2818 16.9395-12.5712 16.9395-23.5208C-37.4698 65.2538-48.5693 54.1551-62.2607 54.1551z" />
      </svg>
    ),
  },
  {
    name: 'Email',
    label: 'E-Mail',
    href: 'mailto:youngaileadersdortmund@gmail.com',
    icon: (
      <svg viewBox="10 8 35 35" aria-hidden="true" focusable="false">
        <polygon points="29.3938,31.666 39.309,38.5604 39.309,24.8362 34.9235,27.8569 "/>
        <path d="M28.3421,32.2622c-0.1196,0-0.2391-0.0359-0.3419-0.1073l-0.1786-0.1244l-10.1835,7.0811h21.4153l-10.1863-7.0829
          C28.8671,32.0287,28.4607,32.2622,28.3421,32.2622z"/>
        <polygon points="40.858,18.1176 40.8587,18.117 40.8565,18.1187 "/>
        <polygon points="39.037,18.7154 17.7191,18.7154 28.3432,26.5924 "/>
        <polygon points="27.2877,31.659 17.382,24.8359 17.3764,38.5647 27.2976,31.666 "/>
        {/* <polygon points="29.3938,31.666 39.309,38.5604 39.309,24.8362 34.9235,27.8569" />
        <path d="M28.3421 32.2622c-.1196 0-.2391-.0359-.3419-.1073l-.1786-.1244-10.1835 7.0811h21.4153l-10.1863-7.0829C28.8671 32.0287 28.4607 32.2622 28.3421 32.2622z" />
        <polygon points="40.858,18.1176 40.8587,18.117 40.8565,18.1187" />
        <polygon points="39.037,18.7154 17.7191,18.7154 28.3432,26.5924" />
        <polygon points="27.2877,31.659 17.382,24.8359 17.3764,38.5647 27.2976,31.666" /> */}
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
