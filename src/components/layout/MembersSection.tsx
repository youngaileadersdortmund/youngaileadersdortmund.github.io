import { useTranslation } from 'react-i18next';
import '../../App.css';

const members = [
  {
    name: 'Raphael Fischer',
    image: new URL('../../../members/Raphael.png', import.meta.url).href,
    linkedinUrl: 'https://www.linkedin.com/in/raphael-fischer-3b1046208/',
  },
  {
    name: 'Nico Koltermann',
    image: new URL('../../../members/Nico.png', import.meta.url).href,
    linkedinUrl: 'https://www.linkedin.com/in/nico-koltermann/',
  },
  {
    name: 'Bahavathy Kathirgamanathan',
    image: new URL('../../../members/Bahavathy.png', import.meta.url).href,
    linkedinUrl: 'https://www.linkedin.com/in/bahavathy-kathirgamanathan/',
  },
  {
    name: 'Celine Wald',
    image: new URL('../../../members/Celine.png', import.meta.url).href,
    linkedinUrl: 'https://de.linkedin.com/in/celine-wald-b3715b378',
  },
  {
    name: 'Philip Varghese Modayil',
    image: new URL('../../../members/Philip.png', import.meta.url).href,
    linkedinUrl: 'https://de.linkedin.com/in/philipmodayil',
  },
  {
    name: 'Tareq Khouja',
    image: new URL('../../../members/Tareq.png', import.meta.url).href,
    linkedinUrl: 'https://de.linkedin.com/in/tareq-khouja',
  },
];

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M6.94 8.99H3.72v10.32h3.22V8.99ZM5.33 4.04a1.86 1.86 0 1 0 0 3.72 1.86 1.86 0 0 0 0-3.72Zm13.9 9.36c0-3.1-1.65-4.54-3.86-4.54a3.33 3.33 0 0 0-3 1.65h-.05V8.99H9.24v10.32h3.21v-5.1c0-1.35.26-2.65 1.93-2.65 1.64 0 1.66 1.53 1.66 2.73v5.02h3.2V13.4Z" />
    </svg>
  );
}

function MembersSection() {
  const { t } = useTranslation();

  return (
    <section id="members" className="members-section">
      <div className="members-container">
        <div className="members-label">{t('members.label')}</div>
        <h2 className="members-headline">{t('members.headline')}</h2>

        <div className="members-grid">
          {members.map((member) => (
            <article className="member-card" key={member.name}>
              <div className="member-photo-wrap">
                <img src={member.image} alt={member.name} className="member-photo" loading="lazy" />
              </div>
              <div className="member-card-body">
                <div>
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-position">{t('members.position')}</p>
                </div>
                <a
                  className="member-linkedin"
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t('members.linkedinLabel', { name: member.name })}
                >
                  <LinkedinIcon />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MembersSection;
