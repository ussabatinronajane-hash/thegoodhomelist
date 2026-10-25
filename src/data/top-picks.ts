// ---------------------------------------------------------------------------
// TOP PICKS (homepage section "Our Top Picks")
//
// Each entry points at a section of a published guide. The card is hidden
// automatically if the guide is a draft or no longer exists.
//
// Wording here is taken from the guide's own comparison table, so it says
// nothing the guide does not already say. Do not describe a product as
// "tested" unless the guide documents real testing.
//
// `asin` is optional. Add a verified 10-character Amazon ASIN and the card
// gets a "Check Price on Amazon" button using the site's affiliate tag. Leave
// it out and the card links to the guide only.
//
// "Verified" means the ASIN's Amazon page was opened and its title matches the
// product the guide describes. Never copy an ASIN from a shortened or
// third-party link without doing that check. Last checked: 25 Oct 2026.
// ---------------------------------------------------------------------------

export type TopPick = {
  /** Post id, i.e. the filename without extension. */
  guide: string;
  /** Heading id inside the guide to jump to. */
  anchor: string;
  badge: string;
  name: string;
  note: string;
  asin?: string;
};

export const TOP_PICKS: TopPick[] = [
  {
    guide: '6-best-cutting-boards-for-everyday-food-prep',
    anchor: '1-oxo-good-grips-2-piece-cutting-board-set',
    badge: 'Best Overall',
    name: 'OXO Good Grips 2-Piece Cutting Board Set',
    note: 'A good fit for most kitchens, with non-slip feet and drip catchers. Dishwasher safe.',
  },
  {
    guide: '6-best-cutting-boards-for-everyday-food-prep',
    anchor: '2-teakhaus-professional-carving-board-105',
    badge: 'Best Wooden Board',
    name: 'Teakhaus Professional Carving Board 105',
    note: 'A substantial teak work surface that is reversible and has a juice canal.',
    // Verified: Amazon page is the Teakhaus edge-grain teak carving board, model 105, 16 x 12 x 1.5 in.
    asin: 'B001CMT1JG',
  },
  {
    guide: '6-best-cutting-boards-for-everyday-food-prep',
    anchor: '3-epicurean-kitchen-series',
    badge: 'Best Lightweight Board',
    name: 'Epicurean Kitchen Series',
    note: 'Thin, dual-sided and easy to store, in four sizes. Dishwasher safe.',
  },
  {
    guide: '6-best-cutting-boards-for-everyday-food-prep',
    anchor: '4-joseph-joseph-folio-4-piece-cutting-board-set',
    badge: 'Best Organized Set',
    name: 'Joseph Joseph Folio 4-Piece Set',
    note: 'Four color-coded boards in a ventilated storage case, handy for keeping ingredients separate.',
  },
  {
    guide: '6-best-cutting-boards-for-everyday-food-prep',
    anchor: '5-john-boos-chop-n-slice',
    badge: 'Best Classic Maple',
    name: 'John Boos Chop-N-Slice',
    note: 'Traditional reversible edge-grain maple, available in several sizes.',
  },
  {
    guide: '6-best-cutting-boards-for-everyday-food-prep',
    anchor: '6-dexas-heavy-duty-grippmat-set',
    badge: 'Best Flexible Mats',
    name: 'Dexas Heavy Duty Grippmat Set',
    note: 'Flexible mats that bend to funnel food, useful in small kitchens.',
  },
  {
    guide: 'under-sink-organization',
    anchor: 'best-for-centered-plumbing',
    badge: 'Best Overall',
    name: 'Sevenblue 2-Tier L-Shaped Under-Sink Organizer (3-Pack)',
    note: 'An L-shaped, two-tier unit that wraps around centered plumbing. Sold as a three-pack.',
    // Verified: Amazon page is the Sevenblue 3-pack 2-tier L-shaped under sink organizer.
    asin: 'B0CRRDDX59',
  },
  {
    guide: 'under-sink-organization',
    anchor: 'best-for-tall-cabinets',
    badge: 'Best for Vertical Space',
    name: 'Kitstorack 3-Tier Height-Adjustable Under-Sink Organizer (2-Pack)',
    note: 'Adjustable three-tier shelves for cabinets where the plumbing leaves a clear rectangle. Sold as a two-pack.',
    // Verified: Amazon page is the Kitstorack 2-pack 3-tier height adjustable under sink organizer.
    asin: 'B0FRDJYYC6',
  },
];
