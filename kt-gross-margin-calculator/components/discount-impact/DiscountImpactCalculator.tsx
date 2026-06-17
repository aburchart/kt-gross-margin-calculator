'use client'

import { useMemo, useState } from 'react'
import {
  calculateDiscountImpact,
  formatDollar,
  formatPct,
  type DiscountImpactResults,
} from '@/lib/calculateDiscountImpact'
import calcStyles from '@/components/Calculator.module.css'
import styles from './DiscountImpactCalculator.module.css'

interface FormState {
  sellingPrice: string
  costPerUnit: string
  normalUnits: string
  discountPct: number
}

function parseNum(value: string): number {
  const n = parseFloat(value)
  return Number.isFinite(n) ? n : 0
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
          step="0.01"
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

function MarginChip({ marginPct, color }: { marginPct: number; color: string }) {
  const chipClass =
    color === 'green'
      ? styles.marginChipGreen
      : color === 'yellow'
        ? styles.marginChipYellow
        : styles.marginChipRed

  return (
    <div className={styles.marginChipRow}>
      <span className={styles.marginChipLabel}>Your gross margin:</span>
      <span className={`${styles.marginChip} ${chipClass}`}>
        {formatPct(marginPct)}
      </span>
    </div>
  )
}

function headlineNumberClass(difficulty: DiscountImpactResults['difficulty']): string {
  switch (difficulty) {
    case 'achievable':
      return styles.headlineNumberAchievable
    case 'ambitious':
      return styles.headlineNumberAmbitious
    case 'very_difficult':
      return styles.headlineNumberVeryDifficult
    case 'unlikely':
    case 'below_cost':
      return styles.headlineNumberUnlikely
    default:
      return styles.headlineNumberUnlikely
  }
}

function difficultyBadgeClass(difficulty: DiscountImpactResults['difficulty']): string {
  switch (difficulty) {
    case 'achievable':
      return styles.badgeAchievable
    case 'ambitious':
      return styles.badgeAmbitious
    case 'very_difficult':
      return styles.badgeVeryDifficult
    default:
      return styles.badgeUnlikely
  }
}

function ResultsPanel({
  results,
  sellingPrice,
  normalUnitsStr,
  discountPct,
}: {
  results: DiscountImpactResults
  sellingPrice: number
  normalUnitsStr: string
  discountPct: number
}) {
  if (!results.valid) {
    return (
      <p className={styles.resultsPlaceholder}>
        Enter your selling price and cost per unit to see your break-even target.
      </p>
    )
  }

  if (results.belowCost) {
    return (
      <div className={styles.errorBanner} role="alert">
        <p>{results.errorMessage}</p>
      </div>
    )
  }

  const hasNormalUnits = normalUnitsStr.trim() !== '' && parseNum(normalUnitsStr) > 0
  const normalUnits = hasNormalUnits ? parseNum(normalUnitsStr) : null

  return (
    <>
      <div className={styles.headlineResult}>
        <p className={styles.headlineLabel}>
          To break even on gross profit, you need:
        </p>
        <p
          className={`${styles.headlineNumber} ${headlineNumberClass(results.difficulty)}`}
        >
          {formatPct(results.breakEvenUpliftPct)} more units
        </p>
        <span
          className={`${styles.difficultyBadge} ${difficultyBadgeClass(results.difficulty)}`}
        >
          {results.difficultyLabel}
        </span>
        {hasNormalUnits && results.breakEvenUnits !== null && normalUnits !== null && (
          <p className={styles.headlineSub}>
            That&apos;s{' '}
            <strong>
              {results.breakEvenUnits.toLocaleString('en-CA', {
                maximumFractionDigits: 0,
              })}{' '}
              units
            </strong>{' '}
            instead of your usual{' '}
            <strong>
              {normalUnits.toLocaleString('en-CA', { maximumFractionDigits: 0 })}
            </strong>
            .
          </p>
        )}
        <p className={styles.headlineSub}>
          You lose{' '}
          <strong>{formatDollar(results.gpLossPerUnit)}</strong> gross profit on
          every unit you sell.
        </p>
      </div>

      <div className={styles.comparisonGrid}>
        <div className={styles.comparisonBox}>
          <span className={styles.comparisonLabel}>Normal price</span>
          <span className={styles.comparisonPrice}>
            {formatDollar(sellingPrice)}
          </span>
          <span className={styles.comparisonGpLabel}>Gross profit:</span>
          <span className={styles.comparisonGpValue}>
            {formatDollar(results.normalGPPerUnit)}/unit
          </span>
          <span className={styles.comparisonMargin}>
            ({formatPct(results.grossMarginPct)} margin)
          </span>
        </div>
        <div className={`${styles.comparisonBox} ${styles.comparisonBoxSale}`}>
          <span className={styles.comparisonLabel}>Sale price</span>
          <span className={styles.comparisonPrice}>
            {formatDollar(results.salePrice)}{' '}
            <span className={styles.comparisonDiscount}>
              (−{formatPct(discountPct, 0)})
            </span>
          </span>
          <span className={styles.comparisonGpLabel}>Gross profit:</span>
          <span className={styles.comparisonGpValue}>
            {formatDollar(results.saleGPPerUnit)}/unit
          </span>
          <span className={styles.comparisonMargin}>
            ({formatPct(results.saleMarginPct)} margin)
          </span>
        </div>
      </div>

      <h3 className={styles.scenarioTitle}>What if you get…</h3>
      <div className={styles.scenarioTableWrap}>
        <table className={styles.scenarioTable}>
          <thead>
            <tr>
              <th scope="col">If unit sales increase by</th>
              <th scope="col">Units sold</th>
              <th scope="col">
                {hasNormalUnits ? 'Gross profit' : 'GP per 100 units'}
              </th>
              <th scope="col">vs. Normal</th>
            </tr>
          </thead>
          <tbody>
            {results.scenarios.map((row) => {
              const vsClass =
                row.isBreakEven
                  ? styles.neutral
                  : row.vsNormal > 0
                    ? styles.surplus
                    : row.vsNormal < 0
                      ? styles.deficit
                      : styles.neutral

              const vsPrefix =
                row.isBreakEven
                  ? ''
                  : row.vsNormal > 0
                    ? '+'
                    : row.vsNormal < 0
                      ? '−'
                      : ''

              return (
                <tr
                  key={`${row.upliftPct}-${row.label}`}
                  className={row.isBreakEven ? styles.breakEvenRow : undefined}
                >
                  <td>{row.label}</td>
                  <td>
                    {hasNormalUnits && row.unitsSold !== null
                      ? row.unitsSold.toLocaleString('en-CA', {
                          maximumFractionDigits: 0,
                        })
                      : '—'}
                  </td>
                  <td>{formatDollar(row.grossProfit)}</td>
                  <td className={vsClass}>
                    {row.isBreakEven
                      ? '$0.00'
                      : `${vsPrefix}${formatDollar(Math.abs(row.vsNormal))}`}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className={styles.falseBusyness}>
        <p className={styles.falseBusynessTitle}>
          You might be busier and still make less.
        </p>
        <p>
          A {formatPct(discountPct, 0)} discount at a{' '}
          {formatPct(results.grossMarginPct)} margin means you need{' '}
          {formatPct(results.breakEvenUpliftPct)} more customers just to stand
          still on profit. If you only get 30% more customers — which would feel
          like a great sale — you&apos;ve actually lost{' '}
          <strong>
            {formatDollar(results.falseBusyness30Pct.shortfall)}
          </strong>{' '}
          in gross profit compared to doing nothing.
        </p>
        <p>
          If you only get 30% more customers, you&apos;d earn{' '}
          <strong>
            {formatDollar(results.falseBusyness30Pct.earnedWith30)}
          </strong>{' '}
          instead of your normal{' '}
          <strong>
            {formatDollar(results.falseBusyness30Pct.normalEarned)}
          </strong>{' '}
          — a{' '}
          <strong>
            {formatDollar(results.falseBusyness30Pct.shortfall)}
          </strong>{' '}
          shortfall.
        </p>
      </div>

      <div className={styles.worthItSection}>
        <h3 className={styles.worthItTitle}>
          What would actually make this sale worth it
        </h3>
        <ul className={styles.worthItList}>
          <li className={styles.worthItItem}>
            <span className={styles.worthItIcon} aria-hidden="true">
              ✅
            </span>
            <div className={styles.worthItContent}>
              <strong>You clear old stock</strong>
              <p>
                If this discount moves inventory that would otherwise be marked
                down further or written off, factor in the avoided loss.
              </p>
            </div>
          </li>
          <li className={styles.worthItItem}>
            <span className={styles.worthItIcon} aria-hidden="true">
              ✅
            </span>
            <div className={styles.worthItContent}>
              <strong>New customers return at full price</strong>
              <p>
                If sale customers become repeat buyers, the lifetime value can
                justify the short-term margin hit.
              </p>
            </div>
          </li>
          <li className={styles.worthItItem}>
            <span className={styles.worthItIcon} aria-hidden="true">
              {results.realisticUplift ? '✅' : '❌'}
            </span>
            <div className={styles.worthItContent}>
              <strong>Your uplift target is realistic</strong>
              <p>
                {results.realisticUplift
                  ? `At ${formatPct(results.breakEvenUpliftPct)} required uplift, this target is within reach for many retailers.`
                  : `You need ${formatPct(results.breakEvenUpliftPct)} more unit sales to break even — that's a steep climb for most stores.`}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </>
  )
}

export default function DiscountImpactCalculator() {
  const [state, setState] = useState<FormState>({
    sellingPrice: '',
    costPerUnit: '',
    normalUnits: '',
    discountPct: 20,
  })

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }))
  }

  const sellingPrice = parseNum(state.sellingPrice)
  const costPerUnit = parseNum(state.costPerUnit)
  const normalUnitsParsed =
    state.normalUnits.trim() === '' ? null : parseNum(state.normalUnits)

  const liveMargin =
    sellingPrice > 0 && costPerUnit >= 0
      ? ((sellingPrice - costPerUnit) / sellingPrice) * 100
      : null

  const liveSalePrice =
    sellingPrice > 0 ? sellingPrice * (1 - state.discountPct / 100) : null

  const results = useMemo(
    () =>
      calculateDiscountImpact({
        sellingPrice,
        costPerUnit,
        normalUnits: normalUnitsParsed,
        discountPct: state.discountPct,
      }),
    [sellingPrice, costPerUnit, normalUnitsParsed, state.discountPct]
  )

  const handleDiscountNumberChange = (value: string) => {
    const n = parseInt(value, 10)
    if (!Number.isFinite(n)) return
    update('discountPct', Math.min(70, Math.max(1, n)))
  }

  return (
    <section id="calculator" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.layout}>
          <div className={`${styles.panel} ${styles.inputsPanel}`}>
            <h2 className={styles.panelTitle}>Your Numbers</h2>

            <div className={styles.inputStack}>
              <h3 className={styles.sectionHeading}>Your Normal Numbers</h3>

              <CurrencyInput
                id="sellingPrice"
                label="Your normal selling price"
                placeholder="49"
                value={state.sellingPrice}
                onChange={(v) => update('sellingPrice', v)}
              />

              <CurrencyInput
                id="costPerUnit"
                label="Your cost per unit (COGS)"
                helper="Your wholesale or production cost for one unit, before any other expenses."
                placeholder="22"
                value={state.costPerUnit}
                onChange={(v) => update('costPerUnit', v)}
              />

              {liveMargin !== null && sellingPrice > 0 && costPerUnit >= 0 && (
                <MarginChip
                  marginPct={liveMargin}
                  color={
                    liveMargin > 40
                      ? 'green'
                      : liveMargin >= 25
                        ? 'yellow'
                        : 'red'
                  }
                />
              )}

              <label className={calcStyles.label} htmlFor="normalUnits">
                Units you normally sell in this period
                <span className={styles.optionalLabel}> (optional)</span>
                <input
                  id="normalUnits"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="80"
                  value={state.normalUnits}
                  onChange={(e) => update('normalUnits', e.target.value)}
                  className={calcStyles.input}
                />
                <span className={calcStyles.hint}>
                  Use a typical week, month — whatever period your sale will
                  cover. This lets us show you real unit targets, not just
                  percentages.
                </span>
              </label>

              <hr className={styles.sectionDivider} />

              <h3 className={styles.sectionHeading}>Your Planned Discount</h3>

              <div className={styles.discountRow}>
                <label className={calcStyles.label} htmlFor="discountPct">
                  Discount % you&apos;re planning
                </label>
                <div className={styles.discountControls}>
                  <input
                    id="discountPct"
                    type="number"
                    min={1}
                    max={70}
                    step={1}
                    value={state.discountPct}
                    onChange={(e) => handleDiscountNumberChange(e.target.value)}
                    className={styles.discountNumber}
                    aria-label="Discount percentage"
                  />
                  <input
                    type="range"
                    min={1}
                    max={70}
                    step={1}
                    value={state.discountPct}
                    onChange={(e) =>
                      update('discountPct', parseInt(e.target.value, 10))
                    }
                    className={styles.slider}
                    aria-valuemin={1}
                    aria-valuemax={70}
                    aria-valuenow={state.discountPct}
                    aria-label="Discount percentage slider"
                  />
                </div>
                <div className={styles.sliderLabels}>
                  <span>1%</span>
                  <span>70%</span>
                </div>
                {liveSalePrice !== null && sellingPrice > 0 && (
                  <p className={styles.salePriceLive}>
                    Sale price: {formatDollar(liveSalePrice)}{' '}
                    <span className={styles.salePriceWas}>
                      (was {formatDollar(sellingPrice)})
                    </span>
                  </p>
                )}
              </div>

              <div className={styles.benchmarkCallout}>
                <strong>Common discount ranges by format:</strong> Flash/clearance:
                30–50% · Seasonal sale: 15–25% · Loyalty/member discount:
                10–15% · BOGO 50% off is effectively a 25% overall discount if
                customers buy two.
              </div>
            </div>
          </div>

          <div className={styles.panel}>
            <h2 className={styles.panelTitle}>Live Results</h2>
            <ResultsPanel
              results={results}
              sellingPrice={sellingPrice}
              normalUnitsStr={state.normalUnits}
              discountPct={state.discountPct}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
