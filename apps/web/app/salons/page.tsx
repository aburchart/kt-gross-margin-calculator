import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import pageStyles from '@/components/Page.module.css'
import styles from './salons.module.css'

export const metadata: Metadata = {
  title: 'Salon Bookkeeping',
  description: 'Bookkeeping that understands salons — chair rentals, tips, product sales, and more.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function SalonsPage() {
  return (
    <main className={`${pageStyles.page} ${styles.page}`}>
      <div className={`${pageStyles.inner} ${styles.inner}`}>
        <div className={styles.heroImage} aria-label="Salon imagery placeholder">
          <span>[Salon photo]</span>
        </div>

        <h1 className={pageStyles.headline}>
          Bookkeeping That Actually Understands Salons
        </h1>

        <p className={styles.body}>
          Running a salon isn&apos;t like running a retail store, and your books
          shouldn&apos;t be treated like it is. Between chair rentals, product sales,
          tips, and a schedule that never stops, KC Book Works keeps your numbers
          straight so you can focus on your clients.
        </p>

        <h2 className={styles.formTitle}>Want to Talk Through Your Books?</h2>

        <ContactForm
          source="salons-page"
          showBusinessType={false}
          submitLabel="Send →"
        />
      </div>
    </main>
  )
}
