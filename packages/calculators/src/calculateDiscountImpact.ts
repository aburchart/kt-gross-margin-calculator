export interface DiscountImpactInputs {
  sellingPrice: number
  costPerUnit: number
  normalUnits: number | null
  discountPct: number
}

export type DifficultyLevel =
  | 'below_cost'
  | 'achievable'
  | 'ambitious'
  | 'very_difficult'
  | 'unlikely'
  | 'incomplete'

export interface ScenarioRow {
  label: string
  upliftPct: number
  unitsSold: number | null
  grossProfit: number
  vsNormal: number
  isBreakEven: boolean
}

export interface DiscountImpactResults {
  valid: boolean
  belowCost: boolean
  errorMessage?: string
  grossMarginPct: number
  marginChipColor: 'green' | 'yellow' | 'red'
  salePrice: number
  normalGPPerUnit: number
  saleGPPerUnit: number
  gpLossPerUnit: number
  saleMarginPct: number
  breakEvenUpliftPct: number
  breakEvenUnits: number | null
  difficulty: DifficultyLevel
  difficultyLabel: string
  normalTotalGP: number
  scenarios: ScenarioRow[]
  falseBusyness30Pct: {
    earnedWith30: number
    normalEarned: number
    shortfall: number
  }
  realisticUplift: boolean
}

const SCENARIO_UPLIFTS = [10, 25, 50, 100, 150]

export function formatDollar(value: number): string {
  return (
    '$' +
    value.toLocaleString('en-CA', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  )
}

export function formatPct(value: number, decimals = 1): string {
  return (
    value.toLocaleString('en-CA', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }) + '%'
  )
}

function getDifficulty(upliftPct: number): {
  level: DifficultyLevel
  label: string
} {
  if (upliftPct < 30) return { level: 'achievable', label: 'Achievable' }
  if (upliftPct < 75) return { level: 'ambitious', label: 'Ambitious' }
  if (upliftPct < 150) return { level: 'very_difficult', label: 'Very difficult' }
  return { level: 'unlikely', label: 'Unlikely' }
}

function getMarginChipColor(marginPct: number): 'green' | 'yellow' | 'red' {
  if (marginPct > 40) return 'green'
  if (marginPct >= 25) return 'yellow'
  return 'red'
}

function buildScenarioRow(
  label: string,
  upliftPct: number,
  normalUnits: number | null,
  saleGPPerUnit: number,
  normalTotalGP: number,
  isBreakEven: boolean
): ScenarioRow {
  const baseUnits = normalUnits ?? 100
  const unitsSold = normalUnits !== null ? baseUnits * (1 + upliftPct / 100) : null
  const grossProfit = baseUnits * (1 + upliftPct / 100) * saleGPPerUnit
  const vsNormal = grossProfit - normalTotalGP

  return {
    label,
    upliftPct,
    unitsSold,
    grossProfit,
    vsNormal,
    isBreakEven,
  }
}

export function calculateDiscountImpact(
  inputs: DiscountImpactInputs
): DiscountImpactResults {
  const incomplete =
    inputs.sellingPrice <= 0 || inputs.costPerUnit < 0 || inputs.discountPct <= 0

  if (incomplete) {
    return {
      valid: false,
      belowCost: false,
      grossMarginPct: 0,
      marginChipColor: 'red',
      salePrice: 0,
      normalGPPerUnit: 0,
      saleGPPerUnit: 0,
      gpLossPerUnit: 0,
      saleMarginPct: 0,
      breakEvenUpliftPct: 0,
      breakEvenUnits: null,
      difficulty: 'incomplete',
      difficultyLabel: '',
      normalTotalGP: 0,
      scenarios: [],
      falseBusyness30Pct: { earnedWith30: 0, normalEarned: 0, shortfall: 0 },
      realisticUplift: false,
    }
  }

  const { sellingPrice, costPerUnit, normalUnits, discountPct } = inputs

  const normalGPPerUnit = sellingPrice - costPerUnit
  const grossMarginPct = (normalGPPerUnit / sellingPrice) * 100
  const salePrice = sellingPrice * (1 - discountPct / 100)
  const saleGPPerUnit = salePrice - costPerUnit
  const saleMarginPct = salePrice > 0 ? (saleGPPerUnit / salePrice) * 100 : 0
  const gpLossPerUnit = normalGPPerUnit - saleGPPerUnit

  const belowCost = saleGPPerUnit <= 0 || discountPct >= grossMarginPct

  if (belowCost) {
    return {
      valid: true,
      belowCost: true,
      errorMessage:
        'At this discount, you are selling below cost. No volume of sales can recover this loss.',
      grossMarginPct,
      marginChipColor: getMarginChipColor(grossMarginPct),
      salePrice,
      normalGPPerUnit,
      saleGPPerUnit,
      gpLossPerUnit,
      saleMarginPct,
      breakEvenUpliftPct: 0,
      breakEvenUnits: null,
      difficulty: 'below_cost',
      difficultyLabel: 'Selling below cost',
      normalTotalGP: 0,
      scenarios: [],
      falseBusyness30Pct: { earnedWith30: 0, normalEarned: 0, shortfall: 0 },
      realisticUplift: false,
    }
  }

  const breakEvenUpliftPct =
    (discountPct / (grossMarginPct - discountPct)) * 100
  const breakEvenUnits =
    normalUnits !== null
      ? normalUnits * (normalGPPerUnit / saleGPPerUnit)
      : null

  const baseUnits = normalUnits ?? 100
  const normalTotalGP = baseUnits * normalGPPerUnit

  const { level, label } = getDifficulty(breakEvenUpliftPct)

  const scenarios: ScenarioRow[] = SCENARIO_UPLIFTS.map((uplift) =>
    buildScenarioRow(
      `${formatPct(uplift, 0)} more`,
      uplift,
      normalUnits,
      saleGPPerUnit,
      normalTotalGP,
      false
    )
  )

  const breakEvenRow = buildScenarioRow(
    `${formatPct(breakEvenUpliftPct)} more ← break-even`,
    breakEvenUpliftPct,
    normalUnits,
    saleGPPerUnit,
    normalTotalGP,
    true
  )

  const insertIndex = scenarios.findIndex((s) => s.upliftPct > breakEvenUpliftPct)
  if (insertIndex === -1) {
    scenarios.push(breakEvenRow)
  } else {
    scenarios.splice(insertIndex, 0, breakEvenRow)
  }

  const earnedWith30 = baseUnits * 1.3 * saleGPPerUnit
  const normalEarned = normalTotalGP
  const shortfall = normalEarned - earnedWith30

  return {
    valid: true,
    belowCost: false,
    grossMarginPct,
    marginChipColor: getMarginChipColor(grossMarginPct),
    salePrice,
    normalGPPerUnit,
    saleGPPerUnit,
    gpLossPerUnit,
    saleMarginPct,
    breakEvenUpliftPct,
    breakEvenUnits,
    difficulty: level,
    difficultyLabel: label,
    normalTotalGP,
    scenarios,
    falseBusyness30Pct: { earnedWith30, normalEarned, shortfall },
    realisticUplift: breakEvenUpliftPct < 50,
  }
}
