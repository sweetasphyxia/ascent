import { Container, Heading, Text, ParallaxImage } from '@/components/ui'

export default function AboutPage() {
  return (
    <>
      {/* === HERO === */}
      <section className="relative min-h-screen flex items-center justify-center bg-brand-black pt-20">
        <Container size="xl" className="text-center">
          <Text variant="eyebrow" className="mb-8">
            Our Philosophy
          </Text>
          <Heading level={1} className="text-[clamp(4rem,20vw,16rem)]! leading-[0.8]">
            WE DON&apos;T
            <br />
            <span className="text-stroke-white">CREATE</span>
            <br />
            CLOTHES.
          </Heading>
        </Container>
        
        {/* Вертикальный текст сбоку */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:block">
          <span className="text-[10px] tracking-[0.4em] uppercase text-brand-gray-500 [writing-mode:vertical-rl]">
            Manifesto · Est. 2026
          </span>
        </div>
      </section>

      {/* === СЕКЦИЯ 1: ФИЛОСОФИЯ === */}
      <section className="py-32 md:py-48 bg-brand-black">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
              <Text variant="eyebrow" className="mb-6">01 / Silence</Text>
              <Heading level={2} className="mb-8">
                Тишина посреди шума.
              </Heading>
              <Text variant="large" className="text-brand-gray-300 leading-relaxed">
                В мире, где все кричат, мы выбрали шёпот. ASCENT — это не про тренды, 
                которые умрут через сезон. Это про форму, которая остаётся. 
                Мы убираем всё лишнее, чтобы оставить только суть.
              </Text>
            </div>

            <div className="lg:col-span-7 space-y-8">
              <ParallaxImage
                src="https://picsum.photos/seed/ascent-manifesto-1/1200/1600"
                alt="ASCENT Philosophy"
                className="aspect-3/4 w-full"
                direction="up"
                speed={0.3}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* === СЕКЦИЯ 2: МАТЕРИАЛЫ (Горизонтальный скролл-текст) === */}
      <section className="py-20 border-y border-brand-gray-800 bg-brand-black overflow-hidden">
        <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="font-display text-display-xl uppercase tracking-tighter text-brand-gray-800 mx-8">
              PREMIUM COTTON • HEAVY WEIGHT • HANDCRAFTED • DARK GLAM •
            </span>
          ))}
        </div>
      </section>

      {/* === СЕКЦИЯ 3: МАТЕРИАЛЫ И ДЕТАЛИ === */}
      <section className="py-32 md:py-48 bg-brand-black">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <ParallaxImage
                src="https://picsum.photos/seed/ascent-manifesto-2/1200/800"
                alt="ASCENT Materials"
                className="aspect-4/3 w-full"
                direction="down"
                speed={0.2}
              />
            </div>
            
            <div className="lg:col-span-5 order-1 lg:order-2">
              <Text variant="eyebrow" className="mb-6">02 / Substance</Text>
              <Heading level={2} className="mb-8">
                Вес имеет значение.
              </Heading>
              <Text variant="body" className="text-brand-gray-400 leading-relaxed mb-6">
                Мы не используем тонкие ткани. Наш хлопок — это 240-380 gsm. 
                Наши нейлоны — это броня. Каждая вещь ASCENT ощущается на теле 
                как физическое присутствие, а не как вторая кожа.
              </Text>
              <Text variant="body" className="text-brand-gray-400 leading-relaxed">
                Фурнитура YKK, усиленные швы, идеальные лекала. 
                Вещь, которая переживёт тебя.
              </Text>
            </div>
          </div>
        </Container>
      </section>

      {/* === ФИНАЛЬНАЯ ЦИТАТА === */}
      <section className="py-32 md:py-48 bg-brand-black text-center">
        <Container size="md">
          <Heading level={2} stroke className="mb-8">
            &ldquo;МЫ НЕ СЛЕДУЕМ ТРЕНДАМ.
            <br />
            МЫ ЗАДАЁМ ВЫСОТУ.&rdquo;
          </Heading>
          <Text variant="caption" className="mt-8">
            — Основатели ASCENT
          </Text>
        </Container>
      </section>
    </>
  )
}

export const metadata = {
  title: 'Manifesto | ASCENT',
  description: 'Философия и манифест бренда ASCENT. Тишина, форма, восхождение.',
}