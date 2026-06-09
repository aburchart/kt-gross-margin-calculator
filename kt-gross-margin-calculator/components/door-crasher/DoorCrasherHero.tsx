'use client'

import { useState } from 'react'
import heroStyles from '@/components/Hero.module.css'
import calcStyles from '@/components/Calculator.module.css'
import { useDoorCrasherContext } from './DoorCrasherContext'
import styles from './DoorCrasherHero.module.css'

export default function DoorCrasherHero() {
  const { promoSales, baselineSales, setPromoSales, setBaselineSales, prefillAndScroll } =
    useDoorCrasherContext()
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const promo = parseFloat(promoSales)
    const baseline = parseFloat(baselineSales)

    if (!promoSales || !baselineSales || promo <= 0 || baseline <= 0) {
      setError('Please enter positive sales amounts for both fields.')
      return
    }

    setError('')
    prefillAndScroll(String(promo), String(baseline))
  }

  return (
    <section className={heroStyles.hero}>
      <div className={heroStyles.glowGold} aria-hidden="true" />
      <div className={heroStyles.glowBurgundy} aria-hidden="true" />

      <div className={heroStyles.content}>
        <span className={heroStyles.eyebrow}>FREE RETAIL TOOL — TAKES 60 SECONDS</span>

        <h1 className={heroStyles.headline}>
          Find Out If Your Last Door Crasher Event Actually Made You Money.
        </h1>

        <p className={heroStyles.subheadline}>
          Most retailers run door crasher promotions and never do the math. Enter your
          event numbers and we&apos;ll tell you exactly whether it paid off — and by how
          much.
        </p>

        <p className={heroStyles.trustRow}>
          <span>⭐ 4.9/5 Google</span>
          <span className={heroStyles.trustSep}>·</span>
          <span>🔒 256-bit Encrypted</span>
          <span className={heroStyles.trustSep}>·</span>
          <span>✓ QuickBooks ProAdvisor</span>
          <span className={heroStyles.trustSep}>·</span>
          <span>✓ 500+ Retail Clients</span>
        </p>

        <form className={styles.stepCard} onSubmit={handleSubmit}>
          <span className={styles.stepLabel}>Step 1 of 3 — Your Event Sales</span>

          <div className={styles.fieldGroup}>
            <label className={calcStyles.label} htmlFor="heroPromoSales">
              Total store sales during your event
              <div className={calcStyles.inputWrap}>
                <span className={calcStyles.prefix}>$</span>
                <input
                  id="heroPromoSales"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="18500"
                  value={promoSales}
                  onChange={(e) => setPromoSales(e.target.value)}
                  className={`${calcStyles.input} ${calcStyles.inputWithPrefix}`}
                />
              </div>
            </label>

            <label className={calcStyles.label} htmlFor="heroBaselineSales">
              Total store sales for a normal equivalent period
              <div className={calcStyles.inputWrap}>
                <span className={calcStyles.prefix}>$</span>
                <input
                  id="heroBaselineSales"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="9200"
                  value={baselineSales}
                  onChange={(e) => setBaselineSales(e.target.value)}
                  className={`${calcStyles.input} ${calcStyles.inputWithPrefix}`}
                />
              </div>
              <span className={calcStyles.hint}>
                Use the same number of days — e.g. if your event ran Friday–Sunday, use a
                typical Friday–Sunday as your baseline.
              </span>
            </label>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={`${heroStyles.cta} ${styles.ctaFull}`}>
            Calculate My Event ROI →
          </button>
        </form>
      </div>
    </section>
  )
}
