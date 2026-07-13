import { Hero } from '@/components/home/Hero'
import { ProductCarousel } from '@/components/product/ProductCarousel'
import { Container, Heading, Text, Divider, Button } from '@/components/ui'
import { products } from '@/data/products'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      {/* === HERO === */}
      <Hero />

      {/* === NEW ARRIVALS (drag-carousel) === */}
      <section className="relative py-20 md:py-32 bg-brand-black">
        <Container size="xl" className="mb-10 md:mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <Text variant="eyebrow" className="mb-4">
                New Arrivals
              </Text>
              <Heading level={2}>
                LATEST
                <br />
                <span className="text-stroke-white">DROPS</span>
              </Heading>
            </div>

            <Link href="/catalog?filter=new">
              <Button variant="outline" size="lg">
                View All
              </Button>
            </Link>
          </div>
        </Container>

        {/* Карусель во всю ширину экрана */}
        <ProductCarousel products={products} />
      </section>

      <Divider variant="fade" />

      {/* === МАНИФЕСТ === */}
      <section className="relative py-32 md:py-48 bg-brand-black">
        <Container size="lg" className="text-center">
          <Text variant="eyebrow" className="mb-6">
            Fall / Winter 2026
          </Text>
          <Heading level={2} className="mb-8">
            NEW SEASON
            <br />
            <span className="text-stroke-white">NEW SILENCES</span>
          </Heading>
          <Text variant="body" className="max-w-2xl mx-auto">
            Каждая вещь — это манифест. Каждая деталь — это вызов.
            Мы создаём одежду для тех, кто понимает: настоящий стиль
            рождается не в свете софитов, а в темноте переулков.
          </Text>
        </Container>
      </section>

      <Divider variant="fade" />

      {/* === ФИЛОСОФИЯ === */}
      <section className="relative py-32 md:py-48 bg-brand-black">
        <Container size="md" className="text-center">
          <Heading level={2} stroke className="mb-12">
            MANIFESTO
          </Heading>
          <Text variant="large" className="max-w-3xl mx-auto leading-relaxed">
            ASCENT — это не бренд. Это состояние.
            <br /><br />
            Мы верим, что одежда должна быть тишиной посреди шума,
            формой посреди хаоса, восхождением посреди равнины.
            Мы не следуем трендам — мы задаём высоту.
          </Text>
        </Container>
      </section>
    </>
  )
}