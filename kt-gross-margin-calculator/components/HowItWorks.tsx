import styles from './HowItWorks.module.css'

const steps = [
  {
    number: '01',
    icon: '🧮',
    title: 'Enter Your Costs',
    description:
      'Add product cost, shipping, tariffs, and sales tax details. No account needed.',
  },
  {
    number: '02',
    icon: '⚡',
    title: 'Set Fees & Target',
    description:
      'Choose your payment processor and target margin — we back-calculate your ideal price.',
  },
  {
    number: '03',
    icon: '📊',
    title: 'See Your Results',
    description:
      'Get your recommended selling price, cost breakdown, and gross profit instantly.',
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
