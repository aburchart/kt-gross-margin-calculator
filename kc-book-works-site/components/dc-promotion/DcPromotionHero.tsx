import heroStyles from '@/components/Hero.module.css'

export default function DcPromotionHero() {
  return (
    <section className={heroStyles.hero}>
      <div className={heroStyles.glowGold} aria-hidden="true" />
      <div className={heroStyles.glowBurgundy} aria-hidden="true" />

      <div className={heroStyles.content}>
        <span className={heroStyles.eyebrow}>
          FREE PLANNING TOOL — TAKES 90 SECONDS
        </span>

        <h1 className={heroStyles.headline}>
          Will Your Next Door Crasher Event Actually Make You Money?
        </h1>

        <p className={heroStyles.subheadline}>
          Enter your planned numbers and we&apos;ll forecast your event profit
          before you spend a dollar on ads or promotions.
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
