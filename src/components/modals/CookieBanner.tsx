'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Cookie } from 'lucide-react'
import Link from 'next/link'
import { useUIStore } from '@/store/uiStore'
import { Button } from '@/components/ui'

/**
 * Стильный баннер согласия на cookies.
 * - Появляется снизу с slide-up анимацией
 * - Показывается только один раз (localStorage)
 * - Кнопки: "Accept All" и "Learn More"
 */
export function CookieBanner() {
  const { cookiesAccepted, acceptCookies } = useUIStore()

  return (
    <AnimatePresence>
      {!cookiesAccepted && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1], delay: 1.5 }}
          className="fixed bottom-0 left-0 right-0 z-80 p-4 md:p-6 pointer-events-none"
        >
          <div className="mx-auto max-w-5xl pointer-events-auto">
            <div className="bg-brand-black border border-brand-gray-800 backdrop-blur-xl p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-10 h-10 border border-brand-gray-700 flex items-center justify-center shrink-0">
                  <Cookie
                    className="h-4 w-4 text-brand-white"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-sm text-brand-gray-300 leading-relaxed">
                    Мы используем cookies для улучшения опыта и аналитики.
                    Продолжая использовать сайт, ты соглашаешься с нашей{' '}
                    <Link
                      href="/privacy"
                      className="underline hover:text-brand-white transition-colors"
                    >
                      политикой конфиденциальности
                    </Link>
                    .
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
                <Link
                  href="/cookies"
                  className="text-[10px] uppercase tracking-[0.3em] text-brand-gray-400 hover:text-brand-white transition-colors px-3 py-2"
                >
                  Learn More
                </Link>
                <Button
                  variant="primary"
                  size="md"
                  onClick={acceptCookies}
                  className="flex-1 md:flex-none"
                >
                  Accept All
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}