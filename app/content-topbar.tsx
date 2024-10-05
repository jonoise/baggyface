import Breadcrumb from '@/components/shared/breadcrumbs'
import { SearchIcon } from 'lucide-react'
import React from 'react'
import { NavbarSheet, RecipesNavbarSheet } from './navbar-sheets'
import { ToggleTheme } from '@/components/shared/toggle-theme'
import { SearchRecipes } from './search-recipes'

export const ContentTopbar = () => {
  return (
    <nav className='w-full flex items-center justify-between sticky top-0 h-10 backdrop-blur-md px-8 z-50'>
      <div className='flex items-center space-x-2 xl:hidden'>
        <div className='lg:hidden'>
          <NavbarSheet />
        </div>
        <div className='hidden lg:block xl:hidden'>
          <RecipesNavbarSheet />
        </div>
        <p className='text-sm lg:hidden'>Canasta Básica CR</p>
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
