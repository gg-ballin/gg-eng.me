import { navigate } from 'astro:transitions/client';

function normalizePath(path: string): string {
  if (path.length > 1 && path.endsWith('/')) {
    return path.slice(0, -1);
  }
  return path;
}

function isSamePath(a: string, b: string): boolean {
  return normalizePath(a) === normalizePath(b);
}

function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.getElementById('sliding-door')?.scrollTo({ top: 0, behavior: 'smooth' });
}

async function navigateOrAssign(url: string): Promise<void> {
  const before = window.location.pathname;

  try {
    await navigate(url);
  } catch {
    window.location.assign(url);
    return;
  }

  window.setTimeout(() => {
    if (normalizePath(window.location.pathname) === normalizePath(before)) {
      window.location.assign(url);
    }
  }, 120);
}

export function initNavClientRouting(): void {
  if (document.documentElement.dataset.navRoutingInit === 'true') {
    return;
  }

  document.documentElement.dataset.navRoutingInit = 'true';

  document.addEventListener(
    'click',
    (event) => {
      const link = (event.target as Element | null)?.closest('.nav-bar a.nav-link');
      if (!(link instanceof HTMLAnchorElement)) return;

      // Bio/home is handled by the inline head handler + data-astro-reload.
      if (link.hasAttribute('data-nav-bio-link')) return;

      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const href = link.getAttribute('href');
      if (!href) return;

      const targetUrl = new URL(href, window.location.origin);
      if (targetUrl.origin !== window.location.origin) return;

      const sameRoute = isSamePath(targetUrl.pathname, window.location.pathname);
      const destination = `${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`;

      if (
        sameRoute &&
        link.classList.contains('nav-link-active') &&
        !link.classList.contains('nav-link--picker-active')
      ) {
        event.preventDefault();
        scrollToTop();
        return;
      }

      if (sameRoute) return;

      event.preventDefault();
      event.stopPropagation();
      void navigateOrAssign(destination);
    },
    true
  );
}
