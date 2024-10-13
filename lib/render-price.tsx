import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import { cn } from './utils'
import { formatCurrency } from './currency'

export const renderPrice = (
  {
    skeletonClassName,
    currency,
    exchange,
    price,
  }: {
    className?: string
    skeletonClassName?: string
    currency: string
    exchange: any
    price: number | string
  } = {
    className: '',
    currency: 'CRC',
    exchange: 1,
    skeletonClassName: '',
    price: 0,
  }
) => {
  if (!exchange) {
    return <Skeleton className={cn(`h-4 w-12`, skeletonClassName)} />
  }

  const divisor = currency === 'CRC' ? 1 : Number(exchange)
  const value = Number(price) / divisor
  return formatCurrency(value, currency)
}
