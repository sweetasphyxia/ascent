'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { mainNavigation, type NavigationItem } from '@/data/navigation'

interface FullscreenMenuProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * Полноэкранное бургер-меню с динамическими превью.
 * - Слева: список пунктов меню с крупным текстом и номерами
 * - Справа: фоновое изображение меняется при hover на пункт
 * - Плавная stagger-анимация появления
 */
export function FullscreenMenu({ isOpen, onClose }: FullscreenMenuProps) {
  const [hoveredItem, setHoveredItem] = useState<NavigationItem | null>(null)

  // Активное превью: hover-состояние или первый пункт по умолчанию
  const activePreview = hoveredItem || mainNavigation[0]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-60 bg-brand-black overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* === ФОНОВОЕ ПРЕВЬЮ === */}
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="sync">
              <motion.div
                key={activePreview.id}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={activePreview.media.src}
                  alt={activePreview.label}
                  fill
                  className="object-cover grayscale contrast-125"
                  sizes="100vw"
                  priority
                  unoptimized
                />
                {/* Тёмный оверлей для читаемости текста меню */}
                <div className="absolute inset-0 bg-brand-black/70 md:bg-brand-black/85" />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-black/60 via-brand-black/30 to-brand-black/80" />
              </motion.div>
            </AnimatePresence>

            {/* Grain текстура */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none grain-texture" />
          </div>

          {/* === ОСНОВНОЙ КОНТЕНТ === */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Верхняя полоса с логотипом */}
            <div className="flex items-center justify-between px-6 md:px-12 py-6 border-b border-brand-white/10">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="font-display text-2xl md:text-3xl tracking-[0.15em] text-brand-white uppercase"
              >
                ASCENT
              </motion.span>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                onClick={onClose}
                className="group flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-brand-white hover:text-brand-gray-400 transition-colors duration-300"
              >
                <span className="hidden md:inline">Close</span>
                <span className="relative w-6 h-6">
                  <span className="absolute inset-x-0 top-1/2 h-px bg-current -translate-y-1/2 rotate-45 origin-center transition-all duration-300" />
                  <span className="absolute inset-x-0 top-1/2 h-px bg-current -translate-y-1/2 -rotate-45 origin-center transition-all duration-300" />
                </span>
              </motion.button>
            </div>

            {/* Средняя секция с пунктами меню */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-y-auto lg:overflow-hidden">
              {/* Список пунктов меню (левая сторона на desktop, всё на mobile) */}
              <div className="flex flex-col justify-center px-6 md:px-12 lg:pl-12 xl:pl-24 py-12">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-[10px] uppercase tracking-[0.4em] text-brand-gray-400 mb-6"
                >
                  Menu / {new Date().getFullYear()}
                </motion.div>

                <nav className="space-y-1 md:space-y-2">
                  {mainNavigation.map((item, index) => (
                    <MenuItem
                      key={item.id}
                      item={item}
                      index={index}
                      isActive={activePreview.id === item.id}
                      onHover={setHoveredItem}
                      onClose={onClose}
                    />
                  ))}
                </nav>

                {/* Нижние быстрые ссылки */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="flex gap-6 mt-12 text-[11px] uppercase tracking-[0.3em] text-brand-gray-400"
                >
                  <a href="mailto:hello@ascent.brand" className="hover:text-brand-white transition-colors">
                    hello@ascent.brand
                  </a>
                  <a href="tel:+79991234567" className="hover:text-brand-white transition-colors hidden sm:inline">
                    +7 (999) 123-45-67
                  </a>
                </motion.div>
              </div>

              {/* Превью-секция (правая на desktop, описание пункта) */}
              <div className="hidden lg:flex flex-col justify-end p-12 xl:pr-24 border-l border-brand-white/10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePreview.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="max-w-md"
                  >
                    {/* Большой номер пункта */}
                    <span className="font-display text-[8rem] leading-none tabular-nums text-brand-white/10 block mb-8">
                      {activePreview.number}
                    </span>

                    {/* Eyebrow */}
                    <span className="text-[10px] uppercase tracking-[0.4em] text-brand-gray-400 block mb-4">
                      {activePreview.number} / 06
                    </span>

                    {/* Название */}
                    <h3 className="font-display text-display-md text-brand-white uppercase leading-tight mb-6">
                      {activePreview.label}
                    </h3>

                    {/* Описание */}
                    {activePreview.description && (
                      <p className="text-brand-gray-300 leading-relaxed mb-8 max-w-sm">
                        {activePreview.description}
                      </p>
                    )}

                    {/* Стрелка */}
                    <motion.div
                      className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-brand-white"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Explore
                      <span className="h-px w-8 bg-brand-white" />
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Нижняя полоса */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="flex flex-wrap items-center justify-between px-6 md:px-12 py-6 border-t border-brand-white/10 text-[10px] uppercase tracking-[0.3em] text-brand-gray-400 gap-3"
            >
              <span>Fall / Winter 2026</span>
              <span className="hidden md:inline">ASCENT © MMXXVI</span>
              <div className="flex gap-6">
                <a href="#" className="hover:text-brand-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-brand-white transition-colors">TikTok</a>
                <a href="#" className="hover:text-brand-white transition-colors">X</a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// =====================================================
// Компонент пункта меню с stagger-анимацией и hover-эффектом
// =====================================================
interface MenuItemProps {
  item: NavigationItem
  index: number
  isActive: boolean
  onHover: (item: NavigationItem | null) => void
  onClose: () => void
}

function MenuItem({ item, index, isActive, onHover, onClose }: MenuItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          delay: 0.5 + index * 0.08,
          ease: [0.215, 0.61, 0.355, 1],
        },
      }}
    >
      <Link
        href={item.href}
        onClick={onClose}
        onMouseEnter={() => onHover(item)}
        onMouseLeave={() => onHover(null)}
        onTouchStart={() => onHover(item)}
        className={cn(
          'group relative flex items-baseline gap-4 md:gap-8 py-4 md:py-6 border-t border-brand-white/5 last:border-b transition-all duration-500',
          'cursor-pointer overflow-hidden',
          isActive ? 'pl-4' : 'pl-0'
        )}
      >
        {/* Активная метка слева (полоска) */}
        <motion.span
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] bg-brand-white origin-center"
          initial={false}
          animate={{ height: isActive ? '60%' : '0%' }}
          transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* Номер */}
        <span className={cn(
          'text-[10px] tabular-nums tracking-widest transition-colors duration-500 shrink-0',
          isActive ? 'text-brand-white' : 'text-brand-gray-500'
        )}>
          {item.number}
        </span>

        {/* Основной текст с маской */}
        <div className="relative overflow-hidden flex-1">
          <span className="relative block">
            <motion.span
              className="font-display text-display-md md:text-display-lg text-brand-white uppercase tracking-tight leading-[0.9] inline-block"
              animate={{ y: isActive ? '-8px' : '0px' }}
              transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
            >
              {item.label}
            </motion.span>
            <motion.span
              aria-hidden="true"
              className="absolute inset-x-0 top-full font-display text-display-md md:text-display-lg uppercase tracking-tight leading-[0.9] inline-block text-brand-gray-400"
              animate={{ y: isActive ? '-100%' : '0%' }}
              transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
            >
              {item.label}
            </motion.span>
          </span>
        </div>

        {/* Стрелка */}
        <motion.svg
          className={cn(
            'shrink-0 w-8 h-8 transition-all duration-500',
            isActive ? 'text-brand-white' : 'text-brand-gray-500'
          )}
          animate={{ x: isActive ? 8 : 0 }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          viewBox="0 0 32 32"
          fill="none"
          strokeWidth={1}
        >
          <line x1="4" y1="16" x2="26" y2="16" stroke="currentColor" />
          <polyline points="20,10 26,16 20,22" stroke="currentColor" strokeLinecap="round" />
        </motion.svg>
      </Link>
    </motion.div>
  )
}