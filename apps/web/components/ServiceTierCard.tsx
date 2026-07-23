import Link from 'next/link'
import styles from './ServiceTierCard.module.css'

interface ServiceTierCardProps {
  name: string
  price: string
  subtitle: string
  forWhom: string
  features: string[]
  buttonText?: string
  mostPopular?: boolean
}

export default function ServiceTierCard({
  name,
  price,
  subtitle,
  forWhom,
  features,
  buttonText = 'Get Started →',
  mostPopular = false,
}: ServiceTierCardProps) {
  return (
    <article
      className={`${styles.card} ${mostPopular ? styles.cardPopular : ''}`}
    >
      {mostPopular && <span className={styles.badge}>Most Popular</span>}
      <h2 className={styles.name}>{name}</h2>
      <p className={styles.price}>{price}</p>
      <p className={styles.subtitle}>{subtitle}</p>
      <p className={styles.forWhom}>
        <strong>For:</strong> {forWhom}
      </p>
      <p className={styles.includesLabel}>What&apos;s included:</p>
      <ul className={styles.features}>
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <Link href="/contact" className={styles.cta}>
        {buttonText}
      </Link>
    </article>
  )
}
