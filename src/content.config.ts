import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CATEGORIES } from './consts';

const categorySlugs = CATEGORIES.map((c) => c.slug) as [string, ...string[]];

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
  schema: () =>
    z.object({
      /** H1 and <title> base. Keep the primary keyword near the front. */
      title: z.string().max(70),
      /** Meta description. Aim for 140 to 155 characters. */
      description: z.string().min(50).max(160),
      /** Two-sentence SEO excerpt used on cards, RSS and social. */
      excerpt: z.string(),
      /** The primary keyword this post targets. Used for internal reporting. */
      primaryKeyword: z.string().optional(),
      category: z.enum(categorySlugs),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      /** Path under /public, e.g. "/images/best-smart-plugs.webp" */
      image: z.string().optional(),
      /** Descriptive alt text. Include the primary keyword naturally. */
      imageAlt: z.string().optional(),
      /** Pin to the top of the homepage and its category hub. */
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
      author: z.string().default('Rona Jane Sabatin'),
      /** Rendered as an accordion and as FAQPage JSON-LD. */
      faqs: z
        .array(z.object({ question: z.string(), answer: z.string() }))
        .default([]),
      /** Slugs of related posts. Falls back to same-category posts if empty. */
      related: z.array(z.string()).default([]),
    }),
});

export const collections = { posts };
