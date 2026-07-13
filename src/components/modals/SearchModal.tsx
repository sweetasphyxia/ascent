'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useUIStore } from '@/store/uiStore'
import { products } from '@/data/products'
import { Heading, Text } from '@/components/ui'

/**
 * Полноэкранный поисковый оверлей.
 * - Мгновенный поиск по названию, категории, цвету
 * - Показывает до 6 результатов
 * - Клавиша Escape закрывает
 * - Автофокус на input при открытии
 * - Использует key на корневом элементе для автосброса state при remount
 */
export function SearchModal() {
  const { activeModal, closeModal } = useUIStore()
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const isOpen = activeModal === 'search'

  // Автофокус при открытии + блокировка скролла
  // ✅ ИСПРАВЛЕНО: убран setQuery('') из effect — state сбрасывается через remount (key)
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Закрытие по Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    if (isOpen) window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, closeModal])

  // Мгновенный поиск
  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase().trim()
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.color.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
      .slice(0, 6)
  }, [query])

  const formatPrice = (p: number) =>
    new Intl.NumberFormat('ru-RU').format(p) + ' ₽'

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          // ✅ КЛЮЧЕВОЕ ИСПРАВЛЕНИЕ: key заставляет React remount'ить компонент
          // при каждом открытии, что автоматически сбрасывает весь локальный state (query)
          // Это рекомендуемый паттерн React вместо сброса state в useEffect
          key="search-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          // ✅ ИСПРАВЛЕНО: z-90 вместо z-[90] (v4 canonical)
          className="fixed inset-0 z-90 bg-brand-black/95 backdrop-blur-xl overflow-y-auto"
        >
          <div className="min-h-screen flex flex-col">
            {/* Header */}
            <div className="sticky top-0 bg-brand-black/80 backdrop-blur-md border-b border-brand-gray-800 z-10">
              <div className="mx-auto max-w-[1920px] px-6 md:px-12 py-6">
                <div className="flex items-center gap-4">
                  <Search
                    className="h-6 w-6 text-brand-gray-500 shrink-0"
                    strokeWidth={1.5}
                  />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products, collections..."
                    className="flex-1 bg-transparent text-brand-white text-2xl md:text-4xl font-display uppercase tracking-tight placeholder:text-brand-gray-700 outline-none"
                    autoComplete="off"
                  />
                  <button
                    onClick={closeModal}
                    className="shrink-0 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-brand-gray-400 hover:text-brand-white transition-colors p-2"
                  >
                    <span className="hidden md:inline">Close</span>
                    <X className="h-5 w-5" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="flex-1 mx-auto w-full max-w-[1920px] px-6 md:px-12 py-12">
              {query.trim() === '' ? (
                <EmptySearchState />
              ) : results.length === 0 ? (
                <NoResultsState query={query} />
              ) : (
                <div>
                  <Text variant="caption" className="mb-8">
                    {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;
                    <span className="text-brand-white">{query}</span>
                    &rdquo;
                  </Text>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        onClick={closeModal}
                        className="group flex gap-4 p-4 border border-brand-gray-800 hover:border-brand-white transition-colors duration-300"
                      >
                        <div className="relative w-24 h-32 shrink-0 bg-brand-gray-900 overflow-hidden">
                          <Image
                            src={product.images.front}
                            alt={product.name}
                            fill
                            sizes="96px"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col">
                          <Text variant="caption" className="mb-1">
                            {product.category}
                          </Text>
                          <h3 className="font-display text-base uppercase tracking-wide text-brand-white truncate mb-1">
                            {product.name}
                          </h3>
                          <p className="text-xs text-brand-gray-500 mb-3">
                            {product.color}
                          </p>
                          <div className="mt-auto flex items-center justify-between">
                            <span className="font-display text-sm text-brand-white tabular-nums">
                              {formatPrice(product.salePrice ?? product.price)}
                            </span>
                            <ArrowRight
                              className="h-4 w-4 text-brand-gray-500 group-hover:text-brand-white group-hover:translate-x-1 transition-all"
                              strokeWidth={1.5}
                            />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {results.length === 6 && (
                    <div className="mt-12 text-center">
                      <Link
                        href={`/catalog?q=${encodeURIComponent(query)}`}
                        onClick={closeModal}
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-brand-gray-400 hover:text-brand-white transition-colors"
                      >
                        View all results
                        <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer с подсказками */}
            <div className="border-t border-brand-gray-800 py-4">
              <div className="mx-auto max-w-[1920px] px-6 md:px-12 flex flex-wrap items-center justify-between gap-4 text-[10px] uppercase tracking-[0.3em] text-brand-gray-500">
                <div className="flex items-center gap-6">
                  <span>
                    <kbd className="px-2 py-1 border border-brand-gray-700 text-brand-white mr-2">
                      ESC
                    </kbd>
                    to close
                  </span>
                  <span className="hidden md:inline">
                    <kbd className="px-2 py-1 border border-brand-gray-700 text-brand-white mr-2">
                      ↵
                    </kbd>
                    to select
                  </span>
                </div>
                <span>ASCENT Search</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function EmptySearchState() {
  const suggestions = ['Hoodie', 'Oversized', 'Black', 'New Arrivals']
  return (
    <div className="max-w-2xl">
      <Text variant="eyebrow" className="mb-6">
        Popular Searches
      </Text>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <span
            key={s}
            className="px-4 py-2 border border-brand-gray-700 text-sm text-brand-gray-300 hover:border-brand-white hover:text-brand-white transition-colors cursor-pointer"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="mt-16">
        <Text variant="eyebrow" className="mb-6">
          Trending Now
        </Text>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.slice(0, 3).map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.slug}`}
              className="group block"
            >
              <div className="relative aspect-3/4 bg-brand-gray-900 overflow-hidden mb-3">
                <Image
                  src={p.images.front}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h4 className="font-display text-sm uppercase text-brand-white group-hover:text-brand-gray-300 transition-colors">
                {p.name}
              </h4>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function NoResultsState({ query }: { query: string }) {
  return (
    <div className="text-center py-20">
      <Heading level={2} className="mb-4">
        NO RESULTS
      </Heading>
      <Text variant="body" className="max-w-md mx-auto text-brand-gray-400">
        По запросу &ldquo;
        <span className="text-brand-white">{query}</span>
        &rdquo; ничего не найдено. Попробуй другое слово или перейди в каталог.
      </Text>
    </div>
  )
}