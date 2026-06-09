'use client'

import { useCallback, useEffect, useState } from 'react'
import { useCalculatorContext } from '@/context/CalculatorContext'
import {
  calculateMargins,
  getHealthStatus,
} from '@/lib/calculateMargins'
import styles from './Calculator.module.css'

type Step = 1 | 2 | 3 | 'thinking1' | 'thinking2' | 'results' | 'success'

interface CalcState {
  costPrice: string
  sellingPrice: string
  storeType: string
  revenueRange: string
  trackingMethod: string
  name: string
  email: string
  phone: string
}

interface MarginResults {
  grossProfit: number
  grossMarginPercent: number
  markupPercent: number
}

const THINKING1_MESSAGES = [
  'Calculating your gross margin...',
  'Comparing against retail industry benchmarks...',
  'Checking common pricing gaps for your product type...',
]

const THINKING2_MESSAGES = [
  'Building your margin profile...',
  'Calculating annual profit opportunity...',
  'Preparing your personalized report...',
]

const STORE_TYPES = [
  'Clothing & Apparel',
  'Home Goods & Decor',
  'Gifts & Specialty',
  'Health & Beauty',
  'Pet Supplies',
  'Food & Grocery',
  'Sporting Goods',
  'Jewelry & Accessories',
  'Books & Stationery',
  'Other',
]

const REVENUE_RANGES = [
  'Under $100K',
  '$100K–$250K',
  '$250K–$500K',
  '$500K–$1M',
  'Over $1M',
]

const TRACKING_METHODS = [
  "I don't really track them",
  'Spreadsheets (manually)',
  'QuickBooks or Xero',
  'POS system reports',
  'I have a bookkeeper',
]

const INDUSTRY_AVERAGE = 52

function validateStep1(cost: string, selling: string) {
  const errors: { costPrice?: string; sellingPrice?: string } = {}
  const costNum = parseFloat(cost)
  const sellNum = parseFloat(selling)

  if (!cost || isNaN(costNum) || costNum <= 0) {
    errors.costPrice = 'Please enter a valid cost price.'
  }
  if (!selling || isNaN(sellNum) || sellNum <= 0) {
    errors.sellingPrice = 'Please enter a valid selling price.'
  } else if (!errors.costPrice && sellNum <= costNum) {
    errors.sellingPrice = 'Selling price must be greater than cost price.'
  }

  return errors
}

function validateStep3(name: string, email: string, phone: string) {
  const errors: { name?: string; email?: string; phone?: string } = {}
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phoneDigits = phone.replace(/\D/g, '')

  if (!name.trim()) errors.name = 'Please enter your first name.'
  if (!emailRegex.test(email)) errors.email = 'Please enter a valid email address.'
  if (phoneDigits.length < 10)
    errors.phone = 'Please enter a valid phone number (10+ digits).'

  return errors
}

function ThinkingLoader({ messages }: { messages: string[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length)
    }, 800)
    return () => clearInterval(interval)
  }, [messages])

  return (
    <div className={styles.thinking}>
      <div className={styles.spinner} aria-hidden="true" />
      <p className={styles.thinkingMessage} key={index}>
        {messages[index]}
      </p>
    </div>
  )
}

function getNodeStatus(n: 1 | 2 | 3, step: Step): 'completed' | 'active' | 'upcoming' {
  if (step === 'success') return 'completed'

  if (n === 1) {
    if (step === 1 || step === 'thinking1') return 'active'
    return 'completed'
  }

  if (n === 2) {
    if (step === 2 || step === 'thinking2') return 'active'
    if (step === 3) return 'completed'
    return 'upcoming'
  }

  if (step === 3) return 'active'
  return 'upcoming'
}

function StepProgress({ step }: { step: Step }) {
  const nodes: { n: 1 | 2 | 3; label: string }[] = [
    { n: 1, label: 'Your Product' },
    { n: 2, label: 'Your Business' },
    { n: 3, label: 'Your Report' },
  ]

  return (
    <div className={styles.progress}>
      {nodes.map(({ n, label }, i) => {
        const status = getNodeStatus(n, step)
        const prevStatus = i > 0 ? getNodeStatus(nodes[i - 1].n, step) : null
        const lineActive = prevStatus === 'completed' || status === 'active' || status === 'completed'

        return (
          <div key={n} className={styles.progressItem}>
            {i > 0 && (
              <div
                className={`${styles.progressLine} ${lineActive ? styles.progressLineActive : ''}`}
              />
            )}
            <div className={styles.progressNodeWrap}>
              <div
                className={`${styles.progressNode} ${styles[`progressNode_${status}`]}`}
              />
              <span className={styles.progressLabel}>{label}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function Calculator() {
  const {
    costPrice: ctxCost,
    sellingPrice: ctxSelling,
    setCostPrice: setCtxCost,
    setSellingPrice: setCtxSelling,
    heroTriggerCount,
  } = useCalculatorContext()

  const [step, setStep] = useState<Step>(1)
  const [state, setState] = useState<CalcState>({
    costPrice: '',
    sellingPrice: '',
    storeType: '',
    revenueRange: '',
    trackingMethod: '',
    name: '',
    email: '',
    phone: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [results, setResults] = useState<MarginResults | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (ctxCost) setState((s) => ({ ...s, costPrice: ctxCost }))
    if (ctxSelling) setState((s) => ({ ...s, sellingPrice: ctxSelling }))
  }, [ctxCost, ctxSelling])

  const syncContext = useCallback(
    (field: 'costPrice' | 'sellingPrice', value: string) => {
      setState((s) => ({ ...s, [field]: value }))
      if (field === 'costPrice') setCtxCost(value)
      else setCtxSelling(value)
    },
    [setCtxCost, setCtxSelling]
  )

  const startThinking1 = useCallback(() => {
    const errs = validateStep1(state.costPrice, state.sellingPrice)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      setStep(1)
      return
    }
    setErrors({})
    setStep('thinking1')
  }, [state.costPrice, state.sellingPrice])

  useEffect(() => {
    if (heroTriggerCount === 0) return
    startThinking1()
  }, [heroTriggerCount, startThinking1])

  useEffect(() => {
    if (step !== 'thinking1') return
    const timer = setTimeout(() => {
      const cost = parseFloat(state.costPrice)
      const selling = parseFloat(state.sellingPrice)
      const marginResults = calculateMargins(cost, selling)
      setResults(marginResults)
      setStep('results')
    }, 2500)
    return () => clearTimeout(timer)
  }, [step, state.costPrice, state.sellingPrice])

  useEffect(() => {
    if (step !== 'thinking2') return
    const timer = setTimeout(() => setStep(3), 1500)
    return () => clearTimeout(timer)
  }, [step])

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault()
    startThinking1()
  }

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('thinking2')
  }

  const handleStep3Submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validateStep3(state.name, state.email, state.phone)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setSubmitting(true)

    try {
      const payload = {
        ...state,
        results,
      }
      const res = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Submission failed')
      setStep('success')
    } catch {
      setErrors({ submit: 'Something went wrong. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  const health = results ? getHealthStatus(results.grossMarginPercent) : null

  return (
    <section id="calculator" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.headline}>Your Retail Gross Margin Calculator</h2>
        <p className={styles.subheadline}>
          Already started above? Keep going below.
        </p>

        <div className={styles.card}>
          <StepProgress step={step} />

          {step === 1 && (
            <form onSubmit={handleStep1Submit} className={styles.form}>
              <h3 className={styles.formTitle}>Your Product</h3>

              <label className={styles.label}>
                Cost Price
                <div className={styles.inputWrap}>
                  <span className={styles.prefix}>$</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={state.costPrice}
                    onChange={(e) => syncContext('costPrice', e.target.value)}
                    className={styles.input}
                  />
                </div>
                {errors.costPrice && (
                  <span className={styles.error}>{errors.costPrice}</span>
                )}
              </label>

              <label className={styles.label}>
                Selling Price
                <div className={styles.inputWrap}>
                  <span className={styles.prefix}>$</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={state.sellingPrice}
                    onChange={(e) =>
                      syncContext('sellingPrice', e.target.value)
                    }
                    className={styles.input}
                  />
                </div>
                {errors.sellingPrice && (
                  <span className={styles.error}>{errors.sellingPrice}</span>
                )}
              </label>

              <button type="submit" className={styles.btnGold}>
                Calculate My Gross Margin →
              </button>
            </form>
          )}

          {step === 'thinking1' && <ThinkingLoader messages={THINKING1_MESSAGES} />}

          {step === 'results' && results && health && (
            <div className={styles.results}>
              <div className={styles.resultGrid}>
                <div className={styles.resultCard}>
                  <span className={styles.resultLabel}>Gross Margin %</span>
                  <span
                    className={styles.resultValue}
                    style={{ color: health.color }}
                  >
                    {results.grossMarginPercent.toFixed(1)}%
                  </span>
                </div>
                <div className={styles.resultCard}>
                  <span className={styles.resultLabel}>Gross Profit Per Unit</span>
                  <span className={styles.resultValue}>
                    ${results.grossProfit.toFixed(2)}
                  </span>
                </div>
                <div className={styles.resultCard}>
                  <span className={styles.resultLabel}>Markup %</span>
                  <span className={styles.resultValue}>
                    {results.markupPercent.toFixed(1)}%
                  </span>
                </div>
              </div>

              <div
                className={styles.healthBanner}
                style={{ background: `${health.color}18`, borderColor: health.color }}
              >
                <span className={styles.healthIcon} style={{ color: health.color }}>
                  {health.label === 'Strong' ? '✓' : health.label === 'At Risk' ? '⚠' : '●'}
                </span>
                <p className={styles.healthText}>
                  Your gross margin of {results.grossMarginPercent.toFixed(1)}% is{' '}
                  <strong>{health.label.toLowerCase()}</strong>. Retail businesses
                  typically need 50–55% to cover overhead and stay profitable.
                </p>
              </div>

              <div className={styles.chart}>
                <div className={styles.chartRow}>
                  <span className={styles.chartLabel}>Your Margin</span>
                  <div className={styles.chartTrack}>
                    <div
                      className={styles.chartBar}
                      style={{
                        width: `${Math.min(results.grossMarginPercent, 100)}%`,
                        background: health.color,
                      }}
                    />
                  </div>
                  <span className={styles.chartPct}>
                    {results.grossMarginPercent.toFixed(1)}%
                  </span>
                </div>
                <div className={styles.chartRow}>
                  <span className={styles.chartLabel}>Industry Average</span>
                  <div className={styles.chartTrack}>
                    <div
                      className={`${styles.chartBar} ${styles.chartBarIndustry}`}
                      style={{ width: `${INDUSTRY_AVERAGE}%` }}
                    />
                  </div>
                  <span className={styles.chartPct}>{INDUSTRY_AVERAGE}%</span>
                </div>
              </div>

              <p className={styles.transitionMsg}>
                Want to see what this means for your annual revenue? Complete your
                profile and we&apos;ll calculate your total profit opportunity.
              </p>

              <button
                type="button"
                className={styles.btnPrimary}
                onClick={() => setStep(2)}
              >
                See My Full Report →
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleStep2Submit} className={styles.form}>
              <h3 className={styles.formTitle}>Your Business</h3>

              <label className={styles.label}>
                Store Type
                <select
                  value={state.storeType}
                  onChange={(e) =>
                    setState((s) => ({ ...s, storeType: e.target.value }))
                  }
                  className={styles.select}
                  required
                >
                  <option value="">Select store type</option>
                  {STORE_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>

              <label className={styles.label}>
                Annual Revenue
                <select
                  value={state.revenueRange}
                  onChange={(e) =>
                    setState((s) => ({ ...s, revenueRange: e.target.value }))
                  }
                  className={styles.select}
                  required
                >
                  <option value="">Select revenue range</option>
                  {REVENUE_RANGES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </label>

              <label className={styles.label}>
                How do you track margins?
                <select
                  value={state.trackingMethod}
                  onChange={(e) =>
                    setState((s) => ({ ...s, trackingMethod: e.target.value }))
                  }
                  className={styles.select}
                  required
                >
                  <option value="">Select tracking method</option>
                  {TRACKING_METHODS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </label>

              <button type="submit" className={styles.btnPrimary}>
                See My Full Report →
              </button>
            </form>
          )}

          {step === 'thinking2' && <ThinkingLoader messages={THINKING2_MESSAGES} />}

          {step === 3 && (
            <form onSubmit={handleStep3Submit} className={styles.form}>
              <h3 className={styles.formTitle}>
                Almost There — Where Should We Send Your Report?
              </h3>

              <label className={styles.label}>
                First Name
                <input
                  type="text"
                  autoComplete="given-name"
                  value={state.name}
                  onChange={(e) =>
                    setState((s) => ({ ...s, name: e.target.value }))
                  }
                  className={styles.input}
                />
                {errors.name && (
                  <span className={styles.error}>{errors.name}</span>
                )}
              </label>

              <label className={styles.label}>
                Email
                <input
                  type="email"
                  autoComplete="email"
                  value={state.email}
                  onChange={(e) =>
                    setState((s) => ({ ...s, email: e.target.value }))
                  }
                  className={styles.input}
                />
                {errors.email && (
                  <span className={styles.error}>{errors.email}</span>
                )}
              </label>

              <label className={styles.label}>
                Phone
                <input
                  type="tel"
                  autoComplete="tel"
                  value={state.phone}
                  onChange={(e) =>
                    setState((s) => ({ ...s, phone: e.target.value }))
                  }
                  className={styles.input}
                />
                <span className={styles.phoneNote}>
                  We text you a secure link to your saved results. No sales calls.
                </span>
                {errors.phone && (
                  <span className={styles.error}>{errors.phone}</span>
                )}
              </label>

              <div className={styles.trustSignals}>
                🔒 256-bit SSL Encrypted &nbsp; ✓ QuickBooks ProAdvisor &nbsp; ⭐
                4.9/5 Stars on Google &nbsp; Your data is never shared or sold.
              </div>

              {errors.submit && (
                <span className={styles.error}>{errors.submit}</span>
              )}

              <button
                type="submit"
                className={styles.btnGoldLarge}
                disabled={submitting}
              >
                {submitting ? 'Sending...' : 'Send My Free Margin Report →'}
              </button>
            </form>
          )}

          {step === 'success' && (
            <div className={styles.success}>
              <span className={styles.checkmark} aria-hidden="true">
                ✓
              </span>
              <h3 className={styles.successTitle}>Your Report Is On Its Way!</h3>
              <p className={styles.successBody}>
                Check your phone for a text from KT Book Works with a secure link
                to your margin report. Kari personally reviews every submission —
                expect a response within 1 business day.
              </p>
              <p className={styles.successNote}>
                In a hurry? Call or text Kari directly: [PHONE_PLACEHOLDER]
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
