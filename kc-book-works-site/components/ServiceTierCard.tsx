import Link from 'next/link'
import styles from './ServiceTierCard.module.css'

interface ServiceTierCardProps {
  name: string
  price: string
  tagline: string
  features: string[]
}

export default function ServiceTierCard({
  name,
  price,
  tagline,
  features,
}: ServiceTierCardProps) {
  return (
    <article className={styles.card}>
      <h2 className={styles.name}>{name}</h2>
      <p className={styles.price}>{price}</p>
      <p className={styles.tagline}>{tagline}</p>
      <ul className={styles.features}>
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <Link href="/contact" className={styles.cta}>
        Book a Call
      </Link>
    </article>
  )
}
