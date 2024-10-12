'use client'

import React from 'react'
import { DialogView } from '../ui/dialog-view'
import { NewListForm } from '../forms/new-list'
import { Button } from '../ui/button'
import { useTranslation } from '../shared/i18n-provider'

export const NewListDialog = () => {
  const t = useTranslation()
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>+ {t.common.new_list}</Button>
      <DialogView open={open} setOpen={setOpen}>
        <NewListForm onSuccess={() => setOpen(false)} />
      </DialogView>
    </>
  )
}
