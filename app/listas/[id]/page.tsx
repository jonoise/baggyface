'use client'
import { ProductListI, useCurrentList, useListsStore } from '@/lib/storage'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { LoadingState } from './loading-state'
import { PageContainer } from '@/components/shared/page-container'
import { useDebounce } from 'use-debounce'
import { Separator } from '@/components/ui/separator'
import { SearchProductsDialog } from '@/components/dialogs/search-products-dialog'
import { ALL_CATEGORIES } from '@/lib/globals'
import { SpendingSection } from './spending-section'
import { Button } from '@/components/ui/button'
import { TrashIcon } from 'lucide-react'
import { DeleteProduct } from './delete-product'
import { LinkToStartShopping } from '@/components/shared/link-to-shop'

const ListDetailsPage = () => {
  const { id } = useParams()
  const { updateList } = useListsStore()

  const list = useCurrentList()
  const [payload, setPayload] = React.useState<Partial<ProductListI>>({})
  const [debouncedPayload] = useDebounce(payload, 1100)

  useEffect(() => {
    if (id && list) {
      updateList(list.id!, debouncedPayload)
    }
  }, [id, debouncedPayload])

  if (!list) return <LoadingState />

  return (
    <PageContainer>
      <div className='flex flex-col space-y-4'>
        <p className='text-xs text-muted-foreground pl-4'>
          Creada: {new Date(list.createdAt).toLocaleString()}
        </p>
        <input
          type='text'
          defaultValue={list.title || ''}
          onChange={(e) => setPayload((p) => ({ ...p, title: e.target.value }))}
          className='w-full text-5xl hover:bg-accent rounded-md border-0 bg-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
        />
        <textarea
          defaultValue={list.description || ''}
          onChange={(e) =>
            setPayload((p) => ({ ...p, description: e.target.value }))
          }
          className='w-full rounded-md hover:bg-accent border-0 bg-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
        />
      </div>
      <Separator className='my-5' />
      <SpendingSection products={list.products} />
      <Separator className='my-5' />
      <div className='space-y-4 mt-8'>
        <div className='flex items-center justify-between'>
          <h3 className='text-4xl font-semibold'>Productos</h3>
          <div className='flex items-center space-x-2'>
            {/* <LinkToStartShopping listId={list.id} /> */}
            <SearchProductsDialog />
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {list.products.map((product) => {
            const category = ALL_CATEGORIES.find(
              (c) => c.value === product.category
            )
            return (
              <div
                key={product._id}
                className='border border-border p-4 rounded-md space-y-2'
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-2'>
                    {category?.Icon && <category.Icon className='h-4 w-4' />}
                    <p className='text-xs text-muted-foreground'>
                      {category?.label}
                    </p>
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    {product.brand}
                  </p>
                </div>
                <h3 className='text-sm font-semibold truncate '>
                  {product.name}
                </h3>
                <div className='flex items-center justify-between'>
                  <p className='text-xs'>
                    Precio:{' '}
                    <span className='underline'>
                      ₡{product.price.toFixed(2)}
                    </span>
                  </p>
                  <DeleteProduct product={product} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </PageContainer>
  )
}

export default ListDetailsPage
