function isInViewport(root: HTMLElement): boolean {
  const rect = root.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0 && rect.width > 0 && rect.height > 0;
}

function initReveal(root: HTMLElement) {
  if (root.dataset.revealInit === 'true') return;
  root.dataset.revealInit = 'true';

  const mask = root.querySelector<HTMLElement>('.reveal-mask');
  if (!mask) return;

  const reveal = () => mask.classList.add('reveal-mask--active');

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    reveal();
    return;
  }

  const startReveal = () => {
    if (isInViewport(root)) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -5% 0px' }
    );

    observer.observe(root);
  };

  requestAnimationFrame(() => {
    requestAnimationFrame(startReveal);
  });
}

function initAllReveals() {
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach(initReveal);
}

function replayRevealsForTheme() {
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((root) => {
    const mask = root.querySelector<HTMLElement>('.reveal-mask');
    if (!mask) return;
    mask.classList.remove('reveal-mask--active');
    void mask.offsetWidth;
    mask.classList.add('reveal-mask--active');
  });
}

declare global {
  interface Window {
    __revealListenersBound?: boolean;
  }
}

function bindRevealListeners() {
  if (window.__revealListenersBound) return;
  window.__revealListenersBound = true;

  document.addEventListener('astro:page-load', initAllReveals);
  window.addEventListener('themeChange', replayRevealsForTheme);
}

bindRevealListeners();
initAllReveals();
