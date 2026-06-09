import styles from './HowItWorks.module.css'

const steps = [
  {
    number: '01',
    icon: '🧮',
    title: 'Enter Your Numbers',
    description:
      'Input your cost price and retail price. No account needed.',
  },
  {
    number: '02',
    icon: '⚡',
    title: 'Get Instant Analysis',
    description:
      'We calculate your gross margin, gross profit, and flag if you\'re below the retail benchmark.',
  },
  {
    number: '03',
    icon: '📊',
    title: 'Receive Your Full Report',
    description:
      'Enter your contact info and we\'ll text you a secure link to your saved results — no sales calls.',
  },
]

export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>Simple. Free. Instant.</span>
        <h2 className={styles.headline}>See Your Margins in 3 Steps</h2>

        <div className={styles.grid}>
          {steps.map((step) => (
            <article key={step.number} className={styles.card}>
              <span className={styles.stepNumber} aria-hidden="true">
                {step.number}
              </span>
              <span className={styles.icon} aria-hidden="true">
                {step.icon}
              </span>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.description}>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
