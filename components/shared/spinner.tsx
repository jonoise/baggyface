import { cn } from '@/lib/utils'
import React from 'react'

export const Spinner = (props: {
  className?: string
  style?: React.CSSProperties
  size?: number
}) => {
  return (
    <div aria-label='Loading...' role='status'>
      <svg
        width={props.size || '24'}
        height={props.size || '24'}
        fill='none'
        stroke='currentColor'
        stroke-width='1.5'
        viewBox='0 0 24 24'
        stroke-linecap='round'
        stroke-linejoin='round'
        xmlns='http://www.w3.org/2000/svg'
        className={cn('animate-spin w-6 h-6 stroke-slate-500', props.className)}
      >
        <path d='M12 3v3m6.366-.366-2.12 2.12M21 12h-3m.366 6.366-2.12-2.12M12 21v-3m-6.366.366 2.12-2.12M3 12h3m-.366-6.366 2.12 2.12'></path>
      </svg>
    </div>
  )
}
