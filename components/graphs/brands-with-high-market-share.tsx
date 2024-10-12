'use client'

import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts'
import _ from 'lodash'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useProducts } from '@/lib/hooks/use-products'
import { useTranslation } from '../shared/i18n-provider'

export const description = 'A horizontal bar chart'

export function BrandsWithHighMarketShare() {
  const { products } = useProducts()
  const t = useTranslation()
  const brandData = _.chain(products)
    .groupBy('brand')
    .map((value, key) => ({ brand: key, count: value.length }))
    .orderBy(['count'], ['desc'])
    .value()

  const top10 = _.take(brandData, 10)
  const top5BrandData = top10.slice(0, 5)
  const top10BrandData = top10.slice(5)

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>{t.home_page.market_share.title}</CardTitle>
        <CardDescription>
          {t.home_page.market_share.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}}>
          <BarChart
            accessibilityLayer
            data={top5BrandData}
            layout='vertical'
            margin={{
              left: 0,
            }}
          >
            <XAxis type='number' dataKey='count' hide />
            <YAxis
              dataKey='brand'
              type='category'
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 10)}
              tickMargin={10}
              hide
            />
            <ChartTooltip
              formatter={(value) =>
                `Total: ${value} ${t.common.products.toLowerCase()}`
              }
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Bar dataKey='count' className='fill-primary' radius={5}>
              <LabelList
                dataKey='brand'
                position='insideLeft'
                offset={8}
                className='fill-white dark:fill-black'
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <p className='text-muted-foreground'>
          {t.home_page.market_share.helpText}:{' '}
          {top10BrandData.map((item, i) => (
            <span key={item.brand}>
              {item.brand}
              {i < top10BrandData.length - 1 && i < 5 && ', '}
            </span>
          ))}
        </p>
      </CardFooter>
    </Card>
  )
}
