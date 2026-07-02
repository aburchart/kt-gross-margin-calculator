'use client'

import styles from '@/components/Hero.module.css'

export default function HomeHero() {
  const handleCtaClick = () => {
    document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className={styles.hero}>
      <div className={styles.glowGold} aria-hidden="true" />
      <div className={styles.glowBurgundy} aria-hidden="true" />

      <div className={styles.content}>
        <span className={styles.eyebrow}>Free Retail Tools by KC Book Works</span>

        <h1 className={styles.headline}>
          Stop Guessing Your Margins, Promotions, and Event Profit.
        </h1>

        <p className={styles.subheadline}>
          Four free calculators built for retail store owners — pricing, sales,
          door crashers, and promotions. Pick a tool, enter your numbers, get
          instant answers.
        </p>

        <p className={styles.trustRow}>
          <span>⭐ 4.9/5 Google</span>
          <span className={styles.trustSep}>·</span>
          <span>🔒 256-bit Encrypted</span>
          <span className={styles.trustSep}>·</span>
          <span>✓ QuickBooks ProAdvisor</span>
          <span className={styles.trustSep}>·</span>
          <span>✓ 500+ Retail Clients</span>
        </p>

        <button type="button" className={styles.cta} onClick={handleCtaClick}>
          Browse Free Tools →
        </button>
      </div>
    </section>
  )
}
