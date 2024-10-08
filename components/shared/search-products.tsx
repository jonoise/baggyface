'use client'

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import Fuse from 'fuse.js'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ALL_CATEGORIES } from '@/lib/globals'
import { useDebounce } from 'use-debounce'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { FilePlus2, PlusCircle, PlusIcon } from 'lucide-react'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { useListsStore } from '@/lib/storage'
import { toast } from 'sonner'
import { useProducts } from '@/lib/hooks/use-products'
import { useModalStore } from '@/lib/stores/modal-store'
import { Price } from './price'
import { RiCloseCircleFill } from '@remixicon/react'

interface ProductI {
  _id: string
  name: string
  linkText: string
  brand: string
  link: string
  ean: string
  category: string
  price: number
  images: Array<ProductImageI>
  properties: Array<ProductPropertyI>
  createdAt: Date
  updatedAt: Date
}

type ProductImageI = {
  cacheId: string
  imageId: string
  imageLabel: string
  imageTag: string
  imageUrl: string
  imageText: string
  __typename: 'Image'
}

type ProductPropertyI = {
  name: string
  value: string
}

export default function SearchProducts({
  addToList,
}: {
  addToList?: {
    listId: string
    onAdd: (product: ProductI) => void
  }
}) {
  const { products } = useProducts()
  const { newList } = useModalStore((s) => s)

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('')
  const [displayedProducts, setDisplayedProducts] = useState<ProductI[]>([])
  const [page, setPage] = useState(1)
  const searchTermRef = useRef<HTMLInputElement>(null)
  const itemsPerPage = 20

  const [debouncedSearchTerm] = useDebounce(searchTerm, 500)

  const observer = useRef<IntersectionObserver | null>(null)
  const lastProductElementRef = useCallback((node: HTMLDivElement | null) => {
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [])

  const priceRanges = [
    '1-1000',
    '1001-3000',
    '3001-5000',
    '5001-10000',
    '10001-20000',
    '20001-30000',
    '30001-40000',
    '40001-50000',
    '50001-60000',
    '60001-70000',
    '70001-80000',
    '80001-90000',
    '90001-100000',
  ]

  const fuse = useMemo(() => {
    if (!products) return
    return new Fuse(products, {
      keys: ['name', 'brand', 'ean'],
      threshold: 0.3,
    })
  }, [products])

  const filteredProducts = useMemo(() => {
    let result = debouncedSearchTerm
      ? fuse?.search(debouncedSearchTerm).map((res) => res.item)
      : products

    if (selectedCategory) {
      result = result?.filter(
        (product) => product.category === selectedCategory
      )
    }

    if (selectedPriceRange) {
      const [min, max] = selectedPriceRange.split('-').map(Number)
      result = result?.filter(
        (product) => product.price >= min && (max ? product.price <= max : true)
      )
    }

    return result
  }, [
    debouncedSearchTerm,
    selectedCategory,
    selectedPriceRange,
    products,
    fuse,
  ])

  useEffect(() => {
    setDisplayedProducts([])
    setPage(1)
  }, [debouncedSearchTerm, selectedCategory, selectedPriceRange])

  useEffect(() => {
    const newProducts = filteredProducts?.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
    )
    if (newProducts) {
      setDisplayedProducts((prevProducts) => [...prevProducts, ...newProducts])
    }
  }, [filteredProducts, page])

  const { lists, addProductToList } = useListsStore((state) => state)

  return (
    <div className='flex flex-col h-full relative'>
      <div className='sticky top-0 bg-background z-10 pb-4 border-b border-border '>
        <div className={cn('flex flex-col space-y-4 ')}>
          <div className='flex items-center'>
            <Input
              ref={searchTermRef}
              className='w-full'
              type='text'
              placeholder='Busca productos por nombre, categoría o código de barras'
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
              }}
            />
            {searchTerm && (
              <Button
                variant='ghost'
                size='icon'
                className='-ml-10 h-7 w-7 rounded-lg'
                onClick={() => {
                  setSearchTerm('')
                  searchTermRef.current?.focus()
                }}
              >
                <RiCloseCircleFill className='h-5 w-5' />
              </Button>
            )}
          </div>
          <div className='flex space-x-4'>
            <Select
              onValueChange={(value) =>
                value === 'all'
                  ? setSelectedCategory('')
                  : setSelectedCategory(value)
              }
            >
              <SelectTrigger className='md:w-[180px] w-[50%]'>
                <SelectValue placeholder='Todas las categorías' />
              </SelectTrigger>
              <SelectContent className='max-h-52'>
                <SelectItem value='all'>Todas las categorías</SelectItem>
                {ALL_CATEGORIES.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setSelectedPriceRange(value)}>
              <SelectTrigger className='md:w-[180px] w-[50%]'>
                <SelectValue placeholder='Rango de precios' />
              </SelectTrigger>
              <SelectContent className='max-h-52'>
                {priceRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    ₡{range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <ScrollArea className='flex-grow'>
        <div className='py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8'>
          {displayedProducts.map((product, index) => {
            const category = ALL_CATEGORIES.find(
              (c) => c.value === product.category
            )
            return (
              <div
                key={product._id}
                ref={
                  index === displayedProducts.length - 1
                    ? lastProductElementRef
                    : null
                }
                className='border border-border p-4 rounded-md space-y-2'
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-2'>
                    <p className='text-xs'>
                      {category?.Icon && <category.Icon className='h-4 w-4' />}
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      {category?.label}
                    </p>
                  </div>
                  {addToList?.onAdd ? (
                    <Button
                      onClick={() => addToList?.onAdd(product)}
                      size='icon'
                      className='h-5 w-5'
                      variant='ghost'
                    >
                      <PlusIcon className='h-4 w-4' />
                      <span className='sr-only'>Agregar a la lista</span>
                    </Button>
                  ) : (
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size='icon'
                          className='h-6 w-6 rounded-md'
                          variant='outline'
                        >
                          <DotsHorizontalIcon className='h-4 w-4 ' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className='w-52'>
                        <DropdownMenuGroup>
                          {/* <DropdownMenuItem>
                            <EyeOpenIcon className='mr-2 h-4 w-4' />
                            <span>Ver Detalles</span>
                          </DropdownMenuItem> */}
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                              <FilePlus2 className='mr-2 h-4 w-4' />
                              <span>Agregar a lista</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                {lists.map((list) => (
                                  <DropdownMenuItem
                                    key={list.id}
                                    onClick={() => {
                                      addProductToList(list.id, product)
                                      toast.success('Producto agregado')
                                    }}
                                  >
                                    <span>{list.title}</span>
                                  </DropdownMenuItem>
                                ))}

                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => newList.setOpen(true)}
                                >
                                  <PlusCircle className='mr-2 h-4 w-4' />
                                  <span>Nueva Lista</span>
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
                <h3 className='text-sm font-semibold truncate '>
                  {product.name}
                </h3>
                <p className='text-xs'>
                  Precio:{' '}
                  <span className='underline'>
                    <Price price={product.price} />
                  </span>
                </p>
              </div>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
