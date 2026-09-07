import { AMAZON_TAG, AMAZON_DOMAIN } from '../consts';

/**
 * Build a compliant, tagged Amazon link.
 *
 * Pass either a bare ASIN ("B08XYZ1234") or a full Amazon URL. Any existing
 * tag is stripped and replaced with yours, so a copied link from anywhere
 * still earns you the commission.
 */
export function amazonUrl(asinOrUrl: string): string {
  if (!asinOrUrl) return AMAZON_DOMAIN;

  // Bare ASIN: 10 alphanumeric characters.
  if (/^[A-Z0-9]{10}$/i.test(asinOrUrl.trim())) {
    return `${AMAZON_DOMAIN}/dp/${asinOrUrl.trim().toUpperCase()}/?tag=${AMAZON_TAG}`;
  }

  try {
    const url = new URL(asinOrUrl);
    // Normalize to the short /dp/ form when we can find an ASIN in the path.
    const match = url.pathname.match(/\/(?:dp|gp\/product)\/([A-Z0-9]{10})/i);
    if (match) {
      return `${url.origin}/dp/${match[1].toUpperCase()}/?tag=${AMAZON_TAG}`;
    }
    url.searchParams.set('tag', AMAZON_TAG);
    return url.href;
  } catch {
    return AMAZON_DOMAIN;
  }
}

/** Attributes every outbound affiliate link must carry. */
export const AFFILIATE_ATTRS = {
  rel: 'nofollow sponsored noopener',
  target: '_blank',
} as const;
