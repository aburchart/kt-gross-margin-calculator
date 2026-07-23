'use client'

import { useState, type KeyboardEvent } from 'react'
import styles from './FAQ.module.css'

const faqItems = [
  {
    question: 'How accurate is this calculator?',
    answer:
      "It's a strategic estimate using standard margin formulas — good enough to flag a real problem, not a substitute for a full review. Kari looks at every submission personally.",
  },
  {
    question: 'Why do you need my phone number?',
    answer:
      'So we can send you a copy of your results directly. No sales calls, no pressure — just your numbers.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes. Your information is never sold or shared.',
  },
  {
    question: 'What happens after I submit?',
    answer:
      "Kari reviews it personally. If she spots something worth a conversation, she'll reach out — otherwise, the report is yours to keep, no obligation.",
  },
  {
    question: 'Is this really free?',
    answer:
      'Yes, no card required. It exists so you can see, before spending a dollar, exactly what Kari would catch in your books.',
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
