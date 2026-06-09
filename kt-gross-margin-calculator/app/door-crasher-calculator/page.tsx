import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import SocialProofStrip from '@/components/SocialProofStrip'
import AboutKari from '@/components/AboutKari'
import DoorCrasherFooterCTA from '@/components/door-crasher/DoorCrasherFooterCTA'
import Footer from '@/components/Footer'
import { DoorCrasherProvider } from '@/components/door-crasher/DoorCrasherContext'
import DoorCrasherHero from '@/components/door-crasher/DoorCrasherHero'
import DoorCrasherHowItWorks from '@/components/door-crasher/DoorCrasherHowItWorks'
import DoorCrasherCalculator from '@/components/door-crasher/DoorCrasherCalculator'
import DoorCrasherFAQ from '@/components/door-crasher/DoorCrasherFAQ'

export const metadata: Metadata = {
  title: 'Door Crasher Event Impact Calculator — Free Tool by KT Book Works',
  description:
    'Find out in 60 seconds if your door crasher promotion actually made money. Free calculator for Canadian retail store owners.',
}

export default function DoorCrasherCalculatorPage() {
  return (
    <>
      <Nav />
      <DoorCrasherProvider>
        <main>
          <DoorCrasherHero />
          <SocialProofStrip />
          <DoorCrasherHowItWorks />
          <DoorCrasherCalculator />
          <AboutKari />
          <DoorCrasherFAQ />
          <DoorCrasherFooterCTA />
        </main>
      </DoorCrasherProvider>
      <Footer />
    </>
  )
}
