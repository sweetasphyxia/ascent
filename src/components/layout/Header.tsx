'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, ShoppingBag, Heart, type LucideProps } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from './Logo'
import { FullscreenMenu } from './FullscreenMenu'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useUIStore } from '@/store/uiStore'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  // ✅ Упрощённый скролл без useMotionValueEvent
  useEffect(() => {
    let lastScrollY = 0

    const handleScroll = () => {
      const scrollY = window.scrollY

      if (scrollY > 100) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      if (scrollY > lastScrollY && scrollY > 300) {
        setIsHidden(true)
      } else {
        setIsHidden(false)
      }

      lastScrollY = scrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-500 ease-smooth',
          isScrolled
            ? 'glass-effect border-b border-brand-gray-800/50'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex-1">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="group relative flex items-center gap-3 p-2 -ml-2"
                aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
              >
                <div className="relative h-4 w-7 flex flex-col justify-between">
                  <motion.span
                    animate={{
                      rotate: isOpen ? 45 : 0,
                      y: isOpen ? 6 : 0,
                    }}
                    className="h-px w-full bg-brand-white origin-left transition-colors"
                  />
                  <motion.span
                    animate={{
                      opacity: isOpen ? 0 : 1,
                      x: isOpen ? -10 : 0,
                    }}
                    className="h-px w-full bg-brand-white"
                  />
                  <motion.span
                    animate={{
                      rotate: isOpen ? -45 : 0,
                      y: isOpen ? -6 : 0,
                    }}
                    className="h-px w-full bg-brand-white origin-left"
                  />
                </div>
                <span className="hidden md:block text-xs uppercase tracking-[0.3em] text-brand-white">
                  {isOpen ? 'Close' : 'Menu'}
                </span>
              </button>
            </div>

            <div className="shrink-0">
              <Logo />
            </div>

            <div className="flex-1 flex items-center justify-end gap-1 md:gap-4">
              <SearchButton />
              <WishlistButton />
              <CartButton />
            </div>
          </div>
        </div>
      </motion.header>

      <FullscreenMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

interface IconButtonProps {
  icon: React.ComponentType<LucideProps>
  label: string
  onClick?: () => void
  badge?: number
}

function IconButton({ icon: Icon, label, onClick, badge }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative flex items-center justify-center',
        'h-11 w-11 md:h-12 md:w-12',
        'text-brand-white hover:text-brand-gray-400',
        'transition-colors duration-300 ease-smooth'
      )}
      aria-label={label}
    >
      <Icon className="h-5 w-5" strokeWidth={1.5} />
      {badge !== undefined && badge > 0 && (
        <motion.span
          key={badge}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={cn(
            'absolute top-1 right-1 md:top-2 md:right-2',
            'flex h-4 w-4 items-center justify-center',
            'bg-brand-white text-brand-black',
            'text-[9px] font-medium rounded-full'
          )}
        >
          {badge}
        </motion.span>
      )}
    </button>
  )
}

function SearchButton() {
  const openModal = useUIStore((s) => s.openModal)

  return (
    <IconButton
      icon={Search}
      label="Поиск"
      onClick={() => openModal('search')}
    />
  )
}

function WishlistButton() {
  const items = useWishlistStore((state) => state.items)
  const openWishlist = useWishlistStore((state) => state.openWishlist)

  return (
    <IconButton
      icon={Heart}
      label="Избранное"
      badge={items.length}
      onClick={openWishlist}
    />
  )
}

function CartButton() {
  const totalItems = useCartStore((state) => state.getTotalItems())
  const openCart = useCartStore((state) => state.openCart)

  return (
    <IconButton
      icon={ShoppingBag}
      label="Корзина"
      badge={totalItems}
      onClick={openCart}
    />
  )
}