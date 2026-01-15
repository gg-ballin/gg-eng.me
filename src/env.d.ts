/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly RESEND_API_KEY: string;
  readonly SENDER_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
