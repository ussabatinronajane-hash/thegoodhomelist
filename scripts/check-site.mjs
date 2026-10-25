// Post-build checks. Fails the build (so Netlify keeps the last good deploy live)
// when something that would hurt visitors or search is wrong:
//
//   errors    broken internal links or #anchors, missing or wrong canonical URL,
//             missing title, JSON-LD that does not parse, noindex pages in the
//             sitemap, indexable pages missing from it
//   warnings  title over 60 characters, description outside 70 to 160, more than
//             one or no H1, duplicate titles or descriptions
//
// Warnings are printed but do not fail the build. No dependencies.

import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
const config = await readFile('astro.config.mjs', 'utf8');
const SITE = config.match(/SITE_URL\s*=\s*'([^']+)'/)?.[1];
if (!SITE) throw new Error('Could not read SITE_URL from astro.config.mjs');

const errors = [];
const warnings = [];
const err = (page, msg) => errors.push(`${page}: ${msg}`);
const warn = (page, msg) => warnings.push(`${page}: ${msg}`);

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

const files = await walk(DIST);
const htmlFiles = files.filter((f) => f.endsWith('.html'));
const urlOf = (f) => {
  const rel = path.relative(DIST, f).replace(/\\/g, '/');
  if (rel === 'index.html') return '/';
  return '/' + rel.replace(/index\.html$/, '');
};
// Pages that are not part of the public site, so SEO rules do not apply.
const SKIP_SEO = new Set(['/404.html', '/admin/']);

const pages = new Map();
for (const f of htmlFiles) {
  const url = urlOf(f);
  const html = await readFile(f, 'utf8');
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  pages.set(url, { file: f, html, ids });
}

// Sitemap
const sitemap = existsSync(path.join(DIST, 'sitemap-0.xml'))
  ? await readFile(path.join(DIST, 'sitemap-0.xml'), 'utf8')
  : '';
const sitemapUrls = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));

const titles = new Map();
const descriptions = new Map();

for (const [url, { html }] of pages) {
  const skip = SKIP_SEO.has(url) || url === '/404.html';
  const noindex = /<meta name="robots" content="[^"]*noindex/i.test(html);

  if (!skip) {
    const title = html.match(/<title>([^<]*)<\/title>/)?.[1]?.trim();
    const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
    const canon = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)].map((m) => m[1]);
    const h1s = (html.match(/<h1[\s>]/g) ?? []).length;

    if (!title) err(url, 'missing <title>');
    else {
      if (title.length > 60) warn(url, `title is ${title.length} characters (over 60): "${title}"`);
      titles.set(title, [...(titles.get(title) ?? []), url]);
    }
    if (!desc) err(url, 'missing meta description');
    else {
      if (!noindex && (desc.length < 70 || desc.length > 160)) warn(url, `description is ${desc.length} characters (aim for 70 to 160)`);
      descriptions.set(desc, [...(descriptions.get(desc) ?? []), url]);
    }
    if (canon.length !== 1) err(url, `expected 1 canonical link, found ${canon.length}`);
    else if (canon[0] !== SITE + url) err(url, `canonical is ${canon[0]}, expected ${SITE + url}`);
    if (h1s !== 1) warn(url, `${h1s} <h1> elements (expected 1)`);

    // Structured data must parse
    for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      try {
        JSON.parse(m[1]);
      } catch {
        err(url, 'JSON-LD does not parse');
      }
    }

    if (noindex && sitemapUrls.has(SITE + url)) err(url, 'is noindex but listed in the sitemap');
    if (!noindex && sitemap && !sitemapUrls.has(SITE + url)) err(url, 'is indexable but missing from the sitemap');
  }

  // Internal links and anchors, on every page including 404 and admin
  for (const m of html.matchAll(/\s(?:href|src)="(\/[^"]*)"/g)) {
    const raw = m[1];
    if (raw.startsWith('//')) continue;
    const [pathPart, frag] = raw.split('#');
    const clean = pathPart.split('?')[0];
    const target = path.join(DIST, clean);
    let resolved = null;
    if (existsSync(target) && !(await isDir(target))) resolved = target;
    else if (existsSync(path.join(target, 'index.html'))) resolved = path.join(target, 'index.html');
    if (!resolved) {
      err(url, `broken internal link ${raw}`);
      continue;
    }
    if (frag && resolved.endsWith('.html')) {
      const targetPage = pages.get(urlOf(resolved));
      if (targetPage && !targetPage.ids.has(frag)) err(url, `link ${raw} points to a missing #${frag}`);
    }
  }
}

for (const [t, urls] of titles) if (urls.length > 1) warn(urls.join(', '), `duplicate title "${t}"`);
for (const [d, urls] of descriptions) if (urls.length > 1) warn(urls.join(', '), `duplicate description (${d.slice(0, 50)}...)`);

for (const loc of sitemapUrls) {
  if (!loc.startsWith(SITE)) err('sitemap', `${loc} is not on ${SITE}`);
  else if (!pages.has(loc.slice(SITE.length))) err('sitemap', `${loc} has no built page`);
}

async function isDir(p) {
  return (await import('node:fs/promises')).stat(p).then((s) => s.isDirectory());
}

console.log(`[check] ${pages.size} page(s), ${sitemapUrls.size} sitemap URL(s)`);
for (const w of warnings) console.log(`[check] warning  ${w}`);
for (const e of errors) console.log(`[check] ERROR    ${e}`);
if (errors.length) {
  console.log(`[check] ${errors.length} error(s). Failing the build.`);
  process.exit(1);
}
console.log(`[check] passed with ${warnings.length} warning(s)`);
