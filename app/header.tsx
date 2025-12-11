'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from "next/image";
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { locales } from '@/i18n';
import { ThemeToggle } from './components/theme-toggle';

export function Header() {
  const t = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);

  const navItems = [
    {
      label: t('home'),
      href: `/${locale}`,
    },
    {
      label: t('about'),
      href: `/${locale}/about`,
    },
    {
      label: t('contact'),
      href: `/${locale}/contact`,
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-foreground/10 overflow-x-hidden">
      <div className="max-w-7xl mx-auto pl-3 pr-3 sm:pl-4 sm:pr-4 md:px-6 lg:px-8">
        <div className="flex md:grid md:grid-cols-12 items-center md:gap-4 h-14 md:h-16">
          {/* Logo */}
          <Link 
            href={`/${locale}`}
            className="md:col-span-3 xl:col-span-2 flex items-center md:justify-start" 
            prefetch
          >
            <Image 
              src="/logo-tiles.png"
              alt="logo" 
              width={250} 
              height={120}
              className="w-32 md:w-64 h-auto"
            />
          </Link>

          {/* Mobile Menu Button */}
          <div className="block md:hidden ml-auto">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-foreground hover:bg-foreground/10 transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-0 justify-end items-center md:col-span-9 xl:col-span-10">
            <ul className="items-center flex gap-6">
              {navItems.map((item, index) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`font-semibold text-base transition-colors duration-200 uppercase ${
                      pathname === item.href ? 'text-foreground' : 'text-foreground/70 hover:text-foreground'
                    }`}
                    style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                    prefetch
                  >
                    {item.label}
                  </Link>

                  {/* Insert collections dropdown right after the first item (Home) */}
                  {index === 0 && (
                    <span className="relative inline-block ml-6 align-middle">
                      {/* Collections dropdown (desktop) */}
                      <button
                        type="button"
                        onClick={() => setIsCollectionsOpen((open) => !open)}
                        className={`font-semibold text-base transition-colors duration-200 uppercase inline-flex items-center gap-1 ${
                          pathname?.includes('/mono') || pathname?.includes('/mosaic') || pathname?.includes('/mirror')
                            ? 'text-foreground'
                            : 'text-foreground/70 hover:text-foreground'
                        }`}
                        style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                      >
                        {t('collections')}
                        <span className="text-[10px] tracking-[0.2em]">
                          {isCollectionsOpen ? '▲' : '▼'}
                        </span>
                      </button>

                      {isCollectionsOpen && (
                        <div className="absolute left-0 mt-2 w-40 rounded-sm border border-foreground/10 bg-background/95 shadow-lg py-2 z-50">
                          <Link
                            href={`/${locale}/mono`}
                            className="block px-4 py-2 text-sm uppercase text-foreground/80 hover:bg-foreground/5"
                            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                            onClick={() => setIsCollectionsOpen(false)}
                          >
                            {t('mono')}
                          </Link>
                          <Link
                            href={`/${locale}/mosaic`}
                            className="block px-4 py-2 text-sm uppercase text-foreground/80 hover:bg-foreground/5"
                            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                            onClick={() => setIsCollectionsOpen(false)}
                          >
                            {t('mosaic')}
                          </Link>
                          <Link
                            href={`/${locale}/mirror`}
                            className="block px-4 py-2 text-sm uppercase text-foreground/80 hover:bg-foreground/5"
                            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                            onClick={() => setIsCollectionsOpen(false)}
                          >
                            {t('mirror')}
                          </Link>
                        </div>
                      )}
                    </span>
                  )}
                </li>
              ))}

              {/* Theme Toggle */}
              <li className="ml-4">
                <ThemeToggle />
              </li>

              {/* Language Switcher */}
              <li className="flex gap-2 ml-2">
                {locales.map((loc) => (
                  <Link
                    key={loc}
                    href={pathname.replace(`/${locale}`, `/${loc}`)}
                    className={`text-sm uppercase px-2 py-1 rounded transition-colors ${
                      locale === loc 
                        ? 'text-foreground font-semibold' 
                        : 'text-foreground/50 hover:text-foreground/70'
                    }`}
                    style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                  >
                    {loc.toUpperCase()}
                  </Link>
                ))}
              </li>
            </ul>
          </nav>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-foreground/10 bg-background/98 backdrop-blur-md">
            <nav className="px-6 py-5">
              <ul className="flex flex-col gap-3">
                {/* First: home */}
                <li className="border-b border-foreground/5 pb-3">
                  <Link
                    href={navItems[0].href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-3 text-xs tracking-[0.25em] uppercase transition-colors duration-200 ${
                      pathname === navItems[0].href ? 'text-foreground' : 'text-foreground/70 hover:text-foreground'
                    }`}
                    style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                    prefetch
                  >
                    {navItems[0].label}
                  </Link>
                </li>

                {/* Collections group (mobile) directly after home */}
                <li className="pt-3 pb-3 border-b border-foreground/5">
                  <p
                    className="text-[11px] uppercase tracking-[0.3em] text-foreground/60 mb-3"
                    style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                  >
                    {t('collections')}
                  </p>
                  <div className="flex flex-col gap-2 pl-1">
                    <Link
                      href={`/${locale}/mono`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-xs uppercase text-foreground/80 py-2 tracking-[0.2em]"
                      style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                    >
                      {t('mono')}
                    </Link>
                    <Link
                      href={`/${locale}/mosaic`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-xs uppercase text-foreground/80 py-2 tracking-[0.2em]"
                      style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                    >
                      {t('mosaic')}
                    </Link>
                    <Link
                      href={`/${locale}/mirror`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-xs uppercase text-foreground/80 py-2 tracking-[0.2em]"
                      style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                    >
                      {t('mirror')}
                    </Link>
                  </div>
                </li>
                
                {/* Remaining nav items: about, contact */}
                {navItems.slice(1).map((item) => (
                  <li
                    key={item.href}
                    className="border-b border-foreground/5 last:border-b-0 pb-3"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block py-3 text-xs tracking-[0.25em] uppercase transition-colors duration-200 ${
                        pathname === item.href ? 'text-foreground' : 'text-foreground/70 hover:text-foreground'
                      }`}
                      style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                      prefetch
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                {/* Mobile Theme Toggle and Language Switcher */}
                <li className="flex items-center justify-between pt-4 pb-2 border-t border-foreground/10">
                  <ThemeToggle />
                  <div className="flex gap-2">
                    {locales.map((loc) => (
                      <Link
                        key={loc}
                        href={pathname.replace(`/${locale}`, `/${loc}`)}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-sm uppercase px-3 py-2 rounded transition-colors ${
                          locale === loc 
                            ? 'text-foreground font-semibold bg-foreground/10' 
                            : 'text-foreground/50 hover:text-foreground/70'
                        }`}
                        style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                      >
                        {loc.toUpperCase()}
                      </Link>
                    ))}
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
