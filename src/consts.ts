// ---------------------------------------------------------------------------
// SITE CONFIG
// This is the only file you need to edit when your domain or Amazon tag changes.
// ---------------------------------------------------------------------------

export const SITE = {
  /** Change this to your real domain once you buy it. No trailing slash. */
  url: 'https://thegoodhomelist.online',
  name: 'The Good Home List',
  tagline: 'Honest picks for a better home',
  /** Used in meta descriptions and the homepage intro. */
  description:
    'Hand-tested picks and honest buying guides for smart home tech, kitchen gear, home essentials, outdoor living and tools.',
  author: 'Rona Jane Sabatin',
  locale: 'en_US',
  /** Twitter/X handle for cards. Leave blank if you do not have one. */
  social: '',
} as const;

/**
 * Amazon Associates tracking IDs.
 *
 * Every link is built with SITE_TAG at build time. A small script then swaps in
 * PINTEREST_TAG when the visitor arrived from Pinterest, so your Associates
 * dashboard shows which traffic source actually earns. If a visitor has
 * JavaScript off, the link still works and still pays, just under SITE_TAG.
 */
export const AMAZON_TAG = 'findsmarthome-20';

/** Applied when document.referrer is Pinterest. */
export const PINTEREST_TAG = 'worthbuyingbyrona-20';

/** The Amazon storefront your audience buys from. */
export const AMAZON_DOMAIN = 'https://www.amazon.com';

// ---------------------------------------------------------------------------
// CATEGORY SILOS
// Each one becomes a hub page at /<slug>/ with its posts nested underneath.
// Keep these stable. Changing a slug changes every URL inside it.
// ---------------------------------------------------------------------------

export type Category = {
  slug: string;
  name: string;
  /** H1 on the hub page. */
  heading: string;
  /** Meta description for the hub page. Keep under 155 characters. */
  description: string;
  /** Short intro paragraph shown on the hub page under the H1. */
  intro: string;
};

export const CATEGORIES: Category[] = [
  {
    slug: 'smart-home',
    name: 'Smart Home',
    heading: 'Smart Home Guides and Product Picks',
    description:
      'Tested smart home picks and setup guides. Compare smart plugs, hubs, sensors, cameras and more before you buy.',
    intro:
      'Smart home gear should make your day easier, not add another app to manage. These guides cover what actually works, what to skip, and how to set it up without a headache.',
  },
  {
    slug: 'kitchen',
    name: 'Kitchen & Dining',
    heading: 'Kitchen and Dining Buying Guides',
    description:
      'Kitchen gear worth the counter space. Honest reviews and comparisons of appliances, cookware, tools and dining essentials.',
    intro:
      'Counter space is expensive. These guides help you buy the kitchen gear you will actually reach for every week, and skip the gadgets that end up in a drawer.',
  },
  {
    slug: 'home',
    name: 'Home & Living',
    heading: 'Home and Living Essentials',
    description:
      'Practical picks for everyday living. Storage, cleaning, comfort and organization products tested for real homes.',
    intro:
      'The unglamorous stuff that makes a home run well. Storage, cleaning, organization and comfort picks chosen for durability over looks.',
  },
  {
    slug: 'garden',
    name: 'Patio, Lawn & Garden',
    heading: 'Patio, Lawn and Garden Picks',
    description:
      'Outdoor living guides. Compare patio furniture, grills, lawn care tools and garden gear built to survive real weather.',
    intro:
      'Outdoor gear takes a beating. These guides focus on what holds up through a full season outside, not what looks good in a product photo.',
  },
  {
    slug: 'tools',
    name: 'Tools & Home Improvement',
    heading: 'Tools and Home Improvement Guides',
    description:
      'Tool buying guides for homeowners and DIYers. Compare power tools, hand tools, hardware and workshop gear.',
    intro:
      'Buy once, cry once. These guides cover the tools worth spending on, the ones where budget picks are fine, and what you actually need for common home projects.',
  },
];

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c])
) as Record<string, Category>;

/** Main navigation. */
export const NAV = CATEGORIES.map((c) => ({ href: `/${c.slug}/`, label: c.name }));
