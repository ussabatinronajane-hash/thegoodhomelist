import { SUBCATEGORIES, type Rule, type Subcategory } from '../consts';

type PostData = { category: string; subcategory?: string };

/** True when a guide belongs to a section or nav item defined by `rules`. */
export function matchesRules(rules: Rule[] | undefined, data: PostData): boolean {
  if (!rules) return false;
  return rules.some(
    (r) => r.category === data.category && (!r.subs || (!!data.subcategory && r.subs.includes(data.subcategory)))
  );
}

export type SubLink = Subcategory & { category: string; href: string; label: string };

const CATEGORY_PREFIX: Record<string, string> = {
  kitchen: 'Kitchen',
  home: 'Home',
  tools: 'Tool',
  garden: 'Garden',
  'smart-home': 'Smart',
};

/**
 * Subcategories covered by `rules` that currently have at least one published
 * guide. Empty subcategory pages are never generated, so they must not be linked.
 */
export function liveSubcategories(rules: Rule[] | undefined, posts: { data: PostData }[]): SubLink[] {
  if (!rules) return [];
  const used = new Set(posts.filter((p) => p.data.subcategory).map((p) => `${p.data.category}/${p.data.subcategory}`));
  const out: SubLink[] = [];
  for (const r of rules) {
    for (const s of SUBCATEGORIES[r.category] ?? []) {
      if (r.subs && !r.subs.includes(s.slug)) continue;
      if (!used.has(`${r.category}/${s.slug}`)) continue;
      out.push({ ...s, category: r.category, href: `/${r.category}/${s.slug}/`, label: s.name });
    }
  }
  // One section can pull from several categories, so two subcategories may share a
  // name (for example "Storage & Organization"). Prefix those so each link is distinct.
  for (const s of out) {
    if (out.filter((o) => o.name === s.name).length > 1) {
      s.label = `${CATEGORY_PREFIX[s.category] ?? ''} ${s.name}`.trim();
    }
  }
  return out;
}
