import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import SearchProducts from '../shared/search-products'
import { Button } from '../ui/button'
import { useCurrentList, useListsStore } from '@/lib/storage'
import { toast } from 'sonner'
import { useMediaQuery } from '@/lib/hooks/use-media-query'

export const SearchProductsDialog = () => {
  const list = useCurrentList()
  const { addProductToList } = useListsStore((s) => s)
  const { isMobile } = useMediaQuery()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ {!isMobile ? 'Buscar productos' : 'Buscar'}</Button>
      </DialogTrigger>
      <DialogContent className='max-w-5xl max-h-[70vh] overflow-y-auto p-0'>
        <SearchProducts
          addToList={{
            listId: list?.id!,
            onAdd: (product) => {
              addProductToList(list?.id!, product)
              toast.success('Producto agregado')
            },
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
