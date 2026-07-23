'use client'

import { useState, type KeyboardEvent } from 'react'
import faqStyles from '../FAQ.module.css'

const faqItems = [
  {
    question: 'What counts as a door crasher?',
    answer:
      "A door crasher is a promotional item sold at cost — you make no profit on it — specifically to get customers into your store. Black Friday specials, Boxing Day deals, and seasonal event items are common examples. The item itself is intentional — you're trading margin on one product for foot traffic that buys other things.",
  },
  {
    question: 'What should I use as my baseline?',
    answer:
      'Use total store sales for the same number of days during a comparable period — ideally the same time last year, or a recent normal weekend. If you ran a 3-day event, compare it to a normal 3-day period. The more comparable the baseline, the more accurate your result.',
  },
  {
    question: "What if I don't know my average gross margin?",
    answer:
      "The Canadian retail average is approximately 50–55%. If you're not sure of your exact number, use 52% as a starting estimate. For a precise figure, your bookkeeper or POS system reports will have it — Kari can help you find it if needed.",
  },
  {
    question: 'What if my event was a loss — does that mean it was a mistake?',
    answer:
      "Not necessarily. Some door crasher events build long-term customer loyalty that shows up in future visits. This calculator measures the immediate financial impact. If your event shows a loss, it's a signal to look at your ad spend, pricing strategy, or how you're converting event traffic — all things Kari can help diagnose.",
  },
  {
    question: 'Is this really free?',
    answer:
      "Yes. No credit card, no subscription. Kari built this tool because helping you understand your numbers is how she introduces what she does. If it's useful and you want more, great. If not, you still got your event analysis.",
  },
]

export default function DoorCrasherFAQ() {
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
    <section className={faqStyles.section}>
      <h2 className={faqStyles.headline}>Common Questions</h2>

      <div className={faqStyles.list}>
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index
          return (
            <div key={item.question} className={faqStyles.item}>
              <button
                type="button"
                className={faqStyles.question}
                onClick={() => toggle(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                <span
                  className={`${faqStyles.chevron} ${isOpen ? faqStyles.chevronOpen : ''}`}
                  aria-hidden="true"
                >
                  ▼
                </span>
              </button>
              <div
                className={`${faqStyles.answerWrap} ${isOpen ? faqStyles.answerOpen : ''}`}
                aria-hidden={!isOpen}
              >
                <p className={faqStyles.answer}>{item.answer}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
