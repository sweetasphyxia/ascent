import Link from 'next/link'
import { Container, Heading, Text, Button } from '@/components/ui'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-brand-black flex items-center justify-center py-32">
      <Container size="md" className="text-center">
        <Text variant="eyebrow" className="mb-6">
          Error 404
        </Text>
        <Heading level={1} className="mb-8">
          PAGE
          <br />
          <span className="text-stroke-white">NOT FOUND</span>
        </Heading>
        <Text variant="body" className="max-w-md mx-auto mb-12">
          Страница, которую ты ищешь, не существует или была перемещена.
          Попробуй начать с главной или перейти в каталог.
        </Text>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="primary" size="lg">
              Back to Home
            </Button>
          </Link>
          <Link href="/catalog">
            <Button variant="outline" size="lg">
              Shop Collection
            </Button>
          </Link>
        </div>

        {/* Огромный фоновый текст */}
        <div className="mt-20 select-none pointer-events-none">
          <span className="font-display text-[20vw] leading-none tracking-tighter text-brand-gray-900 whitespace-nowrap">
            404
          </span>
        </div>
      </Container>
    </main>
  )
}