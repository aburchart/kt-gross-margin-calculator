export const INCREMENTALITY = 0.45

export interface DcPromotionInputs {
  baselineSales: number
  grossMargin: number
  trafficUplift: number
  adSpend: number
  doorCrasherUnits: number
  doorCrasherCost: number
  doorCrasherPrice: number
  extraStaffCost: number
}

export type Verdict = 'profitable' | 'nearBreakeven' | 'loss'

export interface ScenarioRow {
  label: string
  upliftPct: number
  incrementalRevenue: number
  netProfit: number
  highlighted?: boolean
}

export interface DcPromotionResults {
  dcSubsidy: number
  totalCost: number
  rawUplift: number
  incrementalRevenue: number
  grossProfitFromUplift: number
  netProfit: number
  breakevenPct: number
  verdict: Verdict
  scenarios: ScenarioRow[]
}

export function formatDollar(value: number): string {
  return (
    '$' +
    value.toLocaleString('en-CA', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  )
}

export function formatPct(value: number): string {
  return value.toFixed(1) + '%'
}

function scenarioIncrementalRevenue(
  baselineSales: number,
  upliftPct: number
): number {
  return baselineSales * (upliftPct / 100) * INCREMENTALITY
}

function scenarioNetProfit(
  baselineSales: number,
  upliftPct: number,
  grossMargin: number,
  totalCost: number
): number {
  const revenue = scenarioIncrementalRevenue(baselineSales, upliftPct)
  return revenue * (grossMargin / 100) - totalCost
}

export function calculateForecast(inputs: DcPromotionInputs): DcPromotionResults {
  const dcSubsidy =
    Math.max(0, inputs.doorCrasherCost - inputs.doorCrasherPrice) *
    inputs.doorCrasherUnits
  const totalCost = inputs.adSpend + dcSubsidy + inputs.extraStaffCost

  const rawUplift = inputs.baselineSales * (inputs.trafficUplift / 100)
  const incrementalRevenue = rawUplift * INCREMENTALITY
  const grossProfitFromUplift =
    incrementalRevenue * (inputs.grossMargin / 100)
  const netProfit = grossProfitFromUplift - totalCost

  const denominator =
    inputs.baselineSales * INCREMENTALITY * (inputs.grossMargin / 100)
  const breakevenUplift =
    totalCost === 0 || denominator === 0 ? 0 : totalCost / denominator
  const breakevenPct = breakevenUplift * 100

  let verdict: Verdict
  if (netProfit > 0) {
    verdict = 'profitable'
  } else if (netProfit > -totalCost * 0.2) {
    verdict = 'nearBreakeven'
  } else {
    verdict = 'loss'
  }

  const targetUplift = inputs.trafficUplift
  const scenarios: ScenarioRow[] = [
    {
      label: 'Conservative',
      upliftPct: targetUplift * 0.5,
      incrementalRevenue: scenarioIncrementalRevenue(
        inputs.baselineSales,
        targetUplift * 0.5
      ),
      netProfit: scenarioNetProfit(
        inputs.baselineSales,
        targetUplift * 0.5,
        inputs.grossMargin,
        totalCost
      ),
    },
    {
      label: 'Realistic (your target)',
      upliftPct: targetUplift,
      incrementalRevenue: incrementalRevenue,
      netProfit: netProfit,
      highlighted: true,
    },
    {
      label: 'Optimistic',
      upliftPct: targetUplift * 1.5,
      incrementalRevenue: scenarioIncrementalRevenue(
        inputs.baselineSales,
        targetUplift * 1.5
      ),
      netProfit: scenarioNetProfit(
        inputs.baselineSales,
        targetUplift * 1.5,
        inputs.grossMargin,
        totalCost
      ),
    },
  ]

  return {
    dcSubsidy,
    totalCost,
    rawUplift,
    incrementalRevenue,
    grossProfitFromUplift,
    netProfit,
    breakevenPct,
    verdict,
    scenarios,
  }
}
