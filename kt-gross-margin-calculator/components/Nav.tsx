import Image from 'next/image'
import Link from 'next/link'
import styles from './Nav.module.css'

interface NavProps {
  brandHref?: string
  ctaHref?: string
  ctaLabel?: string
}

export default function Nav({
  brandHref = '/',
  ctaHref = '/#tools',
  ctaLabel = 'All Tools',
}: NavProps) {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link href={brandHref} className={styles.brand}>
          <Image
            src="/kc-book-works-logo.png"
            alt="KC Book Works"
            width={44}
            height={44}
            className={styles.logoImage}
            priority
          />
          <span className={styles.logoText}>KC Book Works</span>
        </Link>
        <a href={ctaHref} className={styles.cta}>
          {ctaLabel}
        </a>
      </div>
    </nav>
  )
}
