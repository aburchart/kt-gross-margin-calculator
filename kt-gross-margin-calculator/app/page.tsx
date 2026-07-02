import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import HomeHero from '@/components/home/HomeHero'
import SocialProofStrip from '@/components/SocialProofStrip'
import ToolsHub from '@/components/ToolsHub'
import AboutKari from '@/components/AboutKari'
import FooterCTA from '@/components/FooterCTA'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Free Retail Calculators — KC Book Works',
  description:
    'Free retail tools for store owners — gross margin, discount impact, and door crasher profit calculators. Instant results, no account required.',
  openGraph: {
    title: 'Free Retail Calculators for Store Owners',
    description:
      'Pricing, promotions, and event profit tools built for brick-and-mortar retailers. Pick a calculator and get instant answers.',
    url: 'https://calculator.ktbookworks.com',
    siteName: 'KC Book Works',
  },
}

export default function Home() {
  return (
    <>
      <Nav brandHref="/" ctaHref="#tools" ctaLabel="Browse Tools" />
      <main>
        <HomeHero />
        <SocialProofStrip />
        <ToolsHub />
        <AboutKari />
        <FooterCTA
          headline="Know Your Numbers Before Every Decision."
          sub="Pick a free calculator above — or book a call with Kari to dig into your books."
          ctaHref="#tools"
          ctaLabel="Browse Free Tools →"
        />
      </main>
      <Footer />
    </>
  )
}
