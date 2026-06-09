'use client'

import { useState, type KeyboardEvent } from 'react'
import styles from './FAQ.module.css'

const faqItems = [
  {
    question: 'How accurate is this calculator?',
    answer:
      'This is a strategic estimate using standard gross margin formulas. It is not intended for tax filing or formal financial reporting. Kari personally reviews every submission to provide context for your specific business.',
  },
  {
    question: 'Why do you need my phone number?',
    answer:
      'Your results are saved to a secure link that we text directly to your phone — so you can access them anytime. We do not make unsolicited sales calls.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Yes. This page uses 256-bit SSL encryption — the same standard as online banking. Your information is never sold or shared with third parties.',
  },
  {
    question: 'What happens after I submit?',
    answer:
      'Kari personally reviews every submission. You will receive your secure results link within minutes. If she spots a significant profit opportunity, she may follow up — but there is no obligation.',
  },
  {
    question: 'Is this really free?',
    answer:
      '100% free, no credit card required. This tool exists so Kari can show retail store owners exactly what she does — and where their margins might be leaking.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const handleKeyDown = (e: KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggle(index)
    }
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.headline}>Common Questions</h2>

      <div className={styles.list}>
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index
          return (
            <div key={item.question} className={styles.item}>
              <button
                type="button"
                className={styles.question}
                onClick={() => toggle(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                <span
                  className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                  aria-hidden="true"
                >
                  ▼
                </span>
              </button>
              <div
                className={`${styles.answerWrap} ${isOpen ? styles.answerOpen : ''}`}
                aria-hidden={!isOpen}
              >
                <p className={styles.answer}>{item.answer}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
