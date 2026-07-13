import { cn } from '@/lib/utils'
import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: ReactNode
}

/**
 * Поле ввода в минималистичном стиле.
 * Используется в формах подписки, поиска, фильтров.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, id, ...props }, ref) => {
    const inputId = id || props.name || 'input'

    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-sans uppercase tracking-[0.2em] text-brand-gray-400"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full bg-transparent text-brand-white placeholder:text-brand-gray-500',
              'border-b border-brand-gray-600 focus:border-brand-white',
              'transition-colors duration-300 ease-smooth',
              'outline-none',
              icon ? 'pl-12 pr-4 py-3' : 'px-4 py-3',
              error && 'border-brand-accent',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs text-brand-accent">{error}</p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'