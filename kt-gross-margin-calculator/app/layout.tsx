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
  title: 'Retail Gross Margin Calculator — Free Tool by KC Book Works',
  description:
    'Find out in 60 seconds if your retail margins are costing you money. Free calculator for brick-and-mortar store owners.',
  icons: {
    icon: '/kc-book-works-logo.png',
    apple: '/kc-book-works-logo.png',
  },
  openGraph: {
    title: 'Is Your Retail Margin Quietly Killing Your Store?',
    description:
      'Enter your cost and selling price — get your gross margin, profit per unit, and industry benchmark comparison instantly.',
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
