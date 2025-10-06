import type { Metadata } from 'next'
import './globals.css'
import JsonLd from '@/components/seo/JsonLd'

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <JsonLd />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
