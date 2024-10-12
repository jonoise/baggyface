'use client'

import { PageContainer } from '@/components/shared/page-container'
import SearchProducts from '@/components/shared/search-products'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import React from 'react'
import { RiExchangeFill } from '@remixicon/react'
import { useTranslation } from '@/components/shared/i18n-provider'

const BuscarPage = () => {
  const t = useTranslation()
  return (
    <PageContainer className='space-y-10 mt-4'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-base font-semibold leading-6'>
            {t.search.title}
          </h1>
          <p className='mt-2 text-sm'>{t.search.description}</p>
        </div>
      </div>
      <Alert className='max-w-3xl mt-10 '>
        <RiExchangeFill className='h-4 w-4' />
        <AlertTitle>{t.search.disclaimer_title}</AlertTitle>
        <AlertDescription>{t.search.disclaimer_description}</AlertDescription>
      </Alert>
      <SearchProducts />
    </PageContainer>
  )
}

export default BuscarPage
