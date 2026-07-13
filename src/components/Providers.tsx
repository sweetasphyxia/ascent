'use client'

import { useState, useEffect, type ReactNode } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Preloader } from '@/components/layout/Preloader'
import { DragCursor } from '@/components/cursor/DragCursor'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { WishlistDrawer } from '@/components/cart/WishlistDrawer'
import { ToastContainer } from '@/components/ui/Toast'
import { SearchModal } from '@/components/modals/SearchModal'
import { NewsletterModal } from '@/components/modals/NewsletterModal'
import { CookieBanner } from '@/components/modals/CookieBanner'

export function Providers({ children }: { children: ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Preloader />
      <DragCursor />

      <AnimatePresence mode="wait">
        <div
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
          }}
        >
          {children}
        </div>
      </AnimatePresence>

      {/* Drawer'ы */}
      <CartDrawer />
      <WishlistDrawer />

      {/* ✅ НОВОЕ: Модалки */}
      <SearchModal />
      <NewsletterModal />

      {/* ✅ НОВОЕ: Toast-уведомления (поверх всего) */}
      <ToastContainer />

      {/* ✅ НОВОЕ: Cookie-баннер */}
      <CookieBanner />
    </>
  )
}