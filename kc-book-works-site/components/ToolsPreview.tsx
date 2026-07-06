import Link from 'next/link'
import styles from './ToolsPreview.module.css'

const homeTools = [
  {
    href: '/tools/profit-margin-comparison',
    title: 'Which of Your Products Are Actually Making You Money?',
    description:
      'Most store owners know their total sales. Almost none know which products are quietly losing them money. This tool lines your products up side by side and shows you the real winners.',
    button: 'Try It Free →',
  },
  {
    href: '/tools/door-crasher-calculator',
    title: 'Know Your Real Profit Before You Run That Sale.',
    description:
      'A "door-crasher" event can bring in a crowd and still lose you money if you don\'t run the numbers first. Plug in your promo details and see your real take before you commit.',
    button: 'Try It Free →',
  },
]

const hubTools = [
  {
    href: '/tools/profit-margin-comparison',
    title: 'Profit Margin Comparison',
    description: 'See which of your products are actually making you money.',
    button: 'Try It Free →',
    comingSoon: false,
  },
  {
    href: '/tools/gross-margin-calculator',
    title: 'Gross Margin Calculator',
    description:
      'Enter your costs, fees, and target margin — get your recommended selling price and see where profit is leaking.',
    button: 'Try It Free →',
    comingSoon: false,
  },
  {
    href: '/tools/discount-impact',
    title: 'Discount Impact Calculator',
    description:
      'See exactly how many more units you need to sell to break even before you announce a sale.',
    button: 'Try It Free →',
    comingSoon: false,
  },
  {
    href: '/tools/dc-promotion',
    title: 'Door Crasher Profit Forecaster',
    description:
      'Enter your planned event numbers and get an instant profit forecast before you spend on ads.',
    button: 'Try It Free →',
    comingSoon: false,
  },
  {
    href: '/tools/door-crasher-calculator',
    title: 'Door-Crasher Event Impact Calculator',
    description:
      'Measure whether your door crasher promotion actually made money after the event is over.',
    button: 'Try It Free →',
    comingSoon: false,
  },
  {
    href: '#',
    title: 'Shopify-Connected Margin Tracker',
    description: 'Live margin tracking, no manual entry.',
    button: 'Coming Soon',
    comingSoon: true,
  },
]

interface ToolsPreviewProps {
  variant: 'home' | 'hub'
}

export default function ToolsPreview({ variant }: ToolsPreviewProps) {
  if (variant === 'home') {
    return (
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.grid}>
            {homeTools.map((tool) => (
              <article key={tool.href} className={styles.card}>
                <h3 className={styles.title}>{tool.title}</h3>
                <p className={styles.description}>{tool.description}</p>
                <Link href={tool.href} className={styles.link}>
                  {tool.button}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    )
  }

  const liveToolCount = hubTools.filter((tool) => !tool.comingSoon).length

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>FREE TOOLS</span>
        <h1 className={styles.headline}>Which of These Is Your Problem Right Now?</h1>
        <p className={styles.intro}>
          {liveToolCount} free calculators, each built around a different question
          retail owners actually ask. Pick the one that matches what&apos;s on your
          mind — no signup required to see your first result.
        </p>

        <div className={styles.grid}>
          {hubTools.map((tool) =>
            tool.comingSoon ? (
              <div key={tool.title} className={`${styles.card} ${styles.cardDimmed}`}>
                <span className={styles.badge}>Coming Soon</span>
                <h2 className={styles.title}>{tool.title}</h2>
                <p className={styles.description}>{tool.description}</p>
                <span className={styles.linkDisabled}>{tool.button}</span>
              </div>
            ) : (
              <article key={tool.href} className={styles.card}>
                <h2 className={styles.title}>{tool.title}</h2>
                <p className={styles.description}>{tool.description}</p>
                <Link href={tool.href} className={styles.link}>
                  {tool.button}
                </Link>
              </article>
            )
          )}
        </div>
      </div>
    </section>
  )
}
