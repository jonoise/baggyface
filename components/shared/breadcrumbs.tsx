'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { deslugify } from '@/lib/strings'
import { useLocale } from './i18n-provider'

const Breadcrumb = () => {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter((segment) => segment !== '')
  const locale = useLocale()

  return (
    <nav className='hidden lg:block' aria-label='Breadcrumb'>
      <ol className='flex items-center space-x-2 text-[9px] md:text-sm'>
        <li>
          <Link
            href={`/${locale}`}
            className='flex items-center space-x-1 hover:text-muted-foreground'
          >
            <Home className='w-4 h-4' />
            <span>{locale === 'es' ? 'Inicio' : 'Home'}</span>
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join('/')}`

          const isLast = index === pathSegments.length - 1

          const title = deslugify(segment)
          if (segment === 'en' || segment === 'es' || segment === 'en-US') {
            return null
          }

          return (
            <React.Fragment key={href}>
              <ChevronRight className='w-4 h-4 text-gray-400' />
              <li>
                {isLast ? (
                  <span className='underline'>{title}</span>
                ) : (
                  <Link href={href} className='hover:text-muted-foreground'>
                    {title}
                  </Link>
                )}
              </li>
            </React.Fragment>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumb
