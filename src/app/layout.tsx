import type { Metadata } from 'next'
import { Inter, Oswald } from 'next/font/google'
import { Providers } from '@/components/Providers'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
})

const oswald = Oswald({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-oswald',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ascent.brand'),
  title: {
    default: 'ASCENT | Dark Glam Streetwear',
    template: '%s | ASCENT',
  },
  description:
    'ASCENT — премиальный streetwear бренд с эстетикой dark glam. Oversized силуэты, премиальные ткани, минималистичный дизайн.',
  keywords: [
    'ascent',
    'streetwear',
    'dark glam',
    'premium streetwear',
    'oversized',
    'fashion',
    'hoodies',
    'bomber jackets',
  ],
  authors: [{ name: 'ASCENT' }],
  creator: 'ASCENT',
  publisher: 'ASCENT',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'ASCENT',
    title: 'ASCENT | Dark Glam Streetwear',
    description: 'Премиальный streetwear с эстетикой dark glam',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ASCENT — Dark Glam Streetwear',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ASCENT | Dark Glam Streetwear',
    description: 'Премиальный streetwear с эстетикой dark glam',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${oswald.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect для ускорения загрузки внешних ресурсов */}
        <link rel="preconnect" href="https://picsum.photos" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />

        {/* ✅ Убраны ссылки на несуществующие favicon/manifest файлы,
            чтобы не было 404 ошибок в консоли.
            Когда добавишь реальные иконки в public/ — верни эти строки. */}
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          {/* ✅ ВОТ ОНИ — Header и Footer, которых не хватало! */}
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}