'use client'
import { ProductListI, useListsStore } from '@/lib/storage'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { LoadingState } from './loading-state'
import { PageContainer } from '@/components/shared/page-container'
import { useDebounce } from 'use-debounce'
import SearchProducts from '@/components/shared/search-products'

const ListDetailsPage = () => {
  const { id } = useParams()
  const { getListById, updateList } = useListsStore()

  const [list, setList] = React.useState<ProductListI | undefined>(undefined)
  const [payload, setPayload] = React.useState<Partial<ProductListI>>({})
  const [debouncedPayload] = useDebounce(payload, 500)

  useEffect(() => {
    if (id && list) {
      setPayload({
        title: list.title,
        description: list.description,
      })
    }
  }, [id, list])

  React.useEffect(() => {
    if (id) {
      const list = getListById(id as string)
      setList(list)
    }
  }, [id])

  useEffect(() => {
    if (id && list) {
      updateList(list.id!, debouncedPayload)
    }
  }, [id, list, debouncedPayload])

  if (!list) return <LoadingState />

  return (
    <PageContainer>
      <div className='flex flex-col space-y-4'>
        <input
          type='text'
          defaultValue={list.title || ''}
          onChange={(e) => setPayload((p) => ({ ...p, title: e.target.value }))}
          className='w-full text-5xl rounded-md border-0 bg-background px-3 py-2 shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
        />
        <textarea
          defaultValue={list.description || ''}
          onChange={(e) =>
            setPayload((p) => ({ ...p, description: e.target.value }))
          }
          className='w-full rounded-md border-0 bg-background px-3 py-2 shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
        />
      </div>
      <SearchProducts />
    </PageContainer>
  )
}

export default ListDetailsPage
