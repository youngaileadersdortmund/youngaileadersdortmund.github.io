interface Env {
  RESEND_API_KEY: string;
  RESEND_EMAIL: string;
  FROM_EMAIL: string;
  ALLOWED_ORIGINS?: string;
  TO_EMAIL?: string;
}

const MAX_CV_BYTES = 5 * 1024 * 1024;
const HUB_NAME = 'Young AI Leaders - Dortmund Hub';
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
    const allowed = (env.ALLOWED_ORIGINS ?? '').split(',').map((s) => s.trim()).filter(Boolean);
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

    const recipientEmail = env.RESEND_EMAIL || env.TO_EMAIL;
    if (!env.RESEND_API_KEY || !recipientEmail || !env.FROM_EMAIL) {
      return json({ error: 'Email service is not configured' }, 500, cors);
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

    const html = buildApplicationEmailHtml({ name, email, dob, description, cv });
    const text = buildApplicationEmailText({ name, email, dob, description, cv });

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.FROM_EMAIL,
        to: [recipientEmail],
        reply_to: email,
        subject: `[YAIL Dortmund] Application from ${name}`,
        html,
        text,
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

function str(v: unknown): string {
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

function buildApplicationEmailHtml({
  name,
  email,
  dob,
  description,
  cv,
}: {
  name: string;
  email: string;
  dob: string;
  description: string;
  cv: File;
}): string {
  const safeName = esc(name);
  const safeEmail = esc(email);
  const safeDob = esc(formatDate(dob));
  const safeDescription = esc(description).replace(/\n/g, '<br>');
  const safeCvName = esc(cv.name);
  const safeCvSize = esc(formatFileSize(cv.size));
  const submittedAt = esc(formatSubmittedAt());

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>New application</title>
  </head>
  <body style="margin:0;padding:0;background:#fffcf9;color:#111111;font-family:'Google Sans',Arial,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;color:transparent;opacity:0;">
      New Young AI Leaders Dortmund Hub application from ${safeName}.
    </div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;background:#fffcf9;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;max-width:680px;background:#ffffff;border:1px solid rgba(0,0,0,0.12);border-radius:16px;overflow:hidden;box-shadow:0 18px 60px rgba(0,0,0,0.10);">
            <tr>
              <td style="height:8px;background:linear-gradient(90deg,#52b49b 0%,#f3e939 34%,#eda913 66%,#c5227b 100%);font-size:1px;line-height:1px;">&nbsp;</td>
            </tr>
            <tr>
              <td style="padding:34px 36px 26px;background:#ffffff;">
                <p style="margin:0 0 10px;color:#c5227b;font-size:12px;font-weight:800;letter-spacing:1.2px;text-transform:uppercase;">Join the Hub</p>
                <h1 style="margin:0;color:#111111;font-size:30px;line-height:1.15;font-weight:800;letter-spacing:0;">New application received</h1>
                <p style="margin:14px 0 0;color:#5f5f5f;font-size:16px;line-height:1.65;">Someone just applied to become part of ${HUB_NAME}. The CV is attached to this email.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 36px 26px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;background:#fbedf5;border:1px solid rgba(197,34,123,0.22);border-radius:12px;">
                  <tr>
                    <td style="padding:22px;">
                      <p style="margin:0 0 4px;color:#5f5f5f;font-size:13px;font-weight:700;">Applicant</p>
                      <p style="margin:0;color:#111111;font-size:24px;line-height:1.25;font-weight:800;">${safeName}</p>
                      <p style="margin:12px 0 0;color:#5f5f5f;font-size:15px;line-height:1.5;">
                        <a href="mailto:${safeEmail}" style="color:#c5227b;font-weight:800;text-decoration:none;">${safeEmail}</a>
                      </p>
                    </td>
                    <td width="150" valign="top" style="padding:22px;text-align:right;">
                      <span style="display:inline-block;padding:8px 12px;border-radius:999px;background:#eef8f5;color:#237967;font-size:13px;font-weight:800;">${safeCvSize} CV</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 36px 28px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;">
                  <tr>
                    <td valign="top" style="width:50%;padding:0 10px 14px 0;">
                      <p style="margin:0 0 7px;color:#828282;font-size:12px;font-weight:800;letter-spacing:0.9px;text-transform:uppercase;">Date of birth</p>
                      <p style="margin:0;color:#111111;font-size:16px;font-weight:700;">${safeDob}</p>
                    </td>
                    <td valign="top" style="width:50%;padding:0 0 14px 10px;">
                      <p style="margin:0 0 7px;color:#828282;font-size:12px;font-weight:800;letter-spacing:0.9px;text-transform:uppercase;">Submitted</p>
                      <p style="margin:0;color:#111111;font-size:16px;font-weight:700;">${submittedAt}</p>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" style="padding-top:14px;border-top:1px solid rgba(0,0,0,0.10);">
                      <p style="margin:0 0 7px;color:#828282;font-size:12px;font-weight:800;letter-spacing:0.9px;text-transform:uppercase;">Attached CV</p>
                      <p style="margin:0;color:#111111;font-size:16px;line-height:1.5;font-weight:700;">${safeCvName}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 36px 34px;">
                <div style="padding:24px;background:#fff7ef;border:1px solid rgba(0,0,0,0.10);border-radius:12px;">
                  <p style="margin:0 0 12px;color:#c5227b;font-size:12px;font-weight:800;letter-spacing:0.9px;text-transform:uppercase;">About the applicant</p>
                  <p style="margin:0;color:#111111;font-size:16px;line-height:1.72;">${safeDescription}</p>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 36px 36px;">
                <a href="mailto:${safeEmail}?subject=${encodeURIComponent(`Re: Your ${HUB_NAME} application`)}" style="display:inline-block;padding:14px 22px;border-radius:999px;background:#c5227b;color:#ffffff;font-size:15px;font-weight:800;text-decoration:none;">Reply to applicant</a>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 36px;background:#000000;color:rgba(255,255,255,0.78);">
                <p style="margin:0;color:#ffffff;font-size:15px;font-weight:800;">${HUB_NAME}</p>
                <p style="margin:6px 0 0;color:rgba(255,255,255,0.58);font-size:13px;line-height:1.5;">Responsible AI community in Dortmund and the Ruhr region.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildApplicationEmailText({
  name,
  email,
  dob,
  description,
  cv,
}: {
  name: string;
  email: string;
  dob: string;
  description: string;
  cv: File;
}): string {
  return [
    `${HUB_NAME} - New application`,
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Date of birth: ${formatDate(dob)}`,
    `Attached CV: ${cv.name} (${formatFileSize(cv.size)})`,
    `Submitted: ${formatSubmittedAt()}`,
    '',
    'About the applicant:',
    description,
  ].join('\n');
}

function formatDate(value: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return value;
  const [, year, month, day] = match;
  return `${day}.${month}.${year}`;
}

function formatSubmittedAt(): string {
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Europe/Berlin',
  }).format(new Date());
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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
