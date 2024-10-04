import { PageContainer } from '@/components/shared/page-container'
import React from 'react'

const PostsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PageContainer>
      <div className='prose dark:prose-invert'>{children}</div>
    </PageContainer>
  )
}

export default PostsLayout
