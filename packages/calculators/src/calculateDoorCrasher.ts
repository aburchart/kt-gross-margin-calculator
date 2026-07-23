export interface DCInputs {
  promoSales: number
  baselineSales: number
  averageMargin: number
  adSpend: number
  belowCost: boolean
  doorCrasherCost?: number
  doorCrasherSalePrice?: number
  doorCrasherUnits?: number
}

export interface DCResults {
  liftInSales: number
  grossProfitOnLift: number
  doorCrasherLoss: number
  totalPromoCost: number
  netEventResult: number
  roi: number
  verdict: 'profitable' | 'breakeven' | 'loss'
  verdictLabel: string
  verdictColor: string
}

export function calculateDoorCrasher(inputs: DCInputs): DCResults {
  const liftInSales = inputs.promoSales - inputs.baselineSales
  const grossProfitOnLift = liftInSales * (inputs.averageMargin / 100)

  const doorCrasherLoss = inputs.belowCost
    ? (inputs.doorCrasherCost! - inputs.doorCrasherSalePrice!) *
      inputs.doorCrasherUnits!
    : 0

  const totalPromoCost = inputs.adSpend + doorCrasherLoss
  const netEventResult = grossProfitOnLift - totalPromoCost
  const roi = totalPromoCost > 0 ? (netEventResult / totalPromoCost) * 100 : 0

  let verdict: DCResults['verdict']
  let verdictLabel: string
  let verdictColor: string

  if (netEventResult > 0) {
    verdict = 'profitable'
    verdictLabel = 'Profitable'
    verdictColor = '#16a34a'
  } else if (netEventResult === 0) {
    verdict = 'breakeven'
    verdictLabel = 'Break Even'
    verdictColor = '#C9A84C'
  } else {
    verdict = 'loss'
    verdictLabel = 'Loss'
    verdictColor = '#dc2626'
  }

  return {
    liftInSales,
    grossProfitOnLift,
    doorCrasherLoss,
    totalPromoCost,
    netEventResult,
    roi,
    verdict,
    verdictLabel,
    verdictColor,
  }
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}
