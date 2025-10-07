import type { Metadata } from 'next'
import { Suspense } from 'react'
import './globals.css'
import JsonLd from '@/components/seo/JsonLd'
import Header from '@/components/navigation/Header'
import MobileNav from '@/components/navigation/MobileNav'
import Footer from '@/components/layout/Footer'
import ScrollToTopButton from '@/components/ui/ScrollToTopButton'
import AnalyticsListener from '@/components/analytics/AnalyticsListener'
import PerformancePanel from '@/components/analytics/PerformancePanel'
import ServiceWorkerManager from '@/components/analytics/ServiceWorkerManager'
import PageTransition from '@/components/ui/PageTransition'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Siva Komaragiri - Healthcare Analytics Leader & AI Systems Architect',
  description: 'Portfolio of Siva Komaragiri showcasing healthcare analytics, AI systems, and product engineering work.',
  metadataBase: new URL('https://sivakomaragiri.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sivakomaragiri.com',
    siteName: 'Siva Komaragiri Portfolio',
    images: ['/og?title=Siva%20Komaragiri'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@SivaK',
    creator: '@SivaK',
  },
}

import Providers from './providers'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="light" style={{ colorScheme: 'light' }} suppressHydrationWarning>
      <head>
        <Script
          id="theme-initializer"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var storageKey = 'theme';
                  var classList = document.documentElement.classList;
                  var storedTheme = window.localStorage.getItem(storageKey);
                  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = storedTheme === 'light' || storedTheme === 'dark'
                    ? storedTheme
                    : (prefersDark ? 'dark' : 'light');

                  classList.remove('light', 'dark');
                  classList.add(theme);
                  document.documentElement.dataset.theme = theme;
                  document.documentElement.style.colorScheme = theme === 'dark' ? 'dark' : 'light';
                } catch (error) {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                  document.documentElement.dataset.theme = 'light';
                  document.documentElement.style.colorScheme = 'light';
                }
              })();
            `,
          }}
        />
        <JsonLd />
        <Script
          id="plausible"
          src="https://plausible.io/js/script.js"
          data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || process.env.PLAUSIBLE_DOMAIN || 'sivakomaragiri.com'}
          strategy="lazyOnload"
        />
        <link rel="alternate" type="application/rss+xml" href="/rss.xml" title="Healthcare Analytics Notes" />
      </head>
      <body className="relative antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100" suppressHydrationWarning>
        <Providers>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-gray-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white">
            Skip to content
          </a>
          <MobileNav />
          <Header />
          <main id="main-content" className="min-h-screen bg-[--color-bg]">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <ScrollToTopButton />
          <Suspense fallback={null}>
            <AnalyticsListener />
          </Suspense>
          <PerformancePanel />
          <ServiceWorkerManager />
        </Providers>
      </body>
    </html>
  )
}
