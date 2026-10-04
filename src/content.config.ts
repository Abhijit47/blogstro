// 1. Import utilities from `astro:content`
import { defineCollection } from 'astro:content';

// 2. Import loader(s)
import { glob } from 'astro/loaders';

// 3. Import Zod
import { z } from 'astro/zod';

// 4. Define a `loader` and `schema` for each collection
const blogs = defineCollection({
  loader: glob({ base: './src/contents/blogs', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    cover: z.string(),
    coverAlt: z.string(),
    tags: z.array(z.string()),
    keywords: z.array(z.string()),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

// 5. Export a single `collections` object to register your collection(s)
export const collections = { blogs };
