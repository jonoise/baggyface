import { ListProductI, ProductI } from '@/lib/models/product'
import React, { useCallback, useRef } from 'react'
import { useTranslation } from './i18n-provider'
import { CATEGORY_ICONS } from '@/lib/globals'
import { FilePlus2, PlusCircle, PlusIcon } from 'lucide-react'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Price } from './price'
import { toast } from 'sonner'
import { useModalStore } from '@/lib/stores/modal-store'
import { Button } from '../ui/button'
import { useCurrentList, useListsStore } from '@/lib/storage'
import { DialogView } from '../ui/dialog-view'
import { DialogDescription, DialogTitle } from '../ui/dialog'
import { Input } from '../ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { ProductPopoverContent } from './product-popover-content'

export const SearchProductItem = ({ product }: { product: ProductI }) => {
  const t = useTranslation()
  const currentList = useCurrentList()

  const { newListModal } = useModalStore((s) => s)
  const { lists, addProductToList } = useListsStore((s) => s)
  const [open, setOpen] = React.useState(false)

  const [quantity, setQuantity] = React.useState<number | string>(1)

  const category = t.ALL_CATEGORIES.find((c) => c.value === product.category)
  const CategoryIcon =
    CATEGORY_ICONS[category?.value as keyof typeof CATEGORY_ICONS]

  return (
    <>
      <Popover>
        <div className='border border-border p-4 rounded-md space-y-2'>
          <div className='flex items-center justify-between'>
            <PopoverTrigger className='flex items-center space-x-2'>
              <p className='text-xs'>
                {CategoryIcon && <CategoryIcon className='h-4 w-4' />}
              </p>
              <p className='text-xs text-muted-foreground'>{category?.label}</p>
            </PopoverTrigger>
            {currentList ? (
              <>
                <Button
                  onClick={() => setOpen(true)}
                  size='icon'
                  className='h-5 w-5'
                  variant='ghost'
                >
                  <PlusIcon className='h-4 w-4' />
                </Button>
              </>
            ) : (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    size='icon'
                    className='h-6 w-6 rounded-md'
                    variant='outline'
                  >
                    <DotsHorizontalIcon className='h-4 w-4 ' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-52'>
                  <DropdownMenuGroup>
                    {/* <DropdownMenuItem>
                            <EyeOpenIcon className='mr-2 h-4 w-4' />
                            <span>Ver Detalles</span>
                          </DropdownMenuItem> */}
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <FilePlus2 className='mr-2 h-4 w-4' />
                        <span>{t.common.add_to_list}</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          {lists.map((list) => (
                            <DropdownMenuItem
                              key={list.id}
                              onClick={() => {
                                addProductToList(list.id, {
                                  ...product,
                                  quantity: 1,
                                })
                                toast.success('Producto agregado')
                              }}
                            >
                              <span>{list.title}</span>
                            </DropdownMenuItem>
                          ))}

                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => newListModal.setOpen(true)}
                          >
                            <PlusCircle className='mr-2 h-4 w-4' />
                            <span>{t.common.new_list}</span>
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          <PopoverTrigger className='text-start max-w-fit' asChild>
            <div className='cursor-pointer'>
              <h3 className='text-sm font-semibold truncate '>
                {product.name}
              </h3>
              <p className='text-xs'>
                {t.common.price}:{' '}
                <span className='underline'>
                  <Price price={product.price} />
                </span>
              </p>
            </div>
          </PopoverTrigger>
        </div>
        <PopoverContent>
          <ProductPopoverContent p={product} />
        </PopoverContent>
      </Popover>
      <DialogView open={open} setOpen={setOpen}>
        <div className='space-y-4'>
          <DialogTitle>Agregar producto</DialogTitle>
          <DialogDescription className='text-foreground'>
            <p>{product.name}</p>
          </DialogDescription>
          <DialogDescription>
            Precio: <Price price={product.price} />
          </DialogDescription>
          <DialogDescription>
            Categoría:{' '}
            {t.ALL_CATEGORIES.find((c) => c.value === product.category)?.label}
          </DialogDescription>
          <Input
            name='quantity'
            onChange={(e) => {
              const test = new RegExp(/^[0-9]+$/)
              if (e.target.value === '') {
                setQuantity('')
                return
              }
              if (test.test(e.target.value)) {
                setQuantity(Number(e.target.value))
              }
            }}
            className='w-full'
            value={quantity}
          />
          <Button
            type='submit'
            className='w-full mt-4'
            onClick={() => {
              addProductToList(currentList?.id!, {
                ...product,
                quantity: Number(quantity ?? 1),
              })
              setOpen(false)
              toast.success('Producto agregado')
            }}
          >
            Agregar
          </Button>
        </div>
      </DialogView>
    </>
  )
}
