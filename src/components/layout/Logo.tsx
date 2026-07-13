import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  variant?: 'light' | 'dark'
}

/**
 * SVG-логотип бренда.
 * Используется в хедере и футере.
 * Для dark glam стиля — просто текст крупным шрифтом Anton.
 */
export function Logo({ className, variant = 'light' }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        'group relative inline-block',
        'transition-all duration-500 ease-smooth',
        className
      )}
      aria-label="На главную"
    >
      <span
        className={cn(
          'font-display text-2xl md:text-3xl tracking-[0.15em] uppercase',
          'transition-transform duration-500 ease-smooth',
          'group-hover:tracking-[0.25em]',
          variant === 'light' ? 'text-brand-white' : 'text-brand-black'
        )}
      >
        ASCENT
      </span>
      {/* Декоративная линия под логотипом */}
      <span
        className={cn(
          'absolute bottom-0 left-0 h-px w-0',
          'bg-brand-white transition-all duration-500 ease-smooth',
          'group-hover:w-full',
          variant === 'dark' && 'bg-brand-black'
        )}
      />
    </Link>
  )
}