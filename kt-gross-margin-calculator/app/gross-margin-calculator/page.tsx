import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import SocialProofStrip from '@/components/SocialProofStrip'
import HowItWorks from '@/components/HowItWorks'
import Calculator from '@/components/Calculator'
import OutcomeStory from '@/components/OutcomeStory'
import AboutKari from '@/components/AboutKari'
import FAQ from '@/components/FAQ'
import FooterCTA from '@/components/FooterCTA'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Retail Gross Margin Calculator — Free Tool by KC Book Works',
  description:
    'Find out in 60 seconds if your retail margins are costing you money. Free calculator for brick-and-mortar store owners.',
  openGraph: {
    title: 'Is Your Retail Margin Quietly Killing Your Store?',
    description:
      'Enter your cost and selling price — get your gross margin, profit per unit, and industry benchmark comparison instantly.',
    url: 'https://calculator.ktbookworks.com/gross-margin-calculator',
    siteName: 'KC Book Works',
  },
}

export default function GrossMarginCalculatorPage() {
  return (
    <>
      <Nav ctaHref="#calculator" ctaLabel="Calculate My Margins" />
      <main>
        <Hero />
        <SocialProofStrip />
        <HowItWorks />
        <Calculator />
        <OutcomeStory />
        <AboutKari />
        <FAQ />
        <FooterCTA />
      </main>
      <Footer />
    </>
  )
}
