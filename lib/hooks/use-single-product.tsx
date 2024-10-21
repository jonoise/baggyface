import React from 'react'
import useSWR from 'swr'

export const useSingleProduct = ({ id }: { id: string }) => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `/api/products/${id}`
  )

  return {
    product: data,
    error,
    isLoading,
    isValidating,
    mutate,
  }
}
