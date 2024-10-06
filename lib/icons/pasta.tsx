import React from 'react'
import { cn } from '../utils'

export const PastaIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      role='img'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      className={cn(className)}
    >
      <path
        className='fill-amber-500'
        d='M22 3L10 4.41V6h12v1H10v5h12c0 1.81-.57 3.46-1.68 4.95s-2.55 2.58-4.32 3.3V22H8v-1.75c-1.76-.72-3.21-1.82-4.32-3.3S2 13.81 2 12h3V4l17-2zM6 4.88V6h1V4.78zM6 7v5h1V7zm3 5V7H8v5zm0-6V4.55l-1 .09V6z'
      />
    </svg>
  )
}
