import type { EventItem } from '../data/events';

interface CalendarEventResponse {
  items?: Array<{
    id?: string;
    summary?: string;
    description?: string;
    location?: string;
    start?: { dateTime?: string; date?: string };
    end?: { dateTime?: string; date?: string };
  }>;
}

const CALENDAR_ID = import.meta.env.VITE_GOOGLE_CALENDAR_ID as string | undefined;
const API_KEY = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY as string | undefined;

function normalizeCalendarId(value: string): string {
  const trimmed = value.trim();

  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const url = new URL(trimmed);
      const cid = url.searchParams.get('cid');
      if (cid) {
        const base64 = cid.replace(/-/g, '+').replace(/_/g, '/');
        try {
          return decodeURIComponent(escape(atob(base64)));
        } catch {
          return cid;
        }
      }
    } catch {
      // fall through to the original input below
    }
  }

  return trimmed;
}

const eventImages = Object.values(
  import.meta.glob('/public/events/*.{jpg,jpeg,png}', {
    eager: true,
    import: 'default',
  }) as Record<string, string>,
);

function formatEventDate(value?: string): string {
  if (!value) return 'Date TBD';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Date TBD';

  return date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function isCalendarConfigured(): boolean {
  return Boolean(CALENDAR_ID && API_KEY);
}

function getCalendarId(): string | undefined {
  return CALENDAR_ID ? normalizeCalendarId(CALENDAR_ID) : undefined;
}

export async function fetchCalendarEvents(signal?: AbortSignal): Promise<EventItem[]> {
  if (!isCalendarConfigured()) {
    console.warn('Google Calendar is not configured. Missing VITE_GOOGLE_CALENDAR_ID or VITE_GOOGLE_CALENDAR_API_KEY.');
    return [];
  }

  const calendarId = getCalendarId();
  if (!calendarId) {
    console.warn('Google Calendar ID could not be resolved.');
    return [];
  }

  const url = new URL(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`);
  url.searchParams.set('key', API_KEY!);
  url.searchParams.set('maxResults', '3');
  url.searchParams.set('singleEvents', 'true');
  url.searchParams.set('orderBy', 'startTime');
  url.searchParams.set('timeMin', new Date().toISOString());
  url.searchParams.set('timeZone', 'Europe/Berlin');

  console.debug('Google Calendar request', {
    calendarId,
    apiKeyLength: API_KEY?.length ?? 0,
    url: url.toString(),
  });

  const res = await fetch(url.toString(), { signal });
  const bodyText = await res.text();

  if (!res.ok) {
    console.error('Google Calendar API error', {
      status: res.status,
      body: bodyText,
      calendarId,
    });
    throw new Error(`Calendar API ${res.status}: ${bodyText}`);
  }

  const data = JSON.parse(bodyText) as CalendarEventResponse;
  const items = data.items ?? [];

  console.debug('Google Calendar returned items', items.length);

  return items.slice(0, 3).map((item, index) => ({
    id: item.id ?? `calendar-${index}`,
    image: eventImages[index % eventImages.length] ?? '/events/default.jpg',
    title: item.summary || 'Upcoming event',
    description: formatEventDate(item.start?.dateTime || item.start?.date),
  }));
}
