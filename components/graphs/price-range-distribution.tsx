'use client'

import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Pie, PieChart, Cell, ResponsiveContainer } from 'recharts'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import { getPriceRangeDistribution } from '@/lib/graphs/category-analysis'
import { useProducts } from '@/lib/hooks/use-products'
import { useTranslation } from '../shared/i18n-provider'

const COLORS = ['#588157', '#dad7cd', '#38a3a5']
export const PriceRangeDistribution = () => {
  const { products } = useProducts()
  const t = useTranslation()
  if (!products) return null
  const data = getPriceRangeDistribution(products)
  return (
    <Card className='flex-1 md:max-w-sm'>
      <CardHeader>
        <CardTitle>{t.home_page.price_range_distribution.title}</CardTitle>
        <CardDescription>
          {t.home_page.price_range_distribution.description}
        </CardDescription>
      </CardHeader>
      <CardContent className='flex items-center justify-center'>
        <ChartContainer
          config={{
            ...Object.fromEntries(
              data.map((entry, index) => [
                entry.name,
                { label: entry.name, color: COLORS[index % COLORS.length] },
              ])
            ),
          }}
          className='h-[300px] w-full'
        >
          <PieChart>
            <Pie
              data={data}
              outerRadius={80}
              fill='#8884d8'
              dataKey='value'
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <ChartLegend
              className='flex-wrap gap-2 [&>*]:basis-1/3 [&>*]:justify-center'
              formatter={(v) => (
                <>
                  {v === 'Bajo' && (
                    <span className='text-xs'>
                      {t.common.low} <br />{' '}
                      <span className='text-[9px]'>-₡1000</span>
                    </span>
                  )}
                  {v === 'Medio' && (
                    <span className='text-xs'>
                      {t.common.medium}
                      <br /> <span className='text-[9px]'>₡1000 / ₡4000</span>
                    </span>
                  )}
                  {v === 'Alto' && (
                    <span className='text-xs'>
                      {t.common.high}
                      <br /> <span className='text-[9px]'>₡4000+</span>
                    </span>
                  )}
                </>
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
