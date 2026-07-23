import type { Metadata } from 'next'
import { Playfair_Display, Lato } from 'next/font/google'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { NAP, SITE_URL, SOCIAL } from '@/lib/site'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-display-loaded',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-body-loaded',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'KC Book Works — Bookkeeping for Retail Store Owners',
    template: '%s | KC Book Works',
  },
  description:
    'Free tools and proactive bookkeeping for brick-and-mortar retailers. Find out where your margins are leaking in 60 seconds.',
  openGraph: {
    siteName: 'KC Book Works',
    locale: 'en_CA',
    type: 'website',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: NAP.name,
  url: SITE_URL,
  address: {
    '@type': 'PostalAddress',
    streetAddress: NAP.addressLine1,
    addressLocality: 'Woodstock',
    addressRegion: 'ON',
    postalCode: 'N4S 7V6',
    addressCountry: 'CA',
  },
  sameAs: [SOCIAL.facebook, SOCIAL.googleBusiness],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable}`}>
      <body className={lato.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
