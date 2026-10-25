import { getCollection } from 'astro:content';
import { CATEGORY_MAP, MAIN_NAV, SUBCATEGORY_MAP } from '../consts';
import { matchesRules } from '../lib/sections';

// Small static index for the on-site search. Only published guides, and only
// text that is already public on the page: title, summary, topic names and the
// FAQ questions. primaryKeyword is deliberately left out, it is private.
export async function GET() {
  const posts = (await getCollection('posts', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  const index = posts.map((p) => {
    const section = MAIN_NAV.find((n) => matchesRules(n.rules, p.data));
    const sub = p.data.subcategory ? SUBCATEGORY_MAP[`${p.data.category}/${p.data.subcategory}`] : undefined;
    return {
      title: p.data.title,
      excerpt: p.data.excerpt,
      category: section?.name ?? CATEGORY_MAP[p.data.category]?.name ?? '',
      topic: sub?.name ?? '',
      faq: p.data.faqs.map((f) => f.question).join(' '),
      url: `/${p.data.category}/${p.id}/`,
    };
  });

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
}
