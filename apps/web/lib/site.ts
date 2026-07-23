/** Site-wide constants. NAP must match Google Business Profile exactly before launch. */
export const SITE_URL = 'https://kcbookworks.net'

export const NAP = {
  name: 'KC Book Works',
  addressLine1: '485015 Sweaburg Rd',
  addressLine2: 'Woodstock, ON N4S 7V6',
  phone: null,
  hours: null,
} as const

export const SOCIAL = {
  facebook: 'https://www.facebook.com/ktbookworks/',
  googleBusiness: 'https://share.google/GbHLCmGsxL6142pZu',
} as const

export {
  BUSINESS_TYPES,
  type BusinessType,
} from '@kc-book-works/calculator-ui/constants'
