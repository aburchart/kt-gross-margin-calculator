import Link from 'next/link'
import styles from './ToolsHub.module.css'

const tools = [
  {
    href: '/gross-margin-calculator',
    icon: '📊',
    title: 'Gross Margin Calculator',
    description:
      'Enter your costs, fees, and target margin — get your recommended selling price and see where profit is leaking.',
    badge: 'Pricing',
  },
  {
    href: '/discount-impact',
    icon: '🏷️',
    title: 'Discount Impact Calculator',
    description:
      'See exactly how many more units you need to sell to break even before you announce a sale.',
    badge: 'Promotions',
  },
  {
    href: '/dc-promotion',
    icon: '📈',
    title: 'Door Crasher Profit Forecaster',
    description:
      'Enter your planned event numbers and get an instant profit forecast before you spend on ads.',
    badge: 'Events',
  },
  {
    href: '/door-crasher-calculator',
    icon: '🚪',
    title: 'Door Crasher Event Impact',
    description:
      'Measure whether your door crasher promotion actually made money after the event is over.',
    badge: 'Events',
  },
]

export default function ToolsHub() {
  return (
    <section id="tools" className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>Free Retail Tools</span>
        <h2 className={styles.headline}>Pick the Tool You Need Right Now</h2>
        <p className={styles.subheadline}>
          Every calculator updates instantly — no account, no waiting. Built for
          brick-and-mortar store owners who want answers before they commit.
        </p>

        <div className={styles.grid}>
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href} className={styles.card}>
              <span className={styles.badge}>{tool.badge}</span>
              <span className={styles.icon} aria-hidden="true">
                {tool.icon}
              </span>
              <h3 className={styles.title}>{tool.title}</h3>
              <p className={styles.description}>{tool.description}</p>
              <span className={styles.linkText}>Open tool →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
