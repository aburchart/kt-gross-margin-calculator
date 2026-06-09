import styles from './SocialProofStrip.module.css'

const stats = [
  { number: '500+', label: 'Retail Clients Helped' },
  { number: '$2.3M+', label: 'In Profit Leaks Identified' },
  { number: '4.9★', label: 'Average Google Review' },
  { number: 'Certified', label: 'QuickBooks ProAdvisor' },
]

export default function SocialProofStrip() {
  return (
    <section className={styles.strip}>
      <div className={styles.grid}>
        {stats.map((stat, i) => (
          <div key={stat.label} className={styles.item}>
            {i > 0 && <span className={styles.divider} aria-hidden="true">|</span>}
            <div className={styles.stat}>
              <span className={styles.number}>{stat.number}</span>
              <span className={styles.label}>{stat.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
