'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ProductGalleryProps {
  images: string[]
  productName: string
}

/**
 * Галерея товара:
 * - Главное изображение (крупное, aspect 3/4)
 * - Thumbnails под главным (desktop) или справа (mobile)
 * - Плавная смена фото с AnimatePresence
 * - Zoom при клике (todo: можно добавить lightbox)
 */
export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
      {/* Thumbnails — на desktop слева (вертикально), на mobile сверху (горизонтально) */}
      <div className="order-2 lg:order-1 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible lg:max-h-[80vh] lg:overflow-y-auto pb-2 lg:pb-0 lg:sticky lg:top-28 lg:self-start">
        {images.map((src, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={cn(
              'relative shrink-0 w-20 h-28 lg:w-24 lg:h-32 overflow-hidden border-2 transition-all duration-300',
              activeIndex === idx
                ? 'border-brand-white'
                : 'border-transparent opacity-60 hover:opacity-100'
            )}
            aria-label={`Показать фото ${idx + 1}`}
          >
            <Image
              src={src}
              alt={`${productName} - photo ${idx + 1}`}
              fill
              sizes="96px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Главное изображение */}
      <div className="order-1 lg:order-2 flex-1 relative aspect-3/4 bg-brand-gray-900 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Image
              src={images[activeIndex]}
              alt={`${productName} - main view`}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
              priority={activeIndex === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Индикатор номера фото (mobile-friendly) */}
        <div className="absolute bottom-4 right-4 bg-brand-black/60 backdrop-blur-sm px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-brand-white tabular-nums">
          {activeIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  )
}