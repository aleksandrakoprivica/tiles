'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  const localizedHref = (path: string = '') => {
    const basePath = `/${locale}`;
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return path ? `${basePath}${normalizedPath}` : basePath;
  };

  return (
    <footer className="border-t border-foreground/10 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div>
            <h3 
              className="text-2xl font-bold text-foreground mb-4"
              style={{ fontFamily: 'var(--font-bebas-neue)' }}
            >
              TILES
            </h3>
            <p 
              className="text-foreground/60 text-sm leading-relaxed"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              Tile it your way.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 
              className="text-sm font-semibold uppercase tracking-wider text-foreground/70 mb-4"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              {t('navigation')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href={localizedHref()}
                  className="text-foreground/60 hover:text-foreground transition-colors text-sm"
                  style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link 
                  href={localizedHref('/about')} 
                  className="text-foreground/60 hover:text-foreground transition-colors text-sm"
                  style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link 
                  href={localizedHref('/contact')} 
                  className="text-foreground/60 hover:text-foreground transition-colors text-sm"
                  style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h4 
              className="text-sm font-semibold uppercase tracking-wider text-foreground/70 mb-4"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              {t('collections')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href={localizedHref('/mono')} 
                  className="text-foreground/60 hover:text-foreground transition-colors text-sm"
                  style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  Mono
                </Link>
              </li>
              <li>
                <Link 
                  href={localizedHref('/mosaic')} 
                  className="text-foreground/60 hover:text-foreground transition-colors text-sm"
                  style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  Mosaic
                </Link>
              </li>
              <li>
                <Link 
                  href={localizedHref('/mirror')} 
                  className="text-foreground/60 hover:text-foreground transition-colors text-sm"
                  style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  Mirror
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 md:mt-12 pt-8 border-t border-foreground/10">
          <div className="flex flex-col items-center gap-2 md:flex-row md:justify-between">
            <div 
              className="flex items-center gap-2 text-foreground/50 text-xs"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              <svg
                className="w-3.5 h-3.5 text-foreground/60"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M12 2.75C8.96 2.75 6.5 5.21 6.5 8.25C6.5 11.79 10.05 15.86 11.64 17.57C11.84 17.79 12.16 17.79 12.36 17.57C13.95 15.86 17.5 11.79 17.5 8.25C17.5 5.21 15.04 2.75 12 2.75Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 10.25C12.9665 10.25 13.75 9.4665 13.75 8.5C13.75 7.5335 12.9665 6.75 12 6.75C11.0335 6.75 10.25 7.5335 10.25 8.5C10.25 9.4665 11.0335 10.25 12 10.25Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Novi Sad, Srbija</span>
            </div>

            <p 
              className="text-center md:text-right text-foreground/40 text-xs"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              © {new Date().getFullYear()} Tiles. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

