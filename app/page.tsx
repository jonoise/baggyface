'use client'

import { NewListDialog } from '@/components/dialogs/new-list'
import AveragePriceByBrand from '@/components/graphs/average-price-by-brand'
import { BrandsWithHighMarketShare } from '@/components/graphs/brands-with-high-market-share'
import MainGraphs from '@/components/graphs/main-graphs'
import { PriceDistribution } from '@/components/graphs/price-distribution'
import { PriceRangeDistribution } from '@/components/graphs/price-range-distribution'
import { NewProductsAnimatedList } from '@/components/shared/new-products-animated-list'
import { PageContainer } from '@/components/shared/page-container'
import { useProducts } from '@/components/shared/products-provider'

export default function Home() {
  const { products } = useProducts()

  return (
    <>
      <PageContainer>
        <div className='w-full rounded-2xl py-10 space-y-10'>
          <section className='space-y-4'>
            <h1 className='text-3xl font-bold '>Bienvenidos a Baggyface</h1>
            <p className='max-w-2xl'>
              Baggyface te permite obtener información sobre los productos de
              venta en las cadenas de supermercados más populares de Costa Rica
              y hacer listas de compra. Sirve para budgetear y planificar tus
              compras en el súper.
            </p>
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
        <div className='space-y-8'>
          <h3>Resultados basados en {products.length} productos</h3>
          <div className='flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8'>
            <PriceRangeDistribution />
            <BrandsWithHighMarketShare />
          </div>
          <AveragePriceByBrand />
        </div>
        <div className='grid grid-cols-2 gap-8 mt-8'>
          <PriceDistribution />
          <NewProductsAnimatedList />
        </div>
      </PageContainer>
    </>
  )
}
