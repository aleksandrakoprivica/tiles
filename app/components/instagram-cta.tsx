'use client';

import { MouseEvent } from 'react';
import { useTranslations } from 'next-intl';

const INSTAGRAM_PROFILE = 'https://www.instagram.com/madeoftiles/';
const INSTAGRAM_DM = 'https://ig.me/m/madeoftiles';

export function InstagramCta() {
  const t = useTranslations('main');

  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      return;
    }

    event.preventDefault();
    const startTime = Date.now();
    window.location.href = INSTAGRAM_DM;

    setTimeout(() => {
      if (Date.now() - startTime < 2000) {
        window.location.href = INSTAGRAM_PROFILE;
      }
    }, 1500);
  }

  return (
    <div className="flex justify-center w-full px-4 md:px-8 py-8 md:py-12">
      <a
        href={INSTAGRAM_PROFILE}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-full max-w-md md:max-w-lg items-center justify-center border-2 border-foreground bg-foreground text-background px-10 py-5 md:py-6 text-sm md:text-base uppercase tracking-[0.25em] hover:bg-transparent hover:text-foreground transition-colors"
        style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
      >
        {t('instagramCta')}
      </a>
    </div>
  );
}
