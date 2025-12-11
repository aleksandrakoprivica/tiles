import Image from "next/image";
import Link from "next/link";
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '../../lib/metadata';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'mosaic' });
  
  return genMeta({
    title: t('title'),
    description: t('description'),
    image: '/mosaicc-group.png',
    path: `/${locale}/mosaic`,
    locale,
  });
}

export default async function MosaicPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Explicitly pass locale and namespace to ensure correct language is used
  const t = await getTranslations({ locale, namespace: 'mosaic' });
  const common = await getTranslations({ locale, namespace: 'common' });
  
  const specs = [
    { label: t('specs.finish'), value: t('specs.finishValue') },
    { label: t('specs.leadTime'), value: t('specs.leadTimeValue') },
    { label: t('specs.sizes'), value: t('specs.sizesValue') },
    { label: t('specs.use'), value: t('specs.useValue') },
  ];

  const materialCards = [
    {
      title: t('material.title'),
      copy: t('material.description'),
    },
    {
      title: t('care.title'),
      copy: t('care.description'),
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-4 md:pt-6">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground transition-colors"
          style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
        >
          <svg
            className="w-3 h-3"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.5 2L1 6L4.5 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 6H11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          {common('backHome')}
        </Link>
      </div>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 pt-6 pb-10 md:py-20">
        <div className="flex flex-col md:flex-row items-stretch gap-6 md:gap-14">
          <div className="md:w-5/12 flex flex-col justify-between h-full">
            <div className="space-y-8 md:space-y-12">
              <h1
                className="text-5xl md:text-7xl leading-tight"
                style={{ fontFamily: "var(--font-bebas-neue)" }}
              >
                {t('title')}
              </h1>
              <p
                className="text-base md:text-lg text-foreground/70"
                style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
              >
                {t('description')}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center text-xs uppercase tracking-wide mt-auto pt-8 md:pt-12">
              {specs.map((item) => (
                <div
                  key={item.label}
                  className="border border-foreground/10 py-4"
                  style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
                >
                  <p className="text-foreground/50 mb-1">{item.label}</p>
                  <p className="text-sm text-foreground/90 normal-case">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="md:flex-1 relative w-full aspect-[5/6] md:aspect-[3/4] rounded-sm overflow-hidden">
            <Image
              src="/mosaic1.png"
              alt="Mosaic hero table"
              fill
              className="object-contain"
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
          </div>
        </div>
      </section>

      {/* Material Story */}
      <section className="bg-[var(--color-grey)]/6 border-t border-b border-foreground/10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14 grid md:grid-cols-2 gap-6">
          {materialCards.map((card) => (
            <div
              key={card.title}
              className="bg-background/70 border border-foreground/10 rounded-sm p-6 flex flex-col gap-3"
            >
              <p
                className="text-xs uppercase tracking-[0.2em] text-foreground/50"
                style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
              >
                {card.title}
              </p>
              <p
                className="text-base text-foreground/80 leading-relaxed"
                style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
              >
                {card.copy}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery + Details */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-20 space-y-10 md:space-y-14">
        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-5">
            <p
              className="text-sm uppercase tracking-[0.2em] text-foreground/50"
              style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
            >
              {t('whyMosaic')}
            </p>
            <p
              className="text-lg md:text-xl text-foreground/80 leading-relaxed"
              style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
            >
              {t('whyMosaicDescription')}
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="relative w-full aspect-[6/3] rounded-sm overflow-hidden border border-foreground/10">
              <Image
                src="/mosaic3.png"
                alt="Mosaic styling 1"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 60vw, 100vw"
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative aspect-[3/4] rounded-sm overflow-hidden border border-foreground/10">
            <Image
              src="/mosaic2.png"
              alt="Mosaic styling detail"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 33vw, 100vw"
            />
          </div>
          <div className="relative aspect-[3/4] rounded-sm overflow-hidden border border-foreground/10">
            <Image
              src="/mosaic4.png"
              alt="Mosaic tabletop closeup"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 33vw, 100vw"
            />
          </div>
          <div className="relative aspect-[3/4] rounded-sm overflow-hidden border border-foreground/10">
            <Image
              src="/mosaic5.png"
              alt="Mosaic styling 2"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 33vw, 100vw"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
