import { notFound } from 'next/navigation'
import { Container, Heading, Text, Breadcrumbs } from '@/components/ui'
import { ProductGallery } from '@/components/product/ProductGallery'
import { ProductInfo } from '@/components/product/ProductInfo'
import { ProductCarousel } from '@/components/product/ProductCarousel'
import { products } from '@/data/products'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

/**
 * Страница товара.
 * App Router Next.js 14+ требует params как Promise.
 */
export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    notFound()
  }

  // Похожие товары — из той же категории, исключая текущий
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 6)

  // Если мало товаров в той же категории — дополняем другими
  const finalRelated =
    relatedProducts.length >= 4
      ? relatedProducts
      : [...relatedProducts, ...products.filter((p) => p.id !== product.id).slice(0, 4 - relatedProducts.length)]

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/catalog' },
    { label: product.name },
  ]

  return (
    <>
      {/* Breadcrumbs */}
      <section className="pt-28 md:pt-32 pb-6 bg-brand-black">
        <Container size="xl">
          <Breadcrumbs items={breadcrumbItems} />
        </Container>
      </section>

      {/* Основной контент */}
      <section className="pb-20 md:pb-32 bg-brand-black">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <ProductGallery
              images={product.images.gallery}
              productName={product.name}
            />
            <ProductInfo product={product} />
          </div>
        </Container>
      </section>

      {/* Related products */}
      {finalRelated.length > 0 && (
        <section className="py-20 md:py-32 bg-brand-black border-t border-brand-gray-800">
          <Container size="xl" className="mb-10 md:mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <Text variant="eyebrow" className="mb-4">
                  You may also like
                </Text>
                <Heading level={2}>
                  COMPLETE <br />
                  <span className="text-stroke-white">THE LOOK</span>
                </Heading>
              </div>
            </div>
          </Container>

          <ProductCarousel products={finalRelated} />
        </section>
      )}
    </>
  )
}

// SEO metadata
export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    return { title: 'Product Not Found | ASCENT' }
  }

  return {
    title: `${product.name} | ASCENT`,
    description: product.description,
    openGraph: {
      title: `${product.name} | ASCENT`,
      description: product.description,
      images: [product.images.front],
    },
  }
}

// Генерация статических путей для всех товаров (SSG)
export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}