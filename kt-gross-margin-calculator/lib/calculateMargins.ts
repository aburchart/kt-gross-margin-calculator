export type TargetReturnBasis = 'gross_margin' | 'markup'

export type PaymentProcessorId =
  | 'paypal'
  | 'shopify'
  | 'stripe'
  | 'amazon'
  | 'afterpay'
  | 'other'

export interface PaymentProcessor {
  id: PaymentProcessorId
  label: string
  variableFee: number
  fixedFee: number
}

export const PAYMENT_PROCESSORS: PaymentProcessor[] = [
  { id: 'paypal', label: 'PayPal', variableFee: 3.5, fixedFee: 0.49 },
  {
    id: 'shopify',
    label: 'Shopify Payments',
    variableFee: 2.9,
    fixedFee: 0.3,
  },
  { id: 'stripe', label: 'Stripe', variableFee: 2.9, fixedFee: 0.3 },
  { id: 'amazon', label: 'Amazon Pay', variableFee: 2.9, fixedFee: 0.3 },
  { id: 'afterpay', label: 'Afterpay', variableFee: 6.0, fixedFee: 0.3 },
  { id: 'other', label: 'Other', variableFee: 0, fixedFee: 0 },
]

export interface CalculatorInputs {
  productCost: number
  productCostSubjectToTariffs: number
  shippingCost: number
  shippingIncome: number
  salesTaxRate: number
  tariffRate: number
  applySalesTaxOnShipping: boolean
  variableFeePercent: number
  fixedFee: number
  targetReturnBasis: TargetReturnBasis
  targetReturnPercent: number
}

export interface CalculatorResults {
  productPrice: number
  shippingIncome: number
  totalRevenue: number
  salesTaxAmount: number
  tariffAmount: number
  totalCustomerPays: number
  productCost: number
  shippingCost: number
  merchantFees: number
  totalCosts: number
  grossProfit: number
  grossMarginPercent: number
  markupPercent: number
}

function solveSellingPrice(
  totalCogs: number,
  shippingCost: number,
  variableFeePercent: number,
  fixedFee: number,
  targetBasis: TargetReturnBasis,
  targetPercent: number
): number | null {
  const baseCosts = totalCogs + shippingCost
  const v = variableFeePercent / 100
  const rate = targetPercent / 100

  if (targetBasis === 'gross_margin') {
    const denominator = 1 - v - rate
    if (denominator <= 0) return null
    return (baseCosts + fixedFee) / denominator
  }

  const denominator = 1 - v * (1 + rate)
  if (denominator <= 0) return null
  return ((baseCosts + fixedFee) * (1 + rate)) / denominator
}

export function calculatePricing(
  inputs: CalculatorInputs
): CalculatorResults | null {
  const tariffAmount =
    inputs.productCostSubjectToTariffs * (inputs.tariffRate / 100)
  const totalCogs = inputs.productCost + tariffAmount

  const productPrice = solveSellingPrice(
    totalCogs,
    inputs.shippingCost,
    inputs.variableFeePercent,
    inputs.fixedFee,
    inputs.targetReturnBasis,
    inputs.targetReturnPercent
  )

  if (productPrice === null || !Number.isFinite(productPrice) || productPrice <= 0) {
    return null
  }

  const merchantFees =
    productPrice * (inputs.variableFeePercent / 100) + inputs.fixedFee
  const totalCosts = totalCogs + inputs.shippingCost + merchantFees
  const grossProfit = productPrice - totalCosts
  const grossMarginPercent = (grossProfit / productPrice) * 100
  const markupPercent =
    totalCosts > 0 ? (grossProfit / totalCosts) * 100 : 0

  const taxBase =
    productPrice +
    (inputs.applySalesTaxOnShipping ? inputs.shippingIncome : 0)
  const salesTaxAmount = taxBase * (inputs.salesTaxRate / 100)
  const totalRevenue = productPrice + inputs.shippingIncome
  const totalCustomerPays = totalRevenue + salesTaxAmount

  return {
    productPrice,
    shippingIncome: inputs.shippingIncome,
    totalRevenue,
    salesTaxAmount,
    tariffAmount,
    totalCustomerPays,
    productCost: inputs.productCost,
    shippingCost: inputs.shippingCost,
    merchantFees,
    totalCosts,
    grossProfit,
    grossMarginPercent,
    markupPercent,
  }
}

export function formatCurrency(value: number): string {
  return `$${value.toFixed(2)}`
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`
}
