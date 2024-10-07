'use client'

import React from 'react'
import { cn } from '@/lib/utils'

import { FileTextIcon, HomeIcon, SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GitHubLogoIcon } from '@radix-ui/react-icons'

export const Navbar = ({ onLinkClick }: { onLinkClick?: () => void }) => {
  const pathname = usePathname()
  const links = [
    {
      icon: <HomeIcon size={16} strokeWidth={1.5} />,
      label: 'Inicio',
      href: '/',
    },
    {
      icon: <SearchIcon size={16} strokeWidth={1.5} />,
      label: 'Buscar',
      href: '/buscar',
    },
    {
      icon: <FileTextIcon size={16} strokeWidth={1.5} />,
      label: 'Mis Listas',
      href: '/listas',
    },
  ]

  return (
    <aside className='lg:w-60 z-50 sticky top-0 pt-2 lg:h-screen lg:border-r border-gray-700 flex-shrink-0'>
      <div className='flex items-center justify-center mb-2 space-x-2 px-2'>
        <img src={`/favicon.ico`} className='h-8 w-8 rounded-full' alt='logo' />
        <h1 className='font-black text-4xl font-boska'>baggyface</h1>
      </div>
      <nav className='space-y-1 px-4 mt-4'>
        {links.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            onClick={onLinkClick}
            className={cn(
              'flex text-sm items-center space-x-2 px-2 py-1.5 rounded-md transition ease-in-out duration-300 hover:bg-accent',
              {
                'bg-accent': item.href === pathname,
              }
            )}
          >
            <>
              {item.icon}
              <span>{item.label}</span>
            </>
          </Link>
        ))}
      </nav>
      <div className='mt-8 px-4'>
        <h2 className='text-sm font-semibold mb-2'>Redes Sociales</h2>
        <div className='space-y-2'>
          {[
            {
              icon: <GitHubLogoIcon />,
              label: 'Github',
              href: 'https://github.com/jonoise/baggyface',
            },
            // { icon: <TwitterLogoIcon />, label: 'Twitter' },
          ].map((item, index) => (
            <a
              key={index}
              href={item.href}
              target='_blank'
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
