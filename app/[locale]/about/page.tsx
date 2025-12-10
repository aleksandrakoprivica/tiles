import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default async function AboutPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aboutPage' });
  const common = await getTranslations({ locale, namespace: 'common' });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-6">
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
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-20">
        <div className="space-y-12">
          <div className="space-y-4">
            <h1
              className="text-5xl md:text-7xl leading-tight"
              style={{ fontFamily: "var(--font-bebas-neue)" }}
            >
              {t('title')}
            </h1>
            <p
              className="text-base md:text-lg text-foreground/70 leading-relaxed"
              style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
            >
              {t('subtitle')}
            </p>
          </div>

          {/* Family Story with Image */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-stretch">
            <div className="border border-foreground/10 rounded-sm p-6 md:p-10 bg-background/80 flex flex-col">
              <p
                className="text-xs uppercase tracking-[0.3em] text-foreground/50 mb-4"
                style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
              >
                {t('familyStoryTitle')}
              </p>
              <p
                className="text-base md:text-lg text-foreground/80 leading-relaxed flex-grow"
                style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
              >
                {t('familyStoryCopy')}
              </p>
            </div>

            <div className="relative w-full aspect-[3/4] rounded-sm overflow-hidden border border-foreground/10 bg-foreground/5">
              <Image
                src="/stacked.png"
                alt="Stacked tile tables"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tiles Letters Image */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 pb-12 md:pb-16">
        <div className="relative w-full">
          <Image
            src="/tilesletters.png"
            alt="Tiles letters"
            width={1920}
            height={1080}
            className="w-full h-auto"
            sizes="(min-width: 768px) 100vw, 100vw"
          />
        </div>
      </section>

      {/* Process */}


      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 pb-20 md:pb-28">
        <div className="border border-foreground/10 rounded-sm px-6 py-10 md:px-10 md:py-14 bg-[var(--color-grey)]/5 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3">
            <p
              className="text-sm uppercase tracking-[0.3em] text-foreground/60"
              style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
            >
              {t('ctaTitle')}
            </p>
            <p
              className="text-base md:text-lg text-foreground/80 max-w-2xl"
              style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
            >
              {t('ctaCopy')}
            </p>
          </div>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center border border-foreground/40 px-6 py-3 text-xs uppercase tracking-[0.3em] hover:bg-foreground hover:text-background transition-colors"
            style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
          >
            {t('ctaButton')}
          </Link>
        </div>
      </section>
    </div>
  );
}


