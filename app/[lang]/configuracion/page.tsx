'use client'
import { SettingsForm } from '@/components/forms/settings-form'
import { useTranslation } from '@/components/shared/i18n-provider'
import { PageContainer } from '@/components/shared/page-container'
import { useCurrencyStore } from '@/lib/stores/currency-store'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const ConfigPage = () => {
  const { currency, setCurrency } = useCurrencyStore((s) => s)
  const [defaultCurrency, setDefaultCurrency] = useState(currency)
  const t = useTranslation()
  useEffect(() => {
    console.log({ currency })
    setDefaultCurrency(currency)
  }, [currency])

  return (
    <PageContainer className='space-y-10 mt-4'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-base font-semibold leading-6'>
            {t.settings_page.title}
          </h1>
          <p className='mt-2 text-sm'>{t.settings_page.description}</p>
        </div>
      </div>
      <SettingsForm
        helpText={t.settings_page.currency_helpText}
        title={t.settings_page.currency}
        description={t.settings_page.currency_description}
        inputAttrs={{
          name: 'currency',
          defaultValue: defaultCurrency,
          type: 'select',
        }}
        handleSubmit={(data: any) => {
          setCurrency(data.currency)
          toast.success(`${t.common.currency} ${t.notifiacations.was_updated}`)
        }}
      />
    </PageContainer>
  )
}

export default ConfigPage
