'use client'
import './fonts.css'
import './globals.css'
import { Inter } from 'next/font/google'
import { useProducts } from '@/lib/hooks/use-products'
import { useExchangeRate } from '@/lib/hooks/use-currency-value'
import { Toaster } from '@/components/ui/sonner'

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
        {process.env.NODE_ENV === 'production' && (
          <script
            async
            src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9780815785619757'
            crossOrigin='anonymous'
          ></script>
        )}
      </head>
      <body className={inter.className + ' bg-background'}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
