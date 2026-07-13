'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ProductCard } from './ProductCard'
import type { Product } from '@/data/products'
import { cn } from '@/lib/utils'

interface ProductCarouselProps {
  products: Product[]
  className?: string
}

export function ProductCarousel({ products, className }: ProductCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const [constraints, setConstraints] = useState({ left: 0, right: 0 })
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    const content = contentRef.current
    if (!container || !content) return

    const calculate = () => {
      const containerWidth = container.offsetWidth
      const contentWidth = content.scrollWidth
      const maxDrag = contentWidth - containerWidth

      if (maxDrag <= 0) {
        setConstraints({ left: 0, right: 0 })
      } else {
        setConstraints({ left: -maxDrag, right: 0 })
      }
      setIsReady(true)
    }

    const timer = setTimeout(calculate, 100)

    let resizeTimer: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(calculate, 200)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(timer)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', handleResize)
    }
  }, [products])

  return (
    <div className={cn('relative w-full max-w-full overflow-hidden', className)}>
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden max-w-full"
      >
        <motion.div
          ref={contentRef}
          data-drag-cursor
          className="flex gap-4 md:gap-6 pl-4 md:pl-8 lg:pl-12 pb-8"
          drag={isReady ? 'x' : false}
          dragConstraints={constraints}
          dragElastic={0.05}
          dragSnapToOrigin={false}
          dragMomentum={true}
          dragTransition={{
            bounceStiffness: 200,
            bounceDamping: 30,
            power: 0.25,
            timeConstant: 300,
          }}
          whileDrag={{ cursor: 'grabbing' }}
          style={{ cursor: isReady ? 'grab' : 'default' }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          <div className="shrink-0 w-4 md:w-8 lg:w-12" />
        </motion.div>
      </div>

      <div className="hidden md:flex items-center justify-end gap-3 px-8 lg:px-12 mt-2 text-[10px] uppercase tracking-[0.3em] text-brand-gray-500">
        <span className="h-px w-8 bg-brand-gray-700" />
        Drag to explore
      </div>
    </div>
  )
}