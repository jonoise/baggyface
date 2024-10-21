import { ListProductI } from './models/product'

export const formatCurrency = (value: number, currency: string) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    currencyDisplay: `narrowSymbol`,
    currencySign: 'standard',
  })
  return formatter.format(value)
}

export const reduceProductsPrice = (products: ListProductI[]) => {
  const total = products.reduce((acc, product) => {
    const price = product.price
    const quantity = product.quantity ?? 1
    return acc + price * quantity
  }, 0)
  return total
}
