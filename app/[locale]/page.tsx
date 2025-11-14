import Image from "next/image";
import Link from "next/link";
import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations(); // Call it inside the component, not at module level
  
  return (
    <>
    <div className="flex min-h-screen bg-background">
      {/* Left Sidebar */}
      <aside className="hidden lg:flex lg:w-1/3 xl:w-1/4 flex-col p-8 pt-20 border-r border-foreground/10">
        {/* Brand Tagline */}
        <div className="mb-8">
          <p className="italic text-foreground/70 text-lg mb-4" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>
            Tile it your way.
          </p>
          <p className="text-foreground/60 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>
            Bring your vision to life with unique, customizable tile designs that make every space truly yours.          </p>
        </div>


      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Mobile Brand Tagline - Visible on mobile, hidden on desktop */}
        <div className="lg:hidden px-4 pt-16 pb-6">
          <p className="italic text-foreground/70 text-lg mb-4" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>
            Tile it your way.
          </p>
          <p className="text-foreground/60 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>
            Bring your vision to life with unique, customizable tile designs that make every space truly yours.
          </p>
        </div>

        {/* Latest Drop Label */}
        <div className="pt-16 md:pt-20 px-4 md:px-8 pb-2">

        </div>

        {/* Product Showcase */}
        <div className="flex-1 px-4 md:px-8 pb-8 -mt-2">
          {/* Product Image */}
          <div className="relative aspect-[9/16] md:aspect-[16/9] bg-foreground/5 rounded-lg overflow-hidden w-full">
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
    <section className="w-full mt-8 md:mt-20 px-4 md:px-8 pb-8">


      {/* 3 Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-4 w-full">
        {/* Column 1 - Mono */}
        <Link href={`/${locale}/mono`} className="relative w-full aspect-[3/4] overflow-hidden hover:opacity-90 transition-opacity">
          <Image
            src="/mono-group.png"
            alt="Mono tile group"
            fill
            className="object-contain"
            sizes="(min-width: 768px) 33vw, 100vw"
          />
        </Link>

        {/* Column 2 - Mosaic */}
        <Link href={`/${locale}/mosaic`} className="relative w-full aspect-[3/4] overflow-hidden hover:opacity-90 transition-opacity">
          <Image
            src="/mosaicc-group.png"
            alt="Mosaic tile group"
            fill
            className="object-contain"
            sizes="(min-width: 768px) 33vw, 100vw"
          />
        </Link>

        {/* Column 3 - Mirror */}
        <Link href={`/${locale}/mirror`} className="relative w-full aspect-[3/4] overflow-hidden hover:opacity-90 transition-opacity">
          <Image
            src="/mirror-group.png"
            alt="Mirror tile group"
            fill
            className="object-contain"
            sizes="(min-width: 768px) 33vw, 100vw"
          />
        </Link>
      </div>
    </section>
    </>
  );
}
