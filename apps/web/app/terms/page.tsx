import type { Metadata } from 'next'
import pageStyles from '@/components/Page.module.css'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of Use for KC Book Works.',
}

export default function TermsPage() {
  return (
    <main className={pageStyles.page}>
      {/* TODO: Have a lawyer review this placeholder copy before launch */}
      <div className={`${pageStyles.inner} ${pageStyles.prose}`}>
        <h1 className={pageStyles.headline}>Terms of Use</h1>
        <div className={pageStyles.body}>
          <p>
            <strong>Last updated:</strong> July 2026. This is placeholder legal copy
            and must be reviewed by a lawyer before launch.
          </p>
          <p>
            By using the KC Book Works website and free calculator tools, you agree to
            these terms.
          </p>
          <h2>Not Professional Advice</h2>
          <p>
            Our calculators provide strategic estimates for educational purposes. They
            are not tax, legal, or formal accounting advice. Consult a qualified
            professional for decisions affecting your business.
          </p>
          <h2>Accuracy of Information</h2>
          <p>
            You are responsible for the accuracy of numbers you enter. Results depend
            on the inputs you provide.
          </p>
          <h2>Limitation of Liability</h2>
          <p>
            KC Book Works is not liable for decisions made based on calculator outputs
            or website content, to the fullest extent permitted by law.
          </p>
        </div>
      </div>
    </main>
  )
}
