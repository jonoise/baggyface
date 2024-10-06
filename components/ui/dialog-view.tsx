'use client'
import React from 'react'
import { Dispatch, SetStateAction } from 'react'
import { Dialog, DialogContent } from './dialog'
import { Drawer, DrawerContent } from './drawer'
import { useMediaQuery } from '@/lib/hooks/use-media-query'

export function DialogView({
  children,
  open,
  className,
  drawerClassName,
  setOpen,
  onClose,
  desktopOnly,
  preventDefaultClose,
}: {
  children: React.ReactNode
  className?: string
  drawerClassName?: string
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
  onClose?: () => void
  desktopOnly?: boolean
  preventDefaultClose?: boolean
}) {
  const closeModal = ({ dragged }: { dragged?: boolean } = {}) => {
    if (preventDefaultClose && !dragged) {
      return
    }
    // fire onClose event if provided
    onClose && onClose()
    setOpen && setOpen(false)
  }
  const { isMobile } = useMediaQuery()

  if (isMobile && !desktopOnly) {
    return (
      <Drawer
        open={setOpen ? open : true}
        onOpenChange={(open) => {
          if (!open) {
            closeModal({ dragged: true })
          }
        }}
      >
        <DrawerContent className={drawerClassName}>{children}</DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog
      open={setOpen ? open : true}
      onOpenChange={(open) => {
        if (!open) {
          closeModal()
        }
      }}
    >
      <DialogContent className={className}>{children}</DialogContent>
    </Dialog>
  )
}
