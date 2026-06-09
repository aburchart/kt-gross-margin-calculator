import Image from 'next/image'
import styles from './Nav.module.css'

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <a href="#" className={styles.brand}>
          <Image
            src="/kc-book-works-logo.png"
            alt="KC Book Works"
            width={44}
            height={44}
            className={styles.logoImage}
            priority
          />
          <span className={styles.logoText}>KC Book Works</span>
        </a>
        <a href="#calculator" className={styles.cta}>
          Calculate My Margins
        </a>
      </div>
    </nav>
  )
}
