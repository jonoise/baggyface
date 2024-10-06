import React from 'react'
import { cn } from '../utils'

export const DrinkIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox='0 0 36 36'
      className={cn(className)}
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      role='img'
    >
      <path
        className='fill-orange-500'
        d='M24,7h-1.723l0.51-1.275l5.66-2.83l-0.895-1.789l-6,3c-0.219,0.109-0.39,0.296-0.481,0.523L20.123,7
	H8C6.9,7,6.075,7.897,6.166,8.993l1.668,20.014C7.925,30.103,8.9,31,10,31h12c1.1,0,2.075-0.897,2.166-1.993l1.668-20.014
	C25.925,7.897,25.1,7,24,7z M23.826,9l-0.5,6h-4.249l2.4-6H23.826z M19.323,9l-2.4,6H8.674l-0.5-6H19.323z'
      />
    </svg>
  )
}
