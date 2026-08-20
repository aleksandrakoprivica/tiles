import type { MetadataRoute } from 'next';
import { locales, type Locale } from '@/i18n';
import { getBlogPosts } from './lib/blog';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tiles.rs';

const staticPaths = ['', '/about', '/contact', '/mirror', '/mono', '/mosaic', '/blog'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      const urlPath = path === '' ? `/${locale}` : `/${locale}${path}`;
      entries.push({
        url: `${siteUrl}${urlPath}`,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : path === '/blog' ? 0.7 : 0.8,
      });
    }

    for (const post of getBlogPosts(locale as Locale)) {
      entries.push({
        url: `${siteUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return entries;
}
