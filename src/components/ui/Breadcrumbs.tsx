import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

/**
 * Хлебные крошки — навигация по уровням сайта.
 * Последний элемент (текущий) не кликабельный.
 */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav className={cn('flex items-center flex-wrap gap-2', className)} aria-label="Breadcrumb">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1
        return (
          <span key={idx} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-[10px] uppercase tracking-[0.3em] text-brand-gray-500 hover:text-brand-white transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-[10px] uppercase tracking-[0.3em] text-brand-white">
                {item.label}
              </span>
            )}
            {!isLast && (
              <ChevronRight className="h-3 w-3 text-brand-gray-600" strokeWidth={1.5} />
            )}
          </span>
        )
      })}
    </nav>
  )
}