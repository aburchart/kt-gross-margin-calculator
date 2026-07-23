'use client'

import { useMemo, useState } from 'react'
import {
  calculateForecast,
  formatDollar,
  formatPct,
  type DcPromotionInputs,
  type DcPromotionResults,
} from '@kc-book-works/calculators/calculateDcPromotion'
import calcStyles from '../Calculator.module.css'
import styles from './DcPromotionCalculator.module.css'

type Step = 1 | 2 | 3

interface FormState {
  baselineSales: string
  grossMargin: string
  eventDays: string
  trafficUplift: number
  adSpend: string
  doorCrasherUnits: string
  doorCrasherCost: string
  doorCrasherPrice: string
  extraStaffCost: string
}

const INITIAL_STATE: FormState = {
  baselineSales: '',
  grossMargin: '',
  eventDays: '3',
  trafficUplift: 20,
  adSpend: '',
  doorCrasherUnits: '',
  doorCrasherCost: '',
  doorCrasherPrice: '',
  extraStaffCost: '',
}

const EVENT_DAY_OPTIONS = ['1', '2', '3', '4', '5', '7']

function parseNum(value: string): number {
  const n = parseFloat(value)
  return Number.isFinite(n) ? n : 0
}

function StepProgress({ currentStep }: { currentStep: Step }) {
  const steps = [
    { label: 'Your Baseline', step: 1 },
    { label: 'Your Event Plan', step: 2 },
    { label: 'Your Forecast', step: 3 },
  ]

  const activeIndex = currentStep - 1

  return (
    <div className={styles.progress}>
      {steps.map((s, i) => {
        const isActive = i === activeIndex
        const isComplete = i < activeIndex
        return (
          <div
            key={s.label}
            className={`${styles.progressStep} ${isActive ? styles.progressStepActive : ''}`}
          >
            <span
              className={`${styles.progressDot} ${isActive ? styles.progressDotActive : ''} ${isComplete ? styles.progressDotComplete : ''}`}
              aria-hidden="true"
            />
            <span>{s.label}</span>
          </div>
        )
      })}
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
  optional,
}: {
  id: string
  label: string
  helper?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  optional?: boolean
}) {
  return (
    <label className={calcStyles.label} htmlFor={id}>
      {label}
      {optional && <span className={styles.optionalLabel}> (optional)</span>}
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
          min="0"
          max="100"
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

function buildInputs(state: FormState): DcPromotionInputs {
  return {
    baselineSales: parseNum(state.baselineSales),
    grossMargin: parseNum(state.grossMargin),
    trafficUplift: state.trafficUplift,
    adSpend: parseNum(state.adSpend),
    doorCrasherUnits: parseNum(state.doorCrasherUnits),
    doorCrasherCost: parseNum(state.doorCrasherCost),
    doorCrasherPrice: parseNum(state.doorCrasherPrice),
    extraStaffCost: parseNum(state.extraStaffCost),
  }
}

function costBreakdown(
  adSpend: number,
  dcSubsidy: number,
  extraStaffCost: number
): string {
  const parts: string[] = []
  if (adSpend > 0) parts.push(`${formatDollar(adSpend)} ad spend`)
  if (dcSubsidy > 0) parts.push(`${formatDollar(dcSubsidy)} door crasher subsidy`)
  if (extraStaffCost > 0) parts.push(`${formatDollar(extraStaffCost)} staffing`)
  return parts.length > 0 ? parts.join(' + ') : 'No event costs entered'
}

function InsightBox({
  results,
  inputs,
}: {
  results: DcPromotionResults
  inputs: DcPromotionInputs
}) {
  const paragraphs: string[] = []

  if (results.dcSubsidy > 0 && inputs.doorCrasherUnits > 0) {
    const perUnit = Math.max(
      0,
      inputs.doorCrasherCost - inputs.doorCrasherPrice
    )
    paragraphs.push(
      `Your door crasher items are priced ${formatDollar(perUnit)} below cost per unit. Across ${inputs.doorCrasherUnits} planned units, that's ${formatDollar(results.dcSubsidy)} in upfront subsidy — your bet that the traffic will pay it back through upsells and incremental sales.`
    )
  }

  if (results.breakevenPct > inputs.trafficUplift) {
    const gap = results.breakevenPct - inputs.trafficUplift
    paragraphs.push(
      `You're ${formatPct(gap)} short of break-even at your current target. Consider reducing ad spend, lowering the door crasher subsidy, or building a stronger upsell strategy to close the gap.`
    )
  }

  if (results.netProfit >= 0 && results.breakevenPct > 0) {
    const marginOfSafety = inputs.trafficUplift - results.breakevenPct
    paragraphs.push(
      `You're ${formatPct(marginOfSafety)} above break-even — a ${formatDollar(results.netProfit)} projected margin of safety if traffic hits your target.`
    )
  }

  paragraphs.push(
    'Research note: Only ~45% of promotional revenue lift is genuinely incremental. The 45% factor is already built into these projections — so these numbers are conservative by design.'
  )

  return (
    <div className={styles.insightBox}>
      {paragraphs.map((text) => (
        <p key={text}>{text}</p>
      ))}
    </div>
  )
}

function ForecastResults({
  results,
  inputs,
  onBack,
}: {
  results: DcPromotionResults
  inputs: DcPromotionInputs
  onBack: () => void
}) {
  const verdictClass =
    results.verdict === 'profitable'
      ? styles.verdictProfitable
      : results.verdict === 'nearBreakeven'
        ? styles.verdictNearBreakeven
        : styles.verdictLoss

  const verdictText =
    results.verdict === 'profitable'
      ? 'This event is projected to be profitable.'
      : results.verdict === 'nearBreakeven'
        ? 'This event is close to break-even.'
        : 'At this traffic uplift, the event is likely a loss.'

  const barFillPct =
    results.breakevenPct > 0
      ? Math.min(100, (inputs.trafficUplift / results.breakevenPct) * 100)
      : 100

  const barMeetsTarget = inputs.trafficUplift >= results.breakevenPct

  return (
    <div className={calcStyles.stepSection}>
      <button type="button" className={styles.backLink} onClick={onBack}>
        ← Back to Event Plan
      </button>

      <h3 className={calcStyles.stepTitle}>Your Forecast</h3>

      <div className={`${styles.verdictBanner} ${verdictClass}`}>
        <p className={styles.verdictText}>{verdictText}</p>
      </div>

      <div className={styles.resultsGrid}>
        <div className={styles.resultCard}>
          <span className={styles.resultCardLabel}>
            Expected Incremental Revenue
          </span>
          <span className={styles.resultCardValue}>
            {formatDollar(results.incrementalRevenue)}
          </span>
          <span className={styles.resultCardHint}>
            {formatPct(inputs.trafficUplift)} uplift × 45% incrementality factor
          </span>
        </div>
        <div className={styles.resultCard}>
          <span className={styles.resultCardLabel}>Gross Profit from Uplift</span>
          <span className={styles.resultCardValue}>
            {formatDollar(results.grossProfitFromUplift)}
          </span>
          <span className={styles.resultCardHint}>
            At your {formatPct(inputs.grossMargin)} gross margin
          </span>
        </div>
        <div className={styles.resultCard}>
          <span className={styles.resultCardLabel}>Total Event Cost</span>
          <span
            className={`${styles.resultCardValue} ${styles.valueNegative}`}
          >
            −{formatDollar(results.totalCost)}
          </span>
          <span className={styles.resultCardHint}>
            {costBreakdown(
              inputs.adSpend,
              results.dcSubsidy,
              inputs.extraStaffCost
            )}
          </span>
        </div>
        <div className={styles.resultCard}>
          <span className={styles.resultCardLabel}>
            Projected Net Profit / Loss
          </span>
          <span
            className={`${styles.resultCardValue} ${results.netProfit >= 0 ? styles.valuePositive : styles.valueNegative}`}
          >
            {formatDollar(results.netProfit)}
          </span>
          <span className={styles.resultCardHint}>
            {results.netProfit >= 0 ? 'Projected profit' : 'Projected loss'}
          </span>
        </div>
      </div>

      <div className={styles.breakEvenSection}>
        <p className={styles.breakEvenLabel}>
          You need at least {formatPct(results.breakevenPct)} traffic uplift to
          cover your total event cost of {formatDollar(results.totalCost)}.
        </p>
        <div className={styles.breakEvenTrack}>
          <div
            className={`${styles.breakEvenFill} ${barMeetsTarget ? styles.breakEvenFillGreen : styles.breakEvenFillMaroon}`}
            style={{ width: `${barFillPct}%` }}
            role="progressbar"
            aria-valuenow={barFillPct}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        <div className={styles.breakEvenMarkers}>
          <span>0%</span>
          <span className={styles.breakEvenCenter}>
            Break-even: {formatPct(results.breakevenPct)}
          </span>
          <span>Your target: {formatPct(inputs.trafficUplift)}</span>
        </div>
      </div>

      <div className={styles.scenarioTableWrap}>
        <table className={styles.scenarioTable}>
          <thead>
            <tr>
              <th scope="col">Scenario</th>
              <th scope="col">Traffic Uplift</th>
              <th scope="col">Incremental Revenue</th>
              <th scope="col">Net Profit</th>
            </tr>
          </thead>
          <tbody>
            {results.scenarios.map((row) => (
              <tr
                key={row.label}
                className={row.highlighted ? styles.highlightedRow : undefined}
              >
                <td>{row.label}</td>
                <td>{formatPct(row.upliftPct)}</td>
                <td>{formatDollar(row.incrementalRevenue)}</td>
                <td
                  className={
                    row.netProfit >= 0
                      ? styles.valuePositive
                      : styles.valueNegative
                  }
                >
                  {formatDollar(row.netProfit)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className={styles.researchNote}>
          All scenarios apply a 45% incrementality factor — industry research
          shows only ~45% of promotional revenue lift represents genuinely new
          sales. The rest is pull-forward or switching from other purchases.
          (CVS Promotion Profitability Study)
        </p>
      </div>

      <InsightBox results={results} inputs={inputs} />
    </div>
  )
}

export default function DcPromotionCalculator() {
  const [state, setState] = useState<FormState>(INITIAL_STATE)
  const [step, setStep] = useState<Step>(1)
  const [errors, setErrors] = useState<string[]>([])

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }))
  }

  const inputs = useMemo(() => buildInputs(state), [state])
  const results = useMemo(
    () => (step === 3 ? calculateForecast(inputs) : null),
    [step, inputs]
  )

  const validateStep1 = (): boolean => {
    const errs: string[] = []
    const baseline = parseNum(state.baselineSales)
    const margin = parseNum(state.grossMargin)

    if (!state.baselineSales || baseline <= 0) {
      errs.push('Enter normal store sales as a positive number.')
    }
    if (!state.grossMargin || margin <= 0) {
      errs.push('Enter your gross margin as a positive percentage.')
    }

    setErrors(errs)
    return errs.length === 0
  }

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep1()) return
    setStep(2)
  }

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrors([])
    setStep(3)
  }

  return (
    <section id="calculator" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.headline}>Door Crasher Profit Forecaster</h2>
        <p className={styles.subheadline}>
          Plan your event numbers and see your projected profit before you spend.
        </p>

        <div className={styles.card}>
          <StepProgress currentStep={step} />

          {step === 1 && (
            <form className={calcStyles.stepSection} onSubmit={handleStep1Submit}>
              <h3 className={calcStyles.stepTitle}>Your Baseline</h3>

              <CurrencyInput
                id="baselineSales"
                label="Normal store sales for the event period"
                helper="Use the same number of days your event will run"
                placeholder="9200"
                value={state.baselineSales}
                onChange={(v) => update('baselineSales', v)}
              />

              <PercentInput
                id="grossMargin"
                label="Your store's average gross margin %"
                helper="Canadian retail average is ~50–55%. Use 52% if unsure."
                placeholder="52"
                value={state.grossMargin}
                onChange={(v) => update('grossMargin', v)}
              />

              <label className={calcStyles.label} htmlFor="eventDays">
                How many days will your event run?
                <select
                  id="eventDays"
                  value={state.eventDays}
                  onChange={(e) => update('eventDays', e.target.value)}
                  className={calcStyles.select}
                >
                  {EVENT_DAY_OPTIONS.map((days) => (
                    <option key={days} value={days}>
                      {days} {days === '1' ? 'day' : 'days'}
                    </option>
                  ))}
                </select>
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

              <button type="submit" className={styles.btnBurgundy}>
                Next: Plan Your Event →
              </button>
            </form>
          )}

          {step === 2 && (
            <form className={calcStyles.stepSection} onSubmit={handleStep2Submit}>
              <button
                type="button"
                className={styles.backLink}
                onClick={() => {
                  setErrors([])
                  setStep(1)
                }}
              >
                ← Back to Baseline
              </button>

              <h3 className={calcStyles.stepTitle}>Your Event Plan</h3>

              <div className={styles.sliderRow}>
                <div className={styles.sliderHeader}>
                  <span className={styles.sliderLabel}>
                    Expected foot traffic uplift
                  </span>
                  <span className={styles.sliderValue}>
                    {formatPct(state.trafficUplift)}
                  </span>
                </div>
                <input
                  id="trafficUplift"
                  type="range"
                  min={5}
                  max={100}
                  step={1}
                  value={state.trafficUplift}
                  onChange={(e) =>
                    update('trafficUplift', parseInt(e.target.value, 10))
                  }
                  className={styles.slider}
                  aria-valuemin={5}
                  aria-valuemax={100}
                  aria-valuenow={state.trafficUplift}
                />
                <div className={styles.sliderLabels}>
                  <span>5%</span>
                  <span>100%</span>
                </div>
              </div>

              <div className={styles.benchmarkCallout}>
                <strong>What&apos;s realistic?</strong> Abt Electronics saw
                +10–30% in-store traffic on event weekends. Best Buy&apos;s 2024
                Black Friday spiked +473% versus their daily average — but
                day-over-day sales still fell 2%. Research shows only about{' '}
                <strong>45% of revenue lift is truly incremental</strong> (the
                rest is customers who would have bought anyway, just earlier).
                This calculator applies that factor automatically.
              </div>

              <CurrencyInput
                id="adSpend"
                label="Planned ad spend / promotional budget"
                value={state.adSpend}
                onChange={(v) => update('adSpend', v)}
              />

              <label className={calcStyles.label} htmlFor="doorCrasherUnits">
                Door crasher units you plan to sell
                <input
                  id="doorCrasherUnits"
                  type="number"
                  min="0"
                  step="1"
                  value={state.doorCrasherUnits}
                  onChange={(e) => update('doorCrasherUnits', e.target.value)}
                  className={calcStyles.input}
                />
                <span className={calcStyles.hint}>
                  Enter 0 if not selling anything below cost
                </span>
              </label>

              <CurrencyInput
                id="doorCrasherCost"
                label="Your cost per door crasher unit"
                value={state.doorCrasherCost}
                onChange={(v) => update('doorCrasherCost', v)}
              />

              <CurrencyInput
                id="doorCrasherPrice"
                label="Your selling price per door crasher unit"
                value={state.doorCrasherPrice}
                onChange={(v) => update('doorCrasherPrice', v)}
              />

              <CurrencyInput
                id="extraStaffCost"
                label="Extra staffing / operational costs"
                value={state.extraStaffCost}
                onChange={(v) => update('extraStaffCost', v)}
                optional
              />

              <button type="submit" className={styles.btnBurgundy}>
                See My Profit Forecast →
              </button>
            </form>
          )}

          {step === 3 && results && (
            <ForecastResults
              results={results}
              inputs={inputs}
              onBack={() => setStep(2)}
            />
          )}
        </div>
      </div>
    </section>
  )
}
