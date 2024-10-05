import { ProductI } from '../models/product'

export const getCategoryDistribution = (data: ProductI[]) => {
  const categoryCounts = data.reduce((acc: any, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1
    return acc
  }, {})

  return Object.entries(categoryCounts).map(([category, count]) => ({
    name: category,
    value: count,
  }))
}

export const getAveragePriceByCategory = (data: ProductI[]) => {
  const categoryPrices = data.reduce((acc: any, product) => {
    if (!acc[product.category]) {
      acc[product.category] = { total: 0, count: 0 }
    }
    acc[product.category].total += product.price
    acc[product.category].count++
    return acc
  }, {}) as Record<string, { total: number; count: number }>

  return Object.entries(categoryPrices).map(([category, { total, count }]) => ({
    name: category,
    value: total / count, // Average price
    total,
  }))
}

export const getPriceRangeDistribution = (data: ProductI[]) => {
  const priceRanges = {
    Bajo: 0,
    Medio: 0,
    Alto: 0,
  }

  data.forEach((product) => {
    if (product.price < 1000) priceRanges['Bajo']++
    else if (product.price < 4000) priceRanges['Medio']++
    else priceRanges['Alto']++
  })

  return Object.entries(priceRanges).map(([range, count]) => ({
    name: range,
    value: count,
  }))
}
