'use client'

import { motion, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  stagger?: number
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  once?: boolean
}

/**
 * Компонент для поочерёдной анимации появления текста (буква за буквой).
 * Используется в Hero-секции и других ключевых местах.
 * 
 * Примеры:
 * <TextReveal text="RISE IN SILENCE" as="h1" className="text-hero" />
 * <TextReveal text="Darkness is the new luxury" as="p" />
 */
export function TextReveal({
  text,
  className,
  delay = 0,
  duration = 0.8,
  stagger = 0.03,
  as: Tag = 'span',
  once = true,
}: TextRevealProps) {
  // Разбиваем текст на слова, сохраняя пробелы
  const words = text.split(' ')

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  }

  const wordVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const letterVariants: Variants = {
    hidden: {
      y: '100%',
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration,
        ease: [0.215, 0.61, 0.355, 1], // easeOutCubic
      },
    },
  }

  return (
    <motion.span
      className={cn('inline-flex flex-wrap overflow-hidden', className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.3 }}
    >
      {words.map((word, wordIndex) => (
        <motion.span
          key={wordIndex}
          className="inline-flex mr-[0.25em] last:mr-0"
          variants={wordVariants}
        >
          {word.split('').map((letter, letterIndex) => (
            <motion.span
              key={letterIndex}
              className="inline-block"
              variants={letterVariants}
            >
              {letter}
            </motion.span>
          ))}
        </motion.span>
      ))}
    </motion.span>
  )
}