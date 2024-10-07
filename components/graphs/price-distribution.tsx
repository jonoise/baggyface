import React from 'react'
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
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import { useProducts } from '@/lib/hooks/use-products'
import { priceDistribution } from '@/lib/graphs/brand-analysis'

export const PriceDistribution = () => {
  const { products } = useProducts()
  if (!products) return null
  const priceDistributionData = priceDistribution(products)

  return (
    <Card className='w-full md:max-w-fit  flex-1'>
      <CardHeader>
        <CardTitle>Distribución por precios</CardTitle>
        <CardDescription>
          Número de productos en diferentes rangos de precios
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            count: {
              label: 'Número de productos',
              color: 'hsl(var(--primary))',
            },
          }}
          className='mx-auto aspect-square w-full max-w-[100%] -ml-5 max-h-[300px]'
        >
          <BarChart data={priceDistributionData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis
              dataKey='range'
              tickFormatter={(value) => `${value.split(' - ')[0]}`}
              tickSize={7}
              fontSize={7}
            />
            <YAxis />
            <ChartTooltip
              formatter={(value) => `${value} productos`}
              content={<ChartTooltipContent />}
            />
            <Bar dataKey='count' fill='hsl(var(--primary))' radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

import { PolarAngleAxis, RadialBar, RadialBarChart } from 'recharts'

export default function Component() {
  return (
    <Card className='max-w-xs'>
      <CardContent className='flex gap-4 p-4'>
        <div className='grid items-center gap-2'>
          <div className='grid flex-1 auto-rows-min gap-0.5'>
            <div className='text-sm text-muted-foreground'>Move</div>
            <div className='flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none'>
              562/600
              <span className='text-sm font-normal text-muted-foreground'>
                kcal
              </span>
            </div>
          </div>
          <div className='grid flex-1 auto-rows-min gap-0.5'>
            <div className='text-sm text-muted-foreground'>Exercise</div>
            <div className='flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none'>
              73/120
              <span className='text-sm font-normal text-muted-foreground'>
                min
              </span>
            </div>
          </div>
          <div className='grid flex-1 auto-rows-min gap-0.5'>
            <div className='text-sm text-muted-foreground'>Stand</div>
            <div className='flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none'>
              8/12
              <span className='text-sm font-normal text-muted-foreground'>
                hr
              </span>
            </div>
          </div>
        </div>
        <ChartContainer
          config={{
            move: {
              label: 'Move',
              color: 'hsl(var(--chart-1))',
            },
            exercise: {
              label: 'Exercise',
              color: 'hsl(var(--chart-2))',
            },
            stand: {
              label: 'Stand',
              color: 'hsl(var(--chart-3))',
            },
          }}
          className='mx-auto aspect-square w-full max-w-[80%]'
        >
          <RadialBarChart
            margin={{
              left: -10,
              right: -10,
              top: -10,
              bottom: -10,
            }}
            data={[
              {
                activity: 'stand',
                value: (8 / 12) * 100,
                fill: 'var(--color-stand)',
              },
              {
                activity: 'exercise',
                value: (46 / 60) * 100,
                fill: 'var(--color-exercise)',
              },
              {
                activity: 'move',
                value: (245 / 360) * 100,
                fill: 'var(--color-move)',
              },
            ]}
            innerRadius='20%'
            barSize={24}
            startAngle={90}
            endAngle={450}
          >
            <PolarAngleAxis
              type='number'
              domain={[0, 100]}
              dataKey='value'
              tick={false}
            />
            <RadialBar dataKey='value' background cornerRadius={5} />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
