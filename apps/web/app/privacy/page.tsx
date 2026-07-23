import type { Metadata } from 'next'
import pageStyles from '@/components/Page.module.css'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for KC Book Works.',
}

export default function PrivacyPage() {
  return (
    <main className={pageStyles.page}>
      {/* TODO: Have a lawyer review this placeholder copy before launch */}
      <div className={`${pageStyles.inner} ${pageStyles.prose}`}>
        <h1 className={pageStyles.headline}>Privacy Policy</h1>
        <div className={pageStyles.body}>
          <p>
            <strong>Last updated:</strong> July 2026. This is placeholder legal copy
            and must be reviewed by a lawyer before launch.
          </p>
          <p>
            KC Book Works (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects
            your privacy. This policy describes how we collect, use, and protect
            information you submit through our website, calculators, and contact forms.
          </p>
          <h2>Information We Collect</h2>
          <p>
            We may collect your name, email address, phone number, business type,
            calculator inputs, and any message you choose to send us.
          </p>
          <h2>How We Use Your Information</h2>
          <p>
            We use your information to deliver calculator results, respond to inquiries,
            and provide bookkeeping services you request. We do not sell your personal
            information.
          </p>
          <h2>Contact</h2>
          <p>
            Questions about this policy? Contact us through the form on our Contact
            page.
          </p>
        </div>
      </div>
    </main>
  )
}
