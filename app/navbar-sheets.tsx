import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { PanelRightCloseIcon } from 'lucide-react'
import React from 'react'
import { Navbar } from './navbar'
import { RecipesNavbar } from './recipes-navbar'

export const NavbarSheet = () => {
  return (
    <Sheet>
      <SheetTrigger className='flex items-center'>
        <PanelRightCloseIcon size={16} strokeWidth={1.5} />
      </SheetTrigger>
      <SheetContent>
        <Navbar />
      </SheetContent>
    </Sheet>
  )
}
export const RecipesNavbarSheet = () => {
  return (
    <Sheet>
      <SheetTrigger className='flex items-center'>
        <PanelRightCloseIcon size={16} strokeWidth={1.5} />
      </SheetTrigger>
      <SheetContent>
        <RecipesNavbar />
      </SheetContent>
    </Sheet>
  )
}
