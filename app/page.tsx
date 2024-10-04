import { PageContainer } from '@/components/shared/page-container'
import { socialMedia } from '@/lib/globals'
import { RiInstagramLine, RiTwitterLine } from '@remixicon/react'
import Link from 'next/link'

export default async function Home() {
  return (
    <PageContainer>
      <div className='w-full rounded-2xl md:px-20 py-10 space-y-10'>
        <section className='space-y-4'>
          <h1 className='text-3xl font-bold '>Bienvenidos a Salvia Virgen</h1>
          <p className=''>
            Taller gastronómico de cocina experimental millenial (osea,
            cocinamos lo que hay en la refri), donde podrás aprender a cocinar
            de manera sencilla y rápida. Somos ingenieros, no chefs, pero nos
            gusta comer bien.
          </p>
          <div className='flex text-2xl items-center space-x-4'>
            <Link
              href={socialMedia.instagram}
              target='_blank'
              rel='noopener noreferrer'
            >
              <RiInstagramLine />
            </Link>
            <Link
              href={socialMedia.twitter}
              target='_blank'
              rel='noopener noreferrer'
            >
              <RiTwitterLine />
            </Link>
          </div>
        </section>
        <section className='grid grid-cols-2 md:grid-cols-4 gap-5'>
          <div className='text-white relative flex items-center justify-center h-20 rounded-lg bg-gradient-to-tr from-indigo-800 to-pink-600'>
            {/* absolute center div */}
            <div className='absolute inset-0 flex items-center justify-center'>
              <p className='text-7xl opacity-20'>🍲</p>
            </div>
            <p className='relative font-light'>Recetas</p>
          </div>
          <div className='text-white relative flex items-center justify-center h-20 rounded-lg bg-gradient-to-tr from-indigo-700 to-emerald-600'>
            <div className='absolute inset-0 flex items-center justify-center'>
              <p className='text-6xl opacity-20'>🛒</p>
            </div>
            <p className='relative font-light'>Tienda</p>
          </div>
          <div className='text-white relative flex items-center justify-center h-20 rounded-lg bg-gradient-to-tr from-blue-500 to-yellow-600'>
            <div className='absolute inset-0 flex items-center justify-center'>
              <p className='text-6xl opacity-20'>🧮</p>
            </div>
            <p className='relative font-light'>Calculadora</p>
          </div>
          <Link
            href={`/chef`}
            className='text-white relative flex items-center justify-center h-20 rounded-lg bg-gradient-to-tl from-violet-600 to-rose-700'
          >
            <div className='absolute inset-0 flex items-center justify-center'>
              <p className='text-6xl opacity-20'>🧑‍🍳</p>
            </div>
            <p className='relative font-light'>Chef AI</p>
          </Link>
        </section>
      </div>
    </PageContainer>
  )
}
