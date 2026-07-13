'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { CartItem } from './CartItem'
import { Button, Heading, Text } from '@/components/ui'

export function CartDrawer() {
  const { items, isOpen, closeCart, clearCart, getTotalItems, getTotalPrice } =
    useCartStore()

  // Блокируем скролл body когда drawer открыт
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Закрытие по Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart()
    }
    if (isOpen) window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, closeCart])

  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()
  const formattedTotal = new Intl.NumberFormat('ru-RU').format(totalPrice) + ' ₽'

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop с blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 z-[70] bg-brand-black/60 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              type: 'tween',
              duration: 0.5,
              ease: [0.32, 0.72, 0, 1],
            }}
            className="fixed top-0 right-0 bottom-0 z-[80] w-full max-w-md bg-brand-black border-l border-brand-gray-800 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-brand-gray-800">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-brand-white" strokeWidth={1.5} />
                <Heading as="h2" level={4}>
                  Cart ({totalItems})
                </Heading>
              </div>
              <button
                onClick={closeCart}
                className="text-brand-gray-400 hover:text-brand-white transition-colors p-2 -mr-2"
                aria-label="Закрыть корзину"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Содержимое */}
            <div className="flex-1 overflow-y-auto px-6">
              {items.length === 0 ? (
                <EmptyCart />
              ) : (
                <div>
                  {items.map((item) => (
                    <CartItem
                      key={`${item.product.id}-${item.size}`}
                      item={item}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Footer с итогом и CTA */}
            {items.length > 0 && (
              <div className="border-t border-brand-gray-800 px-6 py-6 space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-brand-gray-400">
                    Subtotal
                  </span>
                  <span className="font-display text-2xl text-brand-white tabular-nums">
                    {formattedTotal}
                  </span>
                </div>

                <p className="text-[11px] text-brand-gray-500">
                  Доставка и налоги рассчитываются при оформлении
                </p>

                <Button variant="primary" size="lg" fullWidth>
                  Checkout
                  <ArrowRight className="h-4 w-4 ml-1" strokeWidth={1.5} />
                </Button>

                <button
                  onClick={clearCart}
                  className="w-full text-[10px] uppercase tracking-[0.3em] text-brand-gray-500 hover:text-brand-white transition-colors py-2"
                >
                  Очистить корзину
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-20">
      <div className="w-20 h-20 rounded-full border border-brand-gray-700 flex items-center justify-center mb-6">
        <ShoppingBag className="h-8 w-8 text-brand-gray-500" strokeWidth={1} />
      </div>
      <Heading level={4} className="mb-3">
        Your cart is empty
      </Heading>
      <Text variant="body" className="mb-8 max-w-xs">
        Добавь товары из каталога, чтобы оформить заказ
      </Text>
      <Link href="/catalog" onClick={useCartStore.getState().closeCart}>
        <Button variant="outline" size="lg">
          Shop Now
        </Button>
      </Link>
    </div>
  )
}