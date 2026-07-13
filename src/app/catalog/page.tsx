'use client'

import { Suspense, useState } from 'react'
import { motion } from 'framer-motion'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { Container, Heading, Text, Button } from '@/components/ui'
import { CatalogFilters } from '@/components/catalog/CatalogFilters'
import { ProductGrid } from '@/components/catalog/ProductGrid'
import { ActiveFilters } from '@/components/catalog/ActiveFilters'
import { useCatalogFilters, type CatalogFilters as CatalogFiltersType } from '@/hooks/useCatalogFilters'
import { cn } from '@/lib/utils'

export default function CatalogPage() {
  return (
    <Suspense fallback={<CatalogSkeleton />}>
      <CatalogContent />
    </Suspense>
  )
}

function CatalogContent() {
  // ✅ ИСПРАВЛЕНО: убраны неиспользуемые filters и updateFilters из деструктуризации
  const {
    filteredProducts,
    totalProducts,
    activeFiltersCount,
  } = useCatalogFilters()
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  return (
    <>
      {/* === HERO СЕКЦИЯ КАТАЛОГА === */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-brand-black border-b border-brand-gray-800">
        <Container size="xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <Text variant="eyebrow">Collection · FW26</Text>
            {/* ✅ ИСПРАВЛЕНО: text-display-xl! (v4 important) */}
            <Heading level={1} className="text-display-xl!">
              SHOP
              <br />
              <span className="text-stroke-white">ALL</span>
            </Heading>
            <Text variant="body" className="max-w-xl">
              Исследуй всю коллекцию ASCENT. Каждая вещь — манифест твоего стиля.
            </Text>
          </motion.div>
        </Container>
      </section>

      {/* === ОСНОВНОЙ КОНТЕНТ === */}
      <section className="relative py-12 md:py-16 bg-brand-black">
        <Container size="xl">
          {/* Toolbar: счётчик + сортировка + mobile filter button */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-brand-gray-800">
            <div className="flex items-center gap-4">
              <Text variant="caption">
                <span className="text-brand-white font-medium">
                  {filteredProducts.length}
                </span>
                <span className="mx-2">/</span>
                <span>{totalProducts} products</span>
              </Text>
            </div>

            <div className="flex items-center gap-3">
              <SortSelect />

              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-brand-gray-700 text-xs uppercase tracking-[0.2em] text-brand-white hover:border-brand-white transition-colors"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.5} />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="flex h-4 w-4 items-center justify-center bg-brand-white text-brand-black text-[9px] rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          <ActiveFilters className="mb-8" />

          <div className="flex gap-8 lg:gap-12">
            <div className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-28">
                <CatalogFilters />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <ProductGrid products={filteredProducts} />
            </div>
          </div>
        </Container>
      </section>

      <MobileFiltersDrawer
        isOpen={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
      />
    </>
  )
}

function SortSelect() {
  const { filters, updateFilters } = useCatalogFilters()
  const [open, setOpen] = useState(false)

  const options = [
    { value: 'newest', label: 'Newest' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'popular', label: 'Popular' },
  ] as const

  const currentLabel =
    options.find((o) => o.value === filters.sort)?.label || 'Sort'

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 border border-brand-gray-700 text-xs uppercase tracking-[0.2em] text-brand-white hover:border-brand-white transition-colors"
      >
        {currentLabel}
        <ChevronDown
          className={cn(
            'h-3.5 w-3.5 transition-transform',
            open && 'rotate-180'
          )}
          strokeWidth={1.5}
        />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          {/* ✅ ИСПРАВЛЕНО: z-40 без скобок (v4 canonical) */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-brand-black border border-brand-gray-700 z-40 py-2">
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  // ✅ ИСПРАВЛЕНО: правильный тип вместо `as any`
                  updateFilters({ sort: opt.value as CatalogFiltersType['sort'] })
                  setOpen(false)
                }}
                className={cn(
                  'w-full text-left px-4 py-2 text-xs uppercase tracking-wide transition-colors',
                  filters.sort === opt.value
                    ? 'text-brand-white bg-brand-gray-900'
                    : 'text-brand-gray-400 hover:text-brand-white hover:bg-brand-gray-900'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function MobileFiltersDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            // ✅ ИСПРАВЛЕНО: z-70 без скобок
            className="fixed inset-0 z-70 bg-brand-black/60 backdrop-blur-md lg:hidden"
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            // ✅ ИСПРАВЛЕНО: z-80 без скобок
            className="fixed top-0 left-0 bottom-0 z-80 w-full max-w-sm bg-brand-black border-r border-brand-gray-800 overflow-y-auto lg:hidden"
          >
            <div className="sticky top-0 bg-brand-black border-b border-brand-gray-800 px-6 py-4 flex items-center justify-between">
              <Heading level={4}>Filters</Heading>
              <button
                onClick={onClose}
                className="text-brand-gray-400 hover:text-brand-white transition-colors p-2 -mr-2"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
            <div className="p-6">
              <CatalogFilters />
              <div className="pt-6">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={onClose}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </>
  )
}

function CatalogSkeleton() {
  return (
    <div className="min-h-screen bg-brand-black pt-32">
      <Container size="xl">
        <div className="animate-pulse space-y-4">
          <div className="h-16 w-64 bg-brand-gray-900" />
          <div className="h-8 w-96 bg-brand-gray-900" />
        </div>
      </Container>
    </div>
  )
}