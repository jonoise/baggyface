import Breadcrumb from '@/components/shared/breadcrumbs'
import React from 'react'
import { NavbarSheet } from './navbar-sheets'
import { ToggleTheme } from '@/components/shared/toggle-theme'
import Link from 'next/link'

export const ContentTopbar = () => {
  return (
    <nav className='w-full border-b border-gray-700 flex items-center justify-between sticky top-0 h-10 backdrop-blur-md px-4 lg:px-8 z-50'>
      <Link href={'/'} className='flex items-center space-x-2 lg:hidden'>
        <img src={`/favicon.ico`} className='h-6 w-6 rounded-full' />
        <p className='text-lg lg:hidden font-boska font-black'>baggyface</p>
      </Link>
      <Breadcrumb />
      <div className='flex items-center space-x-4'>
        <ToggleTheme />
        <NavbarSheet />
      </div>
    </nav>
  )
}
