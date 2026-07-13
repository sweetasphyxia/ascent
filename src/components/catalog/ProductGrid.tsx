'use client'

import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import type { Product } from '@/data/products'

interface ProductGridProps {
  products: Product[]
}

/**
 * Адаптивная сетка товаров с layout-анимацией.
 * При изменении фильтров карточки плавно перестраиваются.
 */
export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return <EmptyState />
  }

  return (
    <LayoutGroup>
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-6 md:gap-y-16"
      >
        <AnimatePresence mode="popLayout">
          {products.map((product) => (
            <GridProductCard key={product.id} product={product} />
          ))}
        </AnimatePresence>
      </motion.div>
    </LayoutGroup>
  )
}

function GridProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false)
  const addItem = useCartStore((s) => s.addItem)
  const { toggleItem, isInWishlist } = useWishlistStore()
  const inWishlist = isInWishlist(product.id)

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('ru-RU').format(price) + ' ₽'

  const discount = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-[3/4] w-full overflow-hidden bg-brand-gray-900"
      >
        <Image
          src={product.images.front}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
          className={cn(
            'object-cover transition-all duration-700 ease-out',
            isHovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          )}
        />
        <Image
          src={product.images.back}
          alt={`${product.name} back`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
          className={cn(
            'object-cover transition-all duration-700 ease-out',
            isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          )}
        />

        <div
          className={cn(
            'absolute inset-0 bg-brand-black/30 transition-opacity duration-500',
            isHovered ? 'opacity-100' : 'opacity-0'
          )}
        />

        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {product.isNew && <Badge variant="new">NEW</Badge>}
          {product.isSale && <Badge variant="sale">-{discount}%</Badge>}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault()
            toggleItem(product)
          }}
          className={cn(
            'absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center backdrop-blur-sm border transition-all duration-300',
            inWishlist
              ? 'bg-brand-white text-brand-black border-brand-white'
              : 'bg-brand-black/60 text-brand-white border-brand-white/20 hover:bg-brand-white hover:text-brand-black',
            isHovered || inWishlist
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-2'
          )}
        >
          <Heart
            className="h-4 w-4"
            strokeWidth={1.5}
            fill={inWishlist ? 'currentColor' : 'none'}
          />
        </button>

        <div
          className={cn(
            'absolute bottom-0 left-0 right-0 p-3 z-10 transition-all duration-500 ease-out',
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}
        >
          <button
            onClick={(e) => {
              e.preventDefault()
              addItem(product, 'M')
            }}
            className="w-full flex items-center justify-center gap-2 bg-brand-white text-brand-black py-2.5 uppercase text-[10px] tracking-[0.2em] font-medium hover:bg-brand-gray-100 transition-colors"
          >
            <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.5} />
            Add to Bag
          </button>
        </div>
      </Link>

      <div className="flex items-start justify-between gap-4 pt-4">
        <div className="flex-1 min-w-0">
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-display text-base uppercase tracking-wide text-brand-white hover:text-brand-gray-300 transition-colors truncate">
              {product.name}
            </h3>
          </Link>
          <p className="text-[10px] uppercase tracking-[0.2em] text-brand-gray-500 mt-1">
            {product.color}
          </p>
        </div>

        <div className="text-right shrink-0">
          {product.salePrice ? (
            <>
              <p className="font-display text-base text-brand-white tabular-nums">
                {formatPrice(product.salePrice)}
              </p>
              <p className="text-[10px] text-brand-gray-500 line-through tabular-nums mt-0.5">
                {formatPrice(product.price)}
              </p>
            </>
          ) : (
            <p className="font-display text-base text-brand-white tabular-nums">
              {formatPrice(product.price)}
            </p>
          )}
        </div>
      </div>
    </motion.article>
  )
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-32 text-center"
    >
      <div className="w-24 h-24 rounded-full border border-brand-gray-700 flex items-center justify-center mb-8">
        <span className="font-display text-4xl text-brand-gray-600">∅</span>
      </div>
      <h3 className="font-display text-display-sm uppercase tracking-tight text-brand-white mb-4">
        No products found
      </h3>
      <p className="text-sm text-brand-gray-400 max-w-md">
        Попробуй изменить параметры фильтров или сбросить их, чтобы увидеть больше товаров.
      </p>
    </motion.div>
  )
}