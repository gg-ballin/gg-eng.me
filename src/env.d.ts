/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly RESEND_API_KEY: string;
  readonly SENDER_EMAIL?: string;
  readonly TURNSTILE_SITE_KEY?: string;
  readonly TURNSTILE_SECRET_KEY?: string;
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
  readonly NEWSLETTER_ENABLED?: string; // 'true' or 'false' as string
  readonly METRICS_TOKEN?: string; // Optional token for metrics API authentication
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Cloudflare runtime types
type Env = Record<string, unknown>;
type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

// Cloudflare KV Namespace type
interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number; expiration?: number }): Promise<void>;
  delete(key: string): Promise<void>;
  list(options?: { prefix?: string; limit?: number; cursor?: string }): Promise<{ keys: Array<{ name: string; expiration?: number }>; list_complete: boolean; cursor?: string }>;
}

declare namespace App {
  interface Locals extends Runtime {
    env: {
      RESEND_API_KEY: string;
      TURNSTILE_SECRET_KEY?: string;
      NEWSLETTER_KV?: KVNamespace;
      NEWSLETTER_ENABLED?: string; // 'true' or 'false' as string
      ANALYTICS_KV?: KVNamespace;
      METRICS_TOKEN?: string;
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
