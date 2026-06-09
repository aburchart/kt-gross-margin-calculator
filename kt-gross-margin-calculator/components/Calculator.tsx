'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  calculatePricing,
  formatCurrency,
  formatPercent,
  PAYMENT_PROCESSORS,
  type CalculatorInputs,
  type CalculatorResults,
  type PaymentProcessorId,
  type TargetReturnBasis,
} from '@/lib/calculateMargins'
import styles from './Calculator.module.css'

interface FormState {
  productCost: string
  productCostSubjectToTariffs: string
  shippingCost: string
  shippingIncome: string
  salesTaxRate: string
  tariffRate: string
  applySalesTaxOnShipping: boolean
  paymentProcessor: PaymentProcessorId | ''
  variableFeePercent: string
  fixedFee: string
  targetReturnBasis: TargetReturnBasis
  targetReturnPercent: string
}

const THINKING_MESSAGES = [
  'Calculating your gross margin...',
  'Factoring in merchant fees and tariffs...',
  'Back-calculating your recommended selling price...',
]

const INITIAL_STATE: FormState = {
  productCost: '',
  productCostSubjectToTariffs: '',
  shippingCost: '',
  shippingIncome: '',
  salesTaxRate: '',
  tariffRate: '',
  applySalesTaxOnShipping: false,
  paymentProcessor: '',
  variableFeePercent: '',
  fixedFee: '',
  targetReturnBasis: 'gross_margin',
  targetReturnPercent: '',
}

function parseNum(value: string): number {
  const n = parseFloat(value)
  return Number.isFinite(n) ? n : 0
}

function formToInputs(state: FormState): CalculatorInputs | null {
  const productCost = parseNum(state.productCost)
  const targetReturnPercent = parseNum(state.targetReturnPercent)

  if (!state.productCost || productCost < 0) return null
  if (!state.targetReturnPercent || targetReturnPercent <= 0) return null
  if (!state.paymentProcessor) return null

  if (state.paymentProcessor === 'other') {
    if (!state.variableFeePercent && !state.fixedFee) return null
  }

  const processor = PAYMENT_PROCESSORS.find((p) => p.id === state.paymentProcessor)
  const variableFeePercent =
    state.paymentProcessor === 'other'
      ? parseNum(state.variableFeePercent)
      : (processor?.variableFee ?? 0)
  const fixedFee =
    state.paymentProcessor === 'other'
      ? parseNum(state.fixedFee)
      : (processor?.fixedFee ?? 0)

  return {
    productCost,
    productCostSubjectToTariffs: parseNum(state.productCostSubjectToTariffs),
    shippingCost: parseNum(state.shippingCost),
    shippingIncome: parseNum(state.shippingIncome),
    salesTaxRate: parseNum(state.salesTaxRate),
    tariffRate: parseNum(state.tariffRate),
    applySalesTaxOnShipping: state.applySalesTaxOnShipping,
    variableFeePercent,
    fixedFee,
    targetReturnBasis: state.targetReturnBasis,
    targetReturnPercent,
  }
}

function isFormComplete(state: FormState): boolean {
  return formToInputs(state) !== null
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

function ResultRow({
  label,
  value,
  highlight,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div className={`${styles.resultRow} ${highlight ? styles.resultRowHighlight : ''}`}>
      <span className={styles.resultRowLabel}>{label}</span>
      <span className={styles.resultRowValue}>{value}</span>
    </div>
  )
}

function ResultsPanel({
  results,
  onEmailSubmit,
  emailStatus,
}: {
  results: CalculatorResults
  onEmailSubmit: (email: string, name: string) => Promise<void>
  emailStatus: 'idle' | 'submitting' | 'success' | 'error'
}) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [emailError, setEmailError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.')
      return
    }
    setEmailError('')
    await onEmailSubmit(email, name)
  }

  if (emailStatus === 'success') {
    return (
      <div className={styles.results}>
        <div className={styles.emailSuccess}>
          <span className={styles.emailSuccessIcon} aria-hidden="true">
            ✓
          </span>
          <h3 className={styles.emailSuccessTitle}>Your Results Are On Their Way!</h3>
          <p className={styles.emailSuccessBody}>
            Check your inbox for your personalized margin report. Kari personally
            reviews every submission — expect a response within 1 business day.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.results}>
      <h3 className={styles.resultsTitle}>Your Results</h3>

      <div className={styles.resultGroup}>
        <h4 className={styles.resultGroupTitle}>Product Pricing</h4>
        <ResultRow label="Product price" value={formatCurrency(results.productPrice)} />
        <ResultRow
          label="Shipping income"
          value={formatCurrency(results.shippingIncome)}
        />
        <ResultRow
          label="Total selling price / revenue"
          value={formatCurrency(results.totalRevenue)}
        />
        <ResultRow
          label="Sales tax amount"
          value={formatCurrency(results.salesTaxAmount)}
        />
        <ResultRow
          label="Tariff amount"
          value={formatCurrency(results.tariffAmount)}
        />
        <ResultRow
          label="Total price the customer pays"
          value={formatCurrency(results.totalCustomerPays)}
        />
      </div>

      <div className={styles.resultGroup}>
        <h4 className={styles.resultGroupTitle}>Cost of Sales</h4>
        <ResultRow
          label="Product cost"
          value={formatCurrency(results.productCost)}
        />
        <ResultRow
          label="Shipping cost"
          value={formatCurrency(results.shippingCost)}
        />
        <ResultRow
          label="Merchant fees"
          value={formatCurrency(results.merchantFees)}
        />
        <ResultRow label="Total costs" value={formatCurrency(results.totalCosts)} />
      </div>

      <div className={styles.resultGroup}>
        <h4 className={styles.resultGroupTitle}>Profit &amp; Analytics</h4>
        <div className={styles.primaryCallout}>
          <div className={styles.calloutItem}>
            <span className={styles.calloutLabel}>Gross Profit</span>
            <span className={styles.calloutValue}>
              {formatCurrency(results.grossProfit)}
            </span>
          </div>
          <div className={styles.calloutItem}>
            <span className={styles.calloutLabel}>Gross Margin</span>
            <span className={styles.calloutValue}>
              {formatPercent(results.grossMarginPercent)}
            </span>
          </div>
        </div>
        <ResultRow
          label="Markup"
          value={formatPercent(results.markupPercent)}
        />
      </div>

      <div className={styles.emailCapture}>
        <h4 className={styles.emailCaptureTitle}>Get Your Full Report by Email</h4>
        <p className={styles.emailCaptureSub}>
          Enter your email and we&apos;ll send your complete margin breakdown —
          recommended price, costs, and profit analysis.
        </p>
        <form onSubmit={handleSubmit} className={styles.emailForm}>
          <label className={styles.label} htmlFor="resultName">
            First name (optional)
            <input
              id="resultName"
              type="text"
              autoComplete="given-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              placeholder="Your first name"
            />
          </label>
          <label className={styles.label} htmlFor="resultEmail">
            Email address
            <input
              id="resultEmail"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="you@yourstore.com"
            />
            {emailError && (
              <span className={styles.error}>{emailError}</span>
            )}
          </label>
          {emailStatus === 'error' && (
            <span className={styles.error}>
              Something went wrong. Please try again.
            </span>
          )}
          <button
            type="submit"
            className={styles.btnGold}
            disabled={emailStatus === 'submitting'}
          >
            {emailStatus === 'submitting'
              ? 'Sending...'
              : 'Email My Results →'}
          </button>
        </form>
        <p className={styles.emailTrust}>
          🔒 Your data is never shared or sold. No spam — just your margin report.
        </p>
      </div>
    </div>
  )
}

function CurrencyInput({
  id,
  label,
  hint,
  value,
  onChange,
}: {
  id: string
  label: string
  hint?: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label className={styles.label} htmlFor={id}>
      {label}
      {hint && <span className={styles.hint}>{hint}</span>}
      <div className={styles.inputWrap}>
        <span className={styles.prefix}>$</span>
        <input
          id={id}
          type="number"
          min="0"
          step="0.01"
          placeholder="0.00"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${styles.input} ${styles.inputWithPrefix}`}
        />
      </div>
    </label>
  )
}

function PercentInput({
  id,
  label,
  hint,
  value,
  onChange,
}: {
  id: string
  label: string
  hint?: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label className={styles.label} htmlFor={id}>
      {label}
      {hint && <span className={styles.hint}>{hint}</span>}
      <div className={styles.inputWrap}>
        <input
          id={id}
          type="number"
          min="0"
          step="0.01"
          placeholder="0.00"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${styles.input} ${styles.inputWithSuffix}`}
        />
        <span className={styles.suffix}>%</span>
      </div>
    </label>
  )
}

export default function Calculator() {
  const [state, setState] = useState<FormState>(INITIAL_STATE)
  const [displayState, setDisplayState] = useState<'hidden' | 'thinking' | 'visible'>(
    'hidden'
  )
  const [computedResults, setComputedResults] = useState<CalculatorResults | null>(
    null
  )
  const [emailStatus, setEmailStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle')
  const hasRevealedRef = useRef(false)
  const thinkingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const liveResults = useMemo(() => {
    const inputs = formToInputs(state)
    if (!inputs) return null
    return calculatePricing(inputs)
  }, [state])

  useEffect(() => {
    if (thinkingTimerRef.current) {
      clearTimeout(thinkingTimerRef.current)
      thinkingTimerRef.current = null
    }

    const complete = isFormComplete(state)
    const results = liveResults

    if (!complete || !results) {
      if (hasRevealedRef.current) {
        setDisplayState('visible')
        setComputedResults(null)
      } else {
        setDisplayState('hidden')
        setComputedResults(null)
      }
      return
    }

    if (hasRevealedRef.current) {
      setComputedResults(results)
      setDisplayState('visible')
      return
    }

    setDisplayState('thinking')
    thinkingTimerRef.current = setTimeout(() => {
      hasRevealedRef.current = true
      setComputedResults(results)
      setDisplayState('visible')
      thinkingTimerRef.current = null
    }, 3000)

    return () => {
      if (thinkingTimerRef.current) {
        clearTimeout(thinkingTimerRef.current)
        thinkingTimerRef.current = null
      }
    }
  }, [state, liveResults])

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }))
  }

  const handleProcessorChange = (processorId: PaymentProcessorId) => {
    const processor = PAYMENT_PROCESSORS.find((p) => p.id === processorId)
    if (!processor) return

    setState((prev) => ({
      ...prev,
      paymentProcessor: processorId,
      variableFeePercent:
        processorId === 'other' ? prev.variableFeePercent : String(processor.variableFee),
      fixedFee:
        processorId === 'other' ? prev.fixedFee : String(processor.fixedFee),
    }))
  }

  const handleEmailSubmit = async (email: string, name: string) => {
    if (!computedResults) return
    setEmailStatus('submitting')

    const processor = PAYMENT_PROCESSORS.find((p) => p.id === state.paymentProcessor)

    try {
      const res = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'email_results',
          name: name.trim() || undefined,
          email,
          inputs: formToInputs(state),
          formState: state,
          paymentProcessor: processor?.label ?? state.paymentProcessor,
          results: computedResults,
        }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setEmailStatus('success')
    } catch {
      setEmailStatus('error')
    }
  }

  return (
    <section id="calculator" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.headline}>Your Retail Gross Margin Calculator</h2>
        <p className={styles.subheadline}>
          Enter your costs, fees, and target margin — we&apos;ll calculate your
          recommended selling price in real time.
        </p>

        <div className={styles.card}>
          <div className={styles.stepSection}>
            <h3 className={styles.stepTitle}>
              <span className={styles.stepBadge}>Step 1</span>
              Cost Details
            </h3>

            <div className={styles.fieldGrid}>
              <CurrencyInput
                id="productCost"
                label="Product cost"
                hint="Base cost to purchase or manufacture one unit (core COGS before other expenses)"
                value={state.productCost}
                onChange={(v) => update('productCost', v)}
              />
              <CurrencyInput
                id="productCostTariffs"
                label="Product cost subject to tariffs"
                hint="The portion of COGS that tariffs apply to"
                value={state.productCostSubjectToTariffs}
                onChange={(v) => update('productCostSubjectToTariffs', v)}
              />
              <CurrencyInput
                id="shippingCost"
                label="Shipping cost"
                hint="Cost to ship the product to the customer"
                value={state.shippingCost}
                onChange={(v) => update('shippingCost', v)}
              />
              <CurrencyInput
                id="shippingIncome"
                label="Shipping income"
                hint="Any shipping fee charged to the customer"
                value={state.shippingIncome}
                onChange={(v) => update('shippingIncome', v)}
              />
              <PercentInput
                id="salesTaxRate"
                label="Sales tax rate"
                hint="Applicable sales tax percentage"
                value={state.salesTaxRate}
                onChange={(v) => update('salesTaxRate', v)}
              />
              <PercentInput
                id="tariffRate"
                label="Tariff rate"
                hint="Current applicable tariff rate applied as a per-unit cost"
                value={state.tariffRate}
                onChange={(v) => update('tariffRate', v)}
              />
            </div>

            <fieldset className={styles.radioGroup}>
              <legend className={styles.radioLegend}>
                Apply sales tax on shipping income?
              </legend>
              <div className={styles.radioOptions}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="salesTaxOnShipping"
                    checked={state.applySalesTaxOnShipping === true}
                    onChange={() => update('applySalesTaxOnShipping', true)}
                  />
                  Yes
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="salesTaxOnShipping"
                    checked={state.applySalesTaxOnShipping === false}
                    onChange={() => update('applySalesTaxOnShipping', false)}
                  />
                  No
                </label>
              </div>
            </fieldset>

            {liveResults && state.salesTaxRate && (
              <p className={styles.autoCalc}>
                Sales tax amount: {formatCurrency(liveResults.salesTaxAmount)}{' '}
                (based on selling price)
              </p>
            )}
          </div>

          <div className={styles.stepDivider} />

          <div className={styles.stepSection}>
            <h3 className={styles.stepTitle}>
              <span className={styles.stepBadge}>Step 2</span>
              Merchant Fees
            </h3>

            <label className={styles.label} htmlFor="paymentProcessor">
              Payment processor
              <select
                id="paymentProcessor"
                value={state.paymentProcessor}
                onChange={(e) =>
                  handleProcessorChange(e.target.value as PaymentProcessorId)
                }
                className={styles.select}
              >
                <option value="">Select payment processor</option>
                {PAYMENT_PROCESSORS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </label>

            {state.paymentProcessor && state.paymentProcessor !== 'other' && (
              <div className={styles.feePreview}>
                <span>Variable fee: {state.variableFeePercent}%</span>
                <span>Fixed fee: {formatCurrency(parseNum(state.fixedFee))}</span>
              </div>
            )}

            {state.paymentProcessor === 'other' && (
              <div className={styles.fieldGrid}>
                <PercentInput
                  id="variableFee"
                  label="Variable fees per transaction"
                  value={state.variableFeePercent}
                  onChange={(v) => update('variableFeePercent', v)}
                />
                <CurrencyInput
                  id="fixedFee"
                  label="Fixed fees per transaction"
                  value={state.fixedFee}
                  onChange={(v) => update('fixedFee', v)}
                />
              </div>
            )}
          </div>

          <div className={styles.stepDivider} />

          <div className={styles.stepSection}>
            <h3 className={styles.stepTitle}>
              <span className={styles.stepBadge}>Step 3</span>
              Target Profit
            </h3>

            <div className={styles.fieldGrid}>
              <label className={styles.label} htmlFor="targetBasis">
                Target return basis
                <select
                  id="targetBasis"
                  value={state.targetReturnBasis}
                  onChange={(e) =>
                    update(
                      'targetReturnBasis',
                      e.target.value as TargetReturnBasis
                    )
                  }
                  className={styles.select}
                >
                  <option value="gross_margin">
                    Gross Margin % (profit as % of revenue)
                  </option>
                  <option value="markup">
                    Markup % (profit as % of cost)
                  </option>
                </select>
              </label>

              <PercentInput
                id="targetReturn"
                label="Target return"
                hint="Used to back-calculate your recommended selling price"
                value={state.targetReturnPercent}
                onChange={(v) => update('targetReturnPercent', v)}
              />
            </div>
          </div>

          <div className={styles.stepDivider} />

          <div className={styles.resultsSection}>
            {displayState === 'hidden' && (
              <p className={styles.resultsPlaceholder}>
                Complete all three steps to see your recommended pricing and
                margin analysis.
              </p>
            )}

            {displayState === 'thinking' && (
              <ThinkingLoader messages={THINKING_MESSAGES} />
            )}

            {displayState === 'visible' && computedResults && (
              <ResultsPanel
                results={computedResults}
                onEmailSubmit={handleEmailSubmit}
                emailStatus={emailStatus}
              />
            )}

            {displayState === 'visible' && !computedResults && (
              <p className={styles.resultsError}>
                Unable to calculate a valid selling price with these inputs.
                Check that your target margin is achievable with the selected
                payment processor fees.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
