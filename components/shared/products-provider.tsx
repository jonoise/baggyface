'use client'

import { ProductI } from '@/lib/models/product'
import React, { createContext, useContext, useState } from 'react'

const ProductsContext = createContext<{
  products: ProductI[]
  setProducts: any
}>({
  products: [],
  setProducts: () => {},
})

export const ProductsProvider = ({
  children,
  value,
}: React.PropsWithChildren & { value: ProductI[] }) => {
  const [products, setProducts] = useState<ProductI[]>(value)

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProducts = () => {
  const context = useContext(ProductsContext)
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider')
  }
  return context
}
