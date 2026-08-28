import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '../../../lib/metadata';
import { locales, type Locale } from '@/i18n';
import { getBlogPost, getBlogSlugs } from '../../../lib/blog';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getBlogSlugs(locale).map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!locales.includes(locale as Locale)) return {};

  const post = getBlogPost(locale as Locale, slug);
  if (!post) return {};

  const languagePaths = post.alternateSlug
    ? {
        sr: locale === 'sr' ? `/sr/blog/${post.slug}` : `/sr/blog/${post.alternateSlug}`,
        en: locale === 'en' ? `/en/blog/${post.slug}` : `/en/blog/${post.alternateSlug}`,
      }
    : undefined;

  return genMeta({
    title: post.title,
    description: post.description,
    image: post.cover,
    path: `/${locale}/blog/${post.slug}`,
    locale,
    type: 'article',
    languagePaths,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const loc = locale as Locale;
  const post = getBlogPost(loc, slug);
  if (!post) {
    notFound();
  }

  const t = await getTranslations({ locale: loc, namespace: 'blog' });
  const common = await getTranslations({ locale: loc, namespace: 'common' });

  return (
    <article className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 md:px-8 pt-6">
        <Link
          href={`/${loc}/blog`}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground transition-colors"
          style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
        >
          {t('backToBlog')}
        </Link>
      </div>

      <header className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-16 space-y-6">
        <h1
          className="text-4xl md:text-6xl leading-tight"
          style={{ fontFamily: 'var(--font-bebas-neue)' }}
        >
          {post.title}
        </h1>
        <p
          className="text-base text-foreground/70"
          style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
        >
          {post.description}
        </p>
        <div className="relative w-full aspect-[16/9] overflow-hidden border border-foreground/10">
          <Image
            src={post.cover}
            alt={post.coverAlt}
            fill
            className="object-cover object-[center_75%]"
            priority
            sizes="(min-width: 768px) 768px, 100vw"
          />
        </div>
      </header>

      <div
        className="max-w-3xl mx-auto px-4 md:px-8 pb-20 space-y-4 [&_h2]:text-3xl [&_h2]:pt-6 [&_h2]:pb-2 [&_p]:text-foreground/80 [&_p]:leading-relaxed [&_a]:underline [&_a]:underline-offset-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_img]:w-full [&_img]:my-8 [&_img]:border [&_img]:border-foreground/10"
        style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
      >
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-8 pb-20">
        <Link
          href={`/${loc}`}
          className="text-xs uppercase tracking-[0.2em] text-foreground/50 hover:text-foreground"
          style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
        >
          {common('backHome')}
        </Link>
      </div>
    </article>
  );
}
