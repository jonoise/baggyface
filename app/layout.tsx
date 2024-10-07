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

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  useProducts()
  return (
    <html lang='en'>
      <body className={inter.className + ' bg-background'}>
        <AppProviders>
          <div className='flex h-screen relative overflow-hidden'>
            <div className='hidden lg:block'>
              <Navbar />
            </div>

            <main className='styled-scroll relative flex-1 h-full overflow-y-auto '>
              <ContentTopbar />
              {children}
            </main>
            <div className='hidden xl:block'>
              <RecipesNavbar />
            </div>
          </div>
        </AppProviders>
        <Toaster />
      </body>
    </html>
  )
}
