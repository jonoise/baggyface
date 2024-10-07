import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CurrencyState {
  currency: string
  setCurrency: (currency: string) => void
}

// Create the store
export const useCurrencyStore = create(
  persist<CurrencyState>(
    (set) => ({
      currency: 'CRC',
      setCurrency: (currency) => set(() => ({ currency })),
    }),
    { name: 'currency-store' }
  )
)
