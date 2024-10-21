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

import { useDebounce } from 'use-debounce'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { useCurrentList, useListsStore } from '@/lib/storage'
import { useProducts } from '@/lib/hooks/use-products'
import { useModalStore } from '@/lib/stores/modal-store'
import { RiCloseCircleFill } from '@remixicon/react'
import { useTranslation } from './i18n-provider'
import { CATEGORY_ICONS } from '@/lib/globals'
import { ProductI } from '@/lib/models/product'
import { SearchProductItem } from './search-product-item'

export default function SearchProducts() {
  const t = useTranslation()

  const { products } = useProducts()
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
      <div className='sticky top-0 bg-background z-10 py-4 border-b border-border '>
        <div className={cn('flex flex-col space-y-4 ')}>
          <div className='flex items-center'>
            <Input
              ref={searchTermRef}
              className='w-full'
              type='text'
              placeholder={t.components.search.input}
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
                <SelectValue
                  placeholder={t.components.search.filter_by_category}
                />
              </SelectTrigger>
              <SelectContent className='max-h-52'>
                <SelectItem value='all'>
                  {t.components.search.filter_by_category}
                </SelectItem>
                {t.ALL_CATEGORIES.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setSelectedPriceRange(value)}>
              <SelectTrigger className='md:w-[180px] w-[50%]'>
                <SelectValue
                  placeholder={t.components.search.filter_by_price}
                />
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
            return (
              <div
                key={product._id}
                ref={
                  index === displayedProducts.length - 5
                    ? lastProductElementRef
                    : null
                }
              >
                <SearchProductItem product={product} />
              </div>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
