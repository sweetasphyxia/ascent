import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/data/products'

/**
 * Элемент корзины — товар + выбранный размер + количество
 */
export interface CartItem {
  product: Product
  size: 'XS' | 'S' | 'M' | 'L' | 'XL'
  quantity: number
}

/**
 * Уникальный ключ элемента корзины (productId + size).
 * Один и тот же товар разных размеров = разные позиции в корзине.
 */
const getCartItemId = (product: Product, size: string) =>
  `${product.id}-${size}`

interface CartState {
  items: CartItem[]
  isOpen: boolean

  // Actions
  addItem: (product: Product, size?: 'XS' | 'S' | 'M' | 'L' | 'XL') => void
  removeItem: (productId: string, size: string) => void
  updateQuantity: (productId: string, size: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void

  // Селекторы
  getTotalItems: () => number
  getTotalPrice: () => number
}

/**
 * Store корзины с persist middleware.
 * Данные сохраняются в localStorage — корзина не теряется при перезагрузке.
 */
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, size = 'M') => {
        set((state) => {
          const itemId = getCartItemId(product, size)
          const existingItem = state.items.find(
            (item) => getCartItemId(item.product, item.size) === itemId
          )

          if (existingItem) {
            // Увеличиваем количество существующего
            return {
              items: state.items.map((item) =>
                getCartItemId(item.product, item.size) === itemId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
              isOpen: true, // Открываем корзину при добавлении
            }
          }

          // Добавляем новый элемент
          return {
            items: [...state.items, { product, size, quantity: 1 }],
            isOpen: true,
          }
        })
      },

      removeItem: (productId, size) => {
        set((state) => ({
          items: state.items.filter(
            (item) => getCartItemId(item.product, item.size) !== `${productId}-${size}`
          ),
        }))
      },

      updateQuantity: (productId, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, size)
          return
        }

        set((state) => ({
          items: state.items.map((item) =>
            getCartItemId(item.product, item.size) === `${productId}-${size}`
              ? { ...item, quantity }
              : item
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce((sum, item) => {
          const price = item.product.salePrice ?? item.product.price
          return sum + price * item.quantity
        }, 0)
      },
    }),
    {
      name: 'ascent-cart-storage', // Ключ в localStorage
      partialize: (state) => ({ items: state.items }), // Сохраняем только items
    }
  )
)