import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tiles.rs';
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
  keywords = ['tiles', 'custom tables', 'handcrafted furniture', 'marble tables', 'mirror tables', 'tile furniture', 'custom design', 'club table', 'table', 'tiled table', 'tiles', 'mosaic table', 'mirror table', 'stolovi', 'nocni stocic', 'stolovi od plocica', 'ogledalo stolovi', 'mermer stolovi','coffee tables', 'rucno radjeni stolovi', 'stolovi plocice', 'stolovi mermer', 'mermerni stolovi', 'stolovi od ogledala', 'stolovi ogledalo', 'stolovi plocice u boji','stolovi male plocice'],
}: MetadataParams): Metadata {
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const url = `${siteUrl}${path}`;
  // Construct absolute URL for Open Graph images (required by most social platforms)
  const imageUrl = image.startsWith('http') 
    ? image 
    : `${siteUrl}${image.startsWith('/') ? image : `/${image}`}`;

  // Detect image type and dimensions based on filename
  const isJpeg = image.toLowerCase().endsWith('.jpg') || image.toLowerCase().endsWith('.jpeg');
  const isOgImage = image.includes('og-image');
  const imageType = isJpeg ? 'image/jpeg' : 'image/png';
  // Use optimized dimensions for og-image (1200x630), otherwise use original (2320x1280)
  const imageWidth = isOgImage ? 1200 : 2320;
  const imageHeight = isOgImage ? 630 : 1280;

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
      locale: locale === 'sr' ? 'sr_RS' : 'en_US',
      images: [
        {
          url: imageUrl,
          width: imageWidth,
          height: imageHeight,
          alt: title || siteName,
          type: imageType,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [
        {
          url: imageUrl,
          width: imageWidth,
          height: imageHeight,
          alt: title || siteName,
        },
      ],
    },
    other: {
      'og:image': imageUrl,
      'og:image:url': imageUrl,
      'og:image:secure_url': imageUrl,
      'og:image:type': imageType,
      'og:image:width': String(imageWidth),
      'og:image:height': String(imageHeight),
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

