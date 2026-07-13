import { cn } from '@/lib/utils'
import { type ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

/**
 * Контейнер для секций страницы.
 * Обеспечивает единообразные отступы и ширину на всех страницах.
 */
export function Container({
  children,
  className,
  size = 'xl',
}: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        {
          'max-w-3xl': size === 'sm',
          'max-w-5xl': size === 'md',
          'max-w-7xl': size === 'lg',
          'max-w-[1920px]': size === 'xl',
          'max-w-none': size === 'full',
        },
        className
      )}
    >
      {children}
    </div>
  )
}