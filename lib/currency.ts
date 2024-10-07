export const formatCurrency = (value: number, currency: string) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    currencyDisplay: `narrowSymbol`,
    currencySign: 'standard',
  })
  return formatter.format(value)
}
