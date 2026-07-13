import { cn } from '@/lib/utils'
import { type ElementType, type ReactNode } from 'react'

// ============ HEADING ============
interface HeadingProps {
  children: ReactNode
  as?: ElementType
  level?: 1 | 2 | 3 | 4 | 5
  className?: string
  stroke?: boolean // Для эффекта text-stroke (контурный текст)
}

const headingStyles = {
  1: 'font-display text-hero tracking-tighter',
  2: 'font-display text-display-lg tracking-tight',
  3: 'font-display text-display-md',
  4: 'font-display text-display-sm',
  5: 'font-display text-2xl',
}

/**
 * Заголовки бренда.
 * По умолчанию — белый текст, можно сделать контурным через `stroke`.
 * 
 * Примеры:
 * <Heading level={1}>NEW SEASON</Heading>
 * <Heading level={2} stroke>MANIFESTO</Heading>
 */
export function Heading({
  children,
  as,
  level = 2,
  className,
  stroke = false,
}: HeadingProps) {
  const Tag = as || (`h${level}` as ElementType)
  
  return (
    <Tag
      className={cn(
        'font-display leading-[0.95] uppercase',
        headingStyles[level],
        stroke ? 'text-stroke-white' : 'text-brand-white',
        className
      )}
    >
      {children}
    </Tag>
  )
}

// ============ TEXT ============
interface TextProps {
  children: ReactNode
  as?: ElementType
  variant?: 'body' | 'large' | 'small' | 'caption' | 'eyebrow'
  className?: string
}

const textStyles = {
  body: 'text-base leading-relaxed text-brand-gray-300',
  large: 'text-lg leading-relaxed text-brand-gray-200',
  small: 'text-sm leading-relaxed text-brand-gray-400',
  caption: 'text-xs text-brand-gray-500',
  eyebrow: 'text-xs uppercase tracking-[0.3em] text-brand-gray-400 font-medium',
}

/**
 * Текстовые блоки.
 * 
 * Примеры:
 * <Text variant="eyebrow">COLLECTION SS26</Text>
 * <Text variant="body">Текст описания...</Text>
 */
export function Text({
  children,
  as,
  variant = 'body',
  className,
}: TextProps) {
  const Tag = as || (variant === 'eyebrow' ? 'span' : 'p')
  
  return (
    <Tag className={cn(textStyles[variant], className)}>
      {children}
    </Tag>
  )
}