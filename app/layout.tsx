import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Bebas_Neue, IBM_Plex_Mono } from 'next/font/google';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: '--font-bebas-neue',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://tiles.rs'),
  title: {
    default: 'Tiles | Tile it your way',
    template: '%s | Tiles',
  },
  description: 'Tile it your way. Handcrafted tables from tiles, marble, and mirror panels. Custom designs for your space.',
  keywords: ['tiles', 'custom tables', 'handcrafted furniture', 'marble tables', 'mirror tables', 'tile furniture', 'custom design'],
  authors: [{ name: 'Tiles' }],
  creator: 'Tiles',
  publisher: 'Tiles',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['sr_RS'],
    siteName: 'Tiles',
    title: 'Tiles | Tile it your way',
    description: 'Tile it your way. Handcrafted tables from tiles, marble, and mirror panels. Custom designs for your space.',
    images: [
      {
        url: '/maintiles.png',
        width: 1200,
        height: 630,
        alt: 'Tiles - Custom tile tables',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tiles | Tile it your way',
    description: 'Tile it your way. Handcrafted tables from tiles, marble, and mirror panels.',
    images: ['/maintiles.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className="overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${ibmPlexMono.variable} antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
