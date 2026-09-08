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


// ---------------------------------------------------------------------------
// SUBCATEGORIES
//
// These power the dropdown menu. A subcategory only appears in the menu once
// at least one published guide uses it, so the navigation grows as you write
// rather than showing a wall of empty pages on day one.
//
// `group` controls which column it sits in inside the dropdown.
// Slugs are permanent once a guide uses one. Changing a slug changes its URL.
// ---------------------------------------------------------------------------

export type Subcategory = {
  slug: string;
  name: string;
  /** Column heading in the dropdown. */
  group: string;
  /** H1 and meta description for the subcategory listing page. */
  heading: string;
  description: string;
};

export const SUBCATEGORIES: Record<string, Subcategory[]> = {
  'smart-home': [
    { slug: 'plugs-and-switches', name: 'Plugs & Switches', group: 'Devices', heading: 'Smart Plugs and Switches', description: 'Tested smart plugs and switches, compared on reliability, load rating and app quality.' },
    { slug: 'lighting', name: 'Lighting', group: 'Devices', heading: 'Smart Lighting Guides', description: 'Smart bulbs, strips and switches for every room, compared honestly.' },
    { slug: 'hubs-and-sensors', name: 'Hubs & Sensors', group: 'Devices', heading: 'Smart Home Hubs and Sensors', description: 'Hubs, motion sensors and contact sensors that keep working when the internet does not.' },
    { slug: 'cameras', name: 'Cameras', group: 'Security', heading: 'Home Security Cameras', description: 'Indoor and outdoor camera guides, with honest notes on subscriptions and privacy.' },
    { slug: 'doorbells', name: 'Video Doorbells', group: 'Security', heading: 'Video Doorbell Guides', description: 'Video doorbells compared on wiring, subscriptions and everyday reliability.' },
    { slug: 'locks', name: 'Smart Locks', group: 'Security', heading: 'Smart Lock Guides', description: 'Smart locks for renters and owners, with the failure modes nobody mentions.' },
    { slug: 'cleaning-robots', name: 'Robot Vacuums', group: 'Comfort & Air', heading: 'Robot Vacuum Guides', description: 'Robot vacuums and mops tested on real floors, not showroom ones.' },
    { slug: 'air-and-climate', name: 'Air & Climate', group: 'Comfort & Air', heading: 'Air Quality and Climate Devices', description: 'Purifiers, humidifiers, thermostats and air quality monitors worth the money.' },
    { slug: 'getting-started', name: 'Getting Started', group: 'Advice', heading: 'Smart Home Advice for Beginners', description: 'What to buy first, what to skip, and how to avoid locking yourself into one app.' },
  ],
  'kitchen': [
    { slug: 'cookware', name: 'Cookware', group: 'Cooking', heading: 'Cookware Buying Guides', description: 'Pans, pots and bakeware chosen for durability over looks.' },
    { slug: 'small-appliances', name: 'Small Appliances', group: 'Cooking', heading: 'Small Kitchen Appliance Guides', description: 'The countertop appliances worth their space, and the ones that end up in a cupboard.' },
    { slug: 'knives-and-tools', name: 'Knives & Tools', group: 'Cooking', heading: 'Kitchen Knives and Tools', description: 'Knives, boards and hand tools you will actually reach for every week.' },
    { slug: 'storage', name: 'Food Storage', group: 'Storage & Prep', heading: 'Food Storage Guides', description: 'Containers, wraps and pantry storage that survive daily use.' },
    { slug: 'organization', name: 'Kitchen Organization', group: 'Storage & Prep', heading: 'Kitchen Organization Guides', description: 'Drawer, cabinet and counter organization that holds up past the first month.' },
    { slug: 'dining', name: 'Dining & Serving', group: 'Dining', heading: 'Dining and Serving Guides', description: 'Plates, glassware and serving pieces for everyday use and for hosting.' },
    { slug: 'coffee-and-tea', name: 'Coffee & Tea', group: 'Dining', heading: 'Coffee and Tea Gear', description: 'Brewing gear compared on the things that actually change the cup.' },
  ],
  'home': [
    { slug: 'storage-and-organization', name: 'Storage & Organization', group: 'Organization', heading: 'Home Storage and Organization', description: 'Storage that works with your space instead of against it.' },
    { slug: 'closet-and-laundry', name: 'Closet & Laundry', group: 'Organization', heading: 'Closet and Laundry Guides', description: 'Laundry and wardrobe gear that saves time rather than adding steps.' },
    { slug: 'cleaning', name: 'Cleaning', group: 'Upkeep', heading: 'Cleaning Product Guides', description: 'Vacuums, mops and cleaning kit tested on real mess.' },
    { slug: 'bedroom', name: 'Bedroom', group: 'Comfort', heading: 'Bedroom Essentials', description: 'Bedding, pillows and sleep gear judged on how they hold up after six months.' },
    { slug: 'lighting-and-decor', name: 'Lighting & Decor', group: 'Comfort', heading: 'Home Lighting and Decor', description: 'Lamps, shades and decor picks that suit real rooms.' },
  ],
  'garden': [
    { slug: 'patio-furniture', name: 'Patio Furniture', group: 'Outdoor Living', heading: 'Patio Furniture Guides', description: 'Outdoor furniture that survives a full season of real weather.' },
    { slug: 'grilling', name: 'Grilling & Cooking', group: 'Outdoor Living', heading: 'Grilling and Outdoor Cooking', description: 'Grills, smokers and outdoor cooking gear compared honestly.' },
    { slug: 'outdoor-lighting', name: 'Outdoor Lighting', group: 'Outdoor Living', heading: 'Outdoor Lighting Guides', description: 'Path, string and security lighting that lasts more than one summer.' },
    { slug: 'lawn-care', name: 'Lawn Care', group: 'Growing', heading: 'Lawn Care Guides', description: 'Mowers, trimmers and lawn kit for ordinary gardens.' },
    { slug: 'garden-tools', name: 'Garden Tools', group: 'Growing', heading: 'Garden Tool Guides', description: 'Hand tools, pruners and growing gear worth buying once.' },
    { slug: 'outdoor-storage', name: 'Outdoor Storage', group: 'Growing', heading: 'Outdoor Storage Guides', description: 'Sheds, boxes and storage that keeps water out.' },
  ],
  'tools': [
    { slug: 'power-tools', name: 'Power Tools', group: 'Tools', heading: 'Power Tool Buying Guides', description: 'Drills, saws and power tools for homeowners rather than trade sites.' },
    { slug: 'hand-tools', name: 'Hand Tools', group: 'Tools', heading: 'Hand Tool Guides', description: 'The hand tools that cover most household jobs, and what to skip.' },
    { slug: 'measuring', name: 'Measuring & Layout', group: 'Tools', heading: 'Measuring and Layout Tools', description: 'Stud finders, levels and measuring tools that are actually accurate.' },
    { slug: 'workshop-storage', name: 'Workshop & Storage', group: 'Workshop', heading: 'Workshop and Tool Storage', description: 'Tool storage and garage organization for small spaces.' },
    { slug: 'maintenance', name: 'Home Maintenance', group: 'Projects', heading: 'Home Maintenance Guides', description: 'Seasonal maintenance checklists and the kit each job needs.' },
    { slug: 'diy-projects', name: 'DIY Projects', group: 'Projects', heading: 'DIY Project Guides', description: 'Weekend projects with the tools and materials each one needs.' },
  ],
};

/** Flat lookup: "smart-home/cameras" -> Subcategory */
export const SUBCATEGORY_MAP = Object.fromEntries(
  Object.entries(SUBCATEGORIES).flatMap(([cat, subs]) =>
    subs.map((s) => [`${cat}/${s.slug}`, s])
  )
) as Record<string, Subcategory>;

/** Every subcategory slug, for validating post frontmatter. */
export const ALL_SUBCATEGORY_SLUGS = Object.values(SUBCATEGORIES)
  .flat()
  .map((s) => s.slug);

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c])
) as Record<string, Category>;

/** Main navigation. */
export const NAV = CATEGORIES.map((c) => ({ href: `/${c.slug}/`, label: c.name }));
