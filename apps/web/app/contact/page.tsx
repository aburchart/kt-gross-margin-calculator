import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import pageStyles from '@/components/Page.module.css'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Book a discovery call or send a message — no sales pitch, just a straight conversation about your numbers.',
}

export default function ContactPage() {
  return (
    <main className={pageStyles.page}>
      <div className={pageStyles.inner}>
        <h1 className={pageStyles.headline}>Book a Discovery Call</h1>
        <p className={pageStyles.subhead}>
          No sales pitch — just a straight conversation about where your business
          actually stands. Prefer to message first? Use the form below instead.
        </p>

        <div className={pageStyles.calendarSpace}>
          {/* TODO: GoHighLevel calendar embed once available */}
        </div>

        <ContactForm source="contact-page" />
      </div>
    </main>
  )
}
