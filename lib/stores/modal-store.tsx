import { create } from 'zustand'

interface ModalState {
  newListModal: {
    open: boolean
    setOpen: (open: boolean) => void
  }
}

// Create the store
export const useModalStore = create<ModalState>()((set) => ({
  newListModal: {
    open: false,
    setOpen: (open) =>
      set((state) => ({ newListModal: { ...state.newListModal, open } })),
  },
}))
