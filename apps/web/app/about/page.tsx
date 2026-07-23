import type { Metadata } from 'next'
import Link from 'next/link'
import { NAP, SITE_URL } from '@/lib/site'
import pageStyles from '@/components/Page.module.css'
import styles from './about.module.css'

export const metadata: Metadata = {
  title: 'About Kari Cameron',
  description:
    'Cost accounting background, 10+ years experience, and retail bookkeeping for brick-and-mortar store owners across Ontario.',
  openGraph: {
    title: 'About Kari Cameron — KC Book Works',
    description:
      'Cost accounting background and retail bookkeeping for brick-and-mortar store owners across Ontario.',
    url: `${SITE_URL}/about`,
  },
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Kari Cameron',
  jobTitle: 'Founder & Bookkeeper',
  worksFor: {
    '@type': 'Organization',
    name: NAP.name,
    url: SITE_URL,
  },
  description:
    'Cost accounting specialist and bookkeeper for brick-and-mortar retail store owners across Ontario.',
  knowsAbout: ['Cost accounting', 'Retail bookkeeping', 'Margin analysis'],
}

export default function AboutPage() {
  return (
    <main className={pageStyles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <div className={`${pageStyles.inner} ${styles.about}`}>
        <div className={styles.photo} aria-label="Kari Cameron photo placeholder">
          <span>[Photo]</span>
        </div>

        <div className={styles.content}>
          <h1 className={pageStyles.headline}>Kari Cameron</h1>

          <p className={styles.lead}>
            I got into this business because I like knowing exactly where the money
            goes — and I got tired of watching good retailers guess.
          </p>

          <div className={pageStyles.body}>
            <p>
              My background is in cost accounting, which is a fancy way of saying I
              was trained to break a business down to what things actually cost — not
              what people assume they cost. Before I focused on retail, I spent time in
              automotive retail, in travel, and in pharmaceuticals, which meant learning
              how completely different industries actually make (or lose) money.
            </p>
            <p>
              Today I work with brick-and-mortar retailers across Ontario — boutiques,
              specialty shops, and store owners who are busy running a business and
              don&apos;t have time to become an accountant too. That&apos;s the job: I
              handle the books, and I tell you what they&apos;re actually saying about
              your pricing, your margins, and your next move.
            </p>
            <p>
              I&apos;m not interested in sending you a report you can&apos;t use. If
              something in your numbers needs your attention, I&apos;ll tell you
              plainly — and if it doesn&apos;t, I&apos;ll tell you that too.
            </p>
          </div>

          <div className={styles.pills}>
            <span className={styles.pill}>QuickBooks ProAdvisor</span>
            <span className={styles.pill}>Cost Accounting Background</span>
            <span className={styles.pill}>Retail Specialist</span>
          </div>

          <Link href="/services" className={styles.cta}>
            See how we work together →
          </Link>
        </div>
      </div>
    </main>
  )
}
