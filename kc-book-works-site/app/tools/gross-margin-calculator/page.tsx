import type { Metadata } from 'next'
import SocialProofStrip from '@/components/SocialProofStrip'
import HowItWorks from '@/components/HowItWorks'
import FAQ from '@/components/FAQ'
import FooterCTA from '@/components/FooterCTA'
import AboutTeaser from '@/components/AboutTeaser'
import OutcomeStory from '@/components/OutcomeStory'
import Calculator from '@/components/Calculator'
import GrossMarginHero from '@/components/gross-margin/GrossMarginHero'

export const metadata: Metadata = {
  title: 'Gross Margin Calculator — Free Tool',
  description:
    'Enter your costs, fees, and target margin — get your recommended selling price and see where profit is leaking.',
}

export default function GrossMarginCalculatorPage() {
  return (
    <main>
      <GrossMarginHero />
      <SocialProofStrip />
      <HowItWorks />
      <Calculator />
      <OutcomeStory />
      <AboutTeaser />
      <FAQ />
      <FooterCTA ctaHref="#calculator" />
    </main>
  )
}
