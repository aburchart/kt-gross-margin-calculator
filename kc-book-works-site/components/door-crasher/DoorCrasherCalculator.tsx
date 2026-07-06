'use client'

import { useEffect, useRef, useState } from 'react'
import {
  calculateDoorCrasher,
  formatCurrency,
  type DCInputs,
  type DCResults,
} from '@/lib/calculateDoorCrasher'
import { submitLead } from '@/lib/submitLead'
import calcStyles from '@/components/Calculator.module.css'
import { useDoorCrasherContext } from './DoorCrasherContext'
import dcStyles from './DoorCrasherCalculator.module.css'

type Step = 1 | 2 | 3 | 'thinking1' | 'results' | 'success'

interface DCState {
  promoSales: string
  baselineSales: string
  averageMargin: string
  adSpend: string
  belowCost: boolean
  doorCrasherCost: string
  doorCrasherSalePrice: string
  doorCrasherUnits: string
  name: string
  email: string
  phone: string
}

const THINKING_MESSAGES = [
  'Calculating your event lift...',
  'Comparing against your baseline period...',
  'Running your door crasher ROI...',
]

const INITIAL_STATE: DCState = {
  promoSales: '',
  baselineSales: '',
  averageMargin: '',
  adSpend: '',
  belowCost: false,
  doorCrasherCost: '',
  doorCrasherSalePrice: '',
  doorCrasherUnits: '',
  name: '',
  email: '',
  phone: '',
}

function parseNum(value: string): number {
  const n = parseFloat(value)
  return Number.isFinite(n) ? n : 0
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
    <div className={calcStyles.thinking}>
      <div className={calcStyles.spinner} aria-hidden="true" />
      <p className={calcStyles.thinkingMessage} key={index}>
        {messages[index]}
      </p>
    </div>
  )
}

function CurrencyInput({
  id,
  label,
  helper,
  value,
  onChange,
  placeholder,
}: {
  id: string
  label: string
  helper?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  return (
    <label className={calcStyles.label} htmlFor={id}>
      {label}
      <div className={calcStyles.inputWrap}>
        <span className={calcStyles.prefix}>$</span>
        <input
          id={id}
          type="number"
          min="0"
          step="1"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${calcStyles.input} ${calcStyles.inputWithPrefix}`}
        />
      </div>
      {helper && <span className={calcStyles.hint}>{helper}</span>}
    </label>
  )
}

function PercentInput({
  id,
  label,
  helper,
  value,
  onChange,
  placeholder,
}: {
  id: string
  label: string
  helper?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  return (
    <label className={calcStyles.label} htmlFor={id}>
      {label}
      <div className={calcStyles.inputWrap}>
        <input
          id={id}
          type="number"
          min="1"
          max="99"
          step="0.1"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${calcStyles.input} ${calcStyles.inputWithSuffix}`}
        />
        <span className={calcStyles.suffix}>%</span>
      </div>
      {helper && <span className={calcStyles.hint}>{helper}</span>}
    </label>
  )
}

function StepProgress({ currentStep }: { currentStep: Step }) {
  const steps = [
    { label: 'Your Sales', step: 1 },
    { label: 'Your Costs', step: 2 },
    { label: 'Your Report', step: 3 },
  ]

  const activeIndex =
    currentStep === 'thinking1' || currentStep === 'results'
      ? 2
      : currentStep === 'success'
        ? 3
        : typeof currentStep === 'number'
          ? currentStep - 1
          : 0

  return (
    <div className={dcStyles.progress}>
      {steps.map((s, i) => {
        const isActive = i === activeIndex
        const isComplete = i < activeIndex
        return (
          <div
            key={s.label}
            className={`${dcStyles.progressStep} ${isActive ? dcStyles.progressStepActive : ''}`}
          >
            <span
              className={`${dcStyles.progressDot} ${isActive ? dcStyles.progressDotActive : ''} ${isComplete ? dcStyles.progressDotComplete : ''}`}
              aria-hidden="true"
            />
            <span>{s.label}</span>
          </div>
        )
      })}
    </div>
  )
}

function ResultsBlock({
  results,
  onContinue,
}: {
  results: DCResults
  onContinue: () => void
}) {
  const returnPerDollar =
    results.totalPromoCost > 0
      ? 1 + results.netEventResult / results.totalPromoCost
      : 0

  const tintBg = `${results.verdictColor}18`

  let bannerText = ''
  if (results.verdict === 'profitable') {
    bannerText = `Your door crasher event returned $${returnPerDollar.toFixed(2)} for every $1 you spent. That's a ${Math.round(results.roi)}% return on your promotion spend.`
  } else if (results.verdict === 'breakeven') {
    bannerText =
      'Your door crasher event covered its costs exactly. The foot traffic it generated matched what you spent to run it.'
  } else {
    bannerText = `Your door crasher event cost you ${formatCurrency(Math.abs(results.netEventResult))} more than it returned. The foot traffic generated ${formatCurrency(results.grossProfitOnLift)} in gross profit, but your promotion costs were ${formatCurrency(results.totalPromoCost)}.`
  }

  const promoCostHint =
    results.doorCrasherLoss > 0
      ? 'Ad spend + door crasher loss'
      : 'Ad spend'

  return (
    <div>
      <div className={dcStyles.resultsGrid}>
        <div className={dcStyles.resultCard}>
          <span className={dcStyles.resultCardLabel}>Sales Lift</span>
          <span className={dcStyles.resultCardValue}>
            {formatCurrency(results.liftInSales)}
          </span>
          <span className={dcStyles.resultCardHint}>
            Extra revenue your event generated above normal
          </span>
        </div>
        <div className={dcStyles.resultCard}>
          <span className={dcStyles.resultCardLabel}>Gross Profit on Lift</span>
          <span className={dcStyles.resultCardValue}>
            {formatCurrency(results.grossProfitOnLift)}
          </span>
          <span className={dcStyles.resultCardHint}>
            What that extra revenue was worth after cost of goods
          </span>
        </div>
        <div className={dcStyles.resultCard}>
          <span className={dcStyles.resultCardLabel}>Total Promotion Cost</span>
          <span className={dcStyles.resultCardValue}>
            {formatCurrency(results.totalPromoCost)}
          </span>
          <span className={dcStyles.resultCardHint}>{promoCostHint}</span>
        </div>
        <div className={dcStyles.resultCard}>
          <span className={dcStyles.resultCardLabel}>Net Event Result</span>
          <span
            className={dcStyles.resultCardValue}
            style={{ color: results.verdictColor }}
          >
            {formatCurrency(results.netEventResult)}
          </span>
          <span className={dcStyles.resultCardHint}>{results.verdictLabel}</span>
        </div>
      </div>

      <div
        className={dcStyles.verdictBanner}
        style={{ backgroundColor: tintBg }}
      >
        <span
          className={dcStyles.verdictBadge}
          style={{ backgroundColor: results.verdictColor }}
        >
          {results.verdictLabel}
        </span>
        <p className={dcStyles.verdictBannerText}>{bannerText}</p>
      </div>

      {results.verdict === 'profitable' && (
        <div className={dcStyles.roiCallout}>
          <span className={dcStyles.roiCalloutValue}>
            ${returnPerDollar.toFixed(2)} returned per $1 spent
          </span>
          <span className={dcStyles.roiCalloutLabel}>
            Return on your promotion investment
          </span>
        </div>
      )}

      <p className={dcStyles.transitionMessage}>
        Want to see how to structure your next event so it hits a target ROI?
        Enter your details below and Kari will send you a personalized event
        planning framework.
      </p>

      <button type="button" className={dcStyles.btnBurgundy} onClick={onContinue}>
        Get My Event Planning Report →
      </button>
    </div>
  )
}

export default function DoorCrasherCalculator() {
  const { promoSales: ctxPromo, baselineSales: ctxBaseline } =
    useDoorCrasherContext()
  const [state, setState] = useState<DCState>(INITIAL_STATE)
  const [step, setStep] = useState<Step>(1)
  const [errors, setErrors] = useState<string[]>([])
  const [results, setResults] = useState<DCResults | null>(null)
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'submitting' | 'error'
  >('idle')
  const thinkingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const prefilledRef = useRef(false)

  useEffect(() => {
    if (!prefilledRef.current && (ctxPromo || ctxBaseline)) {
      prefilledRef.current = true
      setState((prev) => ({
        ...prev,
        promoSales: ctxPromo || prev.promoSales,
        baselineSales: ctxBaseline || prev.baselineSales,
      }))
    }
  }, [ctxPromo, ctxBaseline])

  useEffect(() => {
    return () => {
      if (thinkingTimerRef.current) clearTimeout(thinkingTimerRef.current)
    }
  }, [])

  const update = <K extends keyof DCState>(key: K, value: DCState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }))
  }

  const validateStep1 = (): boolean => {
    const errs: string[] = []
    const promo = parseNum(state.promoSales)
    const baseline = parseNum(state.baselineSales)
    const margin = parseNum(state.averageMargin)

    if (!state.promoSales || promo <= 0) {
      errs.push('Enter your total event sales as a positive number.')
    }
    if (!state.baselineSales || baseline <= 0) {
      errs.push('Enter your baseline sales as a positive number.')
    }
    if (!state.averageMargin || margin < 1 || margin > 99) {
      errs.push('Enter your average gross margin between 1% and 99%.')
    }

    setErrors(errs)
    return errs.length === 0
  }

  const validateStep2 = (): boolean => {
    const errs: string[] = []
    const adSpend = parseNum(state.adSpend)

    if (!state.adSpend || adSpend <= 0) {
      errs.push('Enter your ad spend as a positive number.')
    }

    if (state.belowCost) {
      const cost = parseNum(state.doorCrasherCost)
      const sale = parseNum(state.doorCrasherSalePrice)
      const units = parseNum(state.doorCrasherUnits)

      if (!state.doorCrasherCost || cost <= 0) {
        errs.push('Enter the door crasher cost price.')
      }
      if (!state.doorCrasherSalePrice || sale <= 0) {
        errs.push('Enter the door crasher sale price.')
      }
      if (!state.doorCrasherUnits || units <= 0) {
        errs.push('Enter the number of door crasher units sold.')
      }
      if (cost > 0 && sale > 0 && sale >= cost) {
        errs.push('Sale price must be less than cost price for a below-cost sale.')
      }
    }

    setErrors(errs)
    return errs.length === 0
  }

  const buildInputs = (): DCInputs => ({
    promoSales: parseNum(state.promoSales),
    baselineSales: parseNum(state.baselineSales),
    averageMargin: parseNum(state.averageMargin),
    adSpend: parseNum(state.adSpend),
    belowCost: state.belowCost,
    doorCrasherCost: state.belowCost ? parseNum(state.doorCrasherCost) : undefined,
    doorCrasherSalePrice: state.belowCost
      ? parseNum(state.doorCrasherSalePrice)
      : undefined,
    doorCrasherUnits: state.belowCost ? parseNum(state.doorCrasherUnits) : undefined,
  })

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep1()) return
    setStep(2)
  }

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep2()) return

    setStep('thinking1')
    if (thinkingTimerRef.current) clearTimeout(thinkingTimerRef.current)

    thinkingTimerRef.current = setTimeout(() => {
      const computed = calculateDoorCrasher(buildInputs())
      setResults(computed)
      setStep('results')
      thinkingTimerRef.current = null
    }, 2500)
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs: string[] = []

    if (!state.name.trim()) errs.push('Please enter your first name.')
    if (!state.email.trim()) errs.push('Please enter your email address.')
    if (!state.phone.trim()) errs.push('Please enter your phone number.')

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (state.email && !emailRegex.test(state.email)) {
      errs.push('Please enter a valid email address.')
    }

    setErrors(errs)
    if (errs.length > 0 || !results) return

    setSubmitStatus('submitting')

    try {
      const res = await submitLead({
        source: 'door-crasher-tool',
        name: state.name.trim(),
        email: state.email.trim(),
        phone: state.phone.trim(),
        inputs: buildInputs(),
        formState: state,
        results,
      })
      if (!res.success) throw new Error('Submission failed')
      setStep('success')
      setSubmitStatus('idle')
    } catch {
      setSubmitStatus('error')
    }
  }

  return (
    <section id="calculator" className={calcStyles.section}>
      <div className={dcStyles.inner}>
        <h2 className={calcStyles.headline}>Door Crasher Event Impact Calculator</h2>
        <p className={calcStyles.subheadline}>
          Already started above? Keep going below.
        </p>

        <div className={calcStyles.card}>
          <StepProgress currentStep={step} />

          {step === 1 && (
            <form className={calcStyles.stepSection} onSubmit={handleStep1Submit}>
              <h3 className={calcStyles.stepTitle}>Your Event Sales</h3>

              <CurrencyInput
                id="promoSales"
                label="Total store sales during your event"
                value={state.promoSales}
                onChange={(v) => update('promoSales', v)}
              />
              <CurrencyInput
                id="baselineSales"
                label="Total store sales for a normal equivalent period"
                helper="Use the same number of days for both."
                value={state.baselineSales}
                onChange={(v) => update('baselineSales', v)}
              />
              <PercentInput
                id="averageMargin"
                label="Your store's average gross margin %"
                helper="Not sure? The Canadian retail average is approximately 50–55%. Use 52% if you're unsure."
                placeholder="52"
                value={state.averageMargin}
                onChange={(v) => update('averageMargin', v)}
              />

              {errors.length > 0 && (
                <div>
                  {errors.map((err) => (
                    <p key={err} className={calcStyles.error}>
                      {err}
                    </p>
                  ))}
                </div>
              )}

              <button type="submit" className={dcStyles.btnBurgundy}>
                Next: Add Your Costs →
              </button>
            </form>
          )}

          {step === 2 && (
            <form className={calcStyles.stepSection} onSubmit={handleStep2Submit}>
              <h3 className={calcStyles.stepTitle}>Your Promotion Costs</h3>

              <CurrencyInput
                id="adSpend"
                label="Ad spend for this event"
                helper="Include all paid advertising: social media ads, flyers, radio, signage, etc."
                placeholder="1200"
                value={state.adSpend}
                onChange={(v) => update('adSpend', v)}
              />

              <div className={dcStyles.toggleRow}>
                <span className={dcStyles.toggleLabel}>
                  Did you sell your door crasher item below cost?
                </span>
                <label className={dcStyles.toggle}>
                  <input
                    type="checkbox"
                    className={dcStyles.toggleInput}
                    checked={state.belowCost}
                    onChange={(e) => update('belowCost', e.target.checked)}
                  />
                  <span className={dcStyles.toggleSlider} />
                </label>
              </div>

              <div
                className={`${dcStyles.belowCostFields} ${state.belowCost ? dcStyles.belowCostFieldsOpen : ''}`}
              >
                <CurrencyInput
                  id="doorCrasherCost"
                  label="Door crasher item cost price"
                  value={state.doorCrasherCost}
                  onChange={(v) => update('doorCrasherCost', v)}
                />
                <CurrencyInput
                  id="doorCrasherSalePrice"
                  label="Door crasher sale price"
                  value={state.doorCrasherSalePrice}
                  onChange={(v) => update('doorCrasherSalePrice', v)}
                />
                <label className={calcStyles.label} htmlFor="doorCrasherUnits">
                  Units sold
                  <input
                    id="doorCrasherUnits"
                    type="number"
                    min="1"
                    step="1"
                    placeholder="45"
                    value={state.doorCrasherUnits}
                    onChange={(e) => update('doorCrasherUnits', e.target.value)}
                    className={calcStyles.input}
                  />
                </label>
                <span className={calcStyles.hint}>
                  If you sold at cost (broke even on the item), leave this off —
                  that&apos;s a standard door crasher.
                </span>
              </div>

              {errors.length > 0 && (
                <div>
                  {errors.map((err) => (
                    <p key={err} className={calcStyles.error}>
                      {err}
                    </p>
                  ))}
                </div>
              )}

              <button type="submit" className={calcStyles.btnGold}>
                Calculate My Event ROI →
              </button>
            </form>
          )}

          {step === 'thinking1' && <ThinkingLoader messages={THINKING_MESSAGES} />}

          {step === 'results' && results && (
            <ResultsBlock results={results} onContinue={() => setStep(3)} />
          )}

          {step === 3 && (
            <form className={calcStyles.stepSection} onSubmit={handleLeadSubmit}>
              <h3 className={calcStyles.stepTitle}>Your Report</h3>

              <label className={calcStyles.label} htmlFor="leadName">
                First Name
                <input
                  id="leadName"
                  type="text"
                  autoComplete="given-name"
                  required
                  value={state.name}
                  onChange={(e) => update('name', e.target.value)}
                  className={calcStyles.input}
                  placeholder="Your first name"
                />
              </label>

              <label className={calcStyles.label} htmlFor="leadEmail">
                Email
                <input
                  id="leadEmail"
                  type="email"
                  autoComplete="email"
                  required
                  value={state.email}
                  onChange={(e) => update('email', e.target.value)}
                  className={calcStyles.input}
                  placeholder="you@yourstore.com"
                />
              </label>

              <label className={calcStyles.label} htmlFor="leadPhone">
                Phone
                <input
                  id="leadPhone"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={state.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  className={calcStyles.input}
                  placeholder="(555) 555-5555"
                />
                <span className={calcStyles.hint}>
                  We text you a secure link to your saved results. No sales calls.
                </span>
              </label>

              {errors.length > 0 && (
                <div>
                  {errors.map((err) => (
                    <p key={err} className={calcStyles.error}>
                      {err}
                    </p>
                  ))}
                </div>
              )}

              {submitStatus === 'error' && (
                <p className={calcStyles.error}>
                  Something went wrong. Please try again.
                </p>
              )}

              <button
                type="submit"
                className={calcStyles.btnGold}
                disabled={submitStatus === 'submitting'}
              >
                {submitStatus === 'submitting'
                  ? 'Sending...'
                  : 'Send My Free Event Report →'}
              </button>

              <p className={dcStyles.trustSignals}>
                🔒 256-bit SSL · ✓ QuickBooks ProAdvisor · ⭐ 4.9/5 Google · Never
                shared or sold
              </p>
            </form>
          )}

          {step === 'success' && (
            <div className={calcStyles.emailSuccess}>
              <span className={calcStyles.emailSuccessIcon} aria-hidden="true">
                ✓
              </span>
              <h3 className={calcStyles.emailSuccessTitle}>Your Report Is On Its Way!</h3>
              <p className={calcStyles.emailSuccessBody}>
                Check your phone for a text from KC Book Works. Kari personally
                reviews every submission and will follow up within 1 business day.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
