import styles from './FooterCTA.module.css'

interface FooterCTAProps {
  headline?: string
  sub?: string
  ctaHref?: string
  ctaLabel?: string
}

export default function FooterCTA({
  headline = 'Stop Guessing. Start Knowing.',
  sub = 'It takes 60 seconds to see if your margins are costing you money.',
  ctaHref = '#calculator',
  ctaLabel = 'Calculate My Margins Now →',
}: FooterCTAProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.headline}>{headline}</h2>
      <p className={styles.sub}>{sub}</p>
      <a href={ctaHref} className={styles.cta}>
        {ctaLabel}
      </a>
    </section>
  )
}
