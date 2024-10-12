'use client'
import { SearchIcon } from 'lucide-react'
import React from 'react'

export const SearchRecipes = () => {
  return (
    <div className='border bg-background border-border space-x-2 px-2 py-1 rounded-full hover:bg-accent flex items-center justify-center cursor-pointer'>
      <div className='flex items-center space-x-1'>
        <SearchIcon size={14} strokeWidth={1.5} />
        <span className='text-xs'>Buscar</span>
      </div>
      <span className='text-[9px] dark:bg-primary bg-primary text-accent rounded-full px-1 py-0.5 border-border border'>
        CMD + K
      </span>
    </div>
  )
}
