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
import { MobileDock } from '@/components/shared/dock'

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

            <main className='flex-1 flex h-[90vh] md:h-auto flex-col overflow-hidden'>
              <ContentTopbar />
              <div className='flex-1 overflow-y-auto pb-20 md:pb-0'>
                {children}
              </div>
            </main>

            <div className='hidden xl:block'>
              <RecipesNavbar />
            </div>
          </div>
          <MobileDock />
        </AppProviders>
        <Toaster />
        <ModalsProvider />
      </body>
    </html>
  )
}
