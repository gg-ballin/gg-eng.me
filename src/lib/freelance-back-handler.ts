function resolveOriginBackDestination(link: HTMLAnchorElement): string {
  return (
    link.getAttribute('href') ||
    link.dataset.listPath ||
    link.dataset.experiencePath ||
    '/'
  );
}

export function initFreelanceBackHandler(): void {
  if (document.documentElement.dataset.freelanceBackHandlerInit === 'true') {
    return;
  }

  document.documentElement.dataset.freelanceBackHandlerInit = 'true';

  document.addEventListener(
    'click',
    (event) => {
      const link = (event.target as Element | null)?.closest('[data-freelance-back]');
      if (!(link instanceof HTMLAnchorElement)) return;
      if (link.dataset.freelanceBackTarget !== 'origin') return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      event.preventDefault();
      event.stopPropagation();
      window.location.assign(resolveOriginBackDestination(link));
    },
    true
  );
}
