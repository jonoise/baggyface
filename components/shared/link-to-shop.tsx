import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

export const LinkToStartShopping = ({
  className,
  listId,
}: {
  className?: string
  listId: string
}) => {
  return (
    <Link className='block' href={`/listas/${listId}/comprar`}>
      <Button className={className}>Ver Detalles</Button>
    </Link>
  )
}
