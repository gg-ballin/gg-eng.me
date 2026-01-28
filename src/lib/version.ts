declare const __APP_VERSION__: string;

export const APP_VERSION: string =
  (import.meta.env.PUBLIC_APP_VERSION as string | undefined) ||
  __APP_VERSION__ ||
  "1.0.0";

export function getVersion(): string {
  return APP_VERSION;
}

export function getFormattedVersion(): string {
  return `v${APP_VERSION}`;
}

