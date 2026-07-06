import type { Metadata } from 'next'
import DiscountImpactHero from '@/components/discount-impact/DiscountImpactHero'
import DiscountImpactCalculator from '@/components/discount-impact/DiscountImpactCalculator'
import DiscountImpactFooterCTA from '@/components/discount-impact/DiscountImpactFooterCTA'
import './discount-impact.css'

export const metadata: Metadata = {
  title: 'Discount Impact Calculator — Free Tool',
  description:
    'See exactly how many more units you need to sell to break even before you announce a sale.',
}

export default function DiscountImpactPage() {
  return (
    <main className="discount-impact-main">
      <DiscountImpactHero />
      <DiscountImpactCalculator />
      <DiscountImpactFooterCTA />
    </main>
  )
}
