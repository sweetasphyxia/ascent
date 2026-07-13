import { Container, Heading, Text } from '@/components/ui'

export default function LookbookPage() {
  return (
    <main className="min-h-screen bg-brand-black flex items-center justify-center py-32">
      <Container size="md" className="text-center">
        <Text variant="eyebrow" className="mb-6">Coming Soon</Text>
        <Heading level={1} className="mb-8">
          LOOKBOOK
          <br />
          <span className="text-stroke-white">FW26</span>
        </Heading>
        <Text variant="body" className="max-w-md mx-auto text-brand-gray-400">
          Фотосессия новой коллекции в процессе. Скоро здесь появятся визуальные истории ASCENT.
        </Text>
      </Container>
    </main>
  )
}

export const metadata = {
  title: 'Lookbook | ASCENT',
  description: 'Визуальные истории и стиль от ASCENT. Коллекция FW26.',
}