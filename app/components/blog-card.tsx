import Image from 'next/image';
import Link from 'next/link';
import type { BlogPostMeta } from '../lib/blog';

interface BlogCardProps {
  href: string;
  post: BlogPostMeta;
}

export function BlogCard({ href, post }: BlogCardProps) {
  return (
    <Link href={href} className="group block border border-foreground/10 overflow-hidden">
      <div className="relative aspect-[16/10]">
        <Image
          src={post.cover}
          alt={post.coverAlt}
          fill
          className="object-cover object-[center_75%] group-hover:opacity-80 transition-opacity"
          sizes="(min-width: 768px) 33vw, 100vw"
        />
      </div>
      <div className="p-5 space-y-2">
        <h3
          className="text-2xl md:text-3xl leading-tight group-hover:opacity-80"
          style={{ fontFamily: 'var(--font-bebas-neue)' }}
        >
          {post.title}
        </h3>
        <p
          className="text-sm text-foreground/70 leading-relaxed"
          style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
        >
          {post.description}
        </p>
      </div>
    </Link>
  );
}
