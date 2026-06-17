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
          <span>⭐ 4.9/5 Google</span>
          <span className={heroStyles.trustSep}>·</span>
          <span>🔒 256-bit Encrypted</span>
          <span className={heroStyles.trustSep}>·</span>
          <span>✓ QuickBooks ProAdvisor</span>
          <span className={heroStyles.trustSep}>·</span>
          <span>✓ 500+ Retail Clients</span>
        </p>
      </div>
    </section>
  )
}
