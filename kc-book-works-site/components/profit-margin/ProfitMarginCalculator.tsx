'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  compareProducts,
  formatCurrency,
  formatPercent,
  type ProductResult,
} from '@/lib/calculateProductMargins'
import { submitLead } from '@/lib/submitLead'
import { BUSINESS_TYPES } from '@/lib/site'
import calcStyles from '@/components/Calculator.module.css'
import {
  rowsToInputs,
  useProfitMarginContext,
} from './ProfitMarginContext'
import styles from './ProfitMarginCalculator.module.css'

type Step = 1 | 2 | 3 | 'results' | 'success'

const THINKING_MESSAGES = [
  'Comparing your product margins...',
  'Ranking your best and worst performers...',
  'Flagging products priced below cost...',
]

function ThinkingLoader() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % THINKING_MESSAGES.length)
    }, 800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={calcStyles.thinking}>
      <div className={calcStyles.spinner} aria-hidden="true" />
      <p className={calcStyles.thinkingMessage} key={index}>
        {THINKING_MESSAGES[index]}
      </p>
    </div>
  )
}

function StatusBadge({ status }: { status: ProductResult['status'] }) {
  const labels = {
    strong: 'Strong margin',
    ok: 'Healthy margin',
    weak: 'Thin margin',
    loss: 'Below cost',
  }
  return (
    <span className={`${styles.badge} ${styles[`badge_${status}`]}`}>
      {labels[status]}
    </span>
  )
}

export default function ProfitMarginCalculator() {
  const { products, updateProduct, addProduct, removeProduct } =
    useProfitMarginContext()

  const [step, setStep] = useState<Step>(1)
  const [errors, setErrors] = useState<string[]>([])
  const [results, setResults] = useState<ProductResult[] | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'error'>('idle')

  const validInputs = useMemo(() => {
    return rowsToInputs(products).filter((p) => p.cost > 0 && p.price > 0)
  }, [products])

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs: string[] = []

    if (validInputs.length < 2) {
      errs.push('Enter cost and price for at least two products.')
    }

    setErrors(errs)
    if (errs.length > 0) return

    setStep(2)
    setResults(compareProducts(validInputs))
    window.setTimeout(() => setStep('results'), 1200)
  }

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs: string[] = []

    if (!name.trim()) errs.push('Please enter your name.')
    if (!email.trim()) errs.push('Please enter your email address.')
    if (!phone.trim()) errs.push('Please enter your phone number.')
    if (!businessType) errs.push('Please select your business type.')

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (email && !emailRegex.test(email)) {
      errs.push('Please enter a valid email address.')
    }

    setErrors(errs)
    if (errs.length > 0 || !results) return

    setSubmitStatus('submitting')

    void submitLead({
      source: 'profit-margin-tool',
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      businessType,
      products: validInputs,
      results,
    }).then((res) => {
      if (res.success) {
        setStep('success')
        setSubmitStatus('idle')
      } else {
        setSubmitStatus('error')
      }
    })
  }

  return (
    <section id="calculator" className={calcStyles.section}>
      <div className={styles.inner}>
        <h2 className={calcStyles.headline}>Profit Margin Comparison</h2>
        <p className={calcStyles.subheadline}>
          Line up your products side by side and see which ones are actually
          making you money.
        </p>

        <div className={calcStyles.card}>
          {step === 1 && (
            <form className={calcStyles.stepSection} onSubmit={handleStep1Submit}>
              <h3 className={calcStyles.stepTitle}>
                <span className={calcStyles.stepBadge}>Step 1</span>
                Your Products
              </h3>

              <div className={styles.productList}>
                {products.map((row, index) => (
                  <div key={index} className={styles.productRow}>
                    <label className={calcStyles.label} htmlFor={`name${index}`}>
                      Product name
                      <input
                        id={`name${index}`}
                        type="text"
                        value={row.name}
                        onChange={(e) => updateProduct(index, 'name', e.target.value)}
                        className={calcStyles.input}
                      />
                    </label>
                    <label className={calcStyles.label} htmlFor={`cost${index}`}>
                      Cost per unit
                      <div className={calcStyles.inputWrap}>
                        <span className={calcStyles.prefix}>$</span>
                        <input
                          id={`cost${index}`}
                          type="number"
                          min="0"
                          step="0.01"
                          value={row.cost}
                          onChange={(e) => updateProduct(index, 'cost', e.target.value)}
                          className={`${calcStyles.input} ${calcStyles.inputWithPrefix}`}
                        />
                      </div>
                    </label>
                    <label className={calcStyles.label} htmlFor={`price${index}`}>
                      Selling price
                      <div className={calcStyles.inputWrap}>
                        <span className={calcStyles.prefix}>$</span>
                        <input
                          id={`price${index}`}
                          type="number"
                          min="0"
                          step="0.01"
                          value={row.price}
                          onChange={(e) => updateProduct(index, 'price', e.target.value)}
                          className={`${calcStyles.input} ${calcStyles.inputWithPrefix}`}
                        />
                      </div>
                    </label>
                    {products.length > 2 && (
                      <button
                        type="button"
                        className={styles.removeBtn}
                        onClick={() => removeProduct(index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {products.length < 5 && (
                <button type="button" className={styles.addBtn} onClick={addProduct}>
                  + Add another product
                </button>
              )}

              {errors.length > 0 && (
                <ul className={styles.errorList}>
                  {errors.map((err) => (
                    <li key={err}>{err}</li>
                  ))}
                </ul>
              )}

              <button type="submit" className={calcStyles.btnGold}>
                Compare My Margins →
              </button>
            </form>
          )}

          {step === 'results' && results && (
            <div className={calcStyles.stepSection}>
              <h3 className={calcStyles.stepTitle}>
                <span className={calcStyles.stepBadge}>Step 2</span>
                Your Margin Comparison
              </h3>

              <div className={styles.resultsTable}>
                {results.map((product) => (
                  <div key={product.name} className={styles.resultRow}>
                    <div className={styles.resultHeader}>
                      <strong>{product.name}</strong>
                      <StatusBadge status={product.status} />
                    </div>
                    <div className={styles.resultMetrics}>
                      <span>Margin: {formatPercent(product.grossMarginPct)}</span>
                      <span>Profit/unit: {formatCurrency(product.profitPerUnit)}</span>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleStep2Submit} className={styles.leadForm}>
                <h3 className={calcStyles.stepTitle}>
                  <span className={calcStyles.stepBadge}>Step 3</span>
                  Get Your Saved Report
                </h3>

                <label className={calcStyles.label} htmlFor="leadName">
                  Name
                  <input
                    id="leadName"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={calcStyles.input}
                    required
                  />
                </label>
                <label className={calcStyles.label} htmlFor="leadEmail">
                  Email
                  <input
                    id="leadEmail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={calcStyles.input}
                    required
                  />
                </label>
                <label className={calcStyles.label} htmlFor="leadPhone">
                  Phone
                  <input
                    id="leadPhone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={calcStyles.input}
                    required
                  />
                </label>
                <label className={calcStyles.label} htmlFor="businessType">
                  Business type
                  <select
                    id="businessType"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className={calcStyles.input}
                    required
                  >
                    <option value="">Select one...</option>
                    {BUSINESS_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>

                {errors.length > 0 && (
                  <ul className={styles.errorList}>
                    {errors.map((err) => (
                      <li key={err}>{err}</li>
                    ))}
                  </ul>
                )}

                {submitStatus === 'error' && (
                  <p className={styles.errorList}>Something went wrong. Please try again.</p>
                )}

                <button
                  type="submit"
                  className={calcStyles.btnGold}
                  disabled={submitStatus === 'submitting'}
                >
                  {submitStatus === 'submitting' ? 'Sending...' : 'Send My Report →'}
                </button>
              </form>
            </div>
          )}

          {step === 'success' && (
            <div className={calcStyles.stepSection}>
              <p className={styles.successMessage}>
                Got it. Kari personally reviews every submission — expect to hear
                back within 1 business day if something in your numbers needs
                attention.
              </p>
            </div>
          )}

          {step === 2 && <ThinkingLoader />}
        </div>
      </div>
    </section>
  )
}
