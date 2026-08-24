import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '../../lib/metadata';
import { ContactForm } from '../../components/contact-form';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contactPage' });
  
  return genMeta({
    title: t('contact'),
    description: t('subtitle'),
    image: '/contact.png',
    path: `/${locale}/contact`,
    locale,
  });
}

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
      href: t('methods.phoneLink'),
    },
    {
      title: t('methods.instagramTitle'),
      value: t('methods.instagramValue'),
      href: t('methods.instagramLink'),
    }
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
        <div className="grid md:grid-cols-[1fr_1.1fr] gap-10 md:gap-14 items-start">
          <div className="space-y-6">
            <p
              className="text-xs uppercase tracking-[0.3em] text-foreground/50"
              style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
            >
              {t('contact')}
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

          <div className="border border-foreground/10 rounded-sm p-5 md:p-8 bg-background/80">
            <p
              className="text-xs uppercase tracking-[0.3em] text-foreground/50 mb-6"
              style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
            >
              {t('form.title')}
            </p>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Contact methods - centered */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 pb-20 md:pb-28">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {methods.map((method) => (
              <div
                key={method.title}
                className="min-w-0 border border-foreground/10 rounded-sm px-4 py-5 md:px-5 bg-background/80 flex flex-col gap-2"
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
                    className="text-sm md:text-[15px] whitespace-nowrap hover:underline"
                    style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
                  >
                    {method.value}
                  </a>
                ) : (
                  <p
                    className="text-sm md:text-[15px] whitespace-nowrap"
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
    </div>
  );
}


