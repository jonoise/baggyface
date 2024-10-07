import useSWR from 'swr'
import { ProductI } from '../models/product'

export const useProducts = () => {
  const {
    data: products,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<ProductI[]>(
    '/api/products',
    async (url) => fetch(url).then((res) => res.json()),
    {
      dedupingInterval: 7200000,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  return {
    products,
    error,
    isLoading,
    isValidating,
    mutate,
  }
}
