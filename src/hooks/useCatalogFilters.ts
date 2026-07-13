'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { products } from '@/data/products'

export interface CatalogFilters {
  categories: string[]
  sizes: string[]
  priceRange: [number, number]
  sort: 'newest' | 'price-asc' | 'price-desc' | 'popular'
  onlyNew: boolean
  onlySale: boolean
}

const DEFAULT_FILTERS: CatalogFilters = {
  categories: [],
  sizes: [],
  priceRange: [0, 50000],
  sort: 'newest',
  onlyNew: false,
  onlySale: false,
}

/**
 * Хук для управления фильтрами каталога через URL.
 * - Читает параметры из searchParams
 * - Обновляет URL при изменении фильтров (без перезагрузки)
 * - Возвращает отфильтрованный список товаров
 */
export function useCatalogFilters() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // Парсим URL в объект фильтров
  const filters: CatalogFilters = useMemo(() => {
    const categories = searchParams.get('categories')?.split(',').filter(Boolean) ?? []
    const sizes = searchParams.get('sizes')?.split(',').filter(Boolean) ?? []
    const minPrice = Number(searchParams.get('minPrice')) || DEFAULT_FILTERS.priceRange[0]
    const maxPrice = Number(searchParams.get('maxPrice')) || DEFAULT_FILTERS.priceRange[1]
    const sort = (searchParams.get('sort') as CatalogFilters['sort']) || DEFAULT_FILTERS.sort
    const onlyNew = searchParams.get('new') === '1'
    const onlySale = searchParams.get('sale') === '1'

    return {
      categories,
      sizes,
      priceRange: [minPrice, maxPrice] as [number, number],
      sort,
      onlyNew,
      onlySale,
    }
  }, [searchParams])

  // Обновляем URL
  const updateFilters = useCallback(
    (newFilters: Partial<CatalogFilters>) => {
      const merged = { ...filters, ...newFilters }
      const params = new URLSearchParams()

      if (merged.categories.length > 0) {
        params.set('categories', merged.categories.join(','))
      }
      if (merged.sizes.length > 0) {
        params.set('sizes', merged.sizes.join(','))
      }
      if (merged.priceRange[0] !== DEFAULT_FILTERS.priceRange[0]) {
        params.set('minPrice', String(merged.priceRange[0]))
      }
      if (merged.priceRange[1] !== DEFAULT_FILTERS.priceRange[1]) {
        params.set('maxPrice', String(merged.priceRange[1]))
      }
      if (merged.sort !== DEFAULT_FILTERS.sort) {
        params.set('sort', merged.sort)
      }
      if (merged.onlyNew) params.set('new', '1')
      if (merged.onlySale) params.set('sale', '1')

      const queryString = params.toString()
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname

      router.push(newUrl, { scroll: false })
    },
    [filters, pathname, router]
  )

  // Сброс всех фильтров
  const resetFilters = useCallback(() => {
    router.push(pathname, { scroll: false })
  }, [pathname, router])

  // Переключение значения в массиве (категории, размеры)
  const toggleArrayFilter = useCallback(
    (key: 'categories' | 'sizes', value: string) => {
      const current = filters[key]
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
      updateFilters({ [key]: next })
    },
    [filters, updateFilters]
  )

  // Применение фильтров к товарам
  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category))
    }
    if (filters.sizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((s) => filters.sizes.includes(s))
      )
    }
    result = result.filter(
      (p) =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    )
    if (filters.onlyNew) {
      result = result.filter((p) => p.isNew)
    }
    if (filters.onlySale) {
      result = result.filter((p) => p.isSale)
    }

    // Сортировка
    switch (filters.sort) {
      case 'price-asc':
        result.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price))
        break
      case 'price-desc':
        result.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price))
        break
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
    }

    return result
  }, [filters])

  // Активные фильтры (для chips)
  const activeFiltersCount =
    filters.categories.length +
    filters.sizes.length +
    (filters.onlyNew ? 1 : 0) +
    (filters.onlySale ? 1 : 0) +
    (filters.priceRange[0] !== DEFAULT_FILTERS.priceRange[0] ||
    filters.priceRange[1] !== DEFAULT_FILTERS.priceRange[1]
      ? 1
      : 0)

  return {
    filters,
    filteredProducts,
    updateFilters,
    resetFilters,
    toggleArrayFilter,
    activeFiltersCount,
    totalProducts: products.length,
  }
}