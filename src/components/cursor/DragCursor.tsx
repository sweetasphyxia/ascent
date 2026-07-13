'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Список интерактивных тегов и селекторов,
 * над которыми кастомный курсор НЕ показывается.
 * Над ними остаётся стандартный cursor: pointer.
 */
const INTERACTIVE_SELECTOR = 'button, a, [role="button"], input, select, textarea, label'

export function DragCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isGrabbing, setIsGrabbing] = useState(false)

  const cursorX = useMotionValue(-200)
  const cursorY = useMotionValue(-200)

  const x = useSpring(cursorX, { damping: 25, stiffness: 400, mass: 0.5 })
  const y = useSpring(cursorY, { damping: 25, stiffness: 400, mass: 0.5 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      const target = e.target as Element

      // Находим, внутри drag-зоны ли курсор
      const dragZone = target.closest('[data-drag-cursor]')

      // Проверяем, не наведён ли курсор на интерактивный элемент
      const isInteractive = !!target.closest(INTERACTIVE_SELECTOR)

      // Показываем кастомный курсор ТОЛЬКО если:
      // 1. Мы внутри drag-зоны
      // 2. Мы НЕ над кнопкой/ссылкой
      const shouldShowCursor = !!dragZone && !isInteractive

      setIsHovering(shouldShowCursor)

      if (shouldShowCursor) {
        document.body.classList.add('hide-cursor')
      } else {
        document.body.classList.remove('hide-cursor')
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as Element
      const dragZone = target.closest('[data-drag-cursor]')
      const isInteractive = !!target.closest(INTERACTIVE_SELECTOR)
      if (dragZone && !isInteractive) {
        setIsGrabbing(true)
      }
    }

    const handleMouseUp = () => {
      setIsGrabbing(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.classList.remove('hide-cursor')
    }
  }, [cursorX, cursorY])

  const size = isGrabbing ? 120 : 96

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full flex items-center justify-center backdrop-blur-xl border border-white/20"
      style={{
        x,
        y,
        width: size,
        height: size,
        backgroundColor: isGrabbing ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        scale: isHovering ? 1 : 0,
        opacity: isHovering ? 1 : 0,
      }}
      transition={{ duration: 0.25 }}
    >
      <span
        className="text-[11px] uppercase tracking-[0.3em] font-medium whitespace-nowrap select-none text-white"
        style={{
          textShadow: '0 1px 8px rgba(0, 0, 0, 0.8)',
        }}
      >
        {isGrabbing ? 'Grab' : 'Drag'}
      </span>
    </motion.div>
  )
}