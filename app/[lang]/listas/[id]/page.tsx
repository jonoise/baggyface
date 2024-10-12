'use client'
import { ProductListI, useCurrentList, useListsStore } from '@/lib/storage'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { LoadingState } from './loading-state'
import { PageContainer } from '@/components/shared/page-container'
import { useDebounce } from 'use-debounce'
import { Separator } from '@/components/ui/separator'
import { SearchProductsDialog } from '@/components/dialogs/search-products-dialog'
import { SpendingSection } from './spending-section'
import { DeleteProduct } from './delete-product'
import { Button } from '@/components/ui/button'
import { ListIcon, GridIcon } from 'lucide-react'
import { ProductI } from '@/lib/models/product'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Price } from '@/components/shared/price'
import { useTranslation } from '@/components/shared/i18n-provider'
import { CATEGORY_ICONS } from '@/lib/globals'

interface GroupedProductsAcc {
  [category: string]: {
    category: { value: string; label: string } | undefined
    products: ProductI[]
  }
}

const ListDetailsPage = () => {
  const { id } = useParams()
  const t = useTranslation()
  const { updateList } = useListsStore()
  const list = useCurrentList()
  const [payload, setPayload] = useState<Partial<ProductListI>>({})
  const [debouncedPayload] = useDebounce(payload, 1100)
  const [isGrouped, setIsGrouped] = useState(true)

  useEffect(() => {
    if (id && list) {
      updateList(list.id!, debouncedPayload)
    }
  }, [id, debouncedPayload])

  if (!list)
    return (
      <PageContainer>
        <LoadingState />
      </PageContainer>
    )

  const groupedProducts = list.products.reduce(
    (acc: GroupedProductsAcc, product) => {
      const category = t.ALL_CATEGORIES.find(
        (c) => c.value === product.category
      )
      if (!acc[product.category]) {
        acc[product.category] = { category, products: [] }
      }
      acc[product.category].products.push(product)
      return acc
    },
    {}
  )

  const renderProduct = (product: ProductI) => {
    const category = t.ALL_CATEGORIES.find((c) => c.value === product.category)
    const CategoryIcon =
      CATEGORY_ICONS[category?.value as keyof typeof CATEGORY_ICONS]
    return (
      <div
        key={product._id}
        className='border border-border p-4 rounded-md space-y-2'
      >
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            {CategoryIcon && <CategoryIcon className='h-4 w-4' />}
            <p className='text-xs text-muted-foreground'>{category?.label}</p>
          </div>
          <p className='text-xs text-muted-foreground'>{product.brand}</p>
        </div>
        <h3 className='text-sm font-semibold truncate '>{product.name}</h3>
        <div className='flex items-center justify-between'>
          <p className='text-xs'>
            {t.common.price}: <Price price={product.price} />
          </p>
          <DeleteProduct product={product} />
        </div>
      </div>
    )
  }

  return (
    <PageContainer className='h-full overflow-y-auto'>
      <div className='flex flex-col space-y-4 py-4'>
        <p className='text-xs text-muted-foreground'>
          {t.common.created_at}: {new Date(list.createdAt).toLocaleString()}
        </p>
        <input
          type='text'
          defaultValue={list.title || ''}
          onChange={(e) => setPayload((p) => ({ ...p, title: e.target.value }))}
          className='w-full text-xl xl:text-5xl hover:bg-accent rounded-md border-0 bg-accent px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 '
          placeholder={t.lists_details.title_placeholder}
        />
        <textarea
          defaultValue={list.description || ''}
          onChange={(e) =>
            setPayload((p) => ({ ...p, description: e.target.value }))
          }
          placeholder={t.lists_details.description_placeholder}
          className='w-full rounded-md hover:bg-accent border-0 bg-accent px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
        />
      </div>
      <Separator className='my-5' />
      <SpendingSection products={list.products} />
      <Separator className='my-5' />
      <div className='space-y-10 mt-8 p-4'>
        <div className='flex items-center justify-between'>
          <h3 className='text-4xl font-semibold'>{t.common.products}</h3>
          <div className='flex items-center space-x-2'>
            <SearchProductsDialog />
            <Button
              variant='outline'
              size='icon'
              onClick={() => setIsGrouped(!isGrouped)}
              aria-label={
                isGrouped ? 'Ungroup products' : 'Group products by category'
              }
            >
              {isGrouped ? (
                <GridIcon className='h-4 w-4' />
              ) : (
                <ListIcon className='h-4 w-4' />
              )}
            </Button>
          </div>
        </div>
        {!list.products.length && (
          <p className='text-muted-foreground'>{t.lists_details.no_products}</p>
        )}
        {isGrouped ? (
          <Accordion
            type='multiple'
            defaultValue={t.ALL_CATEGORIES.map((c) => c.value)}
            className='divide-primary border-border'
          >
            {Object.values(groupedProducts).map(({ category, products }) => (
              <AccordionItem
                key={category?.value}
                value={category?.value!}
                className='space-y-4 border-b-secondary'
              >
                <AccordionTrigger className='hover:no-underline hover:bg-accent'>
                  <div className='flex flex-col items-start md:items-center md:flex-row md:space-x-2'>
                    <h4 className='text-2xl text-muted-foreground'>
                      {category?.label}
                    </h4>
                    <p className='text-sm text-primary'>
                      &#40;
                      {products.length} prods,{' '}
                      {
                        <Price
                          price={products.reduce(
                            (acc, product) => acc + product.price,
                            0
                          )}
                        />
                      }{' '}
                      total&#41;
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {products.map(renderProduct)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {list.products.map(renderProduct)}
          </div>
        )}
      </div>
    </PageContainer>
  )
}

export default ListDetailsPage
