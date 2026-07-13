import { Container, Heading, Text, ParallaxImage } from '@/components/ui'

export default function CampaignPage() {
  return (
    <>
      {/* === HERO С ВИДЕО === */}
      <section className="relative h-screen w-full overflow-hidden bg-brand-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover grayscale contrast-125"
        >
          <source src="https://cdn.coverr.co/videos/coverr-walking-in-the-dark-1584/1080p.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-brand-black/60" />
        
        <Container size="xl" className="relative z-10 flex flex-col justify-end h-full pb-20 md:pb-32">
          <Text variant="eyebrow" className="mb-6 text-brand-gray-300">
            Campaign · Fall / Winter 2026
          </Text>
          <Heading level={1} className="text-display-xl!">
            NOCTURNAL
            <br />
            <span className="text-stroke-white">ASCENT</span>
          </Heading>
        </Container>
      </section>

      {/* === КОНЦЕПЦИЯ === */}
      <section className="py-32 bg-brand-black">
        <Container size="md" className="text-center">
          <Text variant="eyebrow" className="mb-8">The Vision</Text>
          <Heading level={2} className="mb-8">
            Снято в заброшенных индустриальных зонах Берлина.
          </Heading>
          <Text variant="large" className="text-brand-gray-300 leading-relaxed">
            Коллекция FW26 исследует контраст между грубостью бетона 
            и мягкостью премиальных тканей. Это история о людях, 
            которые находят красоту в темноте и пустоте.
          </Text>
        </Container>
      </section>

      {/* === АСИММЕТРИЧНЫЙ ЛУКБУК === */}
      <section className="py-20 bg-brand-black">
        <Container size="xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            {/* Большое фото слева */}
            <div className="md:col-span-7 md:row-span-2">
              <ParallaxImage
                src="https://picsum.photos/seed/campaign-1/1200/1600"
                alt="Campaign Look 1"
                className="aspect-3/4 w-full h-full"
                speed={0.15}
              />
            </div>

            {/* Два фото справа */}
            <div className="md:col-span-5">
              <ParallaxImage
                src="https://picsum.photos/seed/campaign-2/800/1000"
                alt="Campaign Look 2"
                className="aspect-4/5 w-full"
                direction="down"
                speed={0.2}
              />
            </div>
            <div className="md:col-span-5 md:mt-12">
              <ParallaxImage
                src="https://picsum.photos/seed/campaign-3/800/1000"
                alt="Campaign Look 3"
                className="aspect-4/5 w-full"
                direction="up"
                speed={0.2}
              />
            </div>

            {/* Полноширинное фото снизу */}
            <div className="md:col-span-12 mt-8">
              <ParallaxImage
                src="https://picsum.photos/seed/campaign-4/1920/800"
                alt="Campaign Look 4"
                className="aspect-video w-full"
                speed={0.3}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* === CTA === */}
      <section className="py-32 bg-brand-black text-center border-t border-brand-gray-800">
        <Container size="md">
          <Heading level={2} className="mb-8">
            SHOP THE <span className="text-stroke-white">CAMPAIGN</span>
          </Heading>
          <Text variant="body" className="mb-12 text-brand-gray-400">
            Все вещи из лукбука уже доступны в новой коллекции.
          </Text>
          <a 
            href="/catalog" 
            className="inline-block border border-brand-white px-12 py-4 uppercase tracking-[0.2em] text-sm hover:bg-brand-white hover:text-brand-black transition-colors duration-300"
          >
            Explore Collection
          </a>
        </Container>
      </section>
    </>
  )
}

export const metadata = {
  title: 'Campaign FW26 | ASCENT',
  description: 'Визуальная история коллекции Fall/Winter 2026. Nocturnal Ascent.',
}