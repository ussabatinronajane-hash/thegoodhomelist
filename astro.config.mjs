import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { rehypeAmazonLinks, rehypeExternalLinks } from './src/lib/rehype-amazon-links.mjs';

// Keep these two in sync with src/consts.ts
const SITE_URL = 'https://worthbuyinghome.com';
const AMAZON_TAG = 'REPLACE-WITH-YOUR-TAG-20';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/admin') && !page.includes('/contact-success'),
      changefreq: 'weekly',
      lastmod: new Date(),
    }),
  ],
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  markdown: {
    rehypePlugins: [
      [rehypeAmazonLinks, { tag: AMAZON_TAG }],
      [rehypeExternalLinks, { site: SITE_URL }],
    ],
    shikiConfig: { theme: 'github-light', wrap: true },
  },
});
