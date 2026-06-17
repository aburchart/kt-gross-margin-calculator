import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import DcPromotionHero from '@/components/dc-promotion/DcPromotionHero'
import DcPromotionCalculator from '@/components/dc-promotion/DcPromotionCalculator'
import DcPromotionFooterCTA from '@/components/dc-promotion/DcPromotionFooterCTA'
import './dc-promotion.css'

export const metadata: Metadata = {
  title: 'Door Crasher Profit Forecaster — Free Tool by KT Book Works',
  description:
    'Find out before you run it. Enter your planned event numbers and get an instant profit forecast for your door crasher promotion.',
}

export default function DcPromotionPage() {
  return (
    <>
      <Nav />
      <main className="dc-promotion-main">
        <DcPromotionHero />
        <DcPromotionCalculator />
        <DcPromotionFooterCTA />
      </main>
      <Footer />
    </>
  )
}
