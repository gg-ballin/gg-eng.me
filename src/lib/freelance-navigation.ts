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

export function getHomePath(lang: Language): string {
  return getRelativeLocaleUrl(lang, '/');
}

export function getReturnPathForOrigin(
  lang: Language,
  origin: FreelanceOrigin
): string {
  if (origin === 'bio') return getHomePath(lang);
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

export function getFreelanceIndexPath(lang: Language): string {
  return getRelativeLocaleUrl(lang, 'freelance');
}

export function getFreelanceListReturnPath(
  lang: Language,
  origin: FreelanceOrigin
): string {
  return appendFreelanceOrigin(getFreelanceIndexPath(lang), origin);
}

export function getFreelanceDetailPath(
  lang: Language,
  slug: string,
  origin: FreelanceOrigin
): string {
  const base = getRelativeLocaleUrl(lang, `freelance/${slug}`).replace(/\/$/, '');
  return appendFreelanceOrigin(base, origin);
}

export function getFreelanceDetailBackLabel(lang: Language): string {
  return getTranslations(lang).freelance.back;
}

export function appendFreelanceOrigin(href: string, origin: FreelanceOrigin): string {
  const separator = href.includes('?') ? '&' : '?';
  return `${href}${separator}from=${origin}`;
}
