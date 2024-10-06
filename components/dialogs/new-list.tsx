'use client'

import React from 'react'
import { DialogView } from '../ui/dialog-view'
import { NewListForm } from '../forms/new-list'
import { Button } from '../ui/button'

export const NewListDialog = () => {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>+ Nueva Lista</Button>
      <DialogView open={open} setOpen={setOpen}>
        <NewListForm onSuccess={() => setOpen(false)} />
      </DialogView>
    </>
  )
}
