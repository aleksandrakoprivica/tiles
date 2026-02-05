import Image from "next/image";
import Link from "next/link";
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '../lib/metadata';
import { CollectionCard } from '../components/collection-card';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  return genMeta({
    title: 'Tile it your way',
    description: locale === 'sr'
      ? 'Dizajnirano po Vašoj meri.'
      : "Let's build something custom.",
    keywords: ['club table', 'table', 'tiled table', 'tiles', 'mosaic table', 'mirror table', 'stolovi', 'nocni stocic', 'stolovi od plocica', 'ogledalo stolovi', 'mermer stolovi','coffee tables'],
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
  
  return (
    <>
    <div className="flex min-h-screen bg-background overflow-x-hidden">
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

        {/* Spacer / top offset for hero image */}
        <div className="pt-10 md:pt-20 px-3 md:px-8 pb-1">

        </div>

        {/* Product Showcase */}
        <div className="flex-1 px-3 md:px-8 pb-6 -mt-2">
          {/* Product Image */}
          <div className="relative aspect-[9/16] md:aspect-[16/9] bg-none rounded-lg overflow-hidden w-full">
            {/* Mobile Image */}
            <Image
              src="/maintiles-mobile.png"
              alt="main"
              fill
              className="object-contain md:object-cover rounded-lg md:hidden"
              priority
            />
            {/* Desktop Image */}
            <Image
              src="/maintiles.png"
              alt="main"
              fill
              className="object-cover rounded-lg hidden md:block"
              priority
            />
          </div>
        </div>
      </main>
    </div>
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
          imageAlt="Mono tile group"
          title={mono('title')}
          learnMoreText={main('learnMore')}
          color="#98866E"
        />

        {/* Column 2 - Mosaic */}
        <CollectionCard
          href={`/${locale}/mosaic`}
          imageSrc="/mosaiccollection.jpg"
          imageAlt="Mosaic tile group"
          title={mosaic('title')}
          learnMoreText={main('learnMore')}
          color="#E4B976"
        />

        {/* Column 3 - Mirror */}
        <CollectionCard
          href={`/${locale}/mirror`}
          imageSrc="/mirrorcollection.jpg"
          imageAlt="Mirror tile group"
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
