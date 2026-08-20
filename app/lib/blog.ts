import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Locale } from '@/i18n';

export interface BlogPostMeta {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  date: string;
  cover: string;
  coverAlt: string;
  alternateSlug?: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

function readPostFile(locale: Locale, filename: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, locale, filename);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const slug = (data.slug as string) || filename.replace(/\.md$/, '');

  return {
    slug,
    locale,
    title: data.title as string,
    description: data.description as string,
    date: data.date as string,
    cover: data.cover as string,
    coverAlt: data.coverAlt as string,
    alternateSlug: data.alternateSlug as string | undefined,
    content,
  };
}

export function getBlogPosts(locale: Locale): BlogPostMeta[] {
  try {
    const dir = path.join(BLOG_DIR, locale);
    if (!fs.existsSync(dir)) return [];

    return fs
      .readdirSync(dir)
      .filter((file) => file.endsWith('.md'))
      .map((file) => readPostFile(locale, file))
      .filter((post): post is BlogPost => post !== null)
      .sort((a, b) => (a.date < b.date ? 1 : -1))
      .map((post) => ({
        slug: post.slug,
        locale: post.locale,
        title: post.title,
        description: post.description,
        date: post.date,
        cover: post.cover,
        coverAlt: post.coverAlt,
        alternateSlug: post.alternateSlug,
      }));
  } catch (error) {
    console.error('Failed to read blog posts', error);
    return [];
  }
}

export function getBlogPost(locale: Locale, slug: string): BlogPost | null {
  const dir = path.join(BLOG_DIR, locale);
  if (!fs.existsSync(dir)) return null;

  const match = fs.readdirSync(dir).find((file) => {
    const post = readPostFile(locale, file);
    return post?.slug === slug;
  });

  return match ? readPostFile(locale, match) : null;
}

export function getBlogSlugs(locale: Locale): string[] {
  return getBlogPosts(locale).map((post) => post.slug);
}
