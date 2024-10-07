import { cn } from '@/lib/utils'
import React, { PropsWithChildren } from 'react'

export const PageContainer = ({
  children,
  className,
}: PropsWithChildren & {
  className?: string
}) => {
  return <div className={cn('p-4 xl:p-8', className)}>{children}</div>
}
