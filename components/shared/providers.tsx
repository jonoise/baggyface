'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { SWRConfig } from 'swr'

export function AppProviders({ children }: React.PropsWithChildren) {
  return (
    <NextThemesProvider
      attribute='class'
      defaultTheme='dark'
      disableTransitionOnChange
    >
      <SWRConfig
        value={{ fetcher: async (url) => fetch(url).then((res) => res.json()) }}
      >
        {children}
      </SWRConfig>
    </NextThemesProvider>
  )
}
