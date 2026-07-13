'use client'

export default function GlobalError({
  reset,
}: {
  reset: () => void
}) {
  return (
    <html>
      <body className="bg-black text-white flex items-center justify-center min-h-screen font-sans">
        <div className="text-center max-w-md px-6">
          <h1 className="text-6xl font-bold mb-4 tracking-tight">500</h1>
          <p className="text-gray-400 mb-8">
            Критическая ошибка приложения. Попробуй перезагрузить страницу.
          </p>
          <button
            onClick={() => reset()}
            className="px-8 py-3 bg-white text-black uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  )
}