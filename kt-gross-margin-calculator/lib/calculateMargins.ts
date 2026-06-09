export function calculateMargins(costPrice: number, sellingPrice: number) {
  const grossProfit = sellingPrice - costPrice
  const grossMarginPercent = (grossProfit / sellingPrice) * 100
  const markupPercent = (grossProfit / costPrice) * 100
  return { grossProfit, grossMarginPercent, markupPercent }
}

export function getHealthStatus(marginPercent: number) {
  if (marginPercent >= 55)
    return {
      label: 'Strong',
      color: '#16a34a',
      description: 'Above Industry Average',
    }
  if (marginPercent >= 45)
    return {
      label: 'Moderate',
      color: '#C9A84C',
      description: 'Near Industry Average',
    }
  if (marginPercent >= 30)
    return {
      label: 'Needs Attention',
      color: '#ea580c',
      description: 'Below Industry Average',
    }
  return {
    label: 'At Risk',
    color: '#dc2626',
    description: 'Well Below Industry Average',
  }
}
