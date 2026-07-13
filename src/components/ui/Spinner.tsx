import { cn } from '@/lib/utils'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeMap = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-16 w-16 border-4',
}

/**
 * Минималистичный спиннер для прелоадера и загрузки контента.
 */
export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <div
      className={cn(
        'animate-spin rounded-full border-brand-gray-700 border-t-brand-white',
        sizeMap[size],
        className
      )}
    />
  )
}