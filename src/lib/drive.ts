export interface DriveEvent {
  id: string;
  image: string;
  title: { de: string; en: string };
  description: { de: string; en: string };
  modifiedTime?: string;
}

interface DriveFile {
  id: string;
  name: string;
  description?: string;
  modifiedTime?: string;
}

interface DriveListResponse {
  files?: DriveFile[];
}

const FOLDER_ID = import.meta.env.VITE_GOOGLE_DRIVE_FOLDER_ID as string | undefined;
const API_KEY = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY as string | undefined;

export function isDriveConfigured(): boolean {
  return Boolean(FOLDER_ID && API_KEY);
}

function imageUrl(fileId: string): string {
  // lh3.googleusercontent.com hotlinks are currently the most reliable embed
  // for public Drive images. `=w1600` requests a width-bounded render.
  return `https://lh3.googleusercontent.com/d/${fileId}=w1600`;
}

function stripExt(name: string): string {
  return name.replace(/\.[^.]+$/, '');
}

function pickLangPair(
  value: unknown,
  defaultDe: string,
  defaultEn: string,
): { de: string; en: string } {
  if (value && typeof value === 'object') {
    const v = value as { de?: unknown; en?: unknown };
    const de = typeof v.de === 'string' && v.de ? v.de : null;
    const en = typeof v.en === 'string' && v.en ? v.en : null;
    return {
      de: de ?? en ?? defaultDe,
      en: en ?? de ?? defaultEn,
    };
  }
  return { de: defaultDe, en: defaultEn };
}

function parseMetadata(file: DriveFile): Pick<DriveEvent, 'title' | 'description'> {
  const fallbackTitle = stripExt(file.name);
  const raw = (file.description ?? '').trim();

  if (!raw) {
    return {
      title: { de: fallbackTitle, en: fallbackTitle },
      description: { de: '', en: '' },
    };
  }

  // Try JSON shape: { title?: {de,en}, description?: {de,en} }
  // Accept partial shapes — fall back per-field instead of dumping the raw JSON.
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      return {
        title: pickLangPair(parsed.title, fallbackTitle, fallbackTitle),
        description: pickLangPair(parsed.description, '', ''),
      };
    }
  } catch {
    // not JSON — treat as raw text below
  }

  return {
    title: { de: fallbackTitle, en: fallbackTitle },
    description: { de: raw, en: raw },
  };
}

export async function fetchDriveEvents(signal?: AbortSignal): Promise<DriveEvent[]> {
  if (!isDriveConfigured()) return [];

  const url = new URL('https://www.googleapis.com/drive/v3/files');
  url.searchParams.set('q', `'${FOLDER_ID}' in parents and mimeType contains 'image/' and trashed = false`);
  url.searchParams.set('fields', 'files(id,name,description,modifiedTime)');
  url.searchParams.set('orderBy', 'modifiedTime desc');
  url.searchParams.set('pageSize', '50');
  url.searchParams.set('key', API_KEY!);

  const res = await fetch(url.toString(), { signal });
  if (!res.ok) {
    throw new Error(`Drive API ${res.status}: ${await res.text()}`);
  }

  const data = (await res.json()) as DriveListResponse;
  const files = data.files ?? [];

  return files.map((file) => ({
    id: file.id,
    image: imageUrl(file.id),
    modifiedTime: file.modifiedTime,
    ...parseMetadata(file),
  }));
}
