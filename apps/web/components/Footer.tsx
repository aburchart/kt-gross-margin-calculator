import Link from 'next/link'
import Image from 'next/image'
import { NAP, SOCIAL } from '@/lib/site'
import styles from './Footer.module.css'

const footerLinks = [
  { href: '/tools', label: 'Tools' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/results', label: 'Results' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.col}>
          <Link href="/" className={styles.brand} aria-label="KC Book Works home">
            <Image
              src="/kc-book-works-logo-lockup-footer.png"
              alt="KC Book Works"
              width={220}
              height={60}
              className={styles.logo}
            />
          </Link>
          <p className={styles.tagline}>
            Proactive bookkeeping and free margin tools for brick-and-mortar
            retail store owners across Ontario.
          </p>
        </div>

        <div className={styles.col}>
          <h2 className={styles.colTitle}>Pages</h2>
          <ul className={styles.linkList}>
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h2 className={styles.colTitle}>Contact</h2>
          <address className={styles.nap}>
            <span className={styles.napName}>{NAP.name}</span>
            <span>{NAP.addressLine1}</span>
            {NAP.addressLine2 ? <span>{NAP.addressLine2}</span> : null}
            {NAP.phone ? <span>{NAP.phone}</span> : null}
            {NAP.hours ? <span>{NAP.hours}</span> : null}
            <a
              href={SOCIAL.facebook}
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </address>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <span>© 2026 KC Book Works. All rights reserved.</span>
        <span className={styles.legalLinks}>
          <Link href="/privacy">Privacy Policy</Link>
          <span aria-hidden="true"> · </span>
          <Link href="/terms">Terms of Use</Link>
        </span>
      </div>
    </footer>
  )
}
