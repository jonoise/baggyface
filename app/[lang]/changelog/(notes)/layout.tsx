import React from 'react'

const ChangelogNotesLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className='prose dark:prose-invert max-w-none'>{children}</div>
}

export default ChangelogNotesLayout
