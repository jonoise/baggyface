'use client'

import { NewListDialog } from '@/components/dialogs/new-list'
import { PageContainer } from '@/components/shared/page-container'
import React from 'react'

const BuscarPage = () => {
  return (
    <PageContainer>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-base font-semibold leading-6'>
            Buscar Productos
          </h1>
          <p className='mt-2 text-sm'>
            Esta es una lista recopilatoria estática. No hay actualizaciones
            constantes.
          </p>
        </div>
        <div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
          <NewListDialog />
        </div>
      </div>
    </PageContainer>
  )
}

export default BuscarPage
