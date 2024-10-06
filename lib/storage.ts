import { ProductI } from './models/product'

export interface ProductListI {
  id: string
  title: string
  description: string
  tags: string[]
  products: ProductI[]
  createdAt: Date
  updatedAt: Date
}
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Define the store state
interface ProductListState {
  lists: ProductListI[]
  addList: (list: ProductListI) => void
  removeList: (id: string) => void
  updateList: (id: string, updatedList: Partial<ProductListI>) => void
  addProductToList: (listId: string, product: ProductI) => void
  removeProductFromList: (listId: string, productId: string) => void
}

// Create the store
export const useProductListStore = create<ProductListState>()(
  persist(
    (set) => ({
      lists: [],

      addList: (list) =>
        set((state) => ({
          lists: [...state.lists, list],
        })),

      removeList: (id) =>
        set((state) => ({
          lists: state.lists.filter((list) => list.id !== id),
        })),

      updateList: (id, updatedList) =>
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === id
              ? { ...list, ...updatedList, updatedAt: new Date() }
              : list
          ),
        })),

      addProductToList: (listId, product) =>
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === listId
              ? { ...list, products: [...list.products, product] }
              : list
          ),
        })),

      removeProductFromList: (listId, productId) =>
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  products: list.products.filter((p) => p._id !== productId),
                }
              : list
          ),
        })),
    }),
    {
      name: 'product-list-storage',
    }
  )
)
