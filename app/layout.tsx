'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import './fonts.css'
import { Navbar } from './navbar'
import { RecipesNavbar } from './recipes-navbar'
import { ContentTopbar } from './content-topbar'
import { AppProviders } from '@/components/shared/providers'
import { Toaster } from 'sonner'
import { useProducts } from '@/lib/hooks/use-products'
import { ModalsProvider } from './modals'
import { useExchangeRate } from '@/lib/hooks/use-currency-value'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  useProducts()
  useExchangeRate()
  return (
    <html lang='en'>
      <head>
        <title>Baggyface</title>
      </head>
      <body className={inter.className + ' bg-background'}>
        <AppProviders>
          <div className='flex md:h-screen overflow-hidden'>
            <div className='hidden lg:block'>
              <Navbar />
            </div>

            <main className='flex-1 flex flex-col overflow-hidden'>
              <ContentTopbar />
              <div className='flex-1 overflow-y-auto'>{children}</div>
            </main>

            <div className='hidden xl:block'>
              <RecipesNavbar />
            </div>
          </div>
        </AppProviders>
        <Toaster />
        <ModalsProvider />
      </body>
    </html>
  )
}
