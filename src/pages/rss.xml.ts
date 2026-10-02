import rss, { pagesGlobToRssItems } from '@astrojs/rss';
import type { APIContext } from 'astro';
import { PUBLIC_BASE_URL } from 'astro:env/client';

import { siteMetadata } from '../constants';

export async function GET(context: APIContext) {
  return rss({
    title: siteMetadata.title,
    description: siteMetadata.description,
    site: context.site ?? PUBLIC_BASE_URL!,
    items: await pagesGlobToRssItems(
      // src/contents/blogs
      // import.meta.glob('./blog/*.{md,mdx}'),
      import.meta.glob('../contents/blogs/*.{md,mdx}'),
    ),
  });
}
