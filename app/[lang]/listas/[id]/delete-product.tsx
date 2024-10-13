import { useTranslation } from '@/components/shared/i18n-provider'
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { DialogView } from '@/components/ui/dialog-view'
import { ProductI } from '@/lib/models/product'
import { useCurrentList, useListsStore } from '@/lib/storage'
import { TrashIcon } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

export const DeleteProduct = ({ product }: { product: ProductI }) => {
  const [open, setOpen] = React.useState(false)
  const list = useCurrentList()
  const t = useTranslation()
  const { removeProductFromList } = useListsStore((s) => s)
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className='h-6 w-6'
        size={'icon'}
        variant={'destructive'}
      >
        <TrashIcon className='h-3 w-3' strokeWidth={1} />
      </Button>
      <DialogView
        drawerClassName='mt-4 space-y-5'
        open={open}
        setOpen={setOpen}
      >
        <DialogTitle>{t.components.delete_product.title}</DialogTitle>
        <div>
          <p>
            {t.components.delete_product.description} {product.name}?
          </p>
          <div className='mt-4 flex justify-end gap-4'>
            <Button variant={'outline'} onClick={() => setOpen(false)}>
              {t.common.cancel}
            </Button>
            <Button
              onClick={() => {
                removeProductFromList(list?.id!, product._id)
                setOpen(false)
                toast.success(t.components.delete_product.on_success)
              }}
              variant='destructive'
            >
              {t.common.delete}
            </Button>
          </div>
        </div>
      </DialogView>
    </>
  )
}
