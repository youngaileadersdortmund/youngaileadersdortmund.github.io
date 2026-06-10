import { useMemo, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ACCEPTED_CV_TYPES,
  MAX_JOIN_WORDS,
  countWords,
  hasValidationErrors,
  resolveJoinFormEndpoint,
  submitJoinApplication,
  validateJoinApplication,
  validateJoinEmailField,
  type JoinApplicationErrors,
  type JoinApplicationStatus,
  type JoinApplicationValues,
  type JoinValidationMessages,
} from '../../lib/joinApplication';
import '../../App.css';

const FORM_ENDPOINT = resolveJoinFormEndpoint(import.meta.env);

function JoinSection() {
  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [description, setDescription] = useState('');
  const [cv, setCv] = useState<File | null>(null);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<JoinApplicationErrors>({});
  const [status, setStatus] = useState<JoinApplicationStatus>('idle');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const wordCount = useMemo(() => countWords(description), [description]);
  const wordOver = wordCount > MAX_JOIN_WORDS;
  const validationMessages = useMemo<JoinValidationMessages>(() => ({
    nameRequired: t('join.errors.nameRequired'),
    emailRequired: t('join.errors.emailRequired'),
    emailInvalid: t('join.errors.emailInvalid'),
    dobRequired: t('join.errors.dobRequired'),
    dobAge: t('join.errors.dobAge'),
    descriptionRequired: t('join.errors.descriptionRequired'),
    descriptionTooLong: t('join.errors.descriptionTooLong'),
    cvRequired: t('join.errors.cvRequired'),
    cvType: t('join.errors.cvType'),
    cvSize: t('join.errors.cvSize'),
  }), [t]);

  function getValues(): JoinApplicationValues {
    return { name, email, dob, description, cv };
  }

  function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setEmail(v);
    if (errors.email && !validateJoinEmailField(v, validationMessages)) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  }

  function handleEmailBlur() {
    setErrors((prev) => ({
      ...prev,
      email: validateJoinEmailField(email, validationMessages),
    }));
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

    const values = getValues();
    const next = validateJoinApplication(values, validationMessages);
    setErrors(next);
    if (hasValidationErrors(next)) return;

    setStatus('submitting');
    try {
      if (!FORM_ENDPOINT) {
        throw new Error('VITE_FORM_ENDPOINT is not configured.');
      }

      await submitJoinApplication(FORM_ENDPOINT, values);
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
                  accept={ACCEPTED_CV_TYPES}
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
