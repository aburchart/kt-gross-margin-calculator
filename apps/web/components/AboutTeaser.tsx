import Link from 'next/link'
import styles from './AboutTeaser.module.css'

export default function AboutTeaser() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.photo} aria-label="Kari Cameron photo placeholder">
          <span className={styles.photoLabel}>[Photo]</span>
        </div>
        <div className={styles.text}>
          <span className={styles.eyebrow}>YOUR BOOKKEEPER</span>
          <h2 className={styles.headline}>Kari Cameron</h2>
          <p className={styles.body}>
            Kari&apos;s background is in cost accounting — the discipline of knowing
            exactly what something costs you to make or sell, down to the dollar.
            She&apos;s worked across automotive retail, travel, and pharmaceuticals
            before focusing on the retailers and store owners she works with today.
            She&apos;s not here to just enter your transactions. She&apos;s here to
            tell you what they mean.
          </p>
          <Link href="/about" className={styles.link}>
            → Read Kari&apos;s Full Story
          </Link>
        </div>
      </div>
    </section>
  )
}
