import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tiles.rs';
const siteName = 'Tiles';
const defaultDescription = 'Tile it your way. Handcrafted tables from tiles, marble, and mirror panels. Custom designs for your space.';
const defaultImage = '/maintiles.png';

interface MetadataParams {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  locale?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
}

export function generateMetadata({
  title,
  description = defaultDescription,
  image = defaultImage,
  path = '',
  locale = 'sr',
  type = 'website',
  noindex = false,
}: MetadataParams): Metadata {
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const url = `${siteUrl}${path}`;
  // Construct absolute URL for Open Graph images (required by most social platforms)
  const imageUrl = image.startsWith('http') 
    ? image 
    : `${siteUrl}${image.startsWith('/') ? image : `/${image}`}`;

  // Extract path without locale for alternate language URLs
  const pathWithoutLocale = path.replace(/^\/[a-z]{2}/, '') || '/';
  
  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: url,
      languages: {
        'en': `${siteUrl}/en${pathWithoutLocale}`,
        'sr': `${siteUrl}/sr${pathWithoutLocale}`,
      },
    },
    openGraph: {
      type,
      title: fullTitle,
      description,
      url,
      siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title || siteName,
        },
      ],
      locale: locale === 'sr' ? 'sr_RS' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title || siteName,
        },
      ],
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
      },
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/favicon.ico',
    },
  };
}

