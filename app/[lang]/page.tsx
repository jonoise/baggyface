'use client'

import { NewListDialog } from '@/components/dialogs/new-list'
import AveragePriceByBrand from '@/components/graphs/average-price-by-brand'
import { BrandsWithHighMarketShare } from '@/components/graphs/brands-with-high-market-share'
import { PriceDistribution } from '@/components/graphs/price-distribution'
import { PriceRangeDistribution } from '@/components/graphs/price-range-distribution'
import { NewProductsAnimatedList } from '@/components/shared/new-products-animated-list'
import { PageContainer } from '@/components/shared/page-container'
import { useProducts } from '@/lib/hooks/use-products'
import { LoadingState } from './listas/[id]/loading-state'
import { useTranslation } from '@/components/shared/i18n-provider'

export default function Home() {
  const { products } = useProducts()
  const t = useTranslation()

  return (
    <>
      <PageContainer>
        <div className='w-full rounded-2xl py-4 space-y-10'>
          <section className='space-y-4'>
            <h1 className='text-3xl font-bold '>{t.home_page.title}</h1>
            <p className='max-w-2xl'>{t.home_page.description}</p>
            <NewListDialog />
          </section>

          <section className='grid grid-cols-2 md:grid-cols-4 gap-5'>
            {/* <div className='text-white relative flex items-center justify-center h-20 rounded-lg bg-gradient-to-tr from-indigo-800 to-pink-600'>
            <div className='absolute inset-0 flex items-center justify-center'>
              <p className='text-7xl opacity-20'>🍲</p>
            </div>
            <p className='relative font-light'>Recetas</p>
          </div>
          <div className='text-white relative flex items-center justify-center h-20 rounded-lg bg-gradient-to-tr from-emerald-700 to-emerald-600'>
            <div className='absolute inset-0 flex items-center justify-center'>
              <p className='text-6xl opacity-20'>🛒</p>
            </div>
            <p className='relative font-light'>Tienda</p>
          </div> */}
            {/* <div className='text-white relative flex items-center justify-center h-20 rounded-lg bg-gradient-to-tr from-emerald-500 to-yellow-600'>
            <div className='absolute inset-0 flex items-center justify-center'>
              <p className='text-6xl opacity-20'>🧮</p>
            </div>
            <p className='relative font-light'>Calculadora</p>
          </div> */}
            {/* <Link
            href={`/chef`}
            className='text-white relative flex items-center justify-center h-20 rounded-lg bg-gradient-to-tl from-emerald-600 to-violet-700'
          >
            <div className='absolute inset-0 flex items-center justify-center'>
              <p className='text-6xl opacity-20'>🧑‍🍳</p>
            </div>
            <p className='relative font-light'>Chef AI</p>
          </Link> */}
          </section>
        </div>
        {!products ? (
          <LoadingState />
        ) : (
          <>
            <div className='space-y-8'>
              <h3>
                {t.home_page.results_helpText} {products?.length}{' '}
                {t.common.products.toLowerCase()}
              </h3>
              <div className='flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8'>
                <PriceRangeDistribution />
                <BrandsWithHighMarketShare />
              </div>
              <AveragePriceByBrand />
            </div>
            <div className='grid md:grid-cols-2 gap-8 mt-8'>
              <PriceDistribution />
              <NewProductsAnimatedList />
            </div>
          </>
        )}
      </PageContainer>
    </>
  )
}
