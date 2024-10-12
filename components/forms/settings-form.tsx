import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { useTranslation } from '../shared/i18n-provider'

export const SettingsForm = ({
  title,
  description,
  helpText,
  inputAttrs,
  handleSubmit,
}: {
  title: string
  description: string
  helpText: string
  inputAttrs: {
    name: string
    type: string
    defaultValue: string
    placeholder?: string
    maxLength?: number
    pattern?: string
  }
  handleSubmit: any
}) => {
  const form = useForm()
  const t = useTranslation()
  useEffect(() => {
    const formObj = { [inputAttrs.name]: inputAttrs.defaultValue }
    form.reset(formObj)
  }, [inputAttrs])
  return (
    <form
      onSubmit={form.handleSubmit((data) => handleSubmit(data))}
      className='rounded-lg border bg-accent text-accent-foreground border-border dark:bg-zinc-900'
    >
      <div className='relative flex flex-col space-y-4 p-5 sm:p-5'>
        <h2 className='font-cal text-xl dark:text-white'>{title}</h2>
        <p className='text-sm'>{description}</p>
        {inputAttrs.name === 'currency' ? (
          <div className='flex max-w-sm items-center overflow-hidden rounded-lg'>
            <select
              {...form.register(inputAttrs.name)}
              name='currency'
              defaultValue={inputAttrs.defaultValue}
              className='w-full rounded-none border-none bg-white px-2 py-2 text-sm font-medium text-stone-700 focus:outline-none focus:ring-black dark:bg-black dark:text-stone-200 dark:focus:ring-white'
            >
              <option value='CRC'>Colones</option>
              <option value='USD'>Dollars</option>
            </select>
          </div>
        ) : inputAttrs.name === 'language' ? (
          <div className='flex max-w-sm items-center overflow-hidden rounded-lg'>
            <select
              {...form.register(inputAttrs.name)}
              name='language'
              defaultValue={inputAttrs.defaultValue}
              className='w-full rounded-none border-none bg-white px-2 py-2 text-sm font-medium text-stone-700 focus:outline-none focus:ring-black dark:bg-black dark:text-stone-200 dark:focus:ring-white'
            >
              <option value='es'>Español</option>
              <option value='en'>English</option>
            </select>
          </div>
        ) : (
          <input
            {...inputAttrs}
            required
            className='w-full max-w-md rounded-md border border-border text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700'
          />
        )}
      </div>

      <div className='flex bg-secondary text-secondary-foreground dark:bg-zinc-800 flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-border p-3 sm:flex-row sm:justify-between sm:space-y-0 sm:px-5 dark:border-stone-700'>
        <p className='text-sm '>{helpText}</p>
        <Button>{t.common.save}</Button>
      </div>
    </form>
  )
}
