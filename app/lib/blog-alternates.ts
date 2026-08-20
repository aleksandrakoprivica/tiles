const BLOG_ALTERNATES: Record<string, string> = {
  'kako-izabrati-klub-sto': 'how-to-choose-a-coffee-table',
  'how-to-choose-a-coffee-table': 'kako-izabrati-klub-sto',
  'kako-izabrati-nocni-stocic': 'how-to-choose-a-nightstand',
  'how-to-choose-a-nightstand': 'kako-izabrati-nocni-stocic',
};

export function getBlogAlternateSlug(slug: string): string | null {
  return BLOG_ALTERNATES[slug] ?? null;
}
