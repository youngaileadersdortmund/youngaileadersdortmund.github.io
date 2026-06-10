import axios from 'axios';
import { z } from 'zod';

export const MAX_JOIN_WORDS = 250;
export const MAX_CV_BYTES = 5 * 1024 * 1024;
export const ACCEPTED_CV_TYPES =
  '.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';

const ALLOWED_CV_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);
const ALLOWED_CV_EXT = /\.(pdf|docx?)$/i;
const MIN_AGE = 18;
const MAX_AGE = 30;
const JOIN_APPLICATION_FIELDS = ['name', 'email', 'dob', 'description', 'cv'] as const;

export interface JoinApplicationValues {
  name: string;
  email: string;
  dob: string;
  description: string;
  cv: File | null;
}

export type JoinApplicationField = keyof JoinApplicationValues;
export type JoinApplicationErrors = Partial<Record<JoinApplicationField, string>>;
export type JoinApplicationStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface JoinValidationMessages {
  nameRequired: string;
  emailRequired: string;
  emailInvalid: string;
  dobRequired: string;
  dobAge: string;
  descriptionRequired: string;
  descriptionTooLong: string;
  cvRequired: string;
  cvType: string;
  cvSize: string;
}

export function resolveJoinFormEndpoint(env: ImportMetaEnv): string | undefined {
  return env.VITE_FORM_ENDPOINT || (env.DEV ? '/api/join' : undefined);
}

export function countWords(text: string): number {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

export function validateJoinEmailField(
  value: string,
  messages: Pick<JoinValidationMessages, 'emailRequired' | 'emailInvalid'>
): string | undefined {
  const result = z.string()
    .trim()
    .min(1, messages.emailRequired)
    .email(messages.emailInvalid)
    .safeParse(value);

  return result.success ? undefined : result.error.issues[0]?.message;
}

export function validateJoinApplication(
  values: JoinApplicationValues,
  messages: JoinValidationMessages
): JoinApplicationErrors {
  const result = createJoinApplicationSchema(messages).safeParse(values);
  return result.success ? {} : zodIssuesToErrors(result.error.issues);
}

export async function submitJoinApplication(
  endpoint: string,
  values: JoinApplicationValues
): Promise<void> {
  await axios.post(endpoint, buildJoinApplicationFormData(values));
}

export function hasValidationErrors(errors: JoinApplicationErrors): boolean {
  return Object.values(errors).some(Boolean);
}

function isAllowedCv(file: File): boolean {
  return ALLOWED_CV_TYPES.has(file.type) || ALLOWED_CV_EXT.test(file.name);
}

function isEligibleBirthDate(value: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;

  const [, year, month, day] = match;
  const birthDate = new Date(Number(year), Number(month) - 1, Number(day));
  if (Number.isNaN(birthDate.getTime())) return false;
  if (birthDate.getFullYear() !== Number(year)) return false;
  if (birthDate.getMonth() !== Number(month) - 1) return false;
  if (birthDate.getDate() !== Number(day)) return false;

  const age = getAgeInYears(birthDate);
  return age >= MIN_AGE && age <= MAX_AGE;
}

function createJoinApplicationSchema(messages: JoinValidationMessages) {
  return z.object({
    name: z.string().trim().min(1, messages.nameRequired),
    email: z.string().trim().min(1, messages.emailRequired).email(messages.emailInvalid),
    dob: z.string().min(1, messages.dobRequired).refine(isEligibleBirthDate, messages.dobAge),
    description: z.string()
      .trim()
      .min(1, messages.descriptionRequired)
      .refine((value) => countWords(value) <= MAX_JOIN_WORDS, messages.descriptionTooLong),
    cv: z.unknown().superRefine((value, ctx) => {
      if (!(value instanceof File)) {
        ctx.addIssue({ code: 'custom', message: messages.cvRequired });
        return;
      }

      if (!isAllowedCv(value)) {
        ctx.addIssue({ code: 'custom', message: messages.cvType });
      }
      if (value.size > MAX_CV_BYTES) {
        ctx.addIssue({ code: 'custom', message: messages.cvSize });
      }
    }),
  });
}

function zodIssuesToErrors(issues: z.core.$ZodIssue[]): JoinApplicationErrors {
  const errors: JoinApplicationErrors = {};

  for (const issue of issues) {
    const field = issue.path[0];
    if (isJoinApplicationField(field) && !errors[field]) {
      errors[field] = issue.message;
    }
  }

  return errors;
}

function isJoinApplicationField(value: unknown): value is JoinApplicationField {
  return JOIN_APPLICATION_FIELDS.includes(value as JoinApplicationField);
}

function getAgeInYears(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age -= 1;
  return age;
}

function buildJoinApplicationFormData(values: JoinApplicationValues): FormData {
  const formData = new FormData();
  formData.append('name', values.name);
  formData.append('email', values.email);
  formData.append('dob', values.dob);
  formData.append('description', values.description);
  if (values.cv) formData.append('cv', values.cv, values.cv.name);
  return formData;
}
