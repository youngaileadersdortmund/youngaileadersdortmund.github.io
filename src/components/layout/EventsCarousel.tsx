import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getFallbackEvents, type EventItem } from '../../data/events';
import { fetchDriveEvents, isDriveConfigured, type DriveEvent } from '../../lib/drive';
import '../../App.css';

const SLIDE_INTERVAL_MS = 5000;

type Lang = 'de' | 'en';

function driveToEventItems(drive: DriveEvent[], lang: Lang): EventItem[] {
  return drive.map((d) => ({
    id: d.id,
    image: d.image,
    title: d.title[lang] || d.title.de || d.title.en,
    description: d.description[lang] || d.description.de || d.description.en || '',
  }));
}

function EventsCarousel() {
  const { t, i18n } = useTranslation();
  const lang: Lang = i18n.language.startsWith('en') ? 'en' : 'de';

  const fallback = useMemo(() => getFallbackEvents(t), [t, i18n.language]);
  const [driveCache, setDriveCache] = useState<DriveEvent[] | null>(null);

  const events: EventItem[] = useMemo(() => {
    if (driveCache && driveCache.length > 0) return driveToEventItems(driveCache, lang);
    return fallback;
  }, [driveCache, fallback, lang]);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  const count = events.length;

  useEffect(() => {
    if (!isDriveConfigured()) return;
    const controller = new AbortController();
    fetchDriveEvents(controller.signal)
      .then((items) => {
        if (items.length > 0) setDriveCache(items);
      })
      .catch((err) => {
        if ((err as { name?: string })?.name !== 'AbortError') {
          console.warn('[EventsCarousel] Drive fetch failed, using fallback:', err);
        }
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (index >= count) setIndex(0);
  }, [count, index]);

  const goTo = useCallback((next: number) => {
    setIndex(((next % count) + count) % count);
  }, [count]);

  useEffect(() => {
    if (paused || count <= 1) return;
    timerRef.current = window.setTimeout(() => {
      setIndex((i) => (i + 1) % count);
    }, SLIDE_INTERVAL_MS);
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, [index, paused, count]);

  if (count === 0) return null;

  return (
    <section
      id="events"
      className="events-section"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="events-container">
        <div className="events-header">
          <h2 className="events-headline">{t('events.headline')}</h2>
        </div>
        <div className="events-viewport">
          {events.map((event, i) => (
            <article
              key={event.id}
              className={`events-slide ${i === index ? 'is-active' : ''}`}
              aria-hidden={i !== index}
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${count}`}
            >
              <div className="events-image-wrap">
                <img src={event.image} alt={event.title} loading="lazy" referrerPolicy="no-referrer" />
              </div>
              <div className="events-caption">
                <h3 className="events-title">{event.title}</h3>
                {event.description && <p className="events-description">{event.description}</p>}
              </div>
            </article>
          ))}

          {count > 1 && (
            <>
              <button
                className="events-nav events-nav-prev"
                type="button"
                onClick={() => goTo(index - 1)}
                aria-label={t('events.prev')}
              >
                &#8249;
              </button>
              <button
                className="events-nav events-nav-next"
                type="button"
                onClick={() => goTo(index + 1)}
                aria-label={t('events.next')}
              >
                &#8250;
              </button>
            </>
          )}
        </div>

        {count > 1 && (
          <div className="events-dots" role="tablist">
            {events.map((event, i) => (
              <button
                key={event.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`${t('events.goTo')} ${i + 1}`}
                className={`events-dot ${i === index ? 'is-active' : ''}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default EventsCarousel;
