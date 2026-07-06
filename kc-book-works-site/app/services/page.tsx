import type { Metadata } from 'next'
import ServiceTierCard from '@/components/ServiceTierCard'
import pageStyles from '@/components/Page.module.css'

export const metadata: Metadata = {
  title: 'Services & Pricing',
  description:
    'Bronze, Silver, and Gold bookkeeping tiers for retail store owners across Ontario.',
}

const tiers = [
  {
    name: 'Bronze',
    price: '~$250/month',
    subtitle: 'The Baseline: Core Compliance',
    forWhom: 'Store owners who need clean, accurate books, done for you.',
    features: [
      'Monthly bookkeeping and reconciliation',
      'Accurate, tax-ready records',
      'A bookkeeper who actually answers your questions',
    ],
    buttonText: 'Get Started →',
  },
  {
    name: 'Silver',
    price: '~$500–$800/month',
    subtitle: 'The Sweet Spot: Compliance + Communication',
    forWhom:
      'Owners who want to stop finding out how the business did three months after the fact.',
    features: [
      'Everything in Bronze',
      'Regular reporting and check-ins (monthly email updates, quarterly reviews)',
      'Early flags on pricing or margin issues, before they become a problem',
    ],
    buttonText: 'Get Started →',
    mostPopular: true,
  },
  {
    name: 'Gold',
    price: '$2,500–$5,000/month',
    subtitle: 'The Premium: Strategic Advisory',
    forWhom: 'Owners ready to make bigger financial decisions with real backup.',
    features: [
      'Everything in Silver',
      'CFO-level calls and cash-flow forecasting',
      'Tax planning and entity structuring guidance (sole proprietor → corporation, timed right)',
      'Budgeting strategy built around where you want the business to go',
    ],
    buttonText: 'Book a Discovery Call →',
  },
]

export default function ServicesPage() {
  return (
    <main className={pageStyles.page}>
      <div className={`${pageStyles.inner} ${pageStyles.wide}`}>
        <h1 className={pageStyles.headline}>Three Ways to Work Together</h1>
        <p className={pageStyles.subhead}>
          No package pressure — most owners start at Bronze and move up as they
          need more.
        </p>

        <div className={pageStyles.grid3}>
          {tiers.map((tier) => (
            <ServiceTierCard key={tier.name} {...tier} />
          ))}
        </div>

        <p className={pageStyles.subhead} style={{ marginTop: 'var(--space-6)' }}>
          Not sure which one fits? Run one of the free tools first, or just book a
          discovery call — no pitch, just a conversation about your numbers.
        </p>
      </div>
    </main>
  )
}
