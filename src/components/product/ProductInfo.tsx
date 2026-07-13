'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag, ChevronDown, Check } from 'lucide-react'
import { Button, Heading, Text, Badge, Divider } from '@/components/ui'
import { SizeSelector } from './SizeSelector'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useUIStore } from '@/store/uiStore'
import type { Product } from '@/data/products'

interface ProductInfoProps {
  product: Product
}

type Size = 'XS' | 'S' | 'M' | 'L' | 'XL'

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState<Size | null>(null)
  const [activeAccordion, setActiveAccordion] = useState<string | null>('details')

  const addItem = useCartStore((s) => s.addItem)
  const { toggleItem, isInWishlist } = useWishlistStore()
  const inWishlist = isInWishlist(product.id)
  const addToast = useUIStore((s) => s.addToast)

  const price = product.salePrice ?? product.price
  const formatPrice = (p: number) =>
    new Intl.NumberFormat('ru-RU').format(p) + ' ₽'

  const discount = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0

  const handleAddToCart = () => {
    if (!selectedSize) {
      addToast({
        type: 'error',
        message: 'Пожалуйста, выберите размер',
      })
      return
    }
    addItem(product, selectedSize)
    addToast({
      type: 'success',
      message: `${product.name} (Size ${selectedSize}) добавлен в корзину`,
    })
  }

  const handleToggleWishlist = () => {
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
    <div className="lg:sticky lg:top-28 lg:self-start space-y-8">
      {/* Бейджи */}
      <div className="flex items-center gap-2">
        {product.isNew && <Badge variant="new">NEW</Badge>}
        {product.isSale && <Badge variant="sale">-{discount}%</Badge>}
      </div>

      {/* Название */}
      <div>
        <Heading level={2} className="text-display-md!">
          {product.name}
        </Heading>
        <p className="text-xs uppercase tracking-[0.3em] text-brand-gray-500 mt-2">
          {product.color}
        </p>
      </div>

      {/* Цена */}
      <div className="flex items-baseline gap-4">
        <span className="font-display text-3xl text-brand-white tabular-nums">
          {formatPrice(price)}
        </span>
        {product.salePrice && (
          <span className="text-sm text-brand-gray-500 line-through tabular-nums">
            {formatPrice(product.price)}
          </span>
        )}
      </div>

      <Divider />

      {/* Описание */}
      <Text variant="body">{product.description}</Text>

      <Divider />

      {/* Выбор размера */}
      <SizeSelector
        availableSizes={product.sizes}
        selectedSize={selectedSize}
        onSelect={setSelectedSize}
      />

      {/* Кнопки */}
      <div className="space-y-3 pt-2">
        <Button
          variant="primary"
          size="xl"
          fullWidth
          onClick={handleAddToCart}
          icon={<ShoppingBag className="h-4 w-4" strokeWidth={1.5} />}
        >
          Add to Bag
        </Button>

        <Button
          variant="outline"
          size="xl"
          fullWidth
          onClick={handleToggleWishlist}
          icon={
            <Heart
              className="h-4 w-4"
              strokeWidth={1.5}
              fill={inWishlist ? 'currentColor' : 'none'}
            />
          }
        >
          {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
        </Button>
      </div>

      <Divider />

      {/* Аккордеон с деталями */}
      <div className="space-y-1">
        <AccordionItem
          title="Details"
          isOpen={activeAccordion === 'details'}
          onToggle={() =>
            setActiveAccordion(activeAccordion === 'details' ? null : 'details')
          }
        >
          <ul className="space-y-2">
            {product.details.map((detail, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-brand-gray-300">
                <span className="w-1 h-1 rounded-full bg-brand-gray-500 mt-2 shrink-0" />
                {detail}
              </li>
            ))}
          </ul>
        </AccordionItem>

        <AccordionItem
          title="Material & Care"
          isOpen={activeAccordion === 'care'}
          onToggle={() =>
            setActiveAccordion(activeAccordion === 'care' ? null : 'care')
          }
        >
          <div className="space-y-4 text-sm text-brand-gray-300">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-brand-gray-500 mb-2">
                Material
              </p>
              <p>{product.material}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-brand-gray-500 mb-2">
                Care
              </p>
              <ul className="space-y-1">
                {product.care.map((c, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-brand-gray-500" strokeWidth={2} />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </AccordionItem>

        <AccordionItem
          title="Shipping & Returns"
          isOpen={activeAccordion === 'shipping'}
          onToggle={() =>
            setActiveAccordion(activeAccordion === 'shipping' ? null : 'shipping')
          }
        >
          <div className="space-y-3 text-sm text-brand-gray-300">
            <p>Бесплатная доставка по России при заказе от 10 000 ₽.</p>
            <p>Возврат в течение 14 дней с момента получения.</p>
            <p>
              Подробнее в разделе{' '}
              <a href="/shipping" className="underline hover:text-brand-white">
                Shipping
              </a>
              .
            </p>
          </div>
        </AccordionItem>
      </div>
    </div>
  )
}

function AccordionItem({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className="border-b border-brand-gray-800">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 group"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-brand-white group-hover:text-brand-gray-300 transition-colors">
          {title}
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-brand-gray-400 transition-transform duration-300',
            isOpen && 'rotate-180'
          )}
          strokeWidth={1.5}
        />
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="overflow-hidden"
      >
        <div className="pb-5">{children}</div>
      </motion.div>
    </div>
  )
}