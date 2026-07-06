import footerStyles from '@/components/FooterCTA.module.css'

export default function DiscountImpactFooterCTA() {
  return (
    <section className={footerStyles.section}>
      <h2 className={footerStyles.headline}>
        Know This Before Every Sale, Every Season.
      </h2>
      <p className={footerStyles.sub}>
        Kari&apos;s clients track their actual uplift against the break-even
        target after every promotion — so discounting becomes a strategy, not a
        guess.
      </p>
      <a href="/contact" className={footerStyles.cta}>
        Book a Discovery Call →
      </a>
    </section>
  )
}
