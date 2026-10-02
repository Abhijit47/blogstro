/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SECRET: string;
  readonly PUBLIC_BASE_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly DATABASE_URL: string;
      readonly PUBLIC_ANALYTICS_ID: string;
      readonly NODE_ENV: 'development' | 'production' | 'test';

      readonly PUBLIC_BASE_URL: string;
    }
  }
}
