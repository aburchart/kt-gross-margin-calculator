import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import pageStyles from '@/components/Page.module.css'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Book a call or send a message — no sales pitch, just a straight conversation about your numbers.',
}

export default function ContactPage() {
  return (
    <main className={pageStyles.page}>
      <div className={pageStyles.inner}>
        <h1 className={pageStyles.headline}>Let&apos;s Look at Your Numbers</h1>
        <p className={pageStyles.subhead}>
          No sales pitch — just a straight conversation about where your business
          actually stands.
        </p>

        <ContactForm source="contact-page" />

        <div className={pageStyles.calendarSpace}>
          {/* TODO: GoHighLevel calendar embed once available */}
        </div>
      </div>
    </main>
  )
}
