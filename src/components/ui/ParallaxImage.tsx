'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  direction?: 'up' | 'down'
  speed?: number // Множитель скорости (0.1 - 0.5)
}

/**
 * Изображение с эффектом параллакса при скролле.
 * Движется чуть медленнее или быстрее основного скролла,
 * создавая глубину и кинематографичность.
 */
export function ParallaxImage({
  src,
  alt,
  className,
  direction = 'up',
  speed = 0.2,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const offset = 100 * speed
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'up' ? [offset, -offset] : [-offset, offset]
  )

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      {/* ✅ ИСПРАВЛЕНО: top-[-10%] вместо -top-[10%] (v4 canonical) */}
      <motion.div className="absolute inset-0 w-full h-[120%] top-[-10%]" style={{ y }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover grayscale contrast-110"
        />
      </motion.div>
    </div>
  )
}