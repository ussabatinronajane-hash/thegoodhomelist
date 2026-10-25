// ---------------------------------------------------------------------------
// SITE CONFIG
// This is the only file you need to edit when your domain or Amazon tag changes.
// ---------------------------------------------------------------------------

export const SITE = {
  /** Change this to your real domain once you buy it. No trailing slash. */
  url: 'https://thegoodhomelist.online',
  name: 'The Good Home List',
  /** Brand tagline, without the trailing full stop. Templates add punctuation. */
  tagline: 'Practical, stylish finds for a home that works beautifully',
  /** Used in meta descriptions and the homepage intro. */
  description:
    'Researched buying guides, comparisons and product picks for renters, first-time homeowners and small spaces. Practical, stylish finds for a home that works.',
  /** Small line under the logo. */
  logoLine: 'Practical finds. A more beautiful home.',
  author: 'Rona Jane Sabatin',
  locale: 'en_US',
  /** Twitter/X handle for cards. Leave blank if you do not have one. */
  social: '',
} as const;

/**
 * Social profiles shown as icons in the top bar. An empty string hides that icon,
 * so no dead links ever ship. Fill these in with the full profile URLs.
 */
export const SOCIAL = {
  pinterest: '',
  facebook: '',
  instagram: '',
  tiktok: '',
} as const;

/** Small links on the right of the top bar. */
export const UTILITY_LINKS = [
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
  { href: '/privacy-policy/', label: 'Privacy Policy' },
  { href: '/terms-and-conditions/', label: 'Terms of Use' },
];

/**
 * Photo for the homepage About section, for example '/images/about-kitchen.jpg'.
 * Leave empty and a plain green panel is shown instead.
 */
export const ABOUT_IMAGE = '';

/**
 * Amazon Associates tracking IDs.
 *
 * Every link is built with SITE_TAG at build time. A small script then swaps in
 * PINTEREST_TAG when the visitor arrived from Pinterest, so your Associates
 * dashboard shows which traffic source actually earns. If a visitor has
 * JavaScript off, the link still works and still pays, just under SITE_TAG.
 */
export const AMAZON_TAG = 'thegoodhomelist-20';

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
      'Smart home picks and setup guides. Compare smart plugs, hubs, sensors, cameras and more before you buy.',
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
      'Practical picks for everyday living. Storage, cleaning, comfort and organization products chosen for real homes.',
    intro:
      'The unglamorous stuff that makes a home run well. Storage, cleaning, organization and comfort picks chosen for durability over looks.',
  },
  {
    slug: 'garden',
    name: 'Garden & Patio',
    heading: 'Garden and Patio Picks',
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
    { slug: 'smart-lighting', name: 'Smart Home Lighting', group: 'Devices', heading: 'Smart Lighting Guides', description: 'Smart bulbs, strips and switches compared on app quality, colour accuracy and whether they survive a wall switch.' },
    { slug: 'plugs-and-outlets', name: 'Plugs and Outlets', group: 'Devices', heading: 'Smart Plugs and Outlets', description: 'Smart plugs and outlets compared on load rating, size and the thing that matters most: reconnecting after an outage.' },
    { slug: 'voice-assistants-and-hubs', name: 'Voice Assistants and Hubs', group: 'Devices', heading: 'Voice Assistants and Smart Home Hubs', description: 'Hubs and speakers compared on local control, protocol support and what still works when the internet drops.' },
    { slug: 'alexa-compatible', name: 'Alexa Compatible', group: 'Devices', heading: 'Alexa Compatible Smart Home Devices', description: 'Devices that work properly with Alexa, and the setup steps the box does not mention.' },
    { slug: 'smart-locks-and-entry', name: 'Smart Locks and Entry', group: 'Security', heading: 'Smart Locks and Entry Guides', description: 'Smart locks and keypads for renters and owners, including the failure modes that leave you outside.' },
    { slug: 'security-cameras', name: 'Security Cameras and Systems', group: 'Security', heading: 'Home Security Camera Guides', description: 'Indoor and outdoor cameras compared on subscription cost, local storage and real night performance.' },
    { slug: 'detectors-and-sensors', name: 'Detectors and Sensors', group: 'Security', heading: 'Smart Detectors and Sensors', description: 'Motion, contact, water and smoke sensors that catch problems early rather than after the damage.' },
    { slug: 'heating-and-cooling', name: 'Heating and Cooling', group: 'Home & Comfort', heading: 'Smart Heating and Cooling', description: 'Thermostats, fans and climate control that actually lower a bill rather than just showing you one.' },
    { slug: 'vacuums-and-mops', name: 'Vacuums and Mops', group: 'Home & Comfort', heading: 'Robot Vacuums and Mops', description: 'Robot vacuums and mops compared on floors, pet hair and the maintenance nobody mentions.' },
    { slug: 'smart-kitchen', name: 'Kitchen', group: 'Home & Comfort', heading: 'Smart Kitchen Devices', description: 'Connected kitchen gear that earns its counter space, and the gadgets that do not.' },
    { slug: 'home-entertainment', name: 'Home Entertainment', group: 'Home & Comfort', heading: 'Smart Home Entertainment', description: 'Streaming devices, speakers and TV gear compared without the spec-sheet theatre.' },
    { slug: 'wifi-and-networking', name: 'WIFI and Networking', group: 'More', heading: 'Wi-Fi and Home Networking', description: 'Routers, mesh systems and network gear for homes where the far bedroom never has signal.' },
    { slug: 'smart-pet', name: 'Pet', group: 'More', heading: 'Smart Pet Devices', description: 'Feeders, cameras and trackers for pets, judged on reliability rather than novelty.' },
    { slug: 'smart-lawn-and-garden', name: 'Lawn and Garden', group: 'More', heading: 'Smart Lawn and Garden Devices', description: 'Irrigation, sensors and outdoor smart gear built to survive a full season outside.' },
  ],
  'kitchen': [
    { slug: 'cookware', name: 'Cookware', group: 'Cooking', heading: 'Cookware Buying Guides', description: 'Pans, pots and skillets chosen for durability and heat behaviour rather than looks.' },
    { slug: 'bakeware', name: 'Bakeware', group: 'Cooking', heading: 'Bakeware Buying Guides', description: 'Tins, sheets and baking gear that will not warp on the third use.' },
    { slug: 'utensils-and-gadgets', name: 'Kitchen Utensils & Gadgets', group: 'Cooking', heading: 'Kitchen Utensils and Gadget Guides', description: 'The hand tools you reach for weekly, and the single-purpose gadgets to skip.' },
    { slug: 'small-appliances', name: 'Small Appliances', group: 'Cooking', heading: 'Small Kitchen Appliance Guides', description: 'Countertop appliances worth the space, compared on what they actually save you.' },
    { slug: 'coffee-tea-espresso', name: 'Coffee, Tea & Espresso Appliances', group: 'Drinks', heading: 'Coffee, Tea and Espresso Guides', description: 'Brewing gear compared on the variables that genuinely change the cup.' },
    { slug: 'bar-tools', name: 'Bar Tools & Drinkware', group: 'Drinks', heading: 'Bar Tools and Drinkware Guides', description: 'Home bar tools and glassware for people who make drinks, not displays.' },
    { slug: 'glassware', name: 'Glassware & Drinkware', group: 'Drinks', heading: 'Glassware and Drinkware Guides', description: 'Everyday glassware and insulated drinkware judged on durability and dishwasher life.' },
    { slug: 'wine-accessories', name: 'Wine Accessories', group: 'Drinks', heading: 'Wine Accessory Guides', description: 'Openers, preservers and storage that are worth owning, and the gimmicks that are not.' },
    { slug: 'home-brewing', name: 'Home Brewing & Wine Making', group: 'Drinks', heading: 'Home Brewing and Wine Making Guides', description: 'Starter kits and equipment for brewing at home without a garage full of gear.' },
    { slug: 'dining-and-entertaining', name: 'Dining & Entertaining', group: 'Dining', heading: 'Dining and Entertaining Guides', description: 'Serveware and hosting gear that works for a Tuesday as well as a holiday.' },
    { slug: 'kitchen-linens', name: 'Kitchen & Table Linens', group: 'Dining', heading: 'Kitchen and Table Linen Guides', description: 'Towels, cloths and napkins that survive washing and still look right.' },
    { slug: 'kitchen-storage', name: 'Storage & Organization', group: 'Storage', heading: 'Kitchen Storage and Organization', description: 'Containers, racks and cabinet systems that hold up past the first month.' },
  ],
  'home': [
    { slug: 'bath', name: 'Bath', group: 'Rooms', heading: 'Bath Product Guides', description: 'Towels, mats, shower fittings and bath storage that handle daily humidity.' },
    { slug: 'bedding', name: 'Bedding', group: 'Rooms', heading: 'Bedding Buying Guides', description: 'Sheets, duvets and pillows judged on how they feel after six months, not on thread count.' },
    { slug: 'furniture', name: 'Furniture', group: 'Rooms', heading: 'Home Furniture Guides', description: 'Furniture picks for real rooms, weighed on assembly, sturdiness and whether it lasts a move.' },
    { slug: 'kids-home', name: 'Kids\' Home Store', group: 'Rooms', heading: 'Kids\' Home Product Guides', description: 'Storage, furniture and room gear for children that survives actual children.' },
    { slug: 'home-decor', name: 'Home Décor', group: 'Decor', heading: 'Home Decor Guides', description: 'Decor picks that look considered without costing a renovation.' },
    { slug: 'wall-decor', name: 'Wall Décor', group: 'Decor', heading: 'Wall Decor Guides', description: 'Art, mirrors and wall fittings, including how to hang them so they stay up.' },
    { slug: 'seasonal-decor', name: 'Seasonal Décor', group: 'Decor', heading: 'Seasonal Decor Guides', description: 'Holiday and seasonal decor worth storing and bringing out again next year.' },
    { slug: 'party-supplies', name: 'Party Supplies', group: 'Decor', heading: 'Party Supply Guides', description: 'Hosting and party supplies for gatherings at home, without the landfill afterwards.' },
    { slug: 'cleaning-supplies', name: 'Cleaning Supplies', group: 'Cleaning & Care', heading: 'Cleaning Supply Guides', description: 'Cleaning products and tools compared on real mess rather than staged spills.' },
    { slug: 'vacuums-and-floor-care', name: 'Vacuums & Floor Care', group: 'Cleaning & Care', heading: 'Vacuum and Floor Care Guides', description: 'Vacuums, mops and floor tools compared on suction, filters and running costs.' },
    { slug: 'irons-and-steamers', name: 'Irons & Steamers', group: 'Cleaning & Care', heading: 'Iron and Steamer Guides', description: 'Irons and garment steamers judged on heat-up time, water capacity and leaks.' },
    { slug: 'air-quality', name: 'Heating, Cooling & Air Quality', group: 'Comfort & Storage', heading: 'Heating, Cooling and Air Quality Guides', description: 'Heaters, fans, purifiers and humidifiers for homes with real temperature problems.' },
    { slug: 'storage-and-organization', name: 'Storage & Organization', group: 'Comfort & Storage', heading: 'Home Storage and Organization', description: 'Storage that works with your space instead of against it, room by room.' },
  ],
  'garden': [
    { slug: 'patio-furniture', name: 'Patio Furniture & Accessories', group: 'Outdoor Living', heading: 'Patio Furniture Guides', description: 'Outdoor furniture that survives a full season of weather rather than one good summer.' },
    { slug: 'grills-outdoor-cooking', name: 'Grills & Outdoor Cooking', group: 'Outdoor Living', heading: 'Grill and Outdoor Cooking Guides', description: 'Grills, smokers and outdoor kitchens compared on heat control and build quality.' },
    { slug: 'outdoor-heating', name: 'Outdoor Heating', group: 'Outdoor Living', heading: 'Outdoor Heating Guides', description: 'Fire pits, patio heaters and outdoor warmth that actually extends the season.' },
    { slug: 'outdoor-decor', name: 'Outdoor Décor', group: 'Outdoor Living', heading: 'Outdoor Decor and Lighting Guides', description: 'Outdoor lighting and decor built to handle rain, sun and a winter outside.' },
    { slug: 'pools-and-hot-tubs', name: 'Pools, Hot Tubs & Supplies', group: 'Outdoor Living', heading: 'Pool and Hot Tub Guides', description: 'Pools, hot tubs and the maintenance supplies that keep them usable.' },
    { slug: 'gardening', name: 'Gardening', group: 'Growing & Wildlife', heading: 'Gardening Guides', description: 'Tools, soil and growing gear for ordinary gardens and small spaces.' },
    { slug: 'birding-and-wildlife', name: 'Backyard Birding & Wildlife', group: 'Growing & Wildlife', heading: 'Backyard Birding and Wildlife Guides', description: 'Feeders, houses and wildlife gear that attracts birds rather than squirrels.' },
    { slug: 'pest-control', name: 'Pest Control', group: 'Growing & Wildlife', heading: 'Pest Control Guides', description: 'Traps, deterrents and treatments that work, and the ones that only look like they do.' },
    { slug: 'farm-and-ranch', name: 'Farm & Ranch', group: 'Growing & Wildlife', heading: 'Farm and Ranch Guides', description: 'Equipment and supplies for smallholdings, hobby farms and larger properties.' },
    { slug: 'mowers-and-power-tools', name: 'Mowers & Outdoor Power Tools', group: 'Power & Upkeep', heading: 'Mower and Outdoor Power Tool Guides', description: 'Mowers, trimmers and blowers compared on runtime, weight and noise.' },
    { slug: 'generators', name: 'Generators & Portable Power', group: 'Power & Upkeep', heading: 'Generator and Portable Power Guides', description: 'Generators and power stations sized for real outages rather than spec sheets.' },
    { slug: 'snow-removal', name: 'Snow Removal', group: 'Power & Upkeep', heading: 'Snow Removal Guides', description: 'Snow blowers, shovels and de-icing gear for driveways that actually get snow.' },
    { slug: 'outdoor-storage', name: 'Outdoor Storage', group: 'Power & Upkeep', heading: 'Outdoor Storage Guides', description: 'Sheds, deck boxes and storage that genuinely keeps water out.' },
  ],
  'tools': [
    { slug: 'power-and-hand-tools', name: 'Power & Hand Tools', group: 'Tools', heading: 'Power and Hand Tool Guides', description: 'Drills, saws and hand tools for homeowners, not trade sites.' },
    { slug: 'air-tools', name: 'Air Tools', group: 'Tools', heading: 'Air Tool and Compressor Guides', description: 'Compressors and pneumatic tools sized for home workshops and garages.' },
    { slug: 'measuring-and-layout', name: 'Measuring & Layout Tools', group: 'Tools', heading: 'Measuring and Layout Tool Guides', description: 'Stud finders, levels and lasers that are accurate enough to trust.' },
    { slug: 'building-supplies', name: 'Building Supplies', group: 'Building', heading: 'Building Supply Guides', description: 'Materials and supplies for home projects, with what to buy extra of.' },
    { slug: 'hardware', name: 'Hardware', group: 'Building', heading: 'Hardware Guides', description: 'Fixings, fasteners and hardware, including which anchor to use where.' },
    { slug: 'paint-and-walls', name: 'Paint, Wall Treatments & Supplies', group: 'Building', heading: 'Paint and Wall Treatment Guides', description: 'Paint, tools and prep supplies for finishes that do not need redoing.' },
    { slug: 'electrical', name: 'Electrical', group: 'Systems', heading: 'Electrical Supply Guides', description: 'Electrical fittings and supplies, with clear limits on what needs an electrician.' },
    { slug: 'plumbing', name: 'Plumbing', group: 'Systems', heading: 'Plumbing Supply Guides', description: 'Plumbing parts and tools for the repairs that are genuinely DIY.' },
    { slug: 'kitchen-bath-fixtures', name: 'Kitchen & Bath Fixtures', group: 'Systems', heading: 'Kitchen and Bath Fixture Guides', description: 'Taps, sinks and fixtures compared on finish durability and fitting difficulty.' },
    { slug: 'lighting-and-fans', name: 'Lighting & Ceiling Fans', group: 'Systems', heading: 'Lighting and Ceiling Fan Guides', description: 'Light fittings and ceiling fans, including what you can install yourself.' },
    { slug: 'appliances', name: 'Appliances', group: 'Home & Safety', heading: 'Home Appliance Guides', description: 'Large appliances judged on repairability and running cost, not just features.' },
    { slug: 'safety-and-security', name: 'Safety & Security', group: 'Home & Safety', heading: 'Home Safety and Security Guides', description: 'Alarms, detectors, locks and safety gear that address real household risks.' },
    { slug: 'tool-storage', name: 'Storage & Home Organization', group: 'Home & Safety', heading: 'Tool Storage and Garage Organization', description: 'Tool storage and garage systems for spaces that are also used for parking.' },
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

// ---------------------------------------------------------------------------
// BRAND SECTIONS AND MAIN NAVIGATION
//
// The six top-level navigation items. The original category URLs (/kitchen/,
// /home/, /tools/, /garden/, /smart-home/) are untouched and still work; the
// brand sections are a layer on top that groups guides by category and
// subcategory. A guide appears in a section when it matches any of its rules.
//
//   rule { category }                   every guide in that category
//   rule { category, subs: [...] }      only guides filed under those subcategories
//
// Each entry in SECTIONS gets its own landing page at /<slug>/. Garden & Patio
// and Smart Home reuse the existing category hubs, so they are not listed there.
// ---------------------------------------------------------------------------

export type Rule = { category: string; subs?: string[] };

export type Section = Category & {
  rules: Rule[];
};

export const SECTIONS: Section[] = [
  {
    slug: 'home-kitchen',
    name: 'Home & Kitchen',
    heading: 'Home and Kitchen Buying Guides',
    description:
      'Buying guides for kitchen gear, cookware, dining and everyday home essentials, researched for real kitchens and small spaces.',
    intro:
      'Counter space and cabinet space are limited, so every pick here has to earn its place. These guides cover kitchen gear, dining essentials and everyday home basics, with plain advice on what to buy and what to skip.',
    rules: [
      { category: 'kitchen' },
      { category: 'home', subs: ['bath', 'bedding', 'furniture', 'kids-home'] },
    ],
  },
  {
    slug: 'home-decor',
    name: 'Home Décor',
    heading: 'Home Décor Ideas and Buying Guides',
    description:
      'Practical home décor guides for renters and small spaces: wall art, accents and seasonal pieces that look good without a renovation.',
    intro:
      'Good décor should make a home feel finished without a renovation or a lost deposit. These guides focus on pieces that suit small spaces and rentals, and on how to hang and style them well.',
    rules: [{ category: 'home', subs: ['home-decor', 'wall-decor', 'seasonal-decor', 'party-supplies'] }],
  },
  {
    slug: 'organization-cleaning',
    name: 'Organization & Cleaning',
    heading: 'Organization and Cleaning Guides',
    description:
      'Storage, organization and cleaning guides for small homes: what to buy, how to measure, and how to keep a space easy to tidy.',
    intro:
      'A home that is easy to keep tidy works better every day. These guides cover storage, organizers and cleaning gear, with advice on measuring first so what you buy actually fits.',
    rules: [
      {
        category: 'home',
        subs: ['storage-and-organization', 'cleaning-supplies', 'vacuums-and-floor-care', 'irons-and-steamers'],
      },
      { category: 'kitchen', subs: ['kitchen-storage'] },
      { category: 'tools', subs: ['tool-storage'] },
      { category: 'smart-home', subs: ['vacuums-and-mops'] },
    ],
  },
];

export const SECTION_MAP = Object.fromEntries(SECTIONS.map((s) => [s.slug, s])) as Record<string, Section>;

export type NavItem = {
  name: string;
  href: string;
  /** Short line used on homepage tiles. */
  blurb: string;
  /**
   * Optional photo for the homepage category tile, for example
   * '/images/cat-kitchen.jpg'. If empty, the tile uses the photo of the newest
   * published guide in that section, and a neutral icon tile when there is none.
   */
  image?: string;
  /** Icon used on the homepage tile. */
  icon: 'kitchen' | 'decor' | 'organize' | 'garden' | 'smart' | 'picks';
  /** Which guides belong here. Omit for pages that are not a guide listing. */
  rules?: Rule[];
};

/** Exactly six top-level items, in display order. */
export const MAIN_NAV: NavItem[] = [
  { name: 'Home & Kitchen', icon: 'kitchen', href: '/home-kitchen/', blurb: 'Kitchen gear, cookware and everyday home essentials.', rules: SECTIONS[0].rules },
  { name: 'Home Décor', icon: 'decor', href: '/home-decor/', blurb: 'Wall art, accents and seasonal pieces for small spaces.', rules: SECTIONS[1].rules },
  { name: 'Organization & Cleaning', icon: 'organize', href: '/organization-cleaning/', blurb: 'Storage and cleaning gear that fits and holds up.', rules: SECTIONS[2].rules },
  { name: 'Garden & Patio', icon: 'garden', href: '/garden/', blurb: 'Outdoor gear built to survive a full season.', rules: [{ category: 'garden' }] },
  { name: 'Smart Home', icon: 'smart', href: '/smart-home/', blurb: 'Smart devices that make the day easier, not busier.', rules: [{ category: 'smart-home' }] },
  { name: 'Best Picks', icon: 'picks', href: '/best-picks/', blurb: 'Our top product picks from every guide, in one place.' },
];
