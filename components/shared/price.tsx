import { useExchangeRate } from '@/lib/hooks/use-currency-value'
import { useCurrencyStore } from '@/lib/stores/currency-store'
import React from 'react'
import { Skeleton } from '../ui/skeleton'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/lib/currency'

export const Price = ({
  price,
  className,
  skeletonClassName,
}: {
  price: number | string
  className?: string
  skeletonClassName?: string
}) => {
  const { exchange } = useExchangeRate()
  const { currency } = useCurrencyStore()

  if (!exchange) {
    return (
      <Skeleton className={cn(`h-4 w-12 inline-block`, skeletonClassName)} />
    )
  }

  const divisor = currency === 'CRC' ? 1 : Number(exchange)
  const value = Number(price) / divisor
  return formatCurrency(value, currency)
}
