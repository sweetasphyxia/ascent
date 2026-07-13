'use client'

import { Container } from '@/components/ui'

/**
 * Глобальный loading state.
 * Показывается при переходах между страницами (Next.js Suspense).
 * В стиле dark glam — минималистичная анимация с логотипом.
 */
export default function Loading() {
  return (
    <main className="min-h-screen bg-brand-black flex items-center justify-center">
      <Container size="md" className="text-center">
        <div className="relative">
          {/* Анимированный логотип */}
          <div className="flex items-center justify-center gap-1 mb-8">
            {['A', 'S', 'C', 'E', 'N', 'T'].map((letter, i) => (
              <span
                key={i}
                className="font-display text-5xl md:text-7xl tracking-[0.2em] text-brand-white animate-pulse"
                style={{
                  animationDelay: `${i * 100}ms`,
                  animationDuration: '1.5s',
                }}
              >
                {letter}
              </span>
            ))}
          </div>

          {/* Полоска загрузки */}
          <div className="w-64 h-px bg-brand-gray-800 mx-auto overflow-hidden">
            <div className="h-full w-1/3 bg-brand-white animate-[loading_1.5s_ease-in-out_infinite]" />
          </div>

          {/* Подпись */}
          <p className="mt-6 text-[10px] uppercase tracking-[0.4em] text-brand-gray-500">
            Loading
          </p>
        </div>
      </Container>

      {/* Стили для анимации полоски */}
      <style jsx global>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(400%);
          }
        }
      `}</style>
    </main>
  )
}