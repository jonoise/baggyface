import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import SearchProducts from '../shared/search-products'
import { Button } from '../ui/button'
import { useCurrentList, useListsStore } from '@/lib/storage'
import { toast } from 'sonner'
import { useMediaQuery } from '@/lib/hooks/use-media-query'
import { RiCloseLine } from '@remixicon/react'
import { useTranslation } from '../shared/i18n-provider'

export const SearchProductsDialog = () => {
  const list = useCurrentList()
  const { addProductToList } = useListsStore((s) => s)
  const { isMobile } = useMediaQuery()
  const [open, setOpen] = React.useState(false)
  const t = useTranslation()

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open)
      }}
    >
      <Button onClick={() => setOpen(true)}>
        + {!isMobile ? t.common.add_products : t.common.add}
      </Button>

      <DialogContent
        hideClose
        className='max-w-5xl max-h-[80vh] md:max-h-[70vh] overflow-y-auto p-0 px-2'
      >
        <div className='flex items-center justify-between mt-2'>
          <h3 className='text-xs'>{t.common.search}</h3>
          <Button
            variant='ghost'
            size='icon'
            className='-ml-10 h-7 w-7 rounded-lg'
            onClick={() => {
              setOpen(false)
            }}
          >
            <RiCloseLine className='h-5 w-5' />
          </Button>
        </div>
        <SearchProducts
          addToList={{
            listId: list?.id!,
            onAdd: (product) => {
              addProductToList(list?.id!, { ...product, quantity: 1 })
              toast.success('Producto agregado')
            },
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
