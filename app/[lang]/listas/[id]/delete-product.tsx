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
        <DialogTitle>Eliminar producto</DialogTitle>
        <div>
          <p>Deseas eliminar {product.name} de la lista?</p>
          <div className='mt-4 flex justify-end gap-4'>
            <Button variant={'outline'} onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                removeProductFromList(list?.id!, product._id)
                setOpen(false)
                toast.success('Producto eliminado')
              }}
              variant='destructive'
            >
              Eliminar
            </Button>
          </div>
        </div>
      </DialogView>
    </>
  )
}
