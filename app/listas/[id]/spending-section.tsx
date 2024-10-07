'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Legend } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { ProductI } from '@/lib/models/product'
import { ALL_CATEGORIES } from '@/lib/globals'

interface CategoryData {
  category: string
  totalSpent: number
}
export const SpendingSection = ({ products }: { products: ProductI[] }) => {
  const [categoryData, setCategoryData] = useState<CategoryData[]>([])
  const [totalProducts, setTotalProducts] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(() => {
    processProductData(products)
  }, [products])

  const processProductData = (products: ProductI[]) => {
    const categoryMap = new Map<string, number>()
    let total = 0

    products.forEach((product) => {
      const { category, price } = product
      const foundCategory = ALL_CATEGORIES.find((c) => c.value === category)
      console.log({ foundCategory })
      categoryMap.set(
        foundCategory?.label!,
        (categoryMap.get(foundCategory?.label!) || 0) + price
      )
      total += price
    })

    const processedData = Array.from(categoryMap, ([category, totalSpent]) => ({
      category,
      totalSpent,
    }))

    setCategoryData(processedData)
    setTotalProducts(products.length)
    setTotalAmount(total)
  }

  return (
    <div className='flex flex-col md:flex-row items-center space-x-8'>
      <div className='w-full'>
        <p className='text-xs text-muted-foreground'>Gastos por categoría</p>
        <ChartContainer
          config={{
            totalSpent: {
              label: 'Total gastado',
              color: 'hsl(var(--primary))',
            },
          }}
          className='h-[200px] w-full'
        >
          <BarChart data={categoryData} margin={{ left: -12, top: 10 }}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='category' axisLine={false} />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Bar
              dataKey='totalSpent'
              fill='var(--color-totalSpent)'
              name='Total Spent'
            />
          </BarChart>
        </ChartContainer>
      </div>
      <Card className='p-5 w-full md:w-1/2  flex flex-col items-center justify-center text-center'>
        <h3>Total de productos</h3>
        <p className='text-xl mt-2 font-bold underline'>{totalProducts}</p>
      </Card>
      <Card className='p-5 w-full md:w-1/2 flex flex-col items-center justify-center text-center mt-8 md:mt-0 '>
        <h3>Total de gastos</h3>
        <p className='text-xl mt-2 font-bold underline'>
          ₡{totalAmount.toFixed(2)}
        </p>
      </Card>
    </div>
  )
}
