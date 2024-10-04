import { SearchIcon } from 'lucide-react'
import React from 'react'

export const SearchRecipes = () => {
  return (
    <div className='border space-x-2 px-2 h-6 rounded-full hover:bg-accent flex items-center justify-center cursor-pointer'>
      <div className='flex items-center space-x-1'>
        <SearchIcon size={14} strokeWidth={1.5} />
        <span className='text-xs'>Buscar</span>
      </div>
      <span className='text-[9px] bg-zinc-200 rounded-md px-1 py-0.5 border-'>
        CMD + K
      </span>
    </div>
  )
}
