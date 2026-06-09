'use client'

import { useCalculatorContext } from '@/context/CalculatorContext'
import styles from './Hero.module.css'

export default function Hero() {
  const {
    costPrice,
    sellingPrice,
    setCostPrice,
    setSellingPrice,
    triggerFromHero,
  } = useCalculatorContext()

  const handleCtaClick = () => {
    const calculator = document.getElementById('calculator')
    calculator?.scrollIntoView({ behavior: 'smooth' })
    triggerFromHero()
  }

  return (
    <section className={styles.hero}>
      <div className={styles.glowGold} aria-hidden="true" />
      <div className={styles.glowBurgundy} aria-hidden="true" />

      <div className={styles.content}>
        <span className={styles.eyebrow}>
          Free Retail Tool — Takes 60 Seconds
        </span>

        <h1 className={styles.headline}>
          Know Your Real Margins Before They Quietly Kill Your Store.
        </h1>

        <p className={styles.subheadline}>
          Most retail owners price by gut feel — and wonder why they&apos;re busy
          but broke. Enter your numbers and we&apos;ll show you exactly where
          your margin is leaking.
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

        <div className={styles.stepCard}>
          <span className={styles.stepLabel}>Step 1 of 3 — Your Product</span>

          <label className={styles.fieldLabel}>
            What did you pay for this product? (cost price)
            <div className={styles.inputWrap}>
              <span className={styles.prefix}>$</span>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={costPrice}
                onChange={(e) => setCostPrice(e.target.value)}
                className={styles.input}
              />
            </div>
          </label>

          <label className={styles.fieldLabel}>
            What do you sell it for? (retail price)
            <div className={styles.inputWrap}>
              <span className={styles.prefix}>$</span>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                className={styles.input}
              />
            </div>
          </label>

          <p className={styles.helper}>
            We&apos;ll calculate your gross margin, gross profit, and compare it
            against retail industry benchmarks.
          </p>

          <button type="button" className={styles.cta} onClick={handleCtaClick}>
            Calculate My Gross Margin →
          </button>
        </div>
      </div>
    </section>
  )
}
