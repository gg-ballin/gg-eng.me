const INTENT_STORAGE_KEY = 'contact-intent';

type ContactIntent = 'cv' | 'freelance';

function parseInitialIntent(): ContactIntent {
  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get('intent');
  if (fromUrl === 'freelance' || fromUrl === 'cv') return fromUrl;

  const stored = sessionStorage.getItem(INTENT_STORAGE_KEY);
  if (stored === 'freelance' || stored === 'cv') return stored;

  return 'cv';
}

export function setContactIntent(intent: ContactIntent, persist = true): void {
  const switcher = document.getElementById('contact-intent-switcher');
  if (!switcher) return;

  const index = intent === 'freelance' ? 1 : 0;

  switcher.querySelectorAll('[role="tab"]').forEach((tab) => {
    const isSelected = tab.getAttribute('data-intent') === intent;
    tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
  });

  switcher.setAttribute('data-position', String(index));
  switcher.setAttribute('data-has-selection', 'true');

  const sectionTitle = document.getElementById('contact-section-title');
  if (sectionTitle) {
    const key = intent === 'freelance' ? 'titleFreelance' : 'titleCv';
    if (sectionTitle.dataset[key]) {
      sectionTitle.textContent = sectionTitle.dataset[key] ?? '';
    }
  }

  const sectionDescription = document.getElementById('contact-section-description');
  if (sectionDescription) {
    const key = intent === 'freelance' ? 'descriptionFreelance' : 'descriptionCv';
    if (sectionDescription.dataset[key]) {
      sectionDescription.textContent = sectionDescription.dataset[key] ?? '';
    }
  }

  const intentInput = document.getElementById('contact-intent');
  if (intentInput instanceof HTMLInputElement) {
    intentInput.value = intent;
  }

  const form = document.getElementById('contact-form');
  if (form instanceof HTMLElement) {
    form.dataset.intent = intent;
  }

  const panel = document.getElementById('contact-intent-panel');
  if (panel) {
    panel.setAttribute(
      'aria-labelledby',
      intent === 'freelance' ? 'intent-tab-freelance' : 'intent-tab-cv'
    );
  }

  if (persist) {
    sessionStorage.setItem(INTENT_STORAGE_KEY, intent);
  }

  document.dispatchEvent(new CustomEvent('contact:intent-change', { detail: { intent } }));
}

function initContactIntentFromStorage(): void {
  if (!document.getElementById('contact-intent-switcher')) return;
  setContactIntent(parseInitialIntent(), false);
}

declare global {
  interface Window {
    __contactIntentSwitcherBound?: boolean;
  }
}

export function initContactIntentSwitcher(): void {
  if (!window.__contactIntentSwitcherBound) {
    window.__contactIntentSwitcherBound = true;

    document.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const tab = target.closest('#contact-intent-switcher [role="tab"]');
      if (!(tab instanceof HTMLElement)) return;

      const intent = tab.getAttribute('data-intent');
      if (intent === 'cv' || intent === 'freelance') {
        setContactIntent(intent);
      }
    });

    document.addEventListener(
      'click',
      (event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;
        if (!target.closest('.lang-switcher')) return;
        if (!document.getElementById('contact-intent-switcher')) return;

        const intentInput = document.getElementById('contact-intent');
        sessionStorage.setItem(
          INTENT_STORAGE_KEY,
          intentInput instanceof HTMLInputElement ? intentInput.value : 'cv'
        );
      },
      true
    );

    document.addEventListener('astro:page-load', initContactIntentFromStorage);
  }

  initContactIntentFromStorage();
}
