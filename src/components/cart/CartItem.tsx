'use client'

import Image from 'next/image'
import { Minus, Plus, X } from 'lucide-react'
import { useCartStore, type CartItem as CartItemType } from '@/store/cartStore'

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQuantity } = useCartStore()
  const { product, size, quantity } = item

  const price = product.salePrice ?? product.price
  const formattedPrice = new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
  const subtotal = new Intl.NumberFormat('ru-RU').format(price * quantity) + ' ₽'

  return (
    <div className="flex gap-4 py-6 border-b border-brand-gray-800 last:border-b-0">
      {/* Изображение */}
      <div className="relative w-24 h-32 shrink-0 bg-brand-gray-900 overflow-hidden">
        <Image
          src={product.images.front}
          alt={product.name}
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>

      {/* Информация */}
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-display text-sm uppercase tracking-wide text-brand-white truncate">
            {product.name}
          </h3>
          <button
            onClick={() => removeItem(product.id, size)}
            className="shrink-0 text-brand-gray-500 hover:text-brand-white transition-colors p-1 -mr-1"
            aria-label="Удалить"
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>

        <p className="text-[10px] uppercase tracking-[0.2em] text-brand-gray-500 mb-3">
          {product.color} · Size {size}
        </p>

        <div className="mt-auto flex items-center justify-between">
          {/* Управление количеством */}
          <div className="flex items-center border border-brand-gray-700">
            <button
              onClick={() => updateQuantity(product.id, size, quantity - 1)}
              className="w-8 h-8 flex items-center justify-center text-brand-gray-400 hover:text-brand-white transition-colors"
              aria-label="Уменьшить"
            >
              <Minus className="h-3 w-3" strokeWidth={1.5} />
            </button>
            <span className="w-8 h-8 flex items-center justify-center text-xs text-brand-white tabular-nums">
              {quantity}
            </span>
            <button
              onClick={() => updateQuantity(product.id, size, quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-brand-gray-400 hover:text-brand-white transition-colors"
              aria-label="Увеличить"
            >
              <Plus className="h-3 w-3" strokeWidth={1.5} />
            </button>
          </div>

          {/* Цена */}
          <div className="text-right">
            <p className="font-display text-sm text-brand-white tabular-nums">
              {subtotal}
            </p>
            {quantity > 1 && (
              <p className="text-[10px] text-brand-gray-500 tabular-nums">
                {formattedPrice} each
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}