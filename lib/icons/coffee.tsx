import React from 'react'
import { cn } from '../utils'

export const CoffeeIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={cn(className)}
      viewBox='0 0 16 16'
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
    >
      <path className='fill-amber-700' d='M14 13l-4 1h-6l-4-1v-1h14z'></path>
      <path
        className='fill-amber-700'
        d='M14.7 3h-1.7v-1h-12v5c0 1.5 0.8 2.8 2 3.4v0.6h8v-0.6c0.9-0.5 1.6-1.4 1.9-2.4 0 0 0.1 0 0.1 0 2.3 0 2.9-2 3-3.5 0.1-0.8-0.5-1.5-1.3-1.5zM13 7v-3h1.7c0.1 0 0.2 0.1 0.2 0.1s0.1 0.1 0.1 0.3c-0.2 2.6-1.6 2.6-2 2.6z'
      ></path>
    </svg>
  )
}
