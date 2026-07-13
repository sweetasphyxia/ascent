'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, Info, X } from 'lucide-react'
import { useUIStore, type Toast as ToastType } from '@/store/uiStore'
import { cn } from '@/lib/utils'

const iconMap = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
}

const colorMap = {
  success: 'border-brand-white text-brand-white',
  error: 'border-brand-accent text-brand-accent',
  info: 'border-brand-gray-500 text-brand-gray-300',
}

function ToastItem({ toast }: { toast: ToastType }) {
  const removeToast = useUIStore((s) => s.removeToast)
  const Icon = iconMap[toast.type]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
      className={cn(
        'flex items-start gap-3 pl-4 pr-2 py-3',
        'bg-brand-black/90 backdrop-blur-xl border-l-2',
        'shadow-2xl min-w-[320px] max-w-md',
        colorMap[toast.type]
      )}
    >
      <Icon className="h-5 w-5 shrink-0 mt-0.5" strokeWidth={1.5} />
      <p className="flex-1 text-sm text-brand-white leading-snug">
        {toast.message}
      </p>
      <button
        onClick={() => removeToast(toast.id)}
        className="shrink-0 text-brand-gray-500 hover:text-brand-white transition-colors p-1 -mr-1"
        aria-label="Закрыть"
      >
        <X className="h-4 w-4" strokeWidth={1.5} />
      </button>
    </motion.div>
  )
}

/**
 * Контейнер для всех toast-уведомлений.
 * Располагается в правом нижнем углу (desktop) или снизу (mobile).
 */
export function ToastContainer() {
  const toasts = useUIStore((s) => s.toasts)

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-6 right-6 z-9999 flex flex-col gap-3 pointer-events-none"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}