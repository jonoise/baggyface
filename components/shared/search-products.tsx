'use client'

import React, { useState, useEffect, useMemo } from 'react'
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
import { useProducts } from './products-provider'
import { ALL_CATEGORIES } from '@/lib/globals'

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

interface SearchProductsProps {
  products: ProductI[]
}

export default function SearchProducts() {
  const { products } = useProducts()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

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

  const fuse = useMemo(
    () =>
      new Fuse(products, {
        keys: ['name', 'brand', 'ean'],
        threshold: 0.3,
      }),
    [products]
  )

  const filteredProducts = useMemo(() => {
    let result = searchTerm
      ? fuse.search(searchTerm).map((res) => res.item)
      : products

    if (selectedCategory) {
      result = result.filter((product) => product.category === selectedCategory)
    }

    if (selectedPriceRange) {
      const [min, max] = selectedPriceRange.split('-').map(Number)
      result = result.filter(
        (product) => product.price >= min && (max ? product.price <= max : true)
      )
    }

    return result
  }, [searchTerm, selectedCategory, selectedPriceRange, products, fuse])

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedCategory, selectedPriceRange])

  return (
    <div className='flex flex-col h-full relative'>
      <div className='sticky top-0 bg-background z-10 p-4 border-b border-border'>
        <div className='flex flex-col space-y-4 pt-10'>
          <Input
            type='text'
            placeholder='Busca productos por nombre, categoría o código de barras'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className='flex space-x-4'>
            <Select
              onValueChange={(value) =>
                value === 'all'
                  ? setSelectedCategory('')
                  : setSelectedCategory(value)
              }
            >
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Select category' />
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
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Rango de precios' />
              </SelectTrigger>
              <SelectContent>
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
        <div className='p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8'>
          {paginatedProducts.map((product) => {
            const category = ALL_CATEGORIES.find(
              (c) => c.value === product.category
            )
            return (
              <div
                key={product._id}
                className='border border-border p-4 rounded-md space-y-2'
              >
                <div className='flex items-center space-x-2'>
                  <p className='text-xs'>
                    {category?.Icon && <category.Icon className='h-4 w-4' />}
                  </p>
                  <p className='text-xs text-muted-foreground'>
                    {category?.label}
                  </p>
                </div>
                <h3 className='text-sm font-semibold truncate '>
                  {product.name}
                </h3>
                <p className='text-xs'>
                  Precio:{' '}
                  <span className='underline'>₡{product.price.toFixed(2)}</span>
                </p>
              </div>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
