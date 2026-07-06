/** Site-wide constants. NAP must match Google Business Profile exactly before launch. */
export const SITE_URL = 'https://kcbookworks.com'

// TODO: Replace placeholder NAP with exact Google Business Profile values (byte-for-byte match required)
export const NAP = {
  name: 'KC Book Works',
  addressLine1: 'This is a placeholder — verify with Google Business Profile',
  addressLine2: '',
  phone: 'This is a placeholder',
  hours: 'This is a placeholder',
} as const

export const BUSINESS_TYPES = [
  'Boutique / Fashion',
  'Gift Shop',
  'Home & Decor',
  'Specialty Retail',
  'General Retail Store',
  'Other',
] as const

export type BusinessType = (typeof BUSINESS_TYPES)[number]
