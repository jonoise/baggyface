'use client'

import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts'
import _ from 'lodash'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

export const description = 'A horizontal bar chart'

export function BrandsWithHighMarketShare({ brandData }: { brandData: any[] }) {
  const top5BrandData = _.take(brandData, 5)
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Top 5 Marcas con más market share</CardTitle>
        <CardDescription>
          Las 5 marcas con más productos en los supermercados de Walmart.
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
              formatter={(value) => `Total: ${value} productos`}
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
    </Card>
  )
}
