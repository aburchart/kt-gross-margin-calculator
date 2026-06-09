'use client'

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react'

interface CalculatorContextValue {
  costPrice: string
  sellingPrice: string
  setCostPrice: (value: string) => void
  setSellingPrice: (value: string) => void
  heroTriggerCount: number
  triggerFromHero: () => void
}

const CalculatorContext = createContext<CalculatorContextValue | null>(null)

export function CalculatorProvider({ children }: { children: ReactNode }) {
  const [costPrice, setCostPrice] = useState('')
  const [sellingPrice, setSellingPrice] = useState('')
  const [heroTriggerCount, setHeroTriggerCount] = useState(0)

  const triggerFromHero = useCallback(() => {
    setHeroTriggerCount((c) => c + 1)
  }, [])

  return (
    <CalculatorContext.Provider
      value={{
        costPrice,
        sellingPrice,
        setCostPrice,
        setSellingPrice,
        heroTriggerCount,
        triggerFromHero,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  )
}

export function useCalculatorContext() {
  const context = useContext(CalculatorContext)
  if (!context) {
    throw new Error('useCalculatorContext must be used within CalculatorProvider')
  }
  return context
}
