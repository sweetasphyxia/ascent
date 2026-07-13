'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useCatalogFilters } from '@/hooks/useCatalogFilters'
import { cn } from '@/lib/utils'

const CATEGORY_LABELS: Record<string, string> = {
  tshirts: 'T-Shirts',
  hoodies: 'Hoodies',
  jackets: 'Jackets',
  pants: 'Pants',
  accessories: 'Accessories',
}

export function ActiveFilters({ className }: { className?: string }) {
  const { filters, updateFilters, toggleArrayFilter, resetFilters, activeFiltersCount } =
    useCatalogFilters()

  if (activeFiltersCount === 0) return null

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {filters.categories.map((cat) => (
        <FilterChip
          key={`cat-${cat}`}
          label={CATEGORY_LABELS[cat] || cat}
          onRemove={() => toggleArrayFilter('categories', cat)}
        />
      ))}

      {filters.sizes.map((size) => (
        <FilterChip
          key={`size-${size}`}
          label={`Size ${size}`}
          onRemove={() => toggleArrayFilter('sizes', size)}
        />
      ))}

      {filters.onlyNew && (
        <FilterChip
          label="New Only"
          onRemove={() => updateFilters({ onlyNew: false })}
        />
      )}

      {filters.onlySale && (
        <FilterChip
          label="On Sale"
          onRemove={() => updateFilters({ onlySale: false })}
        />
      )}

      {activeFiltersCount > 1 && (
        <button
          onClick={resetFilters}
          className="text-[10px] uppercase tracking-[0.3em] text-brand-gray-400 hover:text-brand-white transition-colors ml-2"
        >
          Clear all
        </button>
      )}
    </div>
  )
}

function FilterChip({
  label,
  onRemove,
}: {
  label: string
  onRemove: () => void
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="inline-flex items-center gap-2 pl-3 pr-1.5 py-1.5 bg-brand-white text-brand-black text-[10px] uppercase tracking-[0.2em]"
    >
      <span>{label}</span>
      <button
        onClick={onRemove}
        className="flex h-4 w-4 items-center justify-center hover:bg-brand-black hover:text-brand-white transition-colors rounded-full"
        aria-label={`Удалить фильтр ${label}`}
      >
        <X className="h-2.5 w-2.5" strokeWidth={2} />
      </button>
    </motion.div>
  )
}