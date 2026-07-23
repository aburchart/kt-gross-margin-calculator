import Link from 'next/link'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.glowGold} aria-hidden="true" />
      <div className={styles.glowBurgundy} aria-hidden="true" />

      <div className={styles.content}>
        <span className={styles.eyebrow}>
          BOOKKEEPING FOR RETAIL STORE OWNERS ACROSS ONTARIO
        </span>

        <h1 className={styles.headline}>
          Know Your Real Margins Before They Quietly Kill Your Store.
        </h1>

        <p className={styles.subheadline}>
          We handle the books for brick-and-mortar retailers across Ontario so you
          can focus on the floor, not the spreadsheet. Two free tools below show
          you exactly where the money&apos;s going — no spreadsheet required.
        </p>

        <div className={styles.ctaGroup}>
          <Link href="/contact" className={styles.cta}>
            Book a Discovery Call →
          </Link>
          <Link href="/tools" className={styles.ctaSecondary}>
            or try a free tool first →
          </Link>
        </div>

        <p className={styles.trustRow}>
          <span>📍 Ontario-Based</span>
          <span className={styles.trustSep}>·</span>
          <span>🔒 Your data stays private</span>
          <span className={styles.trustSep}>·</span>
          <span>✓ Built by a Cost Accountant</span>
        </p>
      </div>
    </section>
  )
}
