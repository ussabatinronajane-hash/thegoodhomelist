// Runs after `astro build`. Makes the sitemap match what search engines are told
// about each page:
//
//   - pages marked noindex are removed (an empty category page, for example)
//   - <lastmod> is set from the page's own modified date when it has one, and
//     dropped otherwise, instead of stamping every URL with the build time
//
// Reads and rewrites dist/sitemap-0.xml. No dependencies.

import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
const SITEMAP = path.join(DIST, 'sitemap-0.xml');
const config = await readFile('astro.config.mjs', 'utf8');
const SITE = config.match(/SITE_URL\s*=\s*'([^']+)'/)?.[1];
if (!SITE) throw new Error('Could not read SITE_URL from astro.config.mjs');

if (!existsSync(SITEMAP)) {
  console.log('[sitemap] no sitemap-0.xml found, nothing to do');
  process.exit(0);
}

const xml = await readFile(SITEMAP, 'utf8');
let removed = 0;
let dated = 0;
const removedUrls = [];

const out = [];
for (const m of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
  const block = m[1];
  const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1];
  if (!loc) continue;
  const rel = loc.replace(SITE, '').replace(/^\//, '');
  const file = path.join(DIST, rel, rel === '' || rel.endsWith('/') ? 'index.html' : '');
  const htmlPath = existsSync(file) ? file : path.join(DIST, rel, 'index.html');
  const html = existsSync(htmlPath) ? await readFile(htmlPath, 'utf8') : '';

  if (/<meta name="robots" content="[^"]*noindex/i.test(html)) {
    removed++;
    removedUrls.push(loc);
    continue;
  }

  const modified = html.match(/<meta property="article:modified_time" content="([^"]+)"/)?.[1];
  let entry = block.replace(/<lastmod>[^<]*<\/lastmod>/, '').trim();
  if (modified) {
    entry += `<lastmod>${modified.slice(0, 10)}</lastmod>`;
    dated++;
  }
  out.push(`<url>${entry}</url>`);
}

const head = xml.slice(0, xml.indexOf('<url>'));
await writeFile(SITEMAP, `${head}${out.join('')}</urlset>`);
console.log(`[sitemap] ${out.length} URL(s) kept, ${removed} noindex page(s) removed, ${dated} with a real lastmod`);
for (const u of removedUrls) console.log(`[sitemap]   removed ${u}`);
