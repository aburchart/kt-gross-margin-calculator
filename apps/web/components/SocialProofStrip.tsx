import styles from './SocialProofStrip.module.css'

const markers = [
  { title: 'Ontario-Based', label: 'Serving Retailers Province-Wide' },
  { title: '10+ Years', label: 'Cost Accounting Experience' },
  { title: 'Retail Specialist', label: 'Not a Generalist' },
]

export default function SocialProofStrip() {
  return (
    <section className={styles.strip}>
      <div className={styles.grid}>
        {markers.map((item, i) => (
          <div key={item.title} className={styles.item}>
            {i > 0 && <span className={styles.divider} aria-hidden="true">|</span>}
            <div className={styles.stat}>
              <span className={styles.number}>{item.title}</span>
              <span className={styles.label}>{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
