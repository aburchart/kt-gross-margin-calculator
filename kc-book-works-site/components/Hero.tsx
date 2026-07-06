import Link from 'next/link'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.glowGold} aria-hidden="true" />
      <div className={styles.glowBurgundy} aria-hidden="true" />

      <div className={styles.content}>
        <span className={styles.eyebrow}>SERVING RETAIL STORES ACROSS ONTARIO</span>

        <h1 className={styles.headline}>
          Know Your Real Margins Before They Quietly Kill Your Store.
        </h1>

        <p className={styles.subheadline}>
          Most retail owners price by gut feel and wonder why they&apos;re busy but
          broke. Two free tools below show you exactly where the money&apos;s going
          — no spreadsheet required.
        </p>

        <Link href="/tools" className={styles.cta}>
          Explore the Free Tools →
        </Link>

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
