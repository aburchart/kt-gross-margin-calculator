import footerStyles from '../FooterCTA.module.css'

export default function DoorCrasherFooterCTA() {
  return (
    <section className={footerStyles.section}>
      <h2 className={footerStyles.headline}>Stop Guessing. Start Knowing.</h2>
      <p className={footerStyles.sub}>
        It takes 60 seconds to see if your last door crasher event actually paid off.
      </p>
      <a href="#calculator" className={footerStyles.cta}>
        Calculate My Event ROI →
      </a>
    </section>
  )
}
