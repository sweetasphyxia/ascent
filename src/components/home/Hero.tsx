'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { TextReveal } from '@/components/animations/TextReveal'    // ← ПРАВИЛЬНО (фигурные скобки)
import { ScrollIndicator } from './ScrollIndicator'

/**
 * Hero-секция главной страницы ASCENT.
 * - Полноэкранное фоновое видео (autoplay, loop, muted)
 * - Крупный слоган с побуквенной анимацией
 * - CTA-кнопки и манифест
 * - Декоративные элементы по бокам
 */
export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-brand-black">
      {/* === ФОНОВОЕ ВИДЕО === */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
          {/* Fallback: если видео не загружается, показываем чёрный фон */}
        </video>

        {/* Затемняющий оверлей для читаемости текста */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/60 via-brand-black/40 to-brand-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/50 via-transparent to-brand-black/50" />
      </div>

      {/* === КОНТЕНТ === */}
      <div className="relative z-10 flex h-full flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1920px]">
          {/* Верхняя подпись — номер коллекции */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-6 md:mb-10"
          >
            <span className="inline-flex items-center gap-3 text-[10px] md:text-xs uppercase tracking-[0.4em] text-brand-gray-300">
              <span className="h-px w-8 bg-brand-white" />
              Collection 01 — FW26
            </span>
          </motion.div>

          {/* === ОСНОВНОЙ СЛОГАН === */}
          <h1 className="font-display leading-[0.9] tracking-tighter">
            <TextReveal
              text="RISE"
              className="block text-hero text-brand-white"
              delay={0.8}
              stagger={0.04}
            />
            <TextReveal
              text="IN"
              className="block text-hero text-brand-white"
              delay={1.2}
              stagger={0.04}
            />
            <TextReveal
              text="SILENCE"
              className="block text-hero text-stroke-white"
              delay={1.6}
              stagger={0.04}
            />
          </h1>

          {/* Подзаголовок / манифест */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.2 }}
            className="mt-8 md:mt-12 max-w-xl text-base md:text-lg text-brand-gray-300 leading-relaxed"
          >
            Мы не создаём тренды — мы создаём тишину, в которой рождается стиль.
            Одежда для тех, кто идёт вверх, не оглядываясь.
          </motion.p>

          {/* === CTA КНОПКИ === */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.5 }}
            className="mt-10 md:mt-14 flex flex-col sm:flex-row gap-4"
          >
            <Link href="/catalog">
              <Button variant="primary" size="xl">
                Shop Collection
              </Button>
            </Link>
            <Link href="/campaign">
              <Button variant="outline" size="xl">
                Watch Campaign
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* === ДЕКОРАТИВНЫЕ БОКОВЫЕ ЭЛЕМЕНТЫ === */}
      {/* Вертикальный текст слева */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:block z-10"
      >
        <span className="text-[9px] tracking-[0.4em] uppercase text-brand-gray-400 [writing-mode:vertical-rl] rotate-180">
          ASCENT · Collection 01
        </span>
      </motion.div>

      {/* Вертикальный текст справа */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:block z-10"
      >
        <span className="text-[9px] tracking-[0.4em] uppercase text-brand-gray-400 [writing-mode:vertical-rl]">
          Dark Glam · Est. MMXXVI
        </span>
      </motion.div>

      {/* Крупный номер коллекции в правом нижнем углу */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
        className="absolute bottom-8 right-8 hidden md:block z-10"
      >
        <span className="font-display text-8xl lg:text-9xl leading-none text-brand-white/10 tabular-nums">
          01
        </span>
      </motion.div>

      {/* Индикатор скролла */}
      <ScrollIndicator />

      {/* Декоративные угловые линии */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-brand-white/20 hidden md:block z-10" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-brand-white/20 hidden md:block z-10" />
    </section>
  )
}