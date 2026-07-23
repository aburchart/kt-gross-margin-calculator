import Link from 'next/link'
import styles from './FooterCTA.module.css'

interface FooterCTAProps {
  ctaHref?: string
}

export default function FooterCTA({ ctaHref }: FooterCTAProps) {
  if (ctaHref) {
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

  return (
    <section className={styles.section}>
      <h2 className={styles.headline}>Stop Guessing. Start Knowing.</h2>
      <p className={styles.sub}>
        Ready to talk? Book a discovery call. Not ready yet? Try a free tool first
        — either way, no pressure.
      </p>
      <div className={styles.ctaGroup}>
        <Link href="/contact" className={styles.cta}>
          Book a Discovery Call →
        </Link>
        <Link href="/tools" className={styles.ctaSecondary}>
          Try a Free Tool →
        </Link>
      </div>
    </section>
  )
}
