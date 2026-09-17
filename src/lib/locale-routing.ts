export type SiteLocale = 'es' | 'en';

export function getLocaleFromPath(pathname: string): SiteLocale | null {
  const match = pathname.match(/^\/(es|en)(\/|$)/);
  return match ? (match[1] as SiteLocale) : null;
}

export function getPathWithoutLocale(pathname: string): string {
  const stripped = pathname.replace(/^\/(es|en)/, '');
  return stripped || '/';
}

export function buildLocalePath(
  locale: SiteLocale,
  pathname: string,
  search = '',
  hash = ''
): string {
  const suffix = getPathWithoutLocale(pathname);
  const normalized = suffix === '/' ? '' : suffix;
  return `/${locale}${normalized}${search}${hash}`;
}

export function getAlternateLocalePath(
  pathname: string,
  search = '',
  hash = ''
): string | null {
  const current = getLocaleFromPath(pathname);
  if (!current) return null;
  const other: SiteLocale = current === 'es' ? 'en' : 'es';
  return buildLocalePath(other, pathname, search, hash);
}

export function isSameRouteDifferentLocale(a: string, b: string): boolean {
  return getPathWithoutLocale(a) === getPathWithoutLocale(b) && a !== b;
}

export function syncDocumentLocale(pathname = window.location.pathname): SiteLocale | null {
  const locale = getLocaleFromPath(pathname);
  if (locale) {
    document.documentElement.lang = locale;
  }
  return locale;
}

export function syncLangSwitcherHref(
  pathname = window.location.pathname,
  search = window.location.search,
  hash = window.location.hash
): void {
  const current = getLocaleFromPath(pathname);
  const target = getAlternateLocalePath(pathname, search, hash);
  if (!current || !target) return;

  const otherLabel = current === 'es' ? 'en' : 'es';

  document.querySelectorAll<HTMLAnchorElement>('.lang-switcher').forEach((switcher) => {
    switcher.href = target;
    switcher.textContent = otherLabel;
  });
}
