interface Env {
  RESEND_API_KEY: string;
  FROM_EMAIL: string;
  TO_EMAIL: string;
  ALLOWED_ORIGINS: string;
}

const MAX_CV_BYTES = 5 * 1024 * 1024;
const ALLOWED_CV_EXT = /\.(pdf|docx?)$/i;
const ALLOWED_CV_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get('Origin') ?? '';
    const allowed = env.ALLOWED_ORIGINS.split(',').map((s) => s.trim()).filter(Boolean);
    const isAllowed = Boolean(origin) && allowed.includes(origin);

    // Only echo ACAO when the origin actually matches. Echoing a different
    // allowed origin would leak our prod origin and confuse strict CORS clients.
    const cors: Record<string, string> = {
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin',
    };
    if (isAllowed) cors['Access-Control-Allow-Origin'] = origin;

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }
    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405, cors);
    }
    if (!isAllowed) {
      return json({ error: 'Origin not allowed' }, 403, cors);
    }

    let form: FormData;
    try {
      form = await request.formData();
    } catch {
      return json({ error: 'Invalid form data' }, 400, cors);
    }

    const name = str(form.get('name'));
    const email = str(form.get('email'));
    const dob = str(form.get('dob'));
    const description = str(form.get('description'));
    const cv = form.get('cv');

    if (!name || !email || !dob || !description) {
      return json({ error: 'Missing required fields' }, 400, cors);
    }
    if (!EMAIL_RE.test(email)) {
      return json({ error: 'Invalid email' }, 400, cors);
    }
    if (!(cv instanceof File)) {
      return json({ error: 'Missing CV' }, 400, cors);
    }
    if (cv.size === 0) {
      return json({ error: 'CV is empty' }, 400, cors);
    }
    if (cv.size > MAX_CV_BYTES) {
      return json({ error: 'CV too large' }, 413, cors);
    }
    const okType = ALLOWED_CV_TYPES.has(cv.type) || ALLOWED_CV_EXT.test(cv.name);
    if (!okType) {
      return json({ error: 'CV type not allowed' }, 415, cors);
    }

    const buf = await cv.arrayBuffer();
    const attachment = arrayBufferToBase64(buf);

    const html = `
      <h2>New Young AI Leaders application</h2>
      <p><strong>Name:</strong> ${esc(name)}</p>
      <p><strong>Email:</strong> <a href="mailto:${esc(email)}">${esc(email)}</a></p>
      <p><strong>Date of birth:</strong> ${esc(dob)}</p>
      <h3>About the applicant</h3>
      <p>${esc(description).replace(/\n/g, '<br>')}</p>
    `;

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.FROM_EMAIL,
        to: [env.TO_EMAIL],
        reply_to: email,
        subject: `[YAL Dortmund] Application from ${name}`,
        html,
        attachments: [{ filename: cv.name, content: attachment }],
      }),
    });

    if (!resendRes.ok) {
      const text = await resendRes.text().catch(() => '');
      return json({ error: 'Email service rejected the request', detail: text }, 502, cors);
    }

    return json({ ok: true }, 200, cors);
  },
};

function str(v: FormDataEntryValue | null): string {
  return typeof v === 'string' ? v.trim() : '';
}

function json(body: unknown, status: number, headers: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });
}

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string
  );
}

function arrayBufferToBase64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode.apply(
      null,
      Array.from(bytes.subarray(i, i + chunkSize)) as unknown as number[]
    );
  }
  return btoa(binary);
}
