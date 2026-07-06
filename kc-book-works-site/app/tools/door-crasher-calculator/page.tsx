import type { Metadata } from 'next'
import SocialProofStrip from '@/components/SocialProofStrip'
import AboutTeaser from '@/components/AboutTeaser'
import { DoorCrasherProvider } from '@/components/door-crasher/DoorCrasherContext'
import DoorCrasherHero from '@/components/door-crasher/DoorCrasherHero'
import DoorCrasherHowItWorks from '@/components/door-crasher/DoorCrasherHowItWorks'
import DoorCrasherCalculator from '@/components/door-crasher/DoorCrasherCalculator'
import DoorCrasherFAQ from '@/components/door-crasher/DoorCrasherFAQ'
import DoorCrasherFooterCTA from '@/components/door-crasher/DoorCrasherFooterCTA'

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
