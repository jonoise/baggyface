'use client'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { MenuIcon, PanelRightCloseIcon } from 'lucide-react'
import React from 'react'
import { Navbar } from './navbar'
import { RecipesNavbar } from './recipes-navbar'

export const NavbarSheet = () => {
  const [open, setOpen] = React.useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className='lg:hidden' onClick={() => setOpen(!open)}>
        <MenuIcon size={20} strokeWidth={1.5} />
      </SheetTrigger>
      <SheetContent hideClose className='p-0'>
        <Navbar onLinkClick={() => setOpen(!open)} />
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
