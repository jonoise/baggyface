import { cn } from '@/lib/utils'
import { Link1Icon } from '@radix-ui/react-icons'
import {
  RiExternalLinkFill,
  RiExternalLinkLine,
  RiLink,
} from '@remixicon/react'
import { Link2Icon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const StockbasePromo = ({
  containerClass,
}: {
  containerClass?: string
}) => {
  return (
    <div className='mt-10'>
      <Link
        target='_blank'
        href={`https://stockbase.cr?ref=baggyface.com`}
        className='space-x-1 flex items-center text-xs mb-2'
      >
        <p>Ads</p>
        <RiExternalLinkLine className='w-4 h-4' />
      </Link>
      <div
        className={cn(
          ' border-2 border-dashed border-slate-600 rounded bg-zinc-900 text-white',
          containerClass
        )}
      >
        <Link target='_blank' href={`https://stockbase.cr?ref=baggyface.com`}>
          <Image
            src='/stockbase-promo.png'
            width={700}
            height={78}
            alt='Stockbase Logo'
          />
        </Link>
        <div className='p-4 text-xs font-light'>
          <p>
            Probá la simpleza que{' '}
            <Link
              className='text-blue-500 font-bold hover:underline'
              target='_blank'
              href={`https://stockbase.cr?ref=fetchcr.com`}
            >
              Stockbase
            </Link>{' '}
            le aporta a tu negocio.{' '}
            <Link
              className='text-blue-500 font-bold hover:underline'
              target='_blank'
              href={`https://stockbase.cr/login?ref=fetchcr.com`}
            >
              Agendá tu DEMO gratis
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
