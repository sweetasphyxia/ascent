'use client'

import { useState, useSyncExternalStore } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag } from 'lucide-react'
import { Badge } from '@/components/ui'
import { cn } from '@/lib/utils'
import type { Product } from '@/data/products'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useUIStore } from '@/store/uiStore'

interface ProductCardProps {
  product: Product
  className?: string
}

/**
 * Карточка товара с:
 * - Hover: фото front ↔ back с кроссфейдом
 * - Hover: выезжающая кнопка Add to Bag снизу и Heart справа сверху
 * - Heart с fill=currentColor когда товар в wishlist (reactive из Zustand store)
 * - Toast уведомления при действиях
 * - Бейджи NEW и -XX% для sale
 * - Перечёркнутая старая цена у sale-товаров
 * 
 * HYDRATION FIX (React 19):
 * Используем useSyncExternalStore вместо паттерна isMounted + useEffect.
 * Это официальный React паттерн для подписки на внешние сторы,
 * которые недоступны на сервере (например, Zustand с persist в localStorage).
 * - На сервере: getServerSnapshot возвращает false
 * - На клиенте: getSnapshot читает реальное значение из store
 * - Нет warning'ов, нет лишних re-render'ов, нет setState в effect
 */
export function ProductCard({ product, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Zustand subscriptions
  const addItem = useCartStore((state) => state.addItem)
  const toggleItem = useWishlistStore((state) => state.toggleItem)
  const addToast = useUIStore((s) => s.addToast)

  // ✅ ИСПРАВЛЕНО: useSyncExternalStore вместо isMounted
  // Подписываемся на wishlist store с правильным server/client snapshot
  const inWishlist = useSyncExternalStore(
    // subscribe: подписываемся на изменения store
    (callback) => useWishlistStore.subscribe(callback),
    // getSnapshot: клиентское значение (читаем из store)
    () => useWishlistStore.getState().items.some((item) => item.id === product.id),
    // getServerSnapshot: серверное значение (всегда false, т.к. localStorage недоступен)
    () => false
  )

  // Форматирование цены с разделителем: 16900 → "16 900 ₽"
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('ru-RU').format(price) + ' ₽'

  // Скидка в процентах для бейджа SALE
  const discount = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product, 'M')
    addToast({
      type: 'success',
      message: `${product.name} добавлен в корзину`,
    })
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    const wasInWishlist = inWishlist
    toggleItem(product)
    addToast({
      type: 'success',
      message: wasInWishlist
        ? `${product.name} удалён из wishlist`
        : `${product.name} добавлен в wishlist`,
    })
  }

  return (
    <motion.article
      className={cn(
        'group relative flex flex-col shrink-0 w-[85vw] sm:w-[400px] md:w-[480px] select-none',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* === ИЗОБРАЖЕНИЕ === */}
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-[3/4] w-full overflow-hidden bg-brand-gray-900"
      >
        {/* Front — видимо по умолчанию */}
        <Image
          src={product.images.front}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 400px, 480px"
          className={cn(
            'object-cover transition-all duration-700 ease-out',
            isHovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          )}
        />

        {/* Back — видимо только при hover */}
        <Image
          src={product.images.back}
          alt={`${product.name} back`}
          fill
          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 400px, 480px"
          className={cn(
            'object-cover transition-all duration-700 ease-out',
            isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          )}
        />

        {/* Тёмный оверлей при hover */}
        <div
          className={cn(
            'absolute inset-0 bg-brand-black/30 transition-opacity duration-500',
            isHovered ? 'opacity-100' : 'opacity-0'
          )}
        />

        {/* Бейджи: NEW и -XX% (левый верхний угол) */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {product.isNew && <Badge variant="new">NEW</Badge>}
          {product.isSale && <Badge variant="sale">-{discount}%</Badge>}
        </div>

        {/* Кнопка wishlist: fill меняется от inWishlist (реактивно) */}
        <button
          onClick={handleToggleWishlist}
          className={cn(
            'absolute top-4 right-4 z-10',
            'flex h-10 w-10 items-center justify-center',
            'backdrop-blur-sm border transition-all duration-300',
            inWishlist
              ? 'bg-brand-white text-brand-black border-brand-white'
              : 'bg-brand-black/60 text-brand-white border-brand-white/20 hover:bg-brand-white hover:text-brand-black',
            isHovered || inWishlist
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-2'
          )}
          aria-label={
            inWishlist ? 'Удалить из избранного' : 'Добавить в избранное'
          }
        >
          <Heart
            className="h-4 w-4"
            strokeWidth={1.5}
            fill={inWishlist ? 'currentColor' : 'none'}
          />
        </button>

        {/* Add to Bag: появляется снизу только при hover */}
        <div
          className={cn(
            'absolute bottom-0 left-0 right-0 p-4 z-10',
            'transition-all duration-500 ease-out',
            isHovered
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          )}
        >
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 bg-brand-white text-brand-black py-3 uppercase text-xs tracking-[0.2em] font-medium hover:bg-brand-gray-100 transition-colors duration-300"
          >
            <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
            Add to Bag
          </button>
        </div>
      </Link>

      {/* === ИНФОРМАЦИЯ === */}
      <div className="flex items-start justify-between gap-4 pt-5 pb-2">
        <div className="flex-1 min-w-0">
          <Link href={`/product/${product.slug}`} className="group/title">
            <h3 className="font-display text-lg uppercase tracking-wide text-brand-white group-hover/title:text-brand-gray-300 transition-colors truncate">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs uppercase tracking-[0.2em] text-brand-gray-500 mt-1">
            {product.color}
          </p>
        </div>

        <div className="text-right shrink-0">
          {product.salePrice ? (
            <>
              <p className="font-display text-lg text-brand-white tabular-nums">
                {formatPrice(product.salePrice)}
              </p>
              <p className="text-xs text-brand-gray-500 line-through tabular-nums mt-0.5">
                {formatPrice(product.price)}
              </p>
            </>
          ) : (
            <p className="font-display text-lg text-brand-white tabular-nums">
              {formatPrice(product.price)}
            </p>
          )}
        </div>
      </div>
    </motion.article>
  )
}