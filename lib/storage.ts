'use client'

import { useParams } from 'next/navigation'
import { ListProductI } from './models/product'

export interface ListI {
  id: string
  title: string
  description: string
  tags: string[]
  products: ListProductI[]
  createdAt: Date
  updatedAt: Date
}
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Define the store state
interface ProductListState {
  lists: ListI[]
  addList: (list: ListI) => void
  removeList: (id: string) => void
  updateList: (id: string, updatedList: Partial<ListI>) => void
  addProductToList: (listId: string, product: ListProductI) => void
  removeProductFromList: (listId: string, productId: string) => void
  getListById: (id: string) => ListI | undefined
}

// Create the store
export const useListsStore = create<ProductListState>()(
  persist(
    (set, get) => ({
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

      getListById: (id) => get().lists.find((list) => list.id === id),
    }),
    {
      name: 'product-list-storage',
    }
  )
)

export function useCurrentList() {
  const params = useParams()
  const getListById = useListsStore((state) => state.getListById)
  return getListById(params.id as string)
}
