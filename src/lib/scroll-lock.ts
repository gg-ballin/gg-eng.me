const locks = new Set<string>();

const DOOR_ID = 'sliding-door';

function getDoor(): HTMLElement | null {
  return document.getElementById(DOOR_ID);
}

function applyScrollLock(): void {
  const locked = locks.size > 0;
  document.body.style.overflow = locked ? 'hidden' : '';

  const door = getDoor();
  if (!door) return;

  const lockDoorScroll = locks.has('skills-modal');
  door.classList.toggle('is-scroll-locked', lockDoorScroll);
  door.toggleAttribute('inert', lockDoorScroll);
}

/** Register a scroll lock reason (ref-counted via Set). */
export function lockScroll(id: string): void {
  locks.add(id);
  applyScrollLock();
}

/** Release a scroll lock reason; restores scroll when no locks remain. */
export function unlockScroll(id: string): void {
  locks.delete(id);
  applyScrollLock();
}

export function isScrollLocked(id?: string): boolean {
  if (id) return locks.has(id);
  return locks.size > 0;
}
