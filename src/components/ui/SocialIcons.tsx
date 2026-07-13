import { cn } from '@/lib/utils'

interface SocialIconProps {
  href: string
  label: string
  className?: string
}

/**
 * Базовая обёртка для иконки соцсети.
 * Круглая кнопка с border + hover-эффект в стиле dark glam.
 */
function SocialLink({ href, label, children, className }: SocialIconProps & { children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group relative flex h-10 w-10 items-center justify-center',
        'border border-brand-gray-700 text-brand-gray-400',
        'hover:border-brand-white hover:text-brand-white',
        'transition-all duration-300 ease-smooth',
        className
      )}
      aria-label={label}
    >
      {children}
    </a>
  )
}

/**
 * Instagram — минималистичная камера
 */
export function InstagramIcon({ href = 'https://instagram.com', className }: Omit<SocialIconProps, 'label'>) {
  return (
    <SocialLink href={href} label="Instagram" className={className}>
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    </SocialLink>
  )
}

/**
 * Twitter / X — буква X в стиле нового брендинга
 */
export function XIcon({ href = 'https://x.com', className }: Omit<SocialIconProps, 'label'>) {
  return (
    <SocialLink href={href} label="X (Twitter)" className={className}>
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    </SocialLink>
  )
}

/**
 * YouTube — треугольник play в прямоугольнике
 */
export function YouTubeIcon({ href = 'https://youtube.com', className }: Omit<SocialIconProps, 'label'>) {
  return (
    <SocialLink href={href} label="YouTube" className={className}>
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
      </svg>
    </SocialLink>
  )
}

/**
 * TikTok — музыкальная нота в стиле бренда
 */
export function TikTokIcon({ href = 'https://tiktok.com', className }: Omit<SocialIconProps, 'label'>) {
  return (
    <SocialLink href={href} label="TikTok" className={className}>
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.86a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.29z" />
      </svg>
    </SocialLink>
  )
}

/**
 * Telegram — самолётик
 */
export function TelegramIcon({ href = 'https://t.me', className }: Omit<SocialIconProps, 'label'>) {
  return (
    <SocialLink href={href} label="Telegram" className={className}>
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    </SocialLink>
  )
}