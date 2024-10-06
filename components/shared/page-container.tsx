import React, { PropsWithChildren } from 'react'

export const PageContainer = ({ children }: PropsWithChildren) => {
  return <div className='p-4 xl:p-8'>{children}</div>
}
