import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getFallbackEvents, type EventItem } from '../../data/events';
import { fetchCalendarEvents } from '../../lib/calendar';
import '../../App.css';

const SLIDE_INTERVAL_MS = 5000;

function EventsCarousel() {
  const { t } = useTranslation();

  const events = useMemo<EventItem[]>(() => getFallbackEvents(), []);

  const [upcomingEvents, setUpcomingEvents] = useState<EventItem[]>([]);
  const [calendarStatus, setCalendarStatus] = useState<'loading' | 'ready'>('loading');
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  const count = events.length;

  useEffect(() => {
    let isMounted = true;

    fetchCalendarEvents()
      .then((items) => {
        if (!isMounted) return;
        setUpcomingEvents(items);
        setCalendarStatus('ready');
      })
      .catch((error) => {
        if (!isMounted) return;
        console.error('Google Calendar fetch failed:', error);
        setUpcomingEvents([]);
        setCalendarStatus('ready');
      });

    return () => {
      isMounted = false;
    };
  }, []);

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

        <div className="events-upcoming-stack">
          {upcomingEvents.length > 0 ? (
          <div className="events-upcoming-list" aria-live="polite">
            {upcomingEvents.map((event) => (
              <p key={event.id} className="events-upcoming-item">
                {event.description}: {event.title}
              </p>
            ))}
          </div>
          ) : (
            calendarStatus === 'ready' && (
              <p className="events-upcoming-empty">{t('events.empty')}</p>
            )
          )}
          <p className="events-discord-link">
            {t('events.moreInfoDiscord')}{' '}
            <a
              className="events-discord-link-anchor"
              href="https://discord.gg/FUF2tz5hc3"
              target="_blank"
              rel="noreferrer"
            >
              Discord
            </a>
          </p>
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
                <h3 className="events-title">{t('events.pastEvent', { title: event.title })}</h3>
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
