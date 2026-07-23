import type { Metadata } from 'next'
import SocialProofStrip from '@/components/SocialProofStrip'
import AboutTeaser from '@/components/AboutTeaser'
import {
  DoorCrasherProvider,
  DoorCrasherHero,
  DoorCrasherHowItWorks,
  DoorCrasherCalculator,
  DoorCrasherFAQ,
  DoorCrasherFooterCTA,
} from '@kc-book-works/calculator-ui/door-crasher'

export const metadata: Metadata = {
  title: 'Door-Crasher Promotion Calculator — Free Tool',
  description:
    'Know your real profit (or loss) before you run the sale. Free door-crasher event calculator for retail store owners.',
}

export default function DoorCrasherCalculatorPage() {
  return (
    <DoorCrasherProvider>
      <main>
        <DoorCrasherHero />
        <SocialProofStrip />
        <DoorCrasherHowItWorks />
        <DoorCrasherCalculator />
        <AboutTeaser />
        <DoorCrasherFAQ />
        <DoorCrasherFooterCTA />
      </main>
    </DoorCrasherProvider>
  )
}
