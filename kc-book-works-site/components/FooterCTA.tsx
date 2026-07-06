import styles from './FooterCTA.module.css'

interface FooterCTAProps {
  ctaHref?: string
}

export default function FooterCTA({ ctaHref = '/tools/profit-margin-comparison' }: FooterCTAProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.headline}>Stop Guessing. Start Knowing.</h2>
      <p className={styles.sub}>
        It takes 60 seconds to see if your margins are costing you money.
      </p>
      <a href={ctaHref} className={styles.cta}>
        Check My Margins Now →
      </a>
    </section>
  )
}
