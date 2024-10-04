import Breadcrumb from '@/components/shared/breadcrumbs'
import { SearchIcon } from 'lucide-react'
import React from 'react'
import { NavbarSheet, RecipesNavbarSheet } from './navbar-sheets'
import { ToggleTheme } from '@/components/shared/toggle-theme'
import { SearchRecipes } from './search-recipes'

export const ContentTopbar = () => {
  return (
    <nav className='w-full flex items-center justify-between bg-stone-200 dark:bg-stone-900 sticky top-0 h-10  bg-opacity-20 backdrop-blur-md px-8'>
      <div className='flex items-center space-x-2 xl:hidden'>
        <div className='lg:hidden'>
          <NavbarSheet />
        </div>
        <div className='hidden lg:block xl:hidden'>
          <RecipesNavbarSheet />
        </div>
        <p className='font-boska font-black lg:hidden'>salvia virgen</p>
      </div>
      <Breadcrumb />
      <div className='flex items-center space-x-2'>
        <div></div>
        <SearchRecipes />
        <ToggleTheme />
      </div>
    </nav>
  )
}
