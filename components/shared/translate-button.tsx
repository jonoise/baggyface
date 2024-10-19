'use client'

import React, { FC } from 'react'

import { usePathname, useRouter } from 'next/navigation'
import { RiCheckboxCircleFill, RiTranslate2 } from '@remixicon/react'
import { useLocale } from './i18n-provider'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { toast } from 'sonner'

export const LocaleSettings: FC = (props) => {
  const pathname = usePathname()
  const router = useRouter()
  const locale = useLocale()
  const changeLocale = (locale: string, pathname: string) => {
    const stripPath = pathname.split('/').slice(2).join('/')
    router.replace(`/${locale}/${stripPath}`)
  }
  return (
    <Popover>
      <PopoverTrigger>
        <RiTranslate2 className='w-5' />
      </PopoverTrigger>

      <PopoverContent
        side='bottom'
        align='end'
        className='w-full max-w-xs border-border'
      >
        <div className='space-y-4 text-xs'>
          <p>{locale === 'es' ? 'Cambiar idioma' : 'Website language'}</p>
          <div
            onClick={async () => {
              changeLocale('es', pathname)
              toast.success('Se cambió el idioma a español')
            }}
            className='flex items-center justify-between w-full cursor-pointer'
          >
            <div className='flex items-center space-x-2'>
              <div className='w-3 h-3'>
                <CRFlag />
              </div>
              <p>Español</p>
            </div>
            {locale === 'es' && (
              <span className='text-primary opacity-30'>
                <RiCheckboxCircleFill className='w-4' />
              </span>
            )}
          </div>
          <div
            onClick={async () => {
              changeLocale('en', pathname)
              toast.success('Language changed successfully')
            }}
            className='flex items-center justify-between w-full cursor-pointer'
          >
            <div className='flex items-center space-x-2'>
              <div className='w-3 h-3'>
                <USAFlag />
              </div>
              <p>English</p>
            </div>
            {locale === 'en' && (
              <span className='text-primary opacity-30'>
                <RiCheckboxCircleFill className='w-4' />
              </span>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

const USAFlag = () => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
    <mask id='a'>
      <circle cx='256' cy='256' r='256' fill='#fff' />
    </mask>
    <g mask='url(#a)'>
      <path
        fill='#eee'
        d='M256 0h256v64l-32 32 32 32v64l-32 32 32 32v64l-32 32 32 32v64l-256 32L0 448v-64l32-32-32-32v-64z'
      />
      <path
        fill='#d80027'
        d='M224 64h288v64H224Zm0 128h288v64H256ZM0 320h512v64H0Zm0 128h512v64H0Z'
      />
      <path fill='#0052b4' d='M0 0h256v256H0Z' />
      <path
        fill='#eee'
        d='m187 243 57-41h-70l57 41-22-67zm-81 0 57-41H93l57 41-22-67zm-81 0 57-41H12l57 41-22-67zm162-81 57-41h-70l57 41-22-67zm-81 0 57-41H93l57 41-22-67zm-81 0 57-41H12l57 41-22-67Zm162-82 57-41h-70l57 41-22-67Zm-81 0 57-41H93l57 41-22-67zm-81 0 57-41H12l57 41-22-67Z'
      />
    </g>
  </svg>
)

const CRFlag = () => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
    <mask id='a'>
      <circle cx='256' cy='256' r='256' fill='#fff' />
    </mask>
    <g mask='url(#a)'>
      <path
        fill='#0052b4'
        d='M0 0h512v89l-66.3 167.5L512 423v89H0v-89l69.7-167.3L0 89z'
      />
      <path
        fill='#eee'
        d='M0 89h512v78l-39.7 91.1L512 345v78H0v-78l36.3-85.6L0 167z'
      />
      <path fill='#d80027' d='M0 167h512v178H0z' />
    </g>
  </svg>
)
