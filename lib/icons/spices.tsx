import React from 'react'
import { cn } from '../utils'

export const SpicesIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      version='1.1'
      id='Icons'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      viewBox='0 0 32 32'
      xmlSpace='preserve'
      className={className}
    >
      <path
        className='fill-lime-400'
        d='M12,26H6c-1.1,0-2-0.9-2-2v-9c0-1.1,0.9-2,2-2h6c1.1,0,2,0.9,2,2v9C14,25.1,13.1,26,12,26z'
      />
      <path
        className='fill-lime-400'
        d='M9,6C6.9,6,5,6.9,4.2,8.2C3.6,9,4.4,10,5.7,10h6.7c1.2,0,2-1,1.5-1.8C13,6.9,11.1,6,9,6z'
      />
      <path
        className='fill-lime-400'
        d='M26,26h-6c-1.1,0-2-0.9-2-2v-9c0-1.1,0.9-2,2-2h6c1.1,0,2,0.9,2,2v9C28,25.1,27.1,26,26,26z'
      />
      <path
        className='fill-lime-400'
        d='M23,6c-2.1,0-4,0.9-4.8,2.2C17.6,9,18.4,10,19.7,10h6.7c1.2,0,2-1,1.5-1.8C27,6.9,25.1,6,23,6z'
      />
    </svg>
  )
}
