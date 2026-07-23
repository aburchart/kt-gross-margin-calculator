import footerStyles from '../FooterCTA.module.css'

export default function DcPromotionFooterCTA() {
  return (
    <section className={footerStyles.section}>
      <h2 className={footerStyles.headline}>Know Your Numbers Before Every Event</h2>
      <p className={footerStyles.sub}>
        Kari&apos;s clients use her bookkeeping system to track actual vs.
        forecast — so each event gets smarter than the last.
      </p>
      <a href="/contact" className={footerStyles.cta}>
        Book a Discovery Call →
      </a>
    </section>
  )
}
