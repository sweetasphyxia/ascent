'use client'

import { useEffect } from 'react'
import { Container, Heading, Text, Button } from '@/components/ui'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

/**
 * Error boundary для runtime-ошибок в Next.js App Router.
 * Ловит ошибки рендеринга и показывает дружелюбный UI
 * с кнопкой "Try Again" для повторной попытки.
 */
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Логируем ошибку в консоль для отладки
    console.error('Application error:', error)

    // В production можно отправлять в Sentry/LogRocket/etc.
    // if (process.env.NODE_ENV === 'production') {
    //   captureException(error)
    // }
  }, [error])

  return (
    <main className="min-h-screen bg-brand-black flex items-center justify-center py-32">
      <Container size="md" className="text-center">
        <Text variant="eyebrow" className="mb-6">
          Something went wrong
        </Text>
        <Heading level={1} className="mb-8">
          ERROR
          <br />
          <span className="text-stroke-white">OCCURRED</span>
        </Heading>
        <Text variant="body" className="max-w-md mx-auto mb-12 text-brand-gray-400">
          Произошла непредвиденная ошибка. Мы уже работаем над её исправлением.
          Попробуй обновить страницу или вернуться позже.
        </Text>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" size="lg" onClick={() => reset()}>
            Try Again
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => (window.location.href = '/')}
          >
            Back to Home
          </Button>
        </div>

        {/* Debug info в dev mode */}
        {process.env.NODE_ENV === 'development' && error?.message && (
          <div className="mt-16 text-left max-w-2xl mx-auto">
            <p className="text-[10px] uppercase tracking-[0.3em] text-brand-gray-500 mb-3">
              Debug Info
            </p>
            <pre className="text-xs text-brand-accent bg-brand-gray-900 p-4 overflow-x-auto">
              {error.message}
            </pre>
          </div>
        )}
      </Container>
    </main>
  )
}