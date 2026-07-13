'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ScrollIndicatorProps {
  className?: string
  variant?: 'light' | 'dark'
}

/**
 * Анимированный индикатор "Scroll Down".
 * Располагается внизу Hero-секции.
 */
export function ScrollIndicator({ className, variant = 'light' }: ScrollIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 2.5 }}
      className={cn(
        'absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10',
        className
      )}
    >
      {/* Текст */}
      <span
        className={cn(
          'text-[9px] uppercase tracking-[0.4em]',
          variant === 'light' ? 'text-brand-gray-300' : 'text-brand-gray-600'
        )}
      >
        Scroll
      </span>

      {/* Анимированная линия */}
      <div className="relative h-16 w-px overflow-hidden">
        <div
          className={cn(
            'absolute inset-0',
            variant === 'light' ? 'bg-brand-gray-700' : 'bg-brand-gray-300'
          )}
        />
        <motion.div
          className={cn(
            'absolute top-0 left-0 h-full w-full',
            variant === 'light' ? 'bg-brand-white' : 'bg-brand-black'
          )}
          animate={{
            y: ['-100%', '100%'],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: [0.65, 0, 0.35, 1],
          }}
        />
      </div>

      {/* Стрелка */}
      <motion.svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        className={variant === 'light' ? 'text-brand-white' : 'text-brand-black'}
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M2 4L6 8L10 4"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </motion.svg>
    </motion.div>
  )
}