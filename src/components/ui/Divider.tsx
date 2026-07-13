import { cn } from '@/lib/utils'

interface DividerProps {
  className?: string
  variant?: 'solid' | 'dashed' | 'fade'
}

/**
 * Разделитель для визуального отделения секций.
 * Вариант `fade` — градиентный, исчезает к краям.
 */
export function Divider({ className, variant = 'solid' }: DividerProps) {
  if (variant === 'fade') {
    return (
      <div
        className={cn(
          'h-px w-full',
          'bg-gradient-to-r from-transparent via-brand-gray-700 to-transparent',
          className
        )}
      />
    )
  }

  return (
    <div
      className={cn(
        'h-px w-full',
        variant === 'dashed'
          ? 'border-t border-dashed border-brand-gray-700'
          : 'bg-brand-gray-800',
        className
      )}
    />
  )
}