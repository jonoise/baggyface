'use client'
import { ListI, useCurrentList, useListsStore } from '@/lib/storage'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { LoadingState } from './loading-state'
import { PageContainer } from '@/components/shared/page-container'
import { useDebounce } from 'use-debounce'
import { Separator } from '@/components/ui/separator'
import { SpendingSection } from './spending-section'
import { DeleteProduct } from './delete-product'
import { Button } from '@/components/ui/button'
import { ListIcon, GridIcon, PlusIcon, ShoppingCartIcon } from 'lucide-react'
import { ListProductI } from '@/lib/models/product'
import SearchProducts from '@/components/shared/search-products'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Price } from '@/components/shared/price'
import { useTranslation } from '@/components/shared/i18n-provider'
import { CATEGORY_ICONS } from '@/lib/globals'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TunaIcon } from '@/lib/icons/tuna'

import { reduceProductsPrice } from '@/lib/currency'
import { ShoppingTab } from './shopping-tab'

interface GroupedProductsAcc {
  [category: string]: {
    category: { value: string; label: string } | undefined
    products: ListProductI[]
  }
}

const ListDetailsPage = () => {
  const t = useTranslation()
  const list = useCurrentList()
  const { id } = useParams()
  const { updateList } = useListsStore()
  const [payload, setPayload] = useState<Partial<ListI>>({})
  const [debouncedPayload] = useDebounce(payload, 1100)
  const [isGrouped, setIsGrouped] = useState(true)
  const [shopping, setShopping] = useState({})

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

  const renderProduct = (product: ListProductI) => {
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
            {t.common.price}: <Price price={product.price} />, cantidad:{' '}
            {product.quantity ?? 1}
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
      <div className='flex flex-col-reverse mb-20 md:flex-col md:mb-0'>
        <Separator className='my-5' />
        <SpendingSection products={list.products} />
        <Separator className='my-5' />
        <div className='space-y-10 mt-8'>
          <Tabs defaultValue={list.products.length > 0 ? 'products' : 'add'}>
            <TabsList>
              <TabsTrigger value='products' className='space-x-2'>
                <TunaIcon className='w-4 h-4' /> <p>{t.common.products}</p>
              </TabsTrigger>
              <TabsTrigger value='add' className='space-x-2'>
                <PlusIcon strokeWidth={3} className='w-4 h-4 text-blue-500' />{' '}
                <p>{t.common.add}</p>
              </TabsTrigger>
              <TabsTrigger value='shopping' className='space-x-2'>
                <ShoppingCartIcon className='w-4 h-4 text-blue-500' />{' '}
                <p>{t.common.shopping}</p>
              </TabsTrigger>
            </TabsList>
            <TabsContent value='products' className='mt-5 mb-10'>
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='text-xl md:text-4xl font-semibold'>
                    {t.common.products}
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    Échale un vistazo a la lista.
                  </p>
                </div>
                <div className='flex items-center space-x-2'>
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={() => setIsGrouped(!isGrouped)}
                    aria-label={
                      isGrouped
                        ? 'Ungroup products'
                        : 'Group products by category'
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
                <p className='text-muted-foreground py-10'>
                  {t.lists_details.no_products}
                </p>
              )}
              {isGrouped ? (
                <Accordion
                  type='multiple'
                  defaultValue={t.ALL_CATEGORIES.map((c) => c.value)}
                  className='divide-primary border-border'
                >
                  {Object.values(groupedProducts).map(
                    ({ category, products }) => {
                      const total = reduceProductsPrice(products)
                      return (
                        <AccordionItem
                          key={category?.value}
                          value={category?.value!}
                          className='space-y-4 border-b-secondary'
                        >
                          <AccordionTrigger className='hover:no-underline hover:bg-accent'>
                            <div className='flex flex-col items-start md:items-center md:flex-row md:space-x-2'>
                              <h4 className='text-lg md:text-2xl text-muted-foreground'>
                                {category?.label}
                              </h4>
                              <p className='text-sm text-primary'>
                                &#40;
                                {products.length} prods,{' '}
                                {<Price price={total} />} total&#41;
                              </p>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            {products.map(renderProduct)}
                          </AccordionContent>
                        </AccordionItem>
                      )
                    }
                  )}
                </Accordion>
              ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {list.products.map(renderProduct)}
                </div>
              )}
            </TabsContent>
            <TabsContent value='add' className='relative mt-5'>
              <SearchProducts />
            </TabsContent>
            <TabsContent value='shopping' className='mt-5 md:mb-10'>
              <ShoppingTab shopping={shopping} setShopping={setShopping} />
              {list.products.length === 0 && (
                <p className='text-muted-foreground py-10'>
                  {t.lists_details.no_products}
                </p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageContainer>
  )
}

export default ListDetailsPage
