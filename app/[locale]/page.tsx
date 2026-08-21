import Image from "next/image";
import Link from "next/link";
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '../lib/metadata';
import { CollectionCard } from '../components/collection-card';
import { BlogCard } from '../components/blog-card';
import { InstagramCta } from '../components/instagram-cta';
import { getBlogPosts } from '../lib/blog';
import type { Locale } from '@/i18n';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  return genMeta({
    title: locale === 'sr'
      ? 'Klub sto, noćni stočić i stolovi od keramike'
      : 'Coffee tables, nightstands and ceramic tile tables',
    description: locale === 'sr'
      ? 'Ručno rađeni klub sto za dnevnu sobu, noćni stočić i pomoćni sto. Stolovi od keramike i pločica po meri — TILES Novi Sad.'
      : 'Handmade coffee tables, nightstands and side tables in ceramic tile. Custom TILES tables from Novi Sad.',
    keywords: ['club table', 'table', 'tiled table', 'tiles', 'mosaic table', 'mirror table', 'stolovi', 'nocni stocic', 'stolovi od plocica', 'ogledalo stolovi', 'mermer stolovi','coffee tables', 'klub sto', 'klub sto za dnevnu sobu', 'stolovi od keramike'],
    image: '/og-image.jpg',
    path: `/${locale}`,
    locale,
  });
}

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const mono = await getTranslations({ locale, namespace: 'mono' });
  const mosaic = await getTranslations({ locale, namespace: 'mosaic' });
  const mirror = await getTranslations({ locale, namespace: 'mirror' });
  const main = await getTranslations({ locale, namespace: 'main' });
  const loc = locale as Locale;
  const posts = getBlogPosts(loc);

  
  return (
    <>
    <div className="flex bg-background overflow-x-hidden">
      {/* Left Sidebar */}
      <aside className="hidden lg:flex lg:w-1/3 xl:w-1/4 flex-col p-8 pt-20 border-r border-foreground/10">
        {/* Brand Tagline */}
        <div className="mb-8">
          <p className="italic text-foreground/70 text-lg mb-4" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>
            {main('tagline')}
          </p>
          <p className="text-foreground/60 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>
            {main('description')}
          </p>
        </div>


      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Mobile Brand Tagline - Visible on mobile, hidden on desktop */}
        <div className="lg:hidden px-3 pt-14 pb-4">
          <p className="italic text-foreground/70 text-lg mb-4" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>
            {main('tagline')}
          </p>
          <p className="text-foreground/60 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>
            {main('description')}
          </p>
        </div>

        {/* Product Showcase */}
        <div className="px-3 md:px-8 pt-6 md:pt-12 pb-6">
          <div className="w-full max-w-7xl mx-auto bg-background border border-foreground/10 p-2 md:p-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
              {[
                {
                  src: '/maintilesnew.jpg',
                  alt: 'klub sto dnevna soba',
                },
                {
                  src: '/hero-klub-sto.png',
                  alt: 'klub sto dnevna soba',
                },
                {
                  src: '/hero-mosaic-sto.png',
                  alt: 'klub sto dnevna soba',
                },
              ].map((image) => (
                <div
                  key={image.src}
                  className="relative w-full h-[52vh] md:h-[64vh] overflow-hidden bg-background"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-contain object-bottom"
                    priority
                    sizes="(min-width: 768px) 30vw, 100vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>

    <InstagramCta />

    <section className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-20 space-y-8">
      <h2
        className="text-4xl md:text-6xl lg:text-7xl text-center tracking-wider"
        style={{ fontFamily: 'var(--font-bebas-neue)', letterSpacing: '0.12em' }}
      >
        {main('guidesTitle')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.slug} href={`/${loc}/blog/${post.slug}`} post={post} />
        ))}
      </div>
    </section>
    {/* Photo Grid Section - Full Width */}
    <section 
      className="mt-6 md:mt-20 pb-6 md:pb-10"
      style={{
        width: '100vw',
        marginLeft: 'calc(50% - 50vw)',
        marginRight: 'calc(50% - 50vw)',
        maxWidth: '100vw'
      }}
    >
      {/* Collections title */}
      <div className="mb-8 md:mb-12 text-center px-3 md:px-8 max-w-7xl mx-auto">
        <h2
          className="text-4xl md:text-6xl lg:text-7xl text-foreground tracking-wider"
          style={{ fontFamily: 'var(--font-bebas-neue)', letterSpacing: '0.2em' }}
        >
          {main('collectionsTitle')}
        </h2>
      </div>

      {/* 3 Column Grid - Edge to edge on mobile and desktop */}
      <div className="w-full px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0 w-full">
        {/* Column 1 - Mono */}
        <CollectionCard
          href={`/${locale}/mono`}
          imageSrc="/monocollection.jpg"
          imageAlt="Mono klub sto od keramičkih pločica"
          title={mono('title')}
          learnMoreText={main('learnMore')}
          color="#98866E"
        />

        {/* Column 2 - Mosaic */}
        <CollectionCard
          href={`/${locale}/mosaic`}
          imageSrc="/mosaiccollection.jpg"
          imageAlt="Mosaic sto od keramike sa sitnim pločicama"
          title={mosaic('title')}
          learnMoreText={main('learnMore')}
          color="#E4B976"
        />

        {/* Column 3 - Mirror */}
        <CollectionCard
          href={`/${locale}/mirror`}
          imageSrc="/mirrorcollection.jpg"
          imageAlt="Mirror sto sa ogledalom — klub sto ili noćni stočić"
          title={mirror('title')}
          learnMoreText={main('learnMore')}
          color="#7E7F80"
        />
        </div>
      </div>
    </section>
    </>
  );
}
