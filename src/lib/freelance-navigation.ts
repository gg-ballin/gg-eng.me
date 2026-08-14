import { getRelativeLocaleUrl } from 'astro:i18n';
import { getTranslations, type Language } from '@/i18n/translations';

export type FreelanceOrigin = 'bio' | 'experience';

export const FREELANCE_RETURN_KEY = 'freelanceReturnTo';

export function parseFreelanceOrigin(
  value: string | null | undefined
): FreelanceOrigin | null {
  if (value === 'bio' || value === 'experience') return value;
  return null;
}

/** SSR fallback when sessionStorage is unavailable */
export function resolveFreelanceOrigin(
  fromParam: string | null | undefined
): FreelanceOrigin {
  return parseFreelanceOrigin(fromParam) ?? 'experience';
}

export function getReturnPathForOrigin(
  lang: Language,
  origin: FreelanceOrigin
): string {
  if (origin === 'bio') return getRelativeLocaleUrl(lang, '/');
  return getRelativeLocaleUrl(lang, 'experience');
}

export function getFreelanceBackLabel(
  lang: Language,
  origin: FreelanceOrigin
): string {
  const t = getTranslations(lang);
  if (origin === 'bio') return t.freelance.backToBio;
  return t.experience.backToExperience;
}

export function appendFreelanceOrigin(href: string, origin: FreelanceOrigin): string {
  const separator = href.includes('?') ? '&' : '?';
  return `${href}${separator}from=${origin}`;
}
