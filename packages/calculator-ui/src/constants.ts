export const BUSINESS_TYPES = [
  'Boutique / Fashion',
  'Gift Shop',
  'Home & Decor',
  'Specialty Retail',
  'General Retail Store',
  'Other',
] as const

export type BusinessType = (typeof BUSINESS_TYPES)[number]
