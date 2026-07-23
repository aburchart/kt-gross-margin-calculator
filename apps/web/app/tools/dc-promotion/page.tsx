import type { Metadata } from 'next'
import {
  DcPromotionHero,
  DcPromotionCalculator,
  DcPromotionFooterCTA,
} from '@kc-book-works/calculator-ui/dc-promotion'
import './dc-promotion.css'

export const metadata: Metadata = {
  title: 'Door Crasher Profit Forecaster — Free Tool',
  description:
    'Enter your planned event numbers and get an instant profit forecast before you spend on ads.',
}

export default function DcPromotionPage() {
  return (
    <main className="dc-promotion-main">
      <DcPromotionHero />
      <DcPromotionCalculator />
      <DcPromotionFooterCTA />
    </main>
  )
}
