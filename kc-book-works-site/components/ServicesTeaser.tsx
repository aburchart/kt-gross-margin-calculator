import Link from 'next/link'
import styles from './ServicesTeaser.module.css'

const tiers = [
  {
    name: 'Core Bookkeeping',
    description: 'Clean, accurate books, done for you. No surprises at tax time.',
  },
  {
    name: 'Growth Package',
    description:
      'Everything in Core, plus regular check-ins and reporting, so you always know where you stand.',
  },
  {
    name: 'Virtual CFO',
    description:
      'Tax planning, entity structuring, and budgeting strategy for owners ready to make bigger moves.',
  },
]

export default function ServicesTeaser() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>HOW WE WORK TOGETHER</span>
        <h2 className={styles.headline}>Pick the Level of Support You Need</h2>

        <ol className={styles.list}>
          {tiers.map((tier, index) => (
            <li key={tier.name} className={styles.item}>
              <span className={styles.number}>{index + 1}.</span>
              <div>
                <strong className={styles.tierName}>{tier.name}</strong>
                <span className={styles.sep}> — </span>
                <span className={styles.description}>{tier.description}</span>
              </div>
            </li>
          ))}
        </ol>

        <Link href="/services" className={styles.link}>
          → See Full Pricing &amp; Details
        </Link>
      </div>
    </section>
  )
}
