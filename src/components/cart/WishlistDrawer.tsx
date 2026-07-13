'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart } from 'lucide-react'
import Link from 'next/link'
import { useWishlistStore } from '@/store/wishlistStore'
import { WishlistItem } from './WishlistItem'
import { Button, Heading, Text } from '@/components/ui'

export function WishlistDrawer() {
  const { items, isOpen, closeWishlist } = useWishlistStore()

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

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeWishlist()
    }
    if (isOpen) window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, closeWishlist])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeWishlist}
            className="fixed inset-0 z-[70] bg-brand-black/60 backdrop-blur-md"
          />

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
            <div className="flex items-center justify-between px-6 py-5 border-b border-brand-gray-800">
              <div className="flex items-center gap-3">
                <Heart className="h-5 w-5 text-brand-white" strokeWidth={1.5} />
                <Heading as="h2" level={4}>
                  Wishlist ({items.length})
                </Heading>
              </div>
              <button
                onClick={closeWishlist}
                className="text-brand-gray-400 hover:text-brand-white transition-colors p-2 -mr-2"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6">
              {items.length === 0 ? (
                <EmptyWishlist />
              ) : (
                <div>
                  {items.map((product) => (
                    <WishlistItem key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

function EmptyWishlist() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-20">
      <div className="w-20 h-20 rounded-full border border-brand-gray-700 flex items-center justify-center mb-6">
        <Heart className="h-8 w-8 text-brand-gray-500" strokeWidth={1} />
      </div>
      <Heading level={4} className="mb-3">
        Your wishlist is empty
      </Heading>
      <Text variant="body" className="mb-8 max-w-xs">
        Сохраняй любимые товары, чтобы не потерять
      </Text>
      <Link href="/catalog" onClick={useWishlistStore.getState().closeWishlist}>
        <Button variant="outline" size="lg">
          Explore Collection
        </Button>
      </Link>
    </div>
  )
}