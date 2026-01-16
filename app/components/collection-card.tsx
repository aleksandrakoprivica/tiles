'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from 'react';

interface CollectionCardProps {
  href: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  learnMoreText: string;
  color: string;
}

export function CollectionCard({
  href,
  imageSrc,
  imageAlt,
  title,
  learnMoreText,
  color,
}: CollectionCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Only trigger on mobile (when window width is less than 768px)
          if (window.innerWidth < 768) {
            if (entry.isIntersecting) {
              // Clear any existing timeout
              if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current);
              }
              // Delay showing the overlay by 1 second after it enters viewport
              timeoutIdRef.current = setTimeout(() => {
                setIsVisible(true);
              }, 500);
            } else {
              // Hide overlay immediately when it leaves viewport
              if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current);
                timeoutIdRef.current = null;
              }
              setIsVisible(false);
            }
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the element is visible
        rootMargin: '0px',
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <Link
      ref={cardRef}
      href={href}
      className="relative w-full aspect-[2/4] md:aspect-[3/4] overflow-hidden group cursor-pointer"
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className={`object-contain transition-opacity duration-300 ${
          isVisible ? 'opacity-50' : 'group-hover:opacity-50'
        }`}
        sizes="(min-width: 768px) 33vw, 100vw"
      />
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      >
        {/* Title - shown on both mobile and desktop */}
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold"
          style={{ fontFamily: 'var(--font-bebas-neue)', color }}
        >
          {title}
        </h2>
        {/* Saznaj više - shown on both mobile and desktop */}
        <p
          className="text-base md:text-base mt-2 md:mt-4 uppercase tracking-wider"
          style={{ fontFamily: 'var(--font-ibm-plex-mono)', color }}
        >
          {learnMoreText}
        </p>
      </div>
    </Link>
  );
}

