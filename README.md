# The Good Home List

An Amazon affiliate site built on Astro, deployed to Netlify, edited through Decap CMS.

Static output, no database, no plugins to maintain. The whole site builds in about two seconds
and the homepage ships around 24KB.

---

## 1. Before you deploy: two edits

### Your Amazon tracking IDs

Already set. Both of your Associates tracking IDs are wired in:

| Tag | Used when |
|---|---|
| `findsmarthome-20` | Default. Baked into every link at build time |
| `worthbuyingbyrona-20` | Swapped in when the visitor arrived from Pinterest |

This means your Associates dashboard tells you which channel actually earns, rather than lumping
everything together. Pinterest traffic reports under one ID, Google and direct under the other.

The swap runs in `src/components/SourceAttribution.astro`. It reads `document.referrer` on the
first page of a visit, stores the result in `sessionStorage`, and reapplies it as the visitor
reads more guides. It is about 700 bytes and the only JavaScript on a content page. With
JavaScript disabled, every link still carries `findsmarthome-20` and still pays.

To change either tag, edit `AMAZON_TAG` and `PINTEREST_TAG` in `src/consts.ts`, and `AMAZON_TAG`
in `astro.config.mjs`. It appears in both files because the config cannot import from TypeScript
source at build time.

Verified working: a direct visit and a visit from google.com both produce `findsmarthome-20`, and
a visit from pinterest.com produces `worthbuyingbyrona-20`, with
`rel="nofollow sponsored noopener"` intact in all three cases.

### Your domain

Three places, all one line each:

| File | What to change |
|---|---|
| `src/consts.ts` | `SITE.url` |
| `astro.config.mjs` | `SITE_URL` |
| `public/robots.txt` | the `Sitemap:` line |

Also update `site_url` and `display_url` in `public/admin/config.yml`, and the contact email in
`src/pages/privacy-policy.astro`.

---

## 2. Deploy

### Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/thegoodhomelist.git
git push -u origin main
```

### Connect Netlify

1. Log in to Netlify, choose **Add new site → Import an existing project**
2. Pick your GitHub repo
3. Netlify reads `netlify.toml`, so build command and publish directory are already correct.
   Confirm they read `npm run build` and `dist`
4. Deploy

Your site is live on a `.netlify.app` URL within about a minute.

### Attach your domain

In Netlify: **Domain settings → Add a domain**. Netlify gives you either nameservers or an ALIAS
record. Point your registrar at those. SSL provisions automatically within a few minutes.

---

## 3. Turn on the CMS

The admin panel at `/admin` needs Netlify Identity to handle login. This is a one-time setup.

1. In Netlify: **Site configuration → Identity → Enable Identity**
2. Under **Registration**, set it to **Invite only**. Do this before anything else, or anyone on
   the internet can sign up for your CMS
3. Under **Services → Git Gateway**, click **Enable Git Gateway**. This is what lets the CMS
   commit to your repo
4. Go to the **Identity** tab, click **Invite users**, and invite your own email
5. Open the invite email, set a password, and you land in the CMS

From then on, `yourdomain.com/admin` is your editor.

### How publishing works

The CMS is set to **editorial workflow**, which means:

- **Draft** saves your work without publishing
- **In review** opens a pull request on GitHub
- **Ready → Publish** merges it, which triggers a Netlify build

Your post is live about 60 seconds after you hit publish. Every version is in git history, so
nothing is ever really lost.

---

## 4. Writing

### Where content lives

`src/content/posts/`. One file per guide. The filename becomes the URL slug, so
`best-smart-plugs.mdx` publishes at `/smart-home/best-smart-plugs/`.

### Two file types

**`.md`** is what the CMS creates. Plain markdown. Everything you need for a normal guide.

**`.mdx`** lets you use the product components. Write these by hand for your bigger roundups.

### Affiliate links in plain markdown

Just write a normal link:

```markdown
The [Kasa EP25](https://www.amazon.com/dp/B0B14D4K7Z) is the reliability benchmark.
```

At build time this becomes:

```html
<a href="https://www.amazon.com/dp/B0B14D4K7Z/?tag=yourtag-20"
   rel="nofollow sponsored noopener" target="_blank">Kasa EP25</a>
```

You can paste a link that already has someone else's tag on it. Yours replaces it.

### Components (`.mdx` only)

```mdx
import ProductCard from '../../components/ProductCard.astro';
import ComparisonTable from '../../components/ComparisonTable.astro';

<ProductCard
  name="Kasa Smart Plug Mini EP25"
  asin="B0B14D4K7Z"
  badge="Best overall"
  verdict="One or two sentences on who this is for."
  image="/images/kasa-ep25.webp"
  pros={['Reconnects reliably', 'Matter support']}
  cons={['Setup routes through the Kasa app']}
/>

<ComparisonTable
  columns={['Protocol', 'Max load', 'Energy monitoring']}
  rows={[
    { name: 'Kasa EP25', asin: 'B0B14D4K7Z', values: ['Wi-Fi + Matter', '15A', 'Yes'], best: true },
    { name: 'Eve Energy', asin: 'B09G5NMKZY', values: ['Thread', '15A', 'Yes'] },
  ]}
  caption="Optional note under the table."
/>
```

`asin` takes a bare ASIN or a full Amazon URL. Either way it gets tagged.

### FAQs

Add them in the frontmatter (or the FAQ list in the CMS). They render as an accordion and
generate `FAQPage` schema with no extra work:

```yaml
faqs:
  - question: "Do smart plugs work without Wi-Fi?"
    answer: "Most Wi-Fi smart plugs lose remote control when your internet drops..."
```

Keep answers to 40 to 60 words with the direct answer in the first sentence. That is the shape
Google pulls for featured snippets.

### Images

Drop them in `public/images/` (the CMS does this for you) and reference as `/images/name.webp`.

Export at 1200x675 and compress before uploading. There is no image optimization pipeline here
by design, because it keeps the build fast and the setup simple. Squoosh or the export settings
in Canva handle it in one step.

---

## 5. What is already handled for you

You do not need a plugin for any of this. It is built into the templates.

| | |
|---|---|
| Meta titles and descriptions | Per page, with length validation in the CMS |
| Canonical URLs | Auto-generated, absolute |
| Open Graph and Twitter cards | With a branded default image |
| `Article` schema | Author, publish date, modified date, publisher |
| `FAQPage` schema | Generated from your FAQ list |
| `BreadcrumbList` schema | Plus visible breadcrumbs |
| `WebSite` and `Organization` schema | Site-wide, linked by `@id` |
| XML sitemap | Auto-generated, excludes admin and thank-you pages |
| RSS feed | At `/rss.xml` |
| `robots.txt` | Admin disallowed |
| Affiliate link attributes | `nofollow sponsored noopener` on every outbound Amazon link |
| Affiliate disclosure | Above the first link on every article |
| Internal linking | Related guides auto-populate from the same category |
| Contact form | Netlify Forms, no backend needed |
| Security headers | Set in `netlify.toml` |

---

## 6. Adding a category later

Edit the `CATEGORIES` array in `src/consts.ts`. Add an object with `slug`, `name`, `heading`,
`description` and `intro`. The hub page, navigation, footer, sitemap and CMS dropdown all update
from that one array.

Then add the matching option to the `category` field in `public/admin/config.yml`.

**Do not change an existing slug after launch.** It changes every URL underneath it. If you must,
add redirects in `netlify.toml` first.

---

## 7. Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # production build into dist/
npm run preview  # serve the built site locally
```

The CMS admin does not work locally without extra setup. Edit files directly when working local.

---

## 8. Pre-launch checklist

Before applying to Amazon Associates:

- [x] Amazon tracking IDs set (findsmarthome-20 and worthbuyingbyrona-20)
- [ ] Domain set in all four places
- [ ] Contact email updated in the privacy policy
- [ ] About page rewritten in your own words (it is drafted, not final)
- [ ] Privacy policy reviewed against your actual analytics setup
- [ ] 10 to 20 published guides, not thin ones
- [ ] Custom domain live with SSL
- [ ] Contact form tested end to end
- [ ] Site verified in Google Search Console, sitemap submitted
- [ ] Netlify Identity set to invite-only

Amazon reviews the site manually. Thin content is the most common rejection reason, and the
second is missing disclosure. Both are handled here as long as you publish real guides.

---

## Stack

Astro 7 · Decap CMS 3 · Netlify · no runtime JavaScript on content pages
