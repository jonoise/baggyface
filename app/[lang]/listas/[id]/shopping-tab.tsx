import { useCurrentList } from '@/lib/storage'
import React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { ListProductI } from '@/lib/models/product'
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { useTranslation } from '@/components/shared/i18n-provider'
import { Button } from '@/components/ui/button'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ProductPopoverContent } from '@/components/shared/product-popover-content'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { RiArrowTurnBackLine } from '@remixicon/react'
import { UndoIcon } from 'lucide-react'

export const ShoppingTab = ({
  shopping,
  setShopping,
}: {
  shopping: { [key: string]: boolean }
  setShopping: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>
}) => {
  const t = useTranslation()
  const list = useCurrentList()

  return (
    <div className='space-y-5'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-xl md:text-4xl font-semibold'>
            {t.common.shopping}
          </h3>
          <p className='text-sm text-muted-foreground'>
            {t.lists_details.shopping_description}
          </p>
        </div>
        <div className='flex items-center space-x-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='icon'>
                <DotsHorizontalIcon className='h-4 w-4 ' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-52'>
              <DropdownMenuItem
                onClick={() => {
                  setShopping({})
                }}
              >
                <UndoIcon className='mr-2 h-4 w-4' />
                <span>Reiniciar checks</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {list?.products && list?.products.length > 0 && (
        <div className='space-y-2'>
          {list?.products.map((p) => (
            <ProductItem
              product={p}
              shopping={shopping}
              setShopping={setShopping}
              key={p._id}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const ProductItem = ({
  product,
  shopping,
  setShopping,
}: {
  product: ListProductI
  shopping: { [key: string]: boolean }
  setShopping: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null)

  const completed = shopping[product._id as keyof typeof shopping]

  const [{ x }, api] = useSpring(() => ({
    x: 0,
    onChange: (x) => console.log({ what: x }),
  }))

  const bind = useDrag(
    ({ down, movement: [mx], last }) => {
      api.start({ x: down ? mx + 10 : 0 })
      if (last) {
        setShopping((p) => ({ ...p, [product._id]: !p[product._id] }))
      }
    },
    { axis: 'x' }
  )

  return (
    <Popover>
      <animated.div ref={containerRef}>
        <animated.div
          className={cn('w-full h-full bg-accent p-2 rounded-md space-y-2', {
            'line-through text-muted-foreground': completed,
          })}
          {...bind()}
          style={{ x, touchAction: 'pan-y' }}
          onClick={() => {}}
        >
          <div className={cn('flex items-center justify-between')}>
            <PopoverTrigger className='block w-[80%] text-start'>
              <p className='truncate text-sm'>{product.name}</p>
              <p>
                Cantidad: <span>{product.quantity ?? 1}</span>
              </p>
            </PopoverTrigger>
            <Checkbox
              checked={completed ?? false}
              className={'h-9 w-9'}
              onCheckedChange={() => {
                setShopping((p) => ({
                  ...p,
                  [product._id]: !p[product._id],
                }))
              }}
            />
          </div>
        </animated.div>
      </animated.div>

      <PopoverContent>
        <ProductPopoverContent p={product} />
      </PopoverContent>
    </Popover>
  )
}
