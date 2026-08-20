import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '../../lib/metadata';
import { locales, type Locale } from '@/i18n';
import { getBlogPosts } from '../../lib/blog';
import { BlogCard } from '../../components/blog-card';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });

  return genMeta({
    title: t('indexTitle'),
    description: t('indexDescription'),
    image: '/og-image.jpg',
    path: `/${locale}/blog`,
    locale,
    keywords:
      locale === 'sr'
        ? ['klub sto', 'noćni stočić', 'stolovi od keramike', 'stolovi od pločica', 'sto za dnevnu sobu']
        : ['coffee table', 'nightstand', 'ceramic tables', 'tile tables'],
  });
}

export default async function BlogIndexPage({ params }: PageProps) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const loc = locale as Locale;
  const t = await getTranslations({ locale: loc, namespace: 'blog' });
  const common = await getTranslations({ locale: loc, namespace: 'common' });
  const posts = getBlogPosts(loc);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-6">
        <Link
          href={`/${loc}`}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground transition-colors"
          style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
        >
          {common('backHome')}
        </Link>
      </div>

      <section className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-20 space-y-6">
        <h1
          className="text-5xl md:text-7xl leading-tight"
          style={{ fontFamily: 'var(--font-bebas-neue)' }}
        >
          {t('indexTitle')}
        </h1>
        <p
          className="text-base md:text-lg text-foreground/70 max-w-2xl"
          style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
        >
          {t('indexIntro')}
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} href={`/${loc}/blog/${post.slug}`} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
