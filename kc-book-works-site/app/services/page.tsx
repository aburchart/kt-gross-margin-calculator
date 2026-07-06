import type { Metadata } from 'next'
import ServiceTierCard from '@/components/ServiceTierCard'
import pageStyles from '@/components/Page.module.css'

export const metadata: Metadata = {
  title: 'Services & Pricing',
  description:
    'Core bookkeeping, Growth Package, and Virtual CFO services for retail store owners.',
}

const tiers = [
  {
    name: 'Core Bookkeeping',
    price: '~$250/month',
    tagline: 'For store owners who need clean, accurate books, done for you.',
    features: [
      'Monthly bookkeeping and reconciliation',
      'Accurate, tax-ready records',
      'A bookkeeper who actually answers your questions',
    ],
  },
  {
    name: 'Growth Package',
    price: '~$500–$800/month',
    tagline:
      'Everything in Core, plus proactive reporting and regular check-ins so you\'re not flying blind.',
    features: [
      'Everything in Core',
      'Regular reporting and check-ins',
      'Early flags on pricing or margin issues, before they become a problem',
    ],
  },
  {
    name: 'Virtual CFO',
    price: '$2,500–$5,000/month',
    tagline:
      'Tax planning, entity structuring, and budgeting strategy for owners ready to scale.',
    features: [
      'Everything in Growth',
      'Tax planning and entity structuring guidance (sole proprietor → corporation, timed right)',
      'Budgeting strategy built around where you want the business to go',
    ],
  },
]

export default function ServicesPage() {
  return (
    <main className={pageStyles.page}>
      <div className={`${pageStyles.inner} ${pageStyles.wide}`}>
        <h1 className={pageStyles.headline}>Three Ways to Work Together</h1>
        <p className={pageStyles.subhead}>
          No package pressure — most owners start at Core and move up as they need
          more.
        </p>

        <div className={pageStyles.grid3}>
          {tiers.map((tier) => (
            <ServiceTierCard key={tier.name} {...tier} />
          ))}
        </div>

        <p className={pageStyles.subhead} style={{ marginTop: 'var(--space-6)' }}>
          Not sure which one fits? Run one of the free tools first, or just book a
          call — no pitch, just a conversation about your numbers.
        </p>
      </div>
    </main>
  )
}
