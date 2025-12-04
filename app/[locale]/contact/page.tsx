import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default async function ContactPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contactPage' });
  const common = await getTranslations({ locale, namespace: 'common' });

  const methods = [
    {
      title: t('methods.emailTitle'),
      value: t('methods.emailValue'),
      href: `mailto:${t('methods.emailValue')}`,
    },
    {
      title: t('methods.phoneTitle'),
      value: t('methods.phoneValue'),
      href: `tel:${t('methods.phoneLink')}`,
    }
  ];


  const timeline = [
    { title: t('timelineSteps.callTitle'), copy: t('timelineSteps.callCopy') },
    { title: t('timelineSteps.prototypeTitle'), copy: t('timelineSteps.prototypeCopy') },
    { title: t('timelineSteps.deliveryTitle'), copy: t('timelineSteps.deliveryCopy') },
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
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-16">
        <div className="grid md:grid-cols-[1.2fr_minmax(0,1fr)] gap-10 md:gap-14 items-start">
          <div className="space-y-6">
            <p
              className="text-xs uppercase tracking-[0.3em] text-foreground/50"
              style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
            >
              Contact
            </p>
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

          <div className="space-y-4">
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm border border-foreground/10 bg-background">
              <Image
                src="/contact.png"
                alt="Contact Tiles"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 480px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact methods - centered */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 pb-10 md:pb-14">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {methods.map((method) => (
              <div
                key={method.title}
                className="border border-foreground/10 rounded-sm p-5 bg-background/80 flex flex-col gap-2"
              >
                <p
                  className="text-xs uppercase tracking-[0.3em] text-foreground/50"
                  style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
                >
                  {method.title}
                </p>
                {method.href ? (
                  <a
                    href={method.href}
                    className="text-lg md:text-xl hover:underline"
                    style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
                  >
                    {method.value}
                  </a>
                ) : (
                  <p
                    className="text-lg md:text-xl"
                    style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
                  >
                    {method.value}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tok projekta + making image */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 pb-16 md:pb-20 grid md:grid-cols-2 gap-8 items-stretch">
        {/* Left: making photo (slightly smaller) */}
        <div className="relative w-full h-full min-h-[260px] md:min-h-[320px] overflow-hidden rounded-sm border border-foreground/10 bg-background">
          <Image
            src="/MAKING.png"
            alt="Making tiles process"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 480px"
            className="object-cover"
          />
        </div>

        {/* Right: project flow steps (larger card, same height as image) */}
        <div className="border border-foreground/10 rounded-sm p-6 md:p-8 bg-background/80 h-full flex flex-col justify-between">
          <div className="space-y-6">
            <p
              className="text-xs uppercase tracking-[0.3em] text-foreground/50"
              style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
            >
              {t('timelineTitle')}
            </p>
            <div className="space-y-4">
              {timeline.map((step, index) => (
                <div key={step.title} className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 flex items-center justify-center border border-foreground/20 rounded-full text-xs tracking-widest">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p
                      className="text-xs uppercase tracking-[0.3em] text-foreground/60"
                      style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
                    >
                      {step.title}
                    </p>
                  </div>
                  <p
                    className="text-sm text-foreground/80 leading-relaxed"
                    style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
                  >
                    {step.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
          <a
            href={`mailto:${t('methods.emailValue')}`}
            className="inline-flex items-center justify-center border border-foreground/40 px-6 py-3 text-xs uppercase tracking-[0.3em] hover:bg-foreground hover:text-background transition-colors"
            style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
          >
            {t('ctaButton')}
          </a>
        </div>
      </section>
    </div>
  );
}


