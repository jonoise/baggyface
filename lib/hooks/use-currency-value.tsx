import useSWR from 'swr'
import { ProductI } from '../models/product'

export const useExchangeRate = () => {
  const {
    data: exchange,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<ProductI[]>(
    '/api/exchange',
    async (url) => fetch(url).then((res) => res.json()),
    {
      dedupingInterval: 7200000,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  return {
    exchange,
    error,
    isLoading,
    isValidating,
    mutate,
  }
}
