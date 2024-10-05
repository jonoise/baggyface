'use client'
import { PageContainer } from '@/components/shared/page-container'

import {
  averagePriceByBrand,
  priceDistribution,
} from '@/lib/graphs/brand-analysis'
import { ProductI } from '@/lib/models/product'
import lodash from 'lodash'

import AveragePriceByBrand from './average-price-by-brand'
import { BrandsWithHighMarketShare } from './brands-with-high-market-share'
import { PriceDistribution } from './price-distribution'

export default function MainGraphs({ p }: { p: ProductI[] }) {
  const priceDistributionData = priceDistribution(p)
  const brandPriceData = averagePriceByBrand(p)
  const brandData = lodash
    .chain(p)
    .groupBy('brand')
    .map((value, key) => ({ brand: key, count: value.length }))
    .orderBy(['count'], ['desc'])
    .value()

  return (
    <PageContainer>
      <div className='space-y-8'>
        <h3>Resultados basados en {p.length} productos</h3>
        <div className='flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8'>
          <PriceDistribution priceDistributionData={priceDistributionData} />
          <BrandsWithHighMarketShare brandData={brandData} />
        </div>
        <AveragePriceByBrand brandPriceData={brandPriceData} />
      </div>
    </PageContainer>
  )
}
