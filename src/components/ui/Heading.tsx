import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

interface HeadingProps extends ComponentProps<'h2'> {
  level?: HeadingLevel
  stroke?: boolean
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const levelClasses: Record<HeadingLevel, string> = {
  1: 'text-display-xl tracking-tight',
  2: 'text-display-lg tracking-tight',
  3: 'text-display-md tracking-tight',
  4: 'text-display-sm tracking-tight',
  5: 'text-2xl tracking-tight',
  6: 'text-xl tracking-tight',
}

export function Heading({
  level = 2,
  stroke = false,
  as,
  className,
  children,
  ...props
}: HeadingProps) {
  // ✅ ИСПРАВЛЕНО: убрано приведение к JSX.IntrinsicElements,
  // которое вызывает ошибку namespace в Next.js 16.
  // Теперь используется явный union-тег, который полностью типобезопасен.
  const Component = as || (`h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6')

  return (
    <Component
      className={cn(
        'font-display uppercase text-brand-white',
        levelClasses[level],
        stroke && 'text-stroke-white text-transparent',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}