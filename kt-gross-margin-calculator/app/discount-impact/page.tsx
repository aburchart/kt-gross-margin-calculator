import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import DiscountImpactHero from '@/components/discount-impact/DiscountImpactHero'
import DiscountImpactCalculator from '@/components/discount-impact/DiscountImpactCalculator'
import DiscountImpactFooterCTA from '@/components/discount-impact/DiscountImpactFooterCTA'
import './discount-impact.css'

export const metadata: Metadata = {
  title:
    'Discount Impact Calculator — How Many More Units Do You Need to Sell? | KT Book Works',
  description:
    'Find out exactly how many more units you need to sell to break even when you run a sale. Free tool for retail store owners — results update instantly.',
}

export default function DiscountImpactPage() {
  return (
    <>
      <Nav ctaHref="#calculator" ctaLabel="Run the Calculator" />
      <main className="discount-impact-main">
        <DiscountImpactHero />
        <DiscountImpactCalculator />
        <DiscountImpactFooterCTA />
      </main>
      <Footer />
    </>
  )
}
