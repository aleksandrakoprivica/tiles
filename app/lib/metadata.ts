import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tiles.rs';
const siteName = 'Tiles';
const defaultDescription = 'Tile it your way. Custom designs for your space.';
const defaultImage = '/maintiles.png';

interface MetadataParams {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  locale?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  keywords?: string[];
}

export function generateMetadata({
  title,
  description = defaultDescription,
  image = defaultImage,
  path = '',
  locale = 'sr',
  type = 'website',
  noindex = false,
  keywords = ['tiles', 'custom tables', 'handcrafted furniture', 'marble tables', 'mirror tables', 'tile furniture', 'custom design'],
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
    keywords,
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
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
          type: 'image/png',
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
    other: {
      'og:image:secure_url': imageUrl,
      'og:image:type': 'image/png',
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

