import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Bebas_Neue, IBM_Plex_Mono } from 'next/font/google';
import { Analytics } from "@vercel/analytics/next";

const GOOGLE_ADS_ID = "AW-18407800167";
const META_PIXEL_ID = "1066903319158002";

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tiles.rs';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Tiles | Tile it your way',
  description: 'Tile it your way. Handcrafted tables from tiles, marble, and mirror panels. Custom designs for your space.',
  keywords: ['tiles', 'custom tables', 'handcrafted furniture', 'marble tables', 'mirror tables', 'tile furniture', 'custom design', 'club table', 'table', 'tiled table', 'tiles', 'mosaic table', 'mirror table', 'stolovi', 'nocni stocic', 'stolovi od plocica', 'ogledalo stolovi', 'mermer stolovi','coffee tables', 'rucno radjeni stolovi', 'stolovi plocice', 'stolovi mermer', 'mermerni stolovi', 'stolovi od ogledala', 'stolovi ogledalo', 'stolovi plocice u boji','stolovi male plocice'],
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    title: 'Tiles | Tile it your way',
    description: 'Tile it your way. Handcrafted tables from tiles, marble, and mirror panels. Custom designs for your space.',
    url: siteUrl,
    siteName: 'Tiles',
    images: [
      {
        url: `${siteUrl}/maintilesnew.jpg`,
        width: 2320,
        height: 1280,
        alt: 'Tiles - Custom tile tables',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tiles | Tile it your way',
    description: 'Tile it your way. Handcrafted tables from tiles, marble, and mirror panels. Custom designs for your space.',
    images: [
      {
        url: `${siteUrl}/maintilesnew.jpg`,
        width: 2320,
        height: 1280,
        alt: 'Tiles - Custom tile tables',
      },
    ],
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
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_ID}');
          `}
        </Script>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
