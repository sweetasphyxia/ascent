'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Gift } from 'lucide-react'
import { useUIStore } from '@/store/uiStore'
import { Heading, Text, Input, Button } from '@/components/ui'

/**
 * Модалка подписки на рассылку со скидкой 10%.
 * - Появляется через 10 секунд после загрузки (если не показывалась ранее)
 * - Показывается только один раз (флаг в localStorage)
 * - Закрытие по крестику, клику на фон или Escape
 */
export function NewsletterModal() {
  const { activeModal, closeModal, newsletterShown, markNewsletterShown } =
    useUIStore()
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const isOpen = activeModal === 'newsletter'

  // Автопоказ через 10 секунд (если еще не показывали)
  useEffect(() => {
    if (newsletterShown) return

    const timer = setTimeout(() => {
      const openModal = useUIStore.getState().openModal
      openModal('newsletter')
      markNewsletterShown()
    }, 10000)

    return () => clearTimeout(timer)
  }, [newsletterShown, markNewsletterShown])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    if (isOpen) window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, closeModal])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setIsSubmitted(true)
    setTimeout(() => {
      closeModal()
      setTimeout(() => {
        setIsSubmitted(false)
        setEmail('')
      }, 500)
    }, 2500)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-85 bg-brand-black/80 backdrop-blur-md"
          />

          <div className="fixed inset-0 z-86 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="relative bg-brand-black border border-brand-gray-800 max-w-lg w-full p-8 md:p-12 pointer-events-auto"
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-brand-gray-500 hover:text-brand-white transition-colors p-2"
                aria-label="Закрыть"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>

              {!isSubmitted ? (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 border border-brand-white flex items-center justify-center">
                      <Gift
                        className="h-5 w-5 text-brand-white"
                        strokeWidth={1.5}
                      />
                    </div>
                    <Text variant="eyebrow">Exclusive Offer</Text>
                  </div>

                  <Heading level={2} className="mb-4">
                    GET <span className="text-brand-accent">10% OFF</span>
                    <br />
                    YOUR FIRST ORDER
                  </Heading>

                  <Text variant="body" className="text-brand-gray-400 mb-8">
                    Подпишись на рассылку ASCENT и получи промокод на скидку.
                    Только эксклюзивные дропы и ранний доступ к коллекциям.
                  </Text>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                    >
                      Get My 10% Off
                    </Button>
                  </form>

                  <p className="text-[10px] uppercase tracking-[0.3em] text-brand-gray-600 text-center mt-6">
                    No spam. Unsubscribe anytime.
                  </p>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 border border-brand-white rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl">✓</span>
                  </div>
                  <Heading level={3} className="mb-3">
                    WELCOME TO ASCENT
                  </Heading>
                  <Text variant="body" className="text-brand-gray-400">
                    Промокод <span className="text-brand-white font-medium">ASCENT10</span> отправлен на{' '}
                    <span className="text-brand-white">{email}</span>
                  </Text>
                </motion.div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}