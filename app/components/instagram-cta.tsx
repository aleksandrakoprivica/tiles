'use client';

import { useTranslations } from 'next-intl';

const INSTAGRAM_DM = 'https://ig.me/m/madeoftiles';
const PHONE_LINK = 'tel:+381695445889';

const buttonClassName =
  'inline-flex flex-1 w-full items-center justify-center border-2 border-foreground px-6 py-4 sm:px-8 sm:py-5 md:px-10 md:py-6 text-xs sm:text-sm md:text-base uppercase tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.25em] text-center transition-colors';

export function InstagramCta() {
  const t = useTranslations('main');

  return (
    <div className="flex justify-center w-full px-4 md:px-8 py-8 md:py-12">
      <div className="flex flex-col md:flex-row w-full max-w-md md:max-w-3xl gap-3 md:gap-4">
        <a
          href={INSTAGRAM_DM}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonClassName} bg-foreground text-background hover:bg-transparent hover:text-foreground`}
          style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
        >
          {t('instagramCta')}
        </a>
        <a
          href={PHONE_LINK}
          className={`${buttonClassName} bg-transparent text-foreground hover:bg-foreground hover:text-background`}
          style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
        >
          {t('callCta')}
        </a>
      </div>
    </div>
  );
}
