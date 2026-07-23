import styles from './HowItWorks.module.css'

const steps = [
  {
    number: '01',
    icon: '🧮',
    title: 'Enter Your Numbers',
    description:
      'Input your product costs and prices. No account, no spreadsheet needed.',
  },
  {
    number: '02',
    icon: '⚡',
    title: 'Get Instant Analysis',
    description:
      "We show you your margin, your profit per product, and where you're leaving money on the table.",
  },
  {
    number: '03',
    icon: '📊',
    title: 'Get Your Full Report',
    description:
      "Drop in your contact info and we'll send you a saved copy — no sales calls, just the numbers.",
  },
]

export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>SIMPLE. FREE. INSTANT.</span>
        <h2 className={styles.headline}>See Where Your Money Is Going in 3 Steps</h2>

        <div className={styles.grid}>
          {steps.map((step) => (
            <article key={step.number} className={styles.card}>
              <span className={styles.stepNumber} aria-hidden="true">
                {step.number}
              </span>
              <div className={styles.cardContent}>
                <span className={styles.icon} aria-hidden="true">
                  {step.icon}
                </span>
                <h3 className={styles.title}>{step.title}</h3>
                <p className={styles.description}>{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
