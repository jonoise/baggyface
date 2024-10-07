'use client'
import { NewListDialog } from '@/components/dialogs/new-list'
import { PageContainer } from '@/components/shared/page-container'
import { Price } from '@/components/shared/price'
import { useExchangeRate } from '@/lib/hooks/use-currency-value'
import { renderPrice } from '@/lib/render-price'

import { useListsStore } from '@/lib/storage'
import { useCurrencyStore } from '@/lib/stores/currency-store'
import Link from 'next/link'
import React from 'react'

const ListasPage = () => {
  const { lists } = useListsStore()
  const { exchange } = useExchangeRate()
  const { currency } = useCurrencyStore((s) => s)

  return (
    <PageContainer>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-base font-semibold leading-6'>Mis Listas</h1>
          <p className='mt-2 text-sm'>
            Todas las listas se archivan en el navegador, así que no puedes
            acceder a ellas desde otro dispositivo.
          </p>
        </div>
        <div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
          <NewListDialog />
        </div>
      </div>
      <div className='-mx-4 mt-8 sm:-mx-0'>
        <table className='min-w-full divide-y divide-primary'>
          <thead>
            <tr>
              <th
                scope='col'
                className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-0'
              >
                Name
              </th>
              <th
                scope='col'
                className='hidden px-3 py-3.5 text-left text-sm font-semibold sm:table-cell'
              >
                Tags
              </th>
              <th
                scope='col'
                className='hidden px-3 py-3.5 text-left text-sm font-semibold lg:table-cell'
              >
                Productos
              </th>
              <th
                scope='col'
                className='px-3 py-3.5 text-left text-sm font-semibold'
              >
                Total
              </th>
              <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-0'>
                <span className='sr-only'>Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-primary'>
            {lists.map((list) => (
              <tr key={list.id}>
                <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-0'>
                  <Link className='w-full' href={`/listas/${list.id}`}>
                    {list.title || 'Sin título'}
                  </Link>
                </td>
                <td className='hidden whitespace-nowrap px-3 py-4 text-sm sm:table-cell'>
                  <Link className='w-full' href={`/listas/${list.id}`}>
                    {list.tags.length > 0
                      ? list.tags.join(', ')
                      : 'Sin etiquetas'}
                  </Link>
                </td>
                <td className='hidden whitespace-nowrap px-3 py-4 text-sm lg:table-cell'>
                  <Link className='w-full' href={`/listas/${list.id}`}>
                    {list.products.length}
                  </Link>
                </td>
                <td className='whitespace-nowrap px-3 py-4 text-sm'>
                  <Link className='w-full' href={`/listas/${list.id}`}>
                    <Price
                      price={list.products.reduce(
                        (acc, product) => acc + product.price,
                        0
                      )}
                    />
                  </Link>
                </td>
                <td className='whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0'>
                  <Link
                    href={`/listas/${list.id}`}
                    className='text-blue-500 hover:text-blue-600'
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageContainer>
  )
}

export default ListasPage

const people = [
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
  },
  // More people...
]
