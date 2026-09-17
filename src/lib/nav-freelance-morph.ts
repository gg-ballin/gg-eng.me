/** Desktop freelance nav morph — smooth enter/leave without re-mounting the sidebar. */

import {
  isSameRouteDifferentLocale,
  syncDocumentLocale,
  syncLangSwitcherHref,
} from '@/lib/locale-routing';

export type FreelanceOrigin = 'bio' | 'experience';

export interface NavFreelanceMorphConfig {
  parentBioLabel: string;
  parentExperienceLabel: string;
  freelanceNavLabel: string;
  storageKey: string;
}

const DESKTOP_MQ = '(min-width: 768px)';
const REDUCED_MOTION_MQ = '(prefers-reduced-motion: reduce)';
const ENTER_MS = 620;
const LEAVE_MS = 520;

let previousPath = '';
let pendingNavigationFrom = '';
let morphing = false;

function isFreelancePath(path: string): boolean {
  return /\/(es|en)\/freelance(\/|$)/.test(path);
}

function isExperienceLikePath(path: string): boolean {
  return /\/(es|en)\/(experience|freelance)(\/|$)/.test(path);
}

function resolveOrigin(search: string, storageKey: string): FreelanceOrigin {
  const fromParam = new URLSearchParams(search).get('from');
  if (fromParam === 'bio' || fromParam === 'experience') return fromParam;

  const stored = sessionStorage.getItem(storageKey);
  if (stored === 'bio' || stored === 'experience') return stored;

  return 'experience';
}

function parentLabelForOrigin(origin: FreelanceOrigin, config: NavFreelanceMorphConfig): string {
  return origin === 'bio' ? config.parentBioLabel : config.parentExperienceLabel;
}

function linkForOrigin(origin: FreelanceOrigin): HTMLElement | null {
  const selector = origin === 'bio' ? '.nav-link-1' : '.nav-link-2';
  const link = document.querySelector(selector);
  return link instanceof HTMLElement ? link : null;
}

function isDesktopNav(): boolean {
  return window.matchMedia(DESKTOP_MQ).matches;
}

function canAnimate(): boolean {
  return isDesktopNav() && !window.matchMedia(REDUCED_MOTION_MQ).matches;
}

function applyMobileFreelanceNav(origin: FreelanceOrigin, config: NavFreelanceMorphConfig): void {
  clearPickerState();
  setFreelanceRouteAttrs(false);

  const bioLink = document.querySelector('.nav-link-1');
  const expLink = document.querySelector('.nav-link-2');
  const path = window.location.pathname;
  const lang = document.documentElement.lang || 'es';

  if (bioLink instanceof HTMLElement) {
    const bioActive = origin === 'bio' && isFreelancePath(path);
    bioLink.classList.toggle('nav-link-active', bioActive || isBioPath(path, lang));
    setLinkAria(bioLink, 'bio', config, false);
  }

  if (expLink instanceof HTMLElement) {
    const expActive = origin === 'experience' && isFreelancePath(path);
    expLink.classList.toggle('nav-link-active', expActive || path.includes('/experience'));
    setLinkAria(expLink, 'experience', config, false);
  }

  document.querySelector('.nav-link-3')?.classList.toggle('nav-link-active', path.startsWith(`/${lang}/blog`));
  document.querySelector('.nav-link-4')?.classList.toggle('nav-link-active', path.startsWith(`/${lang}/contact`));
}

function setFreelanceRouteAttrs(on: boolean, origin?: FreelanceOrigin): void {
  const html = document.documentElement;
  if (on && origin) {
    html.dataset.freelanceRoute = 'true';
    html.dataset.freelanceOrigin = origin;
    return;
  }
  delete html.dataset.freelanceRoute;
  delete html.dataset.freelanceOrigin;
}

function updatePickerParentText(host: HTMLElement, label: string): void {
  const parent = host.querySelector('[data-nav-word-parent]');
  if (parent instanceof HTMLElement && parent.textContent !== label) {
    parent.textContent = label;
  }
}

function setLinkAria(
  link: HTMLElement,
  origin: FreelanceOrigin,
  config: NavFreelanceMorphConfig,
  pickerActive: boolean
): void {
  if (pickerActive) {
    const parent = parentLabelForOrigin(origin, config);
    link.setAttribute('aria-label', `${config.freelanceNavLabel}, ${parent}`);
    return;
  }

  if (link.classList.contains('nav-link-1')) {
    link.setAttribute('aria-label', config.parentBioLabel);
  } else if (link.classList.contains('nav-link-2')) {
    link.setAttribute('aria-label', config.parentExperienceLabel);
  }
}

function clearPickerState(): void {
  document.querySelectorAll('.nav-link--picker-active, .nav-link--picker-entering, .nav-link--picker-leaving').forEach((el) => {
    el.classList.remove('nav-link--picker-active', 'nav-link--picker-entering', 'nav-link--picker-leaving');
  });

  document.querySelectorAll('[data-nav-word-picker]').forEach((host) => {
    host.classList.remove('is-morphing', 'is-visible');
    const parent = host.querySelector('.nav-word--parent');
    parent?.classList.remove('is-morph-from-plain');
  });
}

function isBioPath(path: string, lang: string): boolean {
  const normalized = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
  return normalized === `/${lang}`;
}

function updatePlainNavActiveStates(config: NavFreelanceMorphConfig): void {
  const path = window.location.pathname;
  const lang = document.documentElement.lang || 'es';

  const bioLink = document.querySelector('.nav-link-1');
  const expLink = document.querySelector('.nav-link-2');
  const blogLink = document.querySelector('.nav-link-3');
  const contactLink = document.querySelector('.nav-link-4');

  if (bioLink instanceof HTMLElement) {
    const bioActive = isBioPath(path, lang);
    bioLink.classList.toggle('nav-link-active', bioActive);
    setLinkAria(bioLink, 'bio', config, false);
  }

  if (expLink instanceof HTMLElement) {
    const expActive = path.includes('/experience');
    expLink.classList.toggle('nav-link-active', expActive);
    setLinkAria(expLink, 'experience', config, false);
  }

  if (blogLink instanceof HTMLElement) {
    blogLink.classList.toggle('nav-link-active', path.startsWith(`/${lang}/blog`));
  }

  if (contactLink instanceof HTMLElement) {
    contactLink.classList.toggle('nav-link-active', path.startsWith(`/${lang}/contact`));
  }
}

function applyIdleExperienceNav(config: NavFreelanceMorphConfig): void {
  clearPickerState();
  setFreelanceRouteAttrs(false);
  updatePlainNavActiveStates(config);
}

function applyPickerIdleState(origin: FreelanceOrigin, config: NavFreelanceMorphConfig): void {
  if (!isDesktopNav()) {
    applyMobileFreelanceNav(origin, config);
    return;
  }

  clearPickerState();
  setFreelanceRouteAttrs(true, origin);

  const bioLink = document.querySelector('.nav-link-1');
  const expLink = document.querySelector('.nav-link-2');
  const activeLink = linkForOrigin(origin);

  if (bioLink instanceof HTMLElement) {
    const isActive = origin === 'bio';
    bioLink.classList.toggle('nav-link-active', isActive);
    bioLink.classList.toggle('nav-link--picker-active', isActive);
    setLinkAria(bioLink, 'bio', config, isActive);
  }

  if (expLink instanceof HTMLElement) {
    const isActive = origin === 'experience';
    expLink.classList.toggle('nav-link-active', isActive);
    expLink.classList.toggle('nav-link--picker-active', isActive);
    setLinkAria(expLink, 'experience', config, isActive);
  }

  syncBlogContactActiveStates();

  document.querySelectorAll('[data-nav-word-picker]').forEach((host) => {
    if (!(host instanceof HTMLElement)) return;
    host.classList.remove('is-visible');
    host.dataset.origin = origin;
    updatePickerParentText(host, parentLabelForOrigin(origin, config));
  });

  const activeHost = activeLink?.querySelector('[data-nav-word-picker]');
  if (activeHost instanceof HTMLElement) {
    activeHost.classList.add('is-visible');
  }

  activeLink?.querySelector('.nav-word-picker')?.classList.add('is-ready');
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

async function enterFreelanceNav(
  origin: FreelanceOrigin,
  config: NavFreelanceMorphConfig,
  animate: boolean
): Promise<void> {
  if (morphing) return;
  morphing = true;

  const activeLink = linkForOrigin(origin);
  if (!activeLink) {
    morphing = false;
    return;
  }

  const host = activeLink.querySelector('[data-nav-word-picker]');
  const plain = activeLink.querySelector('.nav-text--plain:not(.nav-label-mobile)');

  if (!(host instanceof HTMLElement) || !(plain instanceof HTMLElement)) {
    applyPickerIdleState(origin, config);
    morphing = false;
    return;
  }

  updatePickerParentText(host, parentLabelForOrigin(origin, config));
  host.dataset.origin = origin;
  setFreelanceRouteAttrs(true, origin);

  const bioLink = document.querySelector('.nav-link-1');
  const expLink = document.querySelector('.nav-link-2');

  if (bioLink instanceof HTMLElement) {
    const isActive = origin === 'bio';
    bioLink.classList.toggle('nav-link-active', isActive);
    bioLink.classList.toggle('nav-link--picker-active', false);
    bioLink.classList.remove('nav-link--picker-entering', 'nav-link--picker-leaving');
    setLinkAria(bioLink, 'bio', config, false);
  }

  if (expLink instanceof HTMLElement) {
    const isActive = origin === 'experience';
    expLink.classList.toggle('nav-link-active', isActive);
    expLink.classList.toggle('nav-link--picker-active', false);
    expLink.classList.remove('nav-link--picker-entering', 'nav-link--picker-leaving');
    setLinkAria(expLink, 'experience', config, false);
  }

  if (!isDesktopNav() || !animate || !canAnimate()) {
    applyPickerIdleState(origin, config);
    morphing = false;
    return;
  }

  const parent = host.querySelector('.nav-word--parent');
  if (!(parent instanceof HTMLElement)) {
    applyPickerIdleState(origin, config);
    morphing = false;
    return;
  }

  document.querySelectorAll('[data-nav-word-picker]').forEach((pickerHost) => {
    pickerHost.classList.remove('is-visible');
  });
  host.classList.add('is-morphing', 'is-visible');
  activeLink.classList.add('nav-link--picker-entering');
  parent.classList.add('is-morph-from-plain');

  await wait(20);
  activeLink.classList.add('nav-link--picker-active');
  await wait(ENTER_MS);

  activeLink.classList.remove('nav-link--picker-entering');
  parent.classList.remove('is-morph-from-plain');
  host.classList.remove('is-morphing');
  activeLink.classList.add('nav-link--picker-active');
  setLinkAria(activeLink, origin, config, true);
  host.querySelector('.nav-word-picker')?.classList.add('is-ready');

  morphing = false;
}

async function leaveFreelanceNav(
  origin: FreelanceOrigin,
  config: NavFreelanceMorphConfig,
  animate: boolean
): Promise<void> {
  if (morphing) return;
  morphing = true;

  const activeLink = linkForOrigin(origin);
  if (!activeLink) {
    applyIdleExperienceNav(config);
    morphing = false;
    return;
  }

  if (!animate || !canAnimate() || !activeLink.classList.contains('nav-link--picker-active')) {
    applyIdleExperienceNav(config);
    morphing = false;
    return;
  }

  const host = activeLink.querySelector('[data-nav-word-picker]');
  if (host instanceof HTMLElement) {
    host.classList.add('is-morphing');
  }

  activeLink.classList.add('nav-link--picker-leaving');
  activeLink.classList.remove('nav-link--picker-entering');

  await wait(LEAVE_MS);

  applyIdleExperienceNav(config);
  morphing = false;
}

function syncNavFromDocument(newDoc: Document, config: NavFreelanceMorphConfig): void {
  const currentNav = document.querySelector('.nav-bar');
  const newNav = newDoc.querySelector('.nav-bar');
  if (!(currentNav instanceof HTMLElement) || !(newNav instanceof HTMLElement)) return;

  const currentLinks = [...currentNav.querySelectorAll('.nav-link')];
  const newLinks = [...newNav.querySelectorAll('.nav-link')];

  currentLinks.forEach((link, index) => {
    const newLink = newLinks[index];
    if (!(link instanceof HTMLElement) || !(newLink instanceof HTMLElement)) return;

    const href = newLink.getAttribute('href');
    if (href) link.setAttribute('href', href);

    const currentPlains = [...link.querySelectorAll('.nav-text--plain')];
    const newPlains = [...newLink.querySelectorAll('.nav-text--plain')];
    currentPlains.forEach((plain, plainIndex) => {
      const newPlain = newPlains[plainIndex];
      if (newPlain) plain.textContent = newPlain.textContent;
    });

    const currentBlogContact = link.querySelector(':scope > .nav-text');
    const newBlogContact = newLink.querySelector(':scope > .nav-text');
    if (
      currentBlogContact instanceof HTMLElement &&
      newBlogContact instanceof HTMLElement &&
      !currentBlogContact.querySelector('[data-nav-word-picker]')
    ) {
      currentBlogContact.textContent = newBlogContact.textContent;
    }

    link.querySelectorAll('[data-nav-word-picker]').forEach((host) => {
      if (!(host instanceof HTMLElement)) return;
      const hostIndex = link.classList.contains('nav-link-1') ? 0 : 1;
      const newHost = newLinks[hostIndex]?.querySelector('[data-nav-word-picker]');
      if (!(newHost instanceof HTMLElement)) return;

      host.dataset.parentBio = newHost.dataset.parentBio ?? config.parentBioLabel;
      host.dataset.parentExperience = newHost.dataset.parentExperience ?? config.parentExperienceLabel;
      host.dataset.currentLabel = newHost.dataset.currentLabel ?? config.freelanceNavLabel;

      const currentWord = host.querySelector('.nav-word--current');
      const newCurrent = newHost.querySelector('.nav-word--current');
      if (currentWord instanceof HTMLElement && newCurrent instanceof HTMLElement) {
        currentWord.textContent = newCurrent.textContent;
      }
    });
  });

  const langSwitcher = document.querySelector('.lang-switcher');
  const newLangSwitcher = newDoc.querySelector('.lang-switcher');
  if (langSwitcher instanceof HTMLElement && newLangSwitcher instanceof HTMLElement) {
    const href = newLangSwitcher.getAttribute('href');
    if (href) langSwitcher.setAttribute('href', href);
    langSwitcher.textContent = newLangSwitcher.textContent;
  }

  syncDocumentLocale(window.location.pathname);
  syncLangSwitcherHref();

  const html = document.documentElement;
  const newHtml = newDoc.documentElement;
  if (newHtml.dataset.navParentBio) html.dataset.navParentBio = newHtml.dataset.navParentBio;
  if (newHtml.dataset.navParentExperience) html.dataset.navParentExperience = newHtml.dataset.navParentExperience;
  if (newHtml.dataset.navFreelanceLabel) html.dataset.navFreelanceLabel = newHtml.dataset.navFreelanceLabel;
}

async function syncNavForPath(
  config: NavFreelanceMorphConfig,
  options: { animate?: boolean; fromPath?: string } = {}
): Promise<void> {
  const path = window.location.pathname;
  const fromPath = options.fromPath ?? previousPath;
  const animate = options.animate ?? false;

  if (isSameRouteDifferentLocale(fromPath, path)) {
    syncDocumentLocale(path);
    syncLangSwitcherHref();

    if (isFreelancePath(path)) {
      applyPickerIdleState(resolveOrigin(window.location.search, config.storageKey), config);
    } else {
      applyIdleExperienceNav(config);
    }

    previousPath = path;
    return;
  }

  const enteringFreelance = isFreelancePath(path) && !isFreelancePath(fromPath);
  const leavingFreelance = !isFreelancePath(path) && isFreelancePath(fromPath);

  if (enteringFreelance) {
    const origin = resolveOrigin(window.location.search, config.storageKey);
    await enterFreelanceNav(origin, config, animate);
    previousPath = path;
    return;
  }

  if (leavingFreelance) {
    const storedOrigin = document.documentElement.dataset.freelanceOrigin;
    const origin: FreelanceOrigin =
      storedOrigin === 'bio' || storedOrigin === 'experience'
        ? storedOrigin
        : resolveOrigin('', config.storageKey);
    await leaveFreelanceNav(origin, config, animate);
    previousPath = path;
    return;
  }

  if (isFreelancePath(path)) {
    applyPickerIdleState(resolveOrigin(window.location.search, config.storageKey), config);
  } else {
    applyIdleExperienceNav(config);
  }

  syncBlogContactActiveStates();
  previousPath = path;
}

function syncBlogContactActiveStates(): void {
  const path = window.location.pathname;
  const lang = document.documentElement.lang || 'es';

  document.querySelector('.nav-link-3')?.classList.toggle('nav-link-active', path.startsWith(`/${lang}/blog`));
  document.querySelector('.nav-link-4')?.classList.toggle('nav-link-active', path.startsWith(`/${lang}/contact`));
}

export function initNavFreelanceMorph(config: NavFreelanceMorphConfig): void {
  previousPath = window.location.pathname;

  const runInitial = () => {
    if (isFreelancePath(window.location.pathname)) {
      applyPickerIdleState(resolveOrigin(window.location.search, config.storageKey), config);
    } else {
      applyIdleExperienceNav(config);
    }
    previousPath = window.location.pathname;
  };

  runInitial();

  document.addEventListener('astro:before-preparation', () => {
    pendingNavigationFrom = window.location.pathname;
  });

  document.addEventListener('astro:after-swap', (event) => {
    const swapEvent = event as CustomEvent<{ newDocument?: Document }>;
    const newDoc = swapEvent.detail?.newDocument;
    if (newDoc) syncNavFromDocument(newDoc, config);

    const fromPath = pendingNavigationFrom || previousPath;
    pendingNavigationFrom = '';

    void syncNavForPath(config, { animate: true, fromPath });
  });

  window.addEventListener('freelance-origin-change', (event) => {
    const origin = (event as CustomEvent<{ origin?: FreelanceOrigin }>).detail?.origin;
    if (origin !== 'bio' && origin !== 'experience') return;
    if (!isFreelancePath(window.location.pathname)) return;
    applyPickerIdleState(origin, config);
  });

  window.addEventListener('resize', () => {
    if (!isFreelancePath(window.location.pathname)) return;
    document.querySelectorAll('[data-nav-word-picker].is-visible .nav-word-picker').forEach((picker) => {
      picker.classList.add('is-ready');
    });
  });
}

export function isExperienceLikeRoute(path: string): boolean {
  return isExperienceLikePath(path);
}
