import { navigate } from 'astro:transitions/client';
import {
  getAlternateLocalePath,
  syncDocumentLocale,
  syncLangSwitcherHref,
} from '@/lib/locale-routing';

function normalizePath(path: string): string {
  if (path.length > 1 && path.endsWith('/')) {
    return path.slice(0, -1);
  }
  return path;
}

function showLanguageLoading(): void {
  const loadingIndicator = document.getElementById('language-loading');
  if (loadingIndicator instanceof HTMLElement) {
    loadingIndicator.style.display = 'flex';
  }
  sessionStorage.setItem('languageChanging', 'true');
  window.setTimeout(hideLanguageLoadingOverlay, 4000);
}

function hideLanguageLoadingOverlay(): void {
  const loadingIndicator = document.getElementById('language-loading');
  if (loadingIndicator instanceof HTMLElement) {
    loadingIndicator.style.display = 'none';
  }
}

async function navigateToLocale(destination: string): Promise<void> {
  const before = window.location.pathname;

  try {
    await navigate(destination);
  } catch {
    window.location.assign(destination);
    return;
  }

  window.setTimeout(() => {
    if (normalizePath(window.location.pathname) === normalizePath(before)) {
      window.location.assign(destination);
      return;
    }

    syncLocaleUi();
  }, 120);
}

export function syncLocaleUi(): void {
  syncDocumentLocale();
  syncLangSwitcherHref();
}

export function initLangSwitch(): void {
  if (document.documentElement.dataset.langSwitchInit === 'true') {
    return;
  }

  document.documentElement.dataset.langSwitchInit = 'true';

  syncLocaleUi();

  document.addEventListener('astro:page-load', () => {
    syncLocaleUi();
    hideLanguageLoadingOverlay();
  });

  document.addEventListener('astro:after-swap', () => {
    syncLocaleUi();
    hideLanguageLoadingOverlay();
  });

  window.addEventListener('pageshow', hideLanguageLoadingOverlay);

  document.addEventListener(
    'click',
    (event) => {
      const switcher = (event.target as Element | null)?.closest('.lang-switcher');
      if (!(switcher instanceof HTMLAnchorElement)) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const destination = getAlternateLocalePath(
        window.location.pathname,
        window.location.search,
        window.location.hash
      );
      if (!destination) return;

      switcher.href = destination;

      const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      if (destination === current) return;

      event.preventDefault();
      event.stopImmediatePropagation();

      showLanguageLoading();
      void navigateToLocale(destination);
    },
    true
  );
}
