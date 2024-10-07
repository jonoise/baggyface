'use client'

import { NewListForm } from '@/components/forms/new-list'
import { DialogView } from '@/components/ui/dialog-view'
import { useModalStore } from '@/lib/stores/modal-store'
import React from 'react'

export const ModalsProvider = () => {
  const { newList } = useModalStore((s) => s)
  return (
    <>
      <DialogView
        open={newList.open}
        setOpen={(value) => newList.setOpen(value as boolean)}
      >
        <NewListForm onSuccess={() => newList.setOpen(false)} />
      </DialogView>
    </>
  )
}
