import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ModalType = 'search' | 'newsletter' | 'quickView' | null

export interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
  duration?: number
}

interface UIState {
  // Модалки
  activeModal: ModalType
  openModal: (modal: ModalType) => void
  closeModal: () => void

  // Toasts
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void

  // Cookie consent
  cookiesAccepted: boolean
  acceptCookies: () => void

  // Newsletter (чтобы не показывать повторно)
  newsletterShown: boolean
  markNewsletterShown: () => void
}

/**
 * Единый store для UI-состояния.
 * - cookiesAccepted и newsletterShown сохраняются в localStorage
 * - toasts и модалки — только в памяти (сбрасываются при перезагрузке)
 */
export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      // Модалки
      activeModal: null,

      openModal: (modal) => set({ activeModal: modal }),
      closeModal: () => set({ activeModal: null }),

      // Toasts
      toasts: [],

      addToast: (toast) => {
        const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
        const newToast: Toast = {
          id,
          duration: 3500,
          ...toast,
        }
        set((state) => ({ toasts: [...state.toasts, newToast] }))

        // Автоудаление через duration
        setTimeout(() => {
          get().removeToast(id)
        }, newToast.duration)
      },

      removeToast: (id) => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }))
      },

      // Cookie
      cookiesAccepted: false,
      acceptCookies: () => set({ cookiesAccepted: true }),

      // Newsletter
      newsletterShown: false,
      markNewsletterShown: () => set({ newsletterShown: true }),
    }),
    {
      name: 'ascent-ui-storage',
      // Сохраняем только то, что должно жить между сессиями
      partialize: (state) => ({
        cookiesAccepted: state.cookiesAccepted,
        newsletterShown: state.newsletterShown,
      }),
    }
  )
)