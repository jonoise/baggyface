'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Legend } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { ListProductI } from '@/lib/models/product'

import { Price } from '@/components/shared/price'
import { RiExchangeDollarFill } from '@remixicon/react'
import { Button } from '@/components/ui/button'
import { useCurrencyStore } from '@/lib/stores/currency-store'
import { useTranslation } from '@/components/shared/i18n-provider'

interface CategoryData {
  category: string
  totalSpent: number
}
export const SpendingSection = ({ products }: { products: ListProductI[] }) => {
  const [categoryData, setCategoryData] = useState<CategoryData[]>([])
  const [totalProducts, setTotalProducts] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const { currency, setCurrency } = useCurrencyStore((s) => s)
  const t = useTranslation()

  useEffect(() => {
    processProductData(products)
  }, [products])

  const processProductData = (products: ListProductI[]) => {
    const categoryMap = new Map<string, number>()
    let total = 0

    products.forEach((product) => {
      const { category, price } = product
      const quantity = product.quantity ?? 1
      const amount = price * quantity
      const foundCategory = t.ALL_CATEGORIES.find((c) => c.value === category)

      categoryMap.set(
        foundCategory?.label!,
        (categoryMap.get(foundCategory?.label!) || 0) + amount
      )
      total += amount
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
    <div>
      <p className='text-xl md:text-4xl font-semibold mb-4'>
        {t.common.spending}
      </p>

      <div className='flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8'>
        <div className='w-full'>
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
          <h3>{t.components.spending_section.total_products}</h3>
          <p className='text-xl mt-2 font-bold underline'>{totalProducts}</p>
        </Card>
        <Card className='p-5 w-full md:w-1/2 flex flex-col items-center justify-center text-center relative'>
          <Button
            variant={'outline'}
            size={'icon'}
            className='absolute top-2 right-4 lg:top-1 lg:right-2 lg:h-8 lg:w-8'
            onClick={() => setCurrency(currency === 'CRC' ? 'USD' : 'CRC')}
          >
            <RiExchangeDollarFill className='h-5 w-5 lg:h-4 lg:w-4' />
          </Button>
          <h3>{t.components.spending_section.total_spending}</h3>
          <p className='text-xl mt-2 font-bold underline'>
            <Price price={totalAmount} skeletonClassName='h-7 w-20' />
          </p>
        </Card>
      </div>
    </div>
  )
}
