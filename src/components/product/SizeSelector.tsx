'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Text } from '@/components/ui'

type Size = 'XS' | 'S' | 'M' | 'L' | 'XL'

interface SizeSelectorProps {
  availableSizes: Size[]
  selectedSize: Size | null
  onSelect: (size: Size) => void
}

// Все возможные размеры (для отображения недоступных)
const ALL_SIZES: Size[] = ['XS', 'S', 'M', 'L', 'XL']

/**
 * Селектор размера товара.
 * - Показывает все размеры, недоступные — серым с линией
 * - Подсказка "Select a size" если ничего не выбрано
 * - Анимация выбора
 */
export function SizeSelector({
  availableSizes,
  selectedSize,
  onSelect,
}: SizeSelectorProps) {
  const [showError, setShowError] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Text variant="eyebrow">Size</Text>
        <button className="text-[10px] uppercase tracking-[0.3em] text-brand-gray-400 hover:text-brand-white transition-colors">
          Size Guide
        </button>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {ALL_SIZES.map((size) => {
          const isAvailable = availableSizes.includes(size)
          const isSelected = selectedSize === size

          return (
            <button
              key={size}
              onClick={() => {
                if (isAvailable) {
                  onSelect(size)
                  setShowError(false)
                }
              }}
              disabled={!isAvailable}
              className={cn(
                'relative h-12 text-xs uppercase tracking-wider border transition-all duration-200',
                isSelected
                  ? 'bg-brand-white text-brand-black border-brand-white'
                  : isAvailable
                  ? 'bg-transparent text-brand-white border-brand-gray-700 hover:border-brand-white'
                  : 'bg-transparent text-brand-gray-600 border-brand-gray-800 cursor-not-allowed'
              )}
            >
              {size}
              {/* Линия перечёркивания для недоступных */}
              {!isAvailable && (
                <span className="absolute inset-x-2 top-1/2 h-px bg-brand-gray-700 rotate-[-20deg]" />
              )}
            </button>
          )
        })}
      </div>

      {/* Сообщение об ошибке */}
      <AnimatePresence>
        {showError && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-[11px] text-brand-accent"
          >
            Пожалуйста, выберите размер
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}