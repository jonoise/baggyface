import { cn } from '@/lib/utils'
import React, { PropsWithChildren } from 'react'

export const PageContainer = ({
  children,
  className,
}: PropsWithChildren & {
  className?: string
}) => {
  return <div className={cn('px-4 xl:px-8', className)}>{children}</div>
}
