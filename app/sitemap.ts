import type { MetadataRoute } from 'next';
import { locales } from '@/i18n';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tiles.rs';

const staticPaths = ['', '/about', '/contact', '/mirror', '/mono', '/mosaic'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      const urlPath = path === '' ? `/${locale}` : `/${locale}${path}`;
      entries.push({
        url: `${siteUrl}${urlPath}`,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : 0.8,
      });
    }
  }

  return entries;
}
