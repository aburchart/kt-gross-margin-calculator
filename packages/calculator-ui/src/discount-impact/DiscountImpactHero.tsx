import heroStyles from '../Hero.module.css'

export default function DiscountImpactHero() {
  return (
    <section className={heroStyles.hero}>
      <div className={heroStyles.glowGold} aria-hidden="true" />
      <div className={heroStyles.glowBurgundy} aria-hidden="true" />

      <div className={heroStyles.content}>
        <span className={heroStyles.eyebrow}>
          FREE RETAIL TOOL — RESULTS UPDATE INSTANTLY
        </span>

        <h1 className={heroStyles.headline}>
          Before You Announce That Sale — See How Many More Units You Actually
          Need to Sell.
        </h1>

        <p className={heroStyles.subheadline}>
          Most retailers run discounts and hope more customers show up. This tool
          tells you exactly how many more you need — before you commit.
        </p>

        <p className={heroStyles.trustRow}>
          <span>📍 Ontario-Based</span>
          <span className={heroStyles.trustSep}>·</span>
          <span>🔒 Your data stays private</span>
          <span className={heroStyles.trustSep}>·</span>
          <span>✓ Built by a Cost Accountant</span>
        </p>
      </div>
    </section>
  )
}
