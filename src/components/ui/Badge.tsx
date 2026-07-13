import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const badgeVariants = cva(
  'inline-flex items-center justify-center font-sans text-[10px] uppercase tracking-[0.2em] font-medium',
  {
    variants: {
      variant: {
        // NEW — белый фон
        new: 'bg-brand-white text-brand-black',
        // SALE — красный акцент
        sale: 'bg-brand-accent text-brand-white',
        // EXCLUSIVE — outline стиль
        exclusive: 'border border-brand-white text-brand-white bg-transparent',
        // Размер — нейтральный
        size: 'border border-brand-gray-600 text-brand-gray-300 bg-transparent',
      },
      size: {
        sm: 'px-2 py-0.5',
        md: 'px-3 py-1',
      },
    },
    defaultVariants: {
      variant: 'new',
      size: 'md',
    },
  }
)

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: React.ReactNode
  className?: string
}

/**
 * Бейдж для карточек товаров.
 * Примеры:
 * <Badge variant="new">NEW</Badge>
 * <Badge variant="sale">-30%</Badge>
 * <Badge variant="size">M</Badge>
 */
export function Badge({ children, variant, size, className }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)}>
      {children}
    </span>
  )
}