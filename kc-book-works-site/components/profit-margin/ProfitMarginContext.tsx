'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { ProductInput } from '@/lib/calculateProductMargins'

export interface ProductRow {
  name: string
  cost: string
  price: string
}

export const EMPTY_PRODUCT: ProductRow = { name: '', cost: '', price: '' }

interface ProfitMarginContextValue {
  products: ProductRow[]
  setProducts: (products: ProductRow[]) => void
  updateProduct: (index: number, field: keyof ProductRow, value: string) => void
  addProduct: () => void
  removeProduct: (index: number) => void
}

const ProfitMarginContext = createContext<ProfitMarginContextValue | null>(null)

export function rowsToInputs(rows: ProductRow[]): ProductInput[] {
  return rows
    .map((row) => ({
      name: row.name.trim() || 'Unnamed product',
      cost: parseFloat(row.cost) || 0,
      price: parseFloat(row.price) || 0,
    }))
    .filter((p) => p.cost > 0 || p.price > 0)
}

export function ProfitMarginProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<ProductRow[]>([
    { ...EMPTY_PRODUCT, name: 'Product 1' },
    { ...EMPTY_PRODUCT, name: 'Product 2' },
  ])

  const updateProduct = useCallback(
    (index: number, field: keyof ProductRow, value: string) => {
      setProducts((prev) =>
        prev.map((row, i) => (i === index ? { ...row, [field]: value } : row))
      )
    },
    []
  )

  const addProduct = useCallback(() => {
    setProducts((prev) => {
      if (prev.length >= 5) return prev
      return [...prev, { ...EMPTY_PRODUCT, name: `Product ${prev.length + 1}` }]
    })
  }, [])

  const removeProduct = useCallback((index: number) => {
    setProducts((prev) => {
      if (prev.length <= 2) return prev
      return prev.filter((_, i) => i !== index)
    })
  }, [])

  const value = useMemo(
    () => ({
      products,
      setProducts,
      updateProduct,
      addProduct,
      removeProduct,
    }),
    [products, updateProduct, addProduct, removeProduct]
  )

  return (
    <ProfitMarginContext.Provider value={value}>{children}</ProfitMarginContext.Provider>
  )
}

export function useProfitMarginContext() {
  const ctx = useContext(ProfitMarginContext)
  if (!ctx) {
    throw new Error('useProfitMarginContext must be used within ProfitMarginProvider')
  }
  return ctx
}
