'use client'

import { NewListDialog } from '@/components/dialogs/new-list'
import { PageContainer } from '@/components/shared/page-container'
import SearchProducts from '@/components/shared/search-products'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Terminal } from 'lucide-react'
import React from 'react'

const BuscarPage = () => {
  return (
    <PageContainer>
      <div className=''>
        <div className='sm:flex sm:items-center'>
          <div className='sm:flex-auto'>
            <h1 className='text-base font-semibold leading-6'>
              Buscar Productos
            </h1>
            <p className='mt-2 text-sm'>
              Busca productos, filtra por categoría y etiquetas, y crea listas
              de compras a partir de tus búsquedas.
            </p>
          </div>
        </div>
        <Alert className='max-w-3xl mt-10'>
          <Terminal className='h-4 w-4' />
          <AlertTitle>Los precios pueden variar</AlertTitle>
          <AlertDescription>
            Es posible que los precios no reflejen el precio actual en el
            supermercado. Tratamos de actualizar los precios de forma periódica.
          </AlertDescription>
        </Alert>
        <SearchProducts />
      </div>
    </PageContainer>
  )
}

export default BuscarPage
