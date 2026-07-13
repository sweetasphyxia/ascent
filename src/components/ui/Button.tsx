import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from 'react'

/**
 * Варианты стилей кнопки в стиле dark glam.
 * Используются через prop `variant` и `size`.
 */
const buttonVariants = cva(
  // Базовые стили для всех вариантов
  'inline-flex items-center justify-center gap-2 font-sans text-sm uppercase tracking-[0.2em] font-medium transition-all duration-300 ease-smooth disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black',
  {
    variants: {
      variant: {
        // Основная кнопка — белая на чёрном, инверсия на hover
        primary:
          'bg-brand-white text-brand-black hover:bg-brand-black hover:text-brand-white border border-brand-white',
        // Контурная — для второстепенных действий
        outline:
          'bg-transparent text-brand-white border border-brand-gray-600 hover:border-brand-white hover:bg-brand-white hover:text-brand-black',
        // Призрачная — без фона и рамок, подчёркивание на hover
        ghost:
          'bg-transparent text-brand-white border border-transparent hover:underline hover:underline-offset-4',
        // Тёмная акцентная (для sale/эксклюзивов)
        accent:
          'bg-brand-accent text-brand-white border border-brand-accent hover:bg-brand-accent-dark hover:border-brand-accent-dark',
        // Ссылка — просто текст со стрелкой
        link: 'bg-transparent text-brand-white border-none underline-offset-4 hover:underline p-0',
      },
      size: {
        sm: 'h-10 px-4 text-xs',
        md: 'h-12 px-6',
        lg: 'h-14 px-8 text-base',
        xl: 'h-16 px-10 text-base lg:text-lg',
        icon: 'h-12 w-12',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode
  isLoading?: boolean
  icon?: ReactNode
}

/**
 * Базовая кнопка бренда.
 * Примеры:
 * <Button variant="primary" size="lg">SHOP NOW</Button>
 * <Button variant="outline">VIEW ALL</Button>
 * <Button variant="ghost">Learn more →</Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, children, isLoading, icon, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        {...props}
      >
        {isLoading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          icon
        )}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

// Экспортируем варианты для использования в других компонентах
export { buttonVariants }