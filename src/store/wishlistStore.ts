import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/data/products'

interface WishlistState {
  items: Product[]
  isOpen: boolean

  // Actions
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  toggleItem: (product: Product) => void
  clearWishlist: () => void
  isInWishlist: (productId: string) => boolean
  openWishlist: () => void
  closeWishlist: () => void
  toggleWishlist: () => void
}

/**
 * Store избранного с persist middleware.
 */
export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product) => {
        set((state) => {
          if (state.items.some((item) => item.id === product.id)) {
            return state
          }
          return { items: [...state.items, product] }
        })
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }))
      },

      toggleItem: (product) => {
        const exists = get().items.some((item) => item.id === product.id)
        if (exists) {
          get().removeItem(product.id)
        } else {
          get().addItem(product)
        }
      },

      clearWishlist: () => set({ items: [] }),

      isInWishlist: (productId) => {
        return get().items.some((item) => item.id === productId)
      },

      openWishlist: () => set({ isOpen: true }),
      closeWishlist: () => set({ isOpen: false }),
      toggleWishlist: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: 'ascent-wishlist-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
)