import { useMemo, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import '../../App.css';

const MAX_WORDS = 250;
const MAX_CV_BYTES = 5 * 1024 * 1024;
const ALLOWED_CV_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const ALLOWED_CV_EXT = /\.(pdf|docx?|DOCX?|PDF)$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;

function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

function ageInYears(dob: string): number | null {
  // Parse YYYY-MM-DD as a local calendar date — `new Date('YYYY-MM-DD')` would
  // be UTC midnight, which shifts the day in non-UTC timezones and produces
  // off-by-one ages near the birthday.
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dob);
  if (!match) return null;
  const [, y, m, d] = match;
  const birth = new Date(Number(y), Number(m) - 1, Number(d));
  if (Number.isNaN(birth.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) age -= 1;
  return age;
}

type Errors = Partial<Record<'name' | 'email' | 'dob' | 'description' | 'cv', string>>;
type Status = 'idle' | 'submitting' | 'success' | 'error';

function JoinSection() {
  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [description, setDescription] = useState('');
  const [cv, setCv] = useState<File | null>(null);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const wordCount = useMemo(() => countWords(description), [description]);
  const wordOver = wordCount > MAX_WORDS;

  function validate(): Errors {
    const next: Errors = {};
    if (!name.trim()) next.name = t('join.errors.nameRequired');

    const trimmedEmail = email.trim();
    if (!trimmedEmail) next.email = t('join.errors.emailRequired');
    else if (!EMAIL_RE.test(trimmedEmail)) next.email = t('join.errors.emailInvalid');

    if (!dob) next.dob = t('join.errors.dobRequired');
    else {
      const age = ageInYears(dob);
      if (age === null || age < 18 || age > 30) next.dob = t('join.errors.dobAge');
    }

    if (!description.trim()) next.description = t('join.errors.descriptionRequired');
    else if (wordOver) next.description = t('join.errors.descriptionTooLong');

    if (!cv) next.cv = t('join.errors.cvRequired');
    else {
      const okType = ALLOWED_CV_TYPES.includes(cv.type) || ALLOWED_CV_EXT.test(cv.name);
      if (!okType) next.cv = t('join.errors.cvType');
      else if (cv.size > MAX_CV_BYTES) next.cv = t('join.errors.cvSize');
    }

    return next;
  }

  function validateEmailField(value: string): string | undefined {
    const v = value.trim();
    if (!v) return t('join.errors.emailRequired');
    if (!EMAIL_RE.test(v)) return t('join.errors.emailInvalid');
    return undefined;
  }

  function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setEmail(v);
    if (errors.email && !validateEmailField(v)) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  }

  function handleEmailBlur() {
    setErrors((prev) => ({ ...prev, email: validateEmailField(email) }));
  }

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setCv(file);
    if (errors.cv) setErrors((prev) => ({ ...prev, cv: undefined }));
  }

  function resetForm() {
    setName('');
    setEmail('');
    setDob('');
    setDescription('');
    setCv(null);
    setHoneypot('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (honeypot) return; // bot — silently drop
    const next = validate();
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;

    setStatus('submitting');
    try {
      if (!FORM_ENDPOINT) {
        // In production we refuse to fake success — silent data loss would be
        // catastrophic if the env var is forgotten on deploy. In dev we still
        // log + fake success so the UX is testable without the worker.
        if (import.meta.env.PROD) {
          console.error('[JoinSection] VITE_FORM_ENDPOINT not configured in production build.');
          setStatus('error');
          return;
        }
        console.warn('[JoinSection] VITE_FORM_ENDPOINT not configured — logging payload only.');
        console.log({ name, email, dob, description, cv });
        await new Promise((r) => setTimeout(r, 600));
        setStatus('success');
        resetForm();
        return;
      }

      const fd = new FormData();
      fd.append('name', name);
      fd.append('email', email);
      fd.append('dob', dob);
      fd.append('description', description);
      if (cv) fd.append('cv', cv, cv.name);

      const res = await fetch(FORM_ENDPOINT, { method: 'POST', body: fd });
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`Submit failed (${res.status}): ${text}`);
      }
      setStatus('success');
      resetForm();
    } catch (err) {
      console.error('[JoinSection] submit failed', err);
      setStatus('error');
    }
  }

  return (
    <section id="join" className="join-section">
      <div className="join-container">
        <div className="join-label">{t('join.label')}</div>
        <h2 className="join-headline">{t('join.headline')}</h2>
        <p
          className="join-intro"
          dangerouslySetInnerHTML={{ __html: t('join.intro') }}
        />

        {status === 'success' ? (
          <div className="join-success" role="status">{t('join.success')}</div>
        ) : (
          <form className="join-form" onSubmit={handleSubmit} noValidate>
            {/* honeypot — visually hidden, real users never see/fill this */}
            <div className="join-honeypot" aria-hidden="true">
              <label htmlFor="join-website">Website</label>
              <input
                id="join-website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <div className="join-row">
              <div className="join-field">
                <label htmlFor="join-name">{t('join.fields.name')}</label>
                <input
                  id="join-name"
                  type="text"
                  value={name}
                  placeholder={t('join.placeholders.name')}
                  onChange={(e) => setName(e.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'join-name-error' : undefined}
                  autoComplete="name"
                />
                {errors.name && (
                  <span id="join-name-error" className="join-error">{errors.name}</span>
                )}
              </div>

              <div className="join-field">
                <label htmlFor="join-email">{t('join.fields.email')}</label>
                <input
                  id="join-email"
                  type="email"
                  inputMode="email"
                  value={email}
                  placeholder={t('join.placeholders.email')}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'join-email-error' : undefined}
                  autoComplete="email"
                />
                {errors.email && (
                  <span id="join-email-error" className="join-error">{errors.email}</span>
                )}
              </div>
            </div>

            <div className="join-field">
              <label htmlFor="join-dob">{t('join.fields.dob')}</label>
              <input
                id="join-dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                aria-invalid={Boolean(errors.dob)}
                aria-describedby={errors.dob ? 'join-dob-error' : undefined}
              />
              {errors.dob && (
                <span id="join-dob-error" className="join-error">{errors.dob}</span>
              )}
            </div>

            <div className="join-field">
              <label htmlFor="join-description">{t('join.fields.description')}</label>
              <textarea
                id="join-description"
                value={description}
                placeholder={t('join.placeholders.description')}
                rows={6}
                onChange={(e) => setDescription(e.target.value)}
                aria-invalid={Boolean(errors.description)}
                aria-describedby="join-description-counter join-description-error"
              />
              <div className="join-textarea-meta">
                <span
                  id="join-description-counter"
                  className={`join-word-count ${wordOver ? 'is-over' : ''}`}
                >
                  {t('join.helpers.wordCount', { count: wordCount })}
                </span>
                {errors.description && (
                  <span id="join-description-error" className="join-error">{errors.description}</span>
                )}
              </div>
            </div>

            <div className="join-field">
              <label htmlFor="join-cv">{t('join.fields.cv')}</label>
              <div className="join-file">
                <input
                  id="join-cv"
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFile}
                  aria-invalid={Boolean(errors.cv)}
                  aria-describedby={errors.cv ? 'join-cv-error' : 'join-cv-hint'}
                />
                <label htmlFor="join-cv" className="join-file-button">
                  {cv ? t('join.helpers.cvReplace') : t('join.helpers.cvChoose')}
                </label>
                <span className="join-file-name">
                  {cv ? cv.name : t('join.helpers.cvNone')}
                </span>
              </div>
              <span id="join-cv-hint" className="join-helper">{t('join.helpers.cvHint')}</span>
              {errors.cv && (
                <span id="join-cv-error" className="join-error">{errors.cv}</span>
              )}
            </div>

            <button
              type="submit"
              className="join-submit"
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? t('join.submitting') : t('join.submit')}
            </button>

            {status === 'error' && (
              <div className="join-error join-error-banner" role="alert">
                {t('join.failure')}
              </div>
            )}
          </form>
        )}
      </div>
    </section>
  );
}

export default JoinSection;
