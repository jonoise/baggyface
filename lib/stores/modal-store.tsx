import { create } from 'zustand'

interface ModalState {
  newList: {
    open: boolean
    setOpen: (open: boolean) => void
  }
}

// Create the store
export const useModalStore = create<ModalState>()((set) => ({
  newList: {
    open: false,
    setOpen: (open) =>
      set((state) => ({ newList: { ...state.newList, open } })),
  },
}))
