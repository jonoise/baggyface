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
export const PriceDistribution = ({
  priceDistributionData,
}: {
  priceDistributionData: any[]
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribución por precios</CardTitle>
        <CardDescription>
          Número de productos en diferentes rangos de precios
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{}}
          className='h-[300px] 2xl:h-[400px] w-full flex-1'
        >
          <ResponsiveContainer width='100%' height='100%'>
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
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
