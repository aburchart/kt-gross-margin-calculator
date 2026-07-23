import howStyles from '../HowItWorks.module.css'

const steps = [
  {
    number: '01',
    icon: '📊',
    title: 'Enter Your Event Numbers',
    description:
      'Tell us your total store sales during the event versus a normal equivalent period.',
  },
  {
    number: '02',
    icon: '💸',
    title: 'Add Your Promo Costs',
    description:
      'Enter your ad spend and, if applicable, whether you sold your door crasher below cost.',
  },
  {
    number: '03',
    icon: '✅',
    title: 'Get Your Verdict',
    description:
      'We calculate whether the foot traffic your door crasher generated covered what you spent to run the event.',
  },
]

export default function DoorCrasherHowItWorks() {
  return (
    <section className={howStyles.section}>
      <div className={howStyles.inner}>
        <span className={howStyles.eyebrow}>Simple. Free. Instant.</span>
        <h2 className={howStyles.headline}>See Your Event ROI in 3 Steps</h2>

        <div className={howStyles.grid}>
          {steps.map((step) => (
            <article key={step.number} className={howStyles.card}>
              <span className={howStyles.stepNumber} aria-hidden="true">
                {step.number}
              </span>
              <div className={howStyles.cardContent}>
                <span className={howStyles.icon} aria-hidden="true">
                  {step.icon}
                </span>
                <h3 className={howStyles.title}>{step.title}</h3>
                <p className={howStyles.description}>{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
