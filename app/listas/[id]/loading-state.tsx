import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export const LoadingState = () => {
  return (
    <div className='grid grid-cols-2 gap-4'>
      <Skeleton className='col-span-2 h-40' />
      <Skeleton className='col-span-2 h-40' />
      <Skeleton className='h-40' />
      <Skeleton className='h-40' />
      <Skeleton className='col-span-2 h-40' />
    </div>
  )
}
