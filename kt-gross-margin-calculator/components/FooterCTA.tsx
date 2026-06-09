import styles from './FooterCTA.module.css'

export default function FooterCTA() {
  return (
    <section className={styles.section}>
      <h2 className={styles.headline}>Stop Guessing. Start Knowing.</h2>
      <p className={styles.sub}>
        It takes 60 seconds to see if your margins are costing you money.
      </p>
      <a href="#calculator" className={styles.cta}>
        Calculate My Margins Now →
      </a>
    </section>
  )
}
