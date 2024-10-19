'use client'

import { En } from '@/lib/dictionaries/en'
import React, { ReactNode, useMemo } from 'react'

import { createContext } from 'react'

type Dictionary = En
type LocaleContext = string

const DictionaryContext = createContext<Dictionary>({} as Dictionary)
const LocaleContext = createContext<LocaleContext>({} as LocaleContext)

export const DictionaryProvider = ({
  children,
  dictionary,
}: {
  children: ReactNode
  dictionary: any
}): JSX.Element => {
  return (
    <DictionaryContext.Provider value={useMemo(() => dictionary, [dictionary])}>
      {children}
    </DictionaryContext.Provider>
  )
}

export const useTranslation = (): Dictionary => {
  const dictionary = React.useContext(DictionaryContext)
  return dictionary
}

export const LocaleProvider = ({
  children,
  locale,
}: {
  children: ReactNode
  locale: string
}): JSX.Element => {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  )
}

export const useLocale = (): LocaleContext => {
  const ctx = React.useContext(LocaleContext)
  return ctx
}
