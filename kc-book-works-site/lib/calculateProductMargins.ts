export interface ProductInput {
  name: string
  cost: number
  price: number
}

export type ProductStatus = 'strong' | 'ok' | 'weak' | 'loss'

export interface ProductResult {
  name: string
  cost: number
  price: number
  grossMarginPct: number
  profitPerUnit: number
  status: ProductStatus
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`
}

export function getMarginStatus(marginPct: number): ProductStatus {
  if (marginPct < 0) return 'loss'
  if (marginPct < 25) return 'weak'
  if (marginPct < 40) return 'ok'
  return 'strong'
}

export function analyzeProduct(product: ProductInput): ProductResult {
  const profitPerUnit = product.price - product.cost
  const grossMarginPct =
    product.price > 0 ? (profitPerUnit / product.price) * 100 : 0

  return {
    ...product,
    profitPerUnit,
    grossMarginPct,
    status: getMarginStatus(grossMarginPct),
  }
}

export function compareProducts(products: ProductInput[]): ProductResult[] {
  return products
    .map(analyzeProduct)
    .sort((a, b) => b.grossMarginPct - a.grossMarginPct)
}
