import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import SocialProofStrip from '@/components/SocialProofStrip'
import HowItWorks from '@/components/HowItWorks'
import Calculator from '@/components/Calculator'
import OutcomeStory from '@/components/OutcomeStory'
import AboutKari from '@/components/AboutKari'
import FAQ from '@/components/FAQ'
import FooterCTA from '@/components/FooterCTA'
import Footer from '@/components/Footer'
import { CalculatorProvider } from '@/context/CalculatorContext'

export default function Home() {
  return (
    <CalculatorProvider>
      <Nav />
      <main>
        <Hero />
        <SocialProofStrip />
        <HowItWorks />
        <Calculator />
        <OutcomeStory />
        <AboutKari />
        <FAQ />
        <FooterCTA />
      </main>
      <Footer />
    </CalculatorProvider>
  )
}
