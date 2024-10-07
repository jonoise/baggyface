'use client'
import { SettingsForm } from '@/components/forms/settings-form'
import { PageContainer } from '@/components/shared/page-container'
import { useCurrencyStore } from '@/lib/stores/currency-store'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const ConfigPage = () => {
  const { currency, setCurrency } = useCurrencyStore((s) => s)
  const [defaultCurrency, setDefaultCurrency] = useState(currency)

  useEffect(() => {
    console.log({ currency })
    setDefaultCurrency(currency)
  }, [currency])

  return (
    <PageContainer className='space-y-10'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-base font-semibold leading-6'>Configuración</h1>
          <p className='mt-2 text-sm'>
            Aquí podrás configurar tus preferencias y opciones.
          </p>
        </div>
      </div>
      <SettingsForm
        helpText='Selecciona la moneda en la que deseas visualizar tus precios'
        title='Moneda'
        description='Selecciona tu moneda'
        inputAttrs={{
          name: 'currency',
          defaultValue: defaultCurrency,
          type: 'select',
        }}
        handleSubmit={(data: any) => {
          setCurrency(data.currency)
          toast.success('Se cambió la moneda')
        }}
      />
    </PageContainer>
  )
}

export default ConfigPage
