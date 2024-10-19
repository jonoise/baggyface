'use client'
import { SettingsForm } from '@/components/forms/settings-form'
import { useLocale, useTranslation } from '@/components/shared/i18n-provider'
import { PageContainer } from '@/components/shared/page-container'
import { useCurrencyStore } from '@/lib/stores/currency-store'
import { stripLocale } from '@/lib/strings'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const ConfigPage = () => {
  const { currency, setCurrency } = useCurrencyStore((s) => s)
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()

  const [defaults, setDefaults] = useState({
    currency,
    language: locale,
  })

  const t = useTranslation()
  useEffect(() => {
    setDefaults((prev) => ({ ...prev, currency, language: locale }))
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
          defaultValue: defaults.currency,
          type: 'select',
        }}
        handleSubmit={(data: any) => {
          setCurrency(data.currency)
          toast.success(`${t.common.currency} ${t.notifiacations.was_updated}`)
        }}
      />
      <SettingsForm
        helpText={t.settings_page.language_helpText}
        title={t.settings_page.language}
        description={t.settings_page.language_description}
        inputAttrs={{
          name: 'language',
          defaultValue: defaults.language,
          type: 'select',
        }}
        handleSubmit={(data: any) => {
          const path = stripLocale(pathname)
          router.replace(`/${data.language}/${path}`)
          toast.success(
            `${t.settings_page.language} ${t.notifiacations.was_updated}`
          )
        }}
      />
    </PageContainer>
  )
}

export default ConfigPage
