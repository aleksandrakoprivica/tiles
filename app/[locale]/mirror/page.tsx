import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default async function MirrorPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'mirror' });
  const common = await getTranslations({ locale, namespace: 'common' });

  const gallery = [
    { src: "/mirror-1.png", alt: "Mirror table styled with books" },
    { src: "/mirror-2.png", alt: "Mirror table corner detail" },
    { src: "/mirror-3.png", alt: "Mirror table reflection" },
    { src: "/mirror-4.png", alt: "Mirror tables set" },
  ];

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
        <div className="grid md:grid-cols-5 gap-10 md:gap-14">
          <div className="md:col-span-2 space-y-8">
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

            <div className="border border-foreground/10 rounded-sm p-6 bg-background/80">
              <p
                className="text-xs uppercase tracking-[0.2em] text-foreground/50 mb-2"
                style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
              >
                {t('detailsTitle')}
              </p>
              <p
                className="text-sm md:text-base text-foreground/80 leading-relaxed"
                style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
              >
                {t('detailsCopy')}
              </p>
            </div>
          </div>

          <div className="md:col-span-3 relative w-full aspect-[3/4] rounded-sm overflow-hidden border border-foreground/10 bg-foreground/5">
            <Image
              src="/mirror-group.png"
              alt="Mirror collection hero"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 pb-16 md:pb-24 space-y-8">
        {/* Hero gallery image */}
        <div className="relative aspect-[16/9] rounded-sm overflow-hidden border border-foreground/10 bg-foreground/5">
          <Image
            src={gallery[0].src}
            alt={gallery[0].alt}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 60vw, 100vw"
          />
        </div>

        {/* Supporting images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gallery.slice(1).map((image) => (
            <div
              key={image.src}
              className="relative aspect-[4/3] rounded-sm overflow-hidden border border-foreground/10 bg-foreground/5"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

