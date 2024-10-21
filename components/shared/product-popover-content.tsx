import { useSingleProduct } from '@/lib/hooks/use-single-product'
import { ListProductI, ProductI } from '@/lib/models/product'
import { Skeleton } from '../ui/skeleton'
import { Price } from './price'

export const ProductPopoverContent = ({
  p,
}: {
  p: ListProductI | ProductI
}) => {
  const { product } = useSingleProduct({ id: p._id })

  if (!product)
    return (
      <div className='space-y-2'>
        <div className='flex items-center h-[100%] justify-center'>
          <Skeleton className={'w-[100%] overflow-hidden h-52 relative'} />
        </div>
        <Skeleton className='h-7 w-[80%]' />
        <Skeleton className='h-7 w-10' />
      </div>
    )

  return (
    <div>
      <div className='flex items-center h-[100%] justify-center'>
        <div className={'w-[100%] overflow-hidden h-52 relative'}>
          <img
            src={product.images[0].imageUrl}
            className='object-cover w-full h-full'
            alt=''
          />
        </div>
      </div>
      <p>{product.name}</p>
      <Price price={product.price} />
    </div>
  )
}
