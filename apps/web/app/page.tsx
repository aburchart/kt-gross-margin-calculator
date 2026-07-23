import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import SocialProofStrip from '@/components/SocialProofStrip'
import HowItWorks from '@/components/HowItWorks'
import ToolsPreview from '@/components/ToolsPreview'
import OutcomeStory from '@/components/OutcomeStory'
import AboutTeaser from '@/components/AboutTeaser'
import ServicesTeaser from '@/components/ServicesTeaser'
import FAQ from '@/components/FAQ'
import FooterCTA from '@/components/FooterCTA'

export const metadata: Metadata = {
  title: 'KC Book Works — Bookkeeping for Retail Store Owners',
  description:
    'Free tools and proactive bookkeeping for brick-and-mortar retailers. Find out where your margins are leaking in 60 seconds.',
  openGraph: {
    title: 'KC Book Works — Bookkeeping for Retail Store Owners',
    description:
      'Free tools and proactive bookkeeping for brick-and-mortar retailers. Find out where your margins are leaking in 60 seconds.',
    url: 'https://kcbookworks.net',
  },
}

export default function HomePage() {
  return (
    <main>
      <Hero />
      <SocialProofStrip />
      <HowItWorks />
      <ToolsPreview variant="home" />
      <OutcomeStory variant="home" />
      <AboutTeaser />
      <ServicesTeaser />
      <FAQ />
      <FooterCTA />
    </main>
  )
}
