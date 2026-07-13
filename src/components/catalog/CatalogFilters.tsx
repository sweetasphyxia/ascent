'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useCatalogFilters } from '@/hooks/useCatalogFilters'
import { Heading, Text, Divider } from '@/components/ui'

const CATEGORIES = [
  { value: 'tshirts', label: 'T-Shirts' },
  { value: 'hoodies', label: 'Hoodies' },
  { value: 'jackets', label: 'Jackets' },
  { value: 'pants', label: 'Pants' },
  { value: 'accessories', label: 'Accessories' },
]

const SIZES = ['XS', 'S', 'M', 'L', 'XL']

interface CatalogFiltersProps {
  className?: string
}

export function CatalogFilters({ className }: CatalogFiltersProps) {
  const { filters, updateFilters, resetFilters, toggleArrayFilter, activeFiltersCount } =
    useCatalogFilters()

  return (
    <aside className={cn('space-y-8', className)}>
      {/* Заголовок + Reset */}
      <div className="flex items-center justify-between">
        <Heading level={4}>Filters</Heading>
        {activeFiltersCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-[10px] uppercase tracking-[0.3em] text-brand-gray-400 hover:text-brand-white transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      <Divider />

      {/* Категории */}
      <FilterSection title="Category">
        <div className="space-y-2">
          {CATEGORIES.map((cat) => {
            const active = filters.categories.includes(cat.value)
            return (
              <button
                key={cat.value}
                onClick={() => toggleArrayFilter('categories', cat.value)}
                className={cn(
                  'w-full flex items-center justify-between py-2 text-sm uppercase tracking-wide transition-colors duration-200',
                  active
                    ? 'text-brand-white'
                    : 'text-brand-gray-400 hover:text-brand-white'
                )}
              >
                <span>{cat.label}</span>
                {active && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-1.5 h-1.5 rounded-full bg-brand-white"
                  />
                )}
              </button>
            )
          })}
        </div>
      </FilterSection>

      <Divider />

      {/* Размеры */}
      <FilterSection title="Size">
        <div className="grid grid-cols-5 gap-2">
          {SIZES.map((size) => {
            const active = filters.sizes.includes(size)
            return (
              <button
                key={size}
                onClick={() => toggleArrayFilter('sizes', size)}
                className={cn(
                  'h-10 text-xs uppercase tracking-wider border transition-all duration-200',
                  active
                    ? 'bg-brand-white text-brand-black border-brand-white'
                    : 'bg-transparent text-brand-gray-300 border-brand-gray-700 hover:border-brand-white hover:text-brand-white'
                )}
              >
                {size}
              </button>
            )
          })}
        </div>
      </FilterSection>

      <Divider />

      {/* Цена */}
      <FilterSection title="Price">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-brand-gray-400 tabular-nums">
            <span>{formatPrice(filters.priceRange[0])}</span>
            <span>{formatPrice(filters.priceRange[1])}</span>
          </div>
          <div className="relative">
            <input
              type="range"
              min={0}
              max={50000}
              step={1000}
              value={filters.priceRange[1]}
              onChange={(e) =>
                updateFilters({
                  priceRange: [filters.priceRange[0], Number(e.target.value)],
                })
              }
              className="w-full accent-white bg-brand-gray-800 h-px"
            />
          </div>
        </div>
      </FilterSection>

      <Divider />

      {/* Быстрые фильтры */}
      <FilterSection title="Quick">
        <div className="space-y-2">
          <QuickToggle
            label="New Arrivals"
            active={filters.onlyNew}
            onClick={() => updateFilters({ onlyNew: !filters.onlyNew })}
          />
          <QuickToggle
            label="On Sale"
            active={filters.onlySale}
            onClick={() => updateFilters({ onlySale: !filters.onlySale })}
          />
        </div>
      </FilterSection>
    </aside>
  )
}

function FilterSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-2 group"
      >
        <Text variant="eyebrow">{title}</Text>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-brand-gray-500 transition-transform duration-300',
            isOpen ? 'rotate-0' : '-rotate-90'
          )}
          strokeWidth={1.5}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-4 pb-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function QuickToggle({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center justify-between py-3 px-4 border text-sm uppercase tracking-wide transition-all duration-200',
        active
          ? 'bg-brand-white text-brand-black border-brand-white'
          : 'bg-transparent text-brand-gray-300 border-brand-gray-700 hover:border-brand-white hover:text-brand-white'
      )}
    >
      <span>{label}</span>
      {active && <X className="h-3 w-3" strokeWidth={2} />}
    </button>
  )
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
}