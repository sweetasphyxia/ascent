'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface PreloaderProps {
  onComplete?: () => void
}

/**
 * Прелоадер ASCENT при первой загрузке сайта.
 * Показывает проценты от 0 до 100, затем исчезает с плавной анимацией.
 * Стиль: dark glam, минимализм, крупная типографика.
 */
export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const duration = 2200
    const interval = 16
    const increment = 100 / (duration / interval)

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment
        if (next >= 100) {
          clearInterval(timer)
          setTimeout(() => {
            setIsComplete(true)
            onComplete?.()
          }, 500)
          return 100
        }
        return next
      })
    }, interval)

    return () => clearInterval(timer)
  }, [onComplete])

  // Буквы логотипа для поочерёдной анимации
  const letters = ['A', 'S', 'C', 'E', 'N', 'T']

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-100 bg-brand-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Декоративные угловые линии */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute top-8 left-8 w-16 h-16 border-l border-t border-brand-gray-700"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-brand-gray-700"
          />

          {/* Логотип — буквы появляются по одной */}
          <div className="mb-16 flex items-center overflow-hidden">
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.1 + index * 0.08,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                className="font-display text-5xl md:text-7xl lg:text-8xl tracking-[0.15em] text-brand-white uppercase inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Подпись под логотипом */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-16 text-center"
          >
            <span className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-brand-gray-500">
              Dark Glam · Streetwear · Est. 2026
            </span>
          </motion.div>

          {/* Прогресс загрузки */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="relative w-64 md:w-96"
          >
            {/* Полоска прогресса */}
            <div className="relative h-px w-full bg-brand-gray-800 overflow-hidden">
              <motion.div
                className="h-full bg-brand-white"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
            </div>

            {/* Метки прогресса */}
            <div className="flex justify-between items-center mt-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gray-500">
                Loading
              </span>
              <span className="font-display text-4xl md:text-6xl tabular-nums text-brand-white leading-none">
                {Math.floor(progress).toString().padStart(3, '0')}
              </span>
            </div>
          </motion.div>

          {/* Нижняя подпись */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.4em] text-brand-gray-700"
          >
            ASCENT © MMXXVI
          </motion.p>

          {/* Декоративный вертикальный текст слева */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute left-6 top-1/2 -translate-y-1/2 hidden md:block"
          >
            <span className="text-[9px] tracking-[0.4em] uppercase text-brand-gray-600 [writing-mode:vertical-rl] rotate-180">
              Collection · Fall / Winter 2026
            </span>
          </motion.div>

          {/* Декоративный вертикальный текст справа */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:block"
          >
            <span className="text-[9px] tracking-[0.4em] uppercase text-brand-gray-600 [writing-mode:vertical-rl]">
              Ascent · Dark Glam
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}