'use client'

import MainGraphs from '@/components/graphs/main-graphs'
import { useProducts } from '@/components/shared/products-provider'

export default function Home() {
  const { products } = useProducts()

  return (
    <>
      <div className='w-full rounded-2xl md:px-20 py-10 space-y-10'>
        <section className='space-y-4'>
          <h1 className='text-3xl font-bold '>Bienvenidos a Baggyface</h1>
          <p className=''>
            Baggyface te permite obtener información sobre los productos de
            venta en las cadenas de supermercados más populares de Costa Rica y
            hacer listas de compra. Sirve para budgetear y planificar tus
            compras en el súper.
          </p>
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
      <MainGraphs p={products} />
    </>
  )
}
