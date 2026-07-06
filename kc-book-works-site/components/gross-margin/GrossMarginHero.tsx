'use client'

import styles from '@/components/Hero.module.css'

export default function GrossMarginHero() {
  const handleCtaClick = () => {
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className={styles.hero}>
      <div className={styles.glowGold} aria-hidden="true" />
      <div className={styles.glowBurgundy} aria-hidden="true" />

      <div className={styles.content}>
        <span className={styles.eyebrow}>Free Retail Tool — Takes 60 Seconds</span>

        <h1 className={styles.headline}>
          Know Your Real Margins Before They Quietly Kill Your Store.
        </h1>

        <p className={styles.subheadline}>
          Most retail owners price by gut feel — and wonder why they&apos;re busy
          but broke. Enter your numbers and we&apos;ll show you exactly where
          your margin is leaking.
        </p>

        <p className={styles.trustRow}>
          <span>📍 Ontario-Based</span>
          <span className={styles.trustSep}>·</span>
          <span>🔒 Your data stays private</span>
          <span className={styles.trustSep}>·</span>
          <span>✓ Built by a Cost Accountant</span>
        </p>

        <button type="button" className={styles.cta} onClick={handleCtaClick}>
          Calculate My Gross Margin →
        </button>
      </div>
    </section>
  )
}
