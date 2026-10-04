// @ts-check
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import toolbarRoutes from '@shiftescape/astro-toolbar-routes';
import tailwindcss from '@tailwindcss/vite';
import compressor from 'astro-compressor';
import contentViewer from 'astro-content-viewer';
import typesafeRoutes from 'astro-typesafe-routes';
import { defineConfig, envField } from 'astro/config';
import { loadEnv } from 'vite';

const { PUBLIC_BASE_URL } = loadEnv(
  process.env.PUBLIC_BASE_URL,
  process.cwd(),
  '',
);

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      PUBLIC_BASE_URL: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
      SECRET: envField.string({ context: 'server', access: 'secret' }),
    },
  },

  experimental: {
    contentIntellisense: true,
    collectionStorage: 'chunked',
  },

  site: PUBLIC_BASE_URL,

  vite: {
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          if (
            warning.code === 'MODULE_LEVEL_DIRECTIVE' &&
            warning.message.includes('use astro:head-inject')
          ) {
            return;
          }
          warn(warning);
        },
      },
    },
    plugins: [tailwindcss()],
  },

  integrations: [
    mdx(),
    react({ compiler: { compilationMode: 'annotation' } }),
    sitemap({
      chunks: {
        blog: (item) => {
          if (/blogs/.test(item.url)) {
            item.changefreq = ChangeFreqEnum.WEEKLY;
            item.lastmod = new Date().toISOString();
            item.priority = 0.9;
            return item;
          }
        },
        // glossary: (item) => {
        //   if (/glossary/.test(item.url)) {
        //     item.changefreq = ChangeFreqEnum.MONTHLY;
        //     item.lastmod = new Date().toISOString();
        //     item.priority = 0.7;
        //     return item;
        //   }
        // },
      },
      filter: (page) => page !== `${PUBLIC_BASE_URL}/contact`,
    }),
    compressor(),
    partytown(),
    contentViewer(),
    toolbarRoutes({
      // hide specific routes or glob prefixes
      exclude: ['/admin', '/api/*'],
      // show _astro/* and _server_islands/* internal routes
      showInternalRoutes: false,
    }),
    typesafeRoutes(),
  ],

  adapter: vercel(),
});
