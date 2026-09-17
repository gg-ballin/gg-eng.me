import { initLangSwitch } from '@/lib/lang-switch';
import { initNavClientRouting } from '@/lib/nav-client-routing';

/** Keep theme + page animations correct after Astro client navigations. */

function restoreTheme(): void {
  const theme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', theme);

  const currentTheme = document.documentElement.getAttribute('data-theme');
  const sunEl = document.getElementById('theme-icon-sun');
  const moonEl = document.getElementById('theme-icon-moon');

  if (sunEl instanceof HTMLElement && moonEl instanceof HTMLElement) {
    sunEl.style.display = currentTheme === 'dark' ? 'block' : 'none';
    moonEl.style.display = currentTheme === 'dark' ? 'none' : 'block';
  }
}

function restartCssAnimations(): void {
  document.querySelectorAll<HTMLElement>('.timeline, [class*="-animate"]').forEach((el) => {
    const { animation } = getComputedStyle(el);
    if (!animation || animation === 'none') return;

    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = '';
  });
}

function onClientNavigation(): void {
  restoreTheme();
  restartCssAnimations();
}

export function initViewTransitionLifecycle(): void {
  restoreTheme();
  initNavClientRouting();
  initLangSwitch();
  document.addEventListener('astro:after-swap', onClientNavigation);
  document.addEventListener('astro:page-load', onClientNavigation);
}
