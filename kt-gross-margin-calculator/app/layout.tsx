import type { Metadata } from 'next'
import { Playfair_Display, Lato } from 'next/font/google'
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
  title: 'Free Retail Calculators — KC Book Works',
  description:
    'Free retail tools for store owners — gross margin, discount impact, and door crasher profit calculators. Instant results, no account required.',
  openGraph: {
    title: 'Free Retail Calculators for Store Owners',
    description:
      'Pricing, promotions, and event profit tools built for brick-and-mortar retailers.',
    url: 'https://calculator.ktbookworks.com',
    siteName: 'KC Book Works',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable}`}>
      <body className={lato.className}>{children}</body>
    </html>
  )
}
