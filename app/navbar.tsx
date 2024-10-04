import React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  DotsVerticalIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons'

import {
  HomeIcon,
  FileText,
  Users,
  Megaphone,
  Star,
  StoreIcon,
} from 'lucide-react'
import Link from 'next/link'

export const Navbar = () => {
  return (
    <aside className='lg:w-60 sticky top-0 pt-2 lg:h-screen lg:border-r border-gray-700 flex-shrink-0'>
      <div className='flex items-center justify-between mb-2 px-4'>
        <h1 className='text-2xl font-black font-boska'>salvia virgen</h1>
        <Button variant={'ghost'} size={'icon'}>
          <DotsVerticalIcon />
        </Button>
      </div>
      <nav className='space-y-0.5 px-4'>
        {[
          {
            icon: <HomeIcon size={16} strokeWidth={1.5} />,
            label: 'Inicio',
            selected: true,
            href: '/',
          },
          {
            icon: <FileText size={16} strokeWidth={1.5} />,
            label: 'Recetas',
            href: '/recetas',
          },
          {
            icon: <StoreIcon size={16} strokeWidth={1.5} />,
            label: 'Tienda',
            href: '/tienda',
          },
          {
            icon: <Users size={16} strokeWidth={1.5} />,
            label: 'Sobre Nosotros',
            href: '/sobre-nosotros',
          },
          {
            icon: <Megaphone size={16} strokeWidth={1.5} />,
            label: 'Comunidad',
            href: '/comunidad',
          },
          {
            icon: <Star size={16} strokeWidth={1.5} />,
            label: 'Publicidad',
            href: '/publicidad',
          },
        ].map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={cn(
              'flex text-sm items-center space-x-2 px-2 py-1.5 rounded-md hover:bg-accent',
              {
                'bg-accent': item.selected,
              }
            )}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      {/* <div className='mt-8'>
  <h2 className='text-sm font-semibold mb-2'>Tags</h2>
  <div className='space-y-2'>
    {['Newsletter', 'Deep Dives', 'Notes', 'News', 'Coll'].map(
      (tag, index) => (
        <a
          key={index}
          href='#'
          className='flex text-sm items-center space-x-2 px-2  rounded-md hover:bg-gray-800'
        >
          <span className='w-2 h-2 rounded-full bg-blue-400'></span>
          <span>{tag}</span>
        </a>
      )
    )}
  </div>
</div> */}
      <div className='mt-8 px-4'>
        <h2 className='text-sm font-semibold mb-2'>Redes Sociales</h2>
        <div className='space-y-2'>
          {[
            { icon: <InstagramLogoIcon />, label: 'Instagram' },
            { icon: <TwitterLogoIcon />, label: 'Twitter' },
          ].map((item, index) => (
            <a
              key={index}
              href='#'
              className='flex text-sm items-center space-x-2 px-2 py-1.5 rounded-md hover:bg-accent'
            >
              <div className='flex items-center space-x-2'>
                {item.icon}
                <span>{item.label}</span>
              </div>
              <svg
                className='w-4 h-4'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path d='M7 17L17 7M17 7H7M17 7V17' />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </aside>
  )
}
