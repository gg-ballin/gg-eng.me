/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly RESEND_API_KEY: string;
  readonly SENDER_EMAIL?: string;
  readonly TURNSTILE_SITE_KEY?: string;
  readonly TURNSTILE_SECRET_KEY?: string;
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
  readonly NEWSLETTER_ENABLED?: string; // 'true' or 'false' as string
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Cloudflare runtime types
type Env = Record<string, unknown>;
type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {
    env: {
      RESEND_API_KEY: string;
      TURNSTILE_SECRET_KEY?: string;
      NEWSLETTER_KV?: KVNamespace;
      NEWSLETTER_ENABLED?: string; // 'true' or 'false' as string
    };
  }
}

// Type declaration for isomorphic-dompurify
declare module 'isomorphic-dompurify' {
  interface DOMPurify {
    sanitize(source: string | Node): string;
    sanitize(source: string | Node, config: any): string;
    addHook(hook: string, cb: (currentNode: any, data: any, config: any) => void): void;
    removeHook(hook: string): void;
    removeHooks(hook: string): void;
    removeAllHooks(): void;
  }
  
  function createDOMPurify(window?: Window | null): DOMPurify;
  export default createDOMPurify;
}

// Type declaration for Cloudflare Turnstile
declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement | string, options: {
        sitekey: string;
        callback?: (token: string) => void;
        'error-callback'?: () => void;
      }) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}
