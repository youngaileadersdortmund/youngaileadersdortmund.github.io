import { useTranslation } from 'react-i18next';
import '../../App.css';

const members = [
  {
    name: 'Raphael Fischer',
    image: new URL('../../../members/1.png', import.meta.url).href,
    url: 'https://aiforgood.itu.int/speaker/raphael-fischer/'
  },
  {
    name: 'Nico Koltermann',
    image: new URL('../../../members/2.png', import.meta.url).href,
    url: 'https://aiforgood.itu.int/speaker/nico-koltermann/'
  },
  {
    name: 'Bahavathy Kathirgamanathan',
    image: new URL('../../../members/3.png', import.meta.url).href,
    url: 'https://aiforgood.itu.int/speaker/bahavathy-kathirgamanathan/'
  },
  {
    name: 'Adrian Orego',
    image: new URL('../../../members/4.png', import.meta.url).href,
    url: 'https://aiforgood.itu.int/speaker/adrian-orego/'
  },
  {
    name: 'Louisa von Essen',
    image: new URL('../../../members/5.png', import.meta.url).href,
    url: 'https://aiforgood.itu.int/speaker/louisa-von-essen/'
  },
  {
    name: 'Lea Busse',
    image: new URL('../../../members/6.png', import.meta.url).href,
    url: 'https://aiforgood.itu.int/speaker/lea-busse/'
  },
  {
    name: 'Tareq Khouja',
    image: new URL('../../../members/7.png', import.meta.url).href,
    url: 'https://aiforgood.itu.int/speaker/tareq-khouja/'
  },
  {
    name: 'Celine Wald',
    image: new URL('../../../members/8.png', import.meta.url).href,
    url: 'https://aiforgood.itu.int/speaker/celine-wald/'
  },
  {
    name: 'Youssef Abdelrahim',
    image: new URL('../../../members/9.png', import.meta.url).href,
    url: 'https://aiforgood.itu.int/speaker/youssef-abdelrahim/'
  },
  {
    name: 'Philip Modayil',
    image: new URL('../../../members/10.png', import.meta.url).href,
    url: 'https://aiforgood.itu.int/speaker/philip-modayil/'
  },
  {
    name: 'Grigorii Iakovlev',
    image: new URL('../../../members/11.png', import.meta.url).href,
    url: 'https://aiforgood.itu.int/speaker/grigorii-iakovlev/'
  },
  {
    name: 'Hendrik Weißenfels',
    image: new URL('../../../members/12.png', import.meta.url).href,
    url: 'https://aiforgood.itu.int/speaker/hendrik-weisenfels/'
  },
  {
    name: 'Robin Stecher',
    image: new URL('../../../members/13.png', import.meta.url).href,
    url: 'https://aiforgood.itu.int/speaker/robin-stecher/'
  },
  {
    name: 'Shreya Sunil',
    image: new URL('../../../members/14.png', import.meta.url).href,
    url: 'https://aiforgood.itu.int/speaker/shreya-sunil/'
  },
  {
    name: 'Lukas Claes',
    image: new URL('../../../members/15.png', import.meta.url).href,
    url: 'https://aiforgood.itu.int/speaker/lukas-claes/'
  },
  {
    name: 'Jannis Becktepe',
    image: new URL('../../../members/16.png', import.meta.url).href,
    url: 'https://aiforgood.itu.int/speaker/jannis-becktepe/'
  },
  {
    name: 'Ghassan Al Dahik',
    image: new URL('../../../members/17.png', import.meta.url).href,
    url: 'https://aiforgood.itu.int/speaker/ghassan-al-dahik/'
  },
  {
    name: 'Rean Clive Fernandes',
    image: new URL('../../../members/18.png', import.meta.url).href,
    url: 'https://aiforgood.itu.int/speaker/rean-clive-fernandes/'
  }
];

function WebIcon() {
  return (
    // <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    //   <path d="M6.94 8.99H3.72v10.32h3.22V8.99ZM5.33 4.04a1.86 1.86 0 1 0 0 3.72 1.86 1.86 0 0 0 0-3.72Zm13.9 9.36c0-3.1-1.65-4.54-3.86-4.54a3.33 3.33 0 0 0-3 1.65h-.05V8.99H9.24v10.32h3.21v-5.1c0-1.35.26-2.65 1.93-2.65 1.64 0 1.66 1.53 1.66 2.73v5.02h3.2V13.4Z" />
    // </svg> // LinkedIn
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm7.93 9h-3.06a15.7 15.7 0 0 0-1.38-5.03A8.03 8.03 0 0 1 19.93 11ZM12 4.07c.83 1.2 1.86 3.42 2.18 6.93H9.82C10.14 7.49 11.17 5.27 12 4.07ZM4.07 13h3.06c.12 1.8.58 3.53 1.38 5.03A8.03 8.03 0 0 1 4.07 13Zm3.06-2H4.07a8.03 8.03 0 0 1 4.44-5.03A15.7 15.7 0 0 0 7.13 11Zm1.99 0c.36-3.8 1.52-6.42 2.88-7.93 1.36 1.51 2.52 4.13 2.88 7.93H9.12ZM12 19.93c-.83-1.2-1.86-3.42-2.18-6.93h4.36c-.32 3.51-1.35 5.73-2.18 6.93ZM14.88 13c-.36 3.8-1.52 6.42-2.88 7.93-1.36-1.51-2.52-4.13-2.88-7.93h5.76Zm.61 5.03A15.7 15.7 0 0 0 16.87 13h3.06a8.03 8.03 0 0 1-4.44 5.03Z"/>
    </svg> // generic web
  );
}

function getMemberPosition(image: string) {
  if (image.endsWith('1.png')) return 'Hub Leader';
  if (image.endsWith('2.png')) return 'Impact Lead';
  if (image.endsWith('3.png')) return 'Regional Lead';
  return 'Member';
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
                  <p className="member-position">{getMemberPosition(member.image)}</p>
                </div>
                <a
                  className="member-linkedin"
                  href={member.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t('members.linkedinLabel', { name: member.name })}
                >
                  <WebIcon />
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
