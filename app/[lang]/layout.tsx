import { DictionaryProvider } from '@/components/shared/i18n-provider'
import { AppProviders } from '@/components/shared/providers'
import { Locale } from '@/i18n-config'
import { getDictionary } from '@/lib/dictionaries/get'
import { Navbar } from './navbar'
import { ContentTopbar } from './content-topbar'
import { RecipesNavbar } from './recipes-navbar'
import { MobileDock } from '@/components/shared/dock'
import { Toaster } from '@/components/ui/toaster'
import { ModalsProvider } from './modals'
import { Analytics } from '@vercel/analytics/react'

const LangLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) => {
  const dict = await getDictionary(params.lang as Locale)

  return (
    <DictionaryProvider dictionary={dict}>
      {' '}
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
        <Toaster />
        <ModalsProvider />
        <Analytics />
      </AppProviders>
    </DictionaryProvider>
  )
}

export default LangLayout
