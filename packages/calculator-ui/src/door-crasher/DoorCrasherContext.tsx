'use client'

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react'

interface DoorCrasherContextValue {
  promoSales: string
  baselineSales: string
  setPromoSales: (value: string) => void
  setBaselineSales: (value: string) => void
  prefillAndScroll: (promo: string, baseline: string) => void
}

const DoorCrasherContext = createContext<DoorCrasherContextValue | null>(null)

export function DoorCrasherProvider({ children }: { children: ReactNode }) {
  const [promoSales, setPromoSales] = useState('')
  const [baselineSales, setBaselineSales] = useState('')

  const prefillAndScroll = useCallback((promo: string, baseline: string) => {
    setPromoSales(promo)
    setBaselineSales(baseline)
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <DoorCrasherContext.Provider
      value={{
        promoSales,
        baselineSales,
        setPromoSales,
        setBaselineSales,
        prefillAndScroll,
      }}
    >
      {children}
    </DoorCrasherContext.Provider>
  )
}

export function useDoorCrasherContext() {
  const ctx = useContext(DoorCrasherContext)
  if (!ctx) {
    throw new Error('useDoorCrasherContext must be used within DoorCrasherProvider')
  }
  return ctx
}
