import styles from './AboutKari.module.css'

const credentials = [
  'QuickBooks ProAdvisor',
  'CPA Designation',
  'Retail Specialist',
]

export default function AboutKari() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.photo} aria-label="Kari's photo placeholder">
          <span className={styles.photoLabel}>[Kari&apos;s Photo]</span>
        </div>

        <div className={styles.text}>
          <span className={styles.eyebrow}>Your Bookkeeper</span>
          <h2 className={styles.headline}>Kari Cameron</h2>
          <p className={styles.body}>
            Kari built KT Book Works for retail store owners who are tired of
            running blind. After 10+ years helping boutique and specialty
            retailers untangle their numbers, she knows exactly where margins leak
            — and how to fix them before they become a crisis.
          </p>
          <div className={styles.pills}>
            {credentials.map((cred) => (
              <span key={cred} className={styles.pill}>
                {cred}
              </span>
            ))}
          </div>
          <a href="#" className={styles.link}>
            → Read Kari&apos;s Story
          </a>
        </div>
      </div>
    </section>
  )
}
