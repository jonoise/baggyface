'use client'
import { time } from '@/lib/time'
import React from 'react'

export const RecipesNavbar = () => {
  // get weekday number, monday should be 1
  const weekday = time.getWeekDay()

  return (
    <div className='w-60 2xl:w-80 xl:h-screen xl:border-l xl:border-border border-gray-700 overflow-y-auto'>
      <div className='flex items-center justify-center h-full relative'>
        <img
          src={`/days/${weekday}.png`}
          className='object-cover w-full h-full'
          alt=''
        />
      </div>
      <div className='space-y-4'></div>
    </div>
  )
}
