import type { Metadata } from "next";
import { Header } from "../header";
import { Footer } from "../components/footer";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n';
import { generateMetadata as genMeta } from '../lib/metadata';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return genMeta({
    title: locale === 'sr' ? 'Tiles | Pločice po Vašoj meri' : 'Tiles | Tile it your way',
    description: locale === 'sr' 
      ? 'Pločice po Vašoj meri. Ručno izrađeni stolovi od pločica, mermera i ogledala. Dizajn po meri za Vaš prostor.'
      : 'Tile it your way. Handcrafted tables from tiles, marble, and mirror panels. Custom designs for your space.',
    path: `/${locale}`,
    locale,
  });
}

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
    </NextIntlClientProvider>
  );
}

