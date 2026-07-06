import Link from 'next/link'
import styles from './Nav.module.css'

const navLinks = [
  { href: '/tools', label: 'Tools' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/results', label: 'Results' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          <span className={styles.logoMark} aria-hidden="true">
            KC
          </span>
          <span className={styles.logoText}>KC Book Works</span>
        </Link>

        <div className={styles.links}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </Link>
          ))}
        </div>

        <Link href="/tools" className={styles.cta}>
          Try a Free Tool
        </Link>
      </div>
    </nav>
  )
}
