import _ from 'lodash'

export function analyzeBrandDistribution(products: any[]) {
  // Count products for each brand
  const brandCounts = _.countBy(products, 'brand')

  // Calculate total number of products
  const totalProducts = products.length

  // Calculate percentage for each brand and sort by count descending
  const brandDistribution = Object.entries(brandCounts)
    .map(([brand, count]) => ({
      brand,
      count,
      percentage: (count / totalProducts) * 100,
    }))
    .sort((a, b) => b.count - a.count)

  // Calculate some additional statistics
  const totalBrands = brandDistribution.length
  const topBrands = brandDistribution.slice(0, 20)
  const otherBrands = brandDistribution.slice(20)
  const otherBrandsCount = _.sumBy(otherBrands, 'count')
  const otherBrandsPercentage = _.sumBy(otherBrands, 'percentage')

  return {
    brandDistribution,
    totalProducts,
    totalBrands,
    topBrands,
    otherBrandsCount,
    otherBrandsPercentage,
  }
}

export function analyzeAveragePriceByBrand(
  products: any[],
  maxPrice: number = 10000
) {
  // Group products by brand
  const filteredProducts = products.filter(
    (product) => product.price < maxPrice
  )

  const brandGroups = _.groupBy(filteredProducts, 'brand')

  // Calculate average price for each brand
  const brandPrices = Object.entries(brandGroups).map(
    ([brand, brandProducts]) => ({
      brand,
      averagePrice: _.meanBy(brandProducts, 'price'),
      productCount: brandProducts.length,
      minPrice: _.minBy(brandProducts, 'price').price,
      maxPrice: _.maxBy(brandProducts, 'price').price,
    })
  )

  // Sort by average price descending
  const sortedBrandPrices = _.sortBy(brandPrices, 'averagePrice').reverse()

  // Calculate overall statistics
  const overallAveragePrice = _.meanBy(filteredProducts, 'price')
  const overallMinPrice = _.minBy(filteredProducts, 'price').price
  const overallMaxPrice = _.maxBy(filteredProducts, 'price').price

  return {
    brandPrices: sortedBrandPrices,
    overallAveragePrice,
    overallMinPrice,
    overallMaxPrice,
    totalBrands: sortedBrandPrices.length,
    totalProducts: filteredProducts.length,
  }
}

import { ProductI } from '../models/product'

// Analysis functions
export const groupByCategory = (products: ProductI[]) => {
  const groupedData = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  return Object.entries(groupedData).map(([category, count]) => ({
    category,
    count,
  }))
}

export const averagePriceByBrand = (products: ProductI[]) => {
  const brandPrices: Record<string, number[]> = {}
  products.forEach((product) => {
    if (!brandPrices[product.brand]) brandPrices[product.brand] = []
    brandPrices[product.brand].push(product.price)
  })
  return Object.entries(brandPrices).map(([brand, prices]) => ({
    brand,
    averagePrice: prices.reduce((sum, price) => sum + price, 0) / prices.length,
  }))
}

export const priceDistribution = (products: ProductI[]) => {
  const ranges = [
    1,
    1000,
    2000,
    3000,
    4000,
    5000,
    6000,
    7000,
    8000,
    9000,
    10000,
    15000,
    Infinity,
  ]
  const distribution = ranges.slice(0, -1).map((min, index) => {
    const max = ranges[index + 1]
    const count = products.filter((p) => p.price >= min && p.price < max).length
    return {
      range: `₡${min} - ${max === Infinity ? 'Por encima' : '₡' + max}`,
      count,
    }
  })
  return distribution
}

export const productCountByBrand = (products: ProductI[]) => {
  const brandCounts: Record<string, number> = {}
  products.forEach((product) => {
    brandCounts[product.brand] = (brandCounts[product.brand] || 0) + 1
  })
  return Object.entries(brandCounts).map(([brand, count]) => ({ brand, count }))
}

export const priceTrendOverTime = (products: ProductI[]) => {
  const sortedProducts = [...products].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  )
  return sortedProducts.map((product) => ({
    date: new Date(product.createdAt).toISOString().split('T')[0],
    price: product.price,
  }))
}
