import { type Locale } from '@/i18n';
import { getBlogAlternateSlug } from './blog-alternates';

export function switchLocalePath(
  pathname: string,
  fromLocale: string,
  toLocale: Locale
): string {
  const withoutLocale = pathname.replace(new RegExp(`^/${fromLocale}(?=/|$)`), '') || '/';
  const segment = withoutLocale.replace(/^\//, '');

  if (segment.startsWith('blog/')) {
    const slug = segment.slice('blog/'.length);
    const alt = getBlogAlternateSlug(slug);
    if (alt) return `/${toLocale}/blog/${alt}`;
    return `/${toLocale}/blog`;
  }

  if (segment === 'blog') {
    return `/${toLocale}/blog`;
  }

  if (withoutLocale === '/') {
    return `/${toLocale}`;
  }

  return `/${toLocale}${withoutLocale}`;
}
