import { visit } from 'unist-util-visit';

/**
 * Auto-tags Amazon links written in plain markdown.
 *
 * Write a normal link in the editor:
 *     [the Kasa smart plug](https://www.amazon.com/dp/B08XYZ1234)
 *
 * This plugin rewrites it at build time to:
 *     https://www.amazon.com/dp/B08XYZ1234/?tag=YOURTAG-20
 *     rel="nofollow sponsored noopener"  target="_blank"
 *
 * That means you can never forget your tracking ID, and every affiliate link
 * carries the attributes Google and the FTC expect. Keep the tag in one place
 * (src/consts.ts) and it propagates everywhere.
 */
export function rehypeAmazonLinks({ tag, domain = 'https://www.amazon.com' } = {}) {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'a') return;
      const href = node.properties?.href;
      if (typeof href !== 'string') return;

      let url;
      try {
        url = new URL(href);
      } catch {
        return;
      }

      const isAmazon = /(^|\.)(amazon\.[a-z.]+|amzn\.to)$/i.test(url.hostname);
      if (!isAmazon) return;

      // Normalize to the short /dp/ASIN form when possible.
      const match = url.pathname.match(/\/(?:dp|gp\/product)\/([A-Z0-9]{10})/i);
      if (match) {
        node.properties.href = `${url.origin}/dp/${match[1].toUpperCase()}/?tag=${tag}`;
      } else {
        url.searchParams.set('tag', tag);
        node.properties.href = url.href;
      }

      node.properties.rel = 'nofollow sponsored noopener';
      node.properties.target = '_blank';
    });
  };
}

/**
 * Adds rel="noopener" and target="_blank" to non-Amazon external links,
 * and leaves internal links untouched so they pass link equity normally.
 */
export function rehypeExternalLinks({ site }) {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'a') return;
      const href = node.properties?.href;
      if (typeof href !== 'string' || !href.startsWith('http')) return;
      if (node.properties.rel) return; // already handled by the Amazon plugin

      try {
        if (new URL(href).origin === new URL(site).origin) return;
      } catch {
        return;
      }

      node.properties.rel = 'noopener';
      node.properties.target = '_blank';
    });
  };
}
