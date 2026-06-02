import type { Metadata } from 'next';
import { DM_Serif_Display, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { CustomCursor } from '@/components/custom-cursor';
import '@/styles/globals.css';

const dmSerifDisplay = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Hayk Martirosyan',
    template: '%s — Hayk Martirosyan',
  },
  description: 'Engineer. Builder. Thinking out loud. Based in Yerevan.',
  metadataBase: new URL('https://haykerman.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://haykerman.com',
    siteName: 'Hayk Martirosyan',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@TheHaykerman',
  },
  alternates: {
    types: {
      'application/rss+xml': 'https://haykerman.com/feed.xml',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${dmSerifDisplay.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <CustomCursor />
        <Nav />
        <main id="main-content" className="pt-14">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
