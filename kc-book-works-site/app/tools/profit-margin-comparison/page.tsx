import type { Metadata } from 'next'
import SocialProofStrip from '@/components/SocialProofStrip'
import HowItWorks from '@/components/HowItWorks'
import FAQ from '@/components/FAQ'
import FooterCTA from '@/components/FooterCTA'
import { ProfitMarginProvider } from '@/components/profit-margin/ProfitMarginContext'
import ProfitMarginCalculator from '@/components/profit-margin/ProfitMarginCalculator'

export const metadata: Metadata = {
  title: 'Profit Margin Comparison — Free Tool',
  description:
    'See which of your products are actually making you money. Compare margins side by side in 60 seconds.',
}

export default function ProfitMarginComparisonPage() {
  return (
    <ProfitMarginProvider>
      <main>
        <ProfitMarginCalculator />
        <SocialProofStrip />
        <HowItWorks />
        <FAQ />
        <FooterCTA ctaHref="#calculator" />
      </main>
    </ProfitMarginProvider>
  )
}
