'use client'
import React from 'react'

export const RecipesNavbar = () => {
  // get weekday number, monday should be 1
  const weekday = new Date().getDay()
  const weekdayNumber = weekday === 0 ? 7 : weekday

  return (
    <div className='w-60 2xl:w-80 xl:h-screen xl:border-l xl:border-border border-gray-700 overflow-y-auto'>
      <div className='bg-red-500 flex items-center justify-center h-full relative'>
        <img
          src={`/days/${weekdayNumber}.png`}
          className='object-cover w-full h-full'
          alt=''
        />
      </div>
      <div className='space-y-4'></div>
    </div>
  )
}
