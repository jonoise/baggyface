'use client'

import { useState, useMemo } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { averagePriceByBrand } from '@/lib/graphs/brand-analysis'
import { useProducts } from '@/lib/hooks/use-products'
import { renderPrice } from '@/lib/render-price'
import { useExchangeRate } from '@/lib/hooks/use-currency-value'
import { useCurrencyStore } from '@/lib/stores/currency-store'
import { useTranslation } from '../shared/i18n-provider'

interface BrandPrice {
  brand: string
  averagePrice: number
}

const alphabetRanges = [
  'A - B',
  'C - D',
  'E - F',
  'G - H',
  'I - J',
  'K - L',
  'M - N',
  'O - P',
  'Q - R',
  'S - T',
  'U - V',
  'W - X',
  'Y - Z',
]

export default function AveragePriceByBrand() {
  const { products } = useProducts()
  const { exchange } = useExchangeRate()
  const { currency } = useCurrencyStore((s) => s)
  const t = useTranslation()
  const brandPriceData = averagePriceByBrand(products)
  const [selectedRange, setSelectedRange] = useState<string>('A - B')

  const filteredData = useMemo(() => {
    const [start, end] = selectedRange.split(' - ')
    return brandPriceData
      .filter((item) => {
        const firstLetter = item.brand.toUpperCase()[0]
        return firstLetter >= start && firstLetter <= end
      })
      .sort((a, b) => (a.brand > b.brand ? 1 : -1))
  }, [brandPriceData, selectedRange])

  return (
    <Card className='col-span-1'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle>{t.home_page.average_price_by_brand.title}</CardTitle>
          <div>
            <Select
              onValueChange={setSelectedRange}
              defaultValue={selectedRange}
            >
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Select brand range' />
              </SelectTrigger>
              <SelectContent className='max-h-52'>
                {alphabetRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <CardDescription>
          {t.home_page.average_price_by_brand.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className='h-[300px] w-full'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='brand' hide />
              <YAxis />
              <ChartTooltip
                labelFormatter={(value) => (
                  <p className='text-primary'>
                    {t.common.brand}:{' '}
                    <strong className='text-foreground'>{value}</strong>
                  </p>
                )}
                formatter={(value) =>
                  `${t.common.average}:  ${renderPrice({
                    price: value as number,
                    currency,
                    exchange,
                  })}`
                }
                content={<ChartTooltipContent />}
              />
              <Bar dataKey='averagePrice' fill='hsl(var(--primary))' />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
        {filteredData.length === 0 && (
          <p className='text-center text-muted-foreground mt-4'>
            {t.home_page.average_price_by_brand.no_brands}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
