'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from "next/image";
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { locales } from '../i18n';

export function Header() {
  const t = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-foreground/10">
      <div className="max-w-7xl mx-auto pl-3 pr-1 sm:pl-4 sm:pr-1 md:px-6 lg:px-8">
        <div className="flex md:grid md:grid-cols-12 justify-between md:gap-4 items-center h-14 md:h-16">
          {/* Mobile Menu Button */}
          <div className="block md:hidden">
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

          {/* Logo */}
          <Link 
            href={`/${locale}`}
            className="ml-auto -mr-1 md:mr-0 md:ml-0 md:col-span-3 xl:col-span-2 flex items-center md:justify-start" 
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-0 justify-end items-center md:col-span-9 xl:col-span-10">
            <ul className="items-center flex gap-6">
              {navItems.map((item) => (
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
                </li>
              ))}
              {/* Language Switcher */}
              <li className="flex gap-2 ml-4">
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
          <div className="md:hidden border-t border-foreground/10 bg-background/95 backdrop-blur-md">
            <nav className="px-3 py-4">
              <ul className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`font-semibold text-base transition-colors duration-200 uppercase block py-2 ${
                        pathname === item.href ? 'text-foreground' : 'text-foreground/70 hover:text-foreground'
                      }`}
                      style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                      prefetch
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                {/* Mobile Language Switcher */}
                <li className="flex gap-2 pt-2 border-t border-foreground/10">
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
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
