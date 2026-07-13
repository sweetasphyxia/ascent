'use client'

import Image from 'next/image'
import { X, ShoppingBag } from 'lucide-react'
import { useWishlistStore } from '@/store/wishlistStore'
import { useCartStore } from '@/store/cartStore'
import type { Product } from '@/data/products'

interface WishlistItemProps {
  product: Product
}

export function WishlistItem({ product }: WishlistItemProps) {
  const { removeItem } = useWishlistStore()
  const { addItem } = useCartStore()

  const price = product.salePrice ?? product.price
  const formattedPrice = new Intl.NumberFormat('ru-RU').format(price) + ' ₽'

  const handleMoveToCart = () => {
    addItem(product, 'M') // По умолчанию размер M
    removeItem(product.id)
  }

  return (
    <div className="flex gap-4 py-6 border-b border-brand-gray-800 last:border-b-0">
      <div className="relative w-24 h-32 shrink-0 bg-brand-gray-900 overflow-hidden">
        <Image
          src={product.images.front}
          alt={product.name}
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>

      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-display text-sm uppercase tracking-wide text-brand-white truncate">
            {product.name}
          </h3>
          <button
            onClick={() => removeItem(product.id)}
            className="shrink-0 text-brand-gray-500 hover:text-brand-white transition-colors p-1 -mr-1"
            aria-label="Удалить"
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>

        <p className="text-[10px] uppercase tracking-[0.2em] text-brand-gray-500 mb-3">
          {product.color}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <span className="font-display text-sm text-brand-white tabular-nums">
            {formattedPrice}
          </span>
          <button
            onClick={handleMoveToCart}
            className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-brand-white hover:text-brand-gray-300 transition-colors"
          >
            <ShoppingBag className="h-3 w-3" strokeWidth={1.5} />
            Add
          </button>
        </div>
      </div>
    </div>
  )
}