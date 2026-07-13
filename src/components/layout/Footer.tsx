import Link from 'next/link'
import { 
  Container, 
  Heading, 
  Text, 
  Input, 
  Button, 
  Divider,
  InstagramIcon,
  XIcon,
  YouTubeIcon,
  TikTokIcon,
  TelegramIcon,
} from '@/components/ui'
import { Logo } from './Logo'

/**
 * Футер бренда ASCENT.
 * - Подписка на рассылку со скидкой
 * - 4 колонки ссылок
 * - Соцсети и копирайт
 * - Огромный фоновый текст "ASCENT" для атмосферы
 */
export function Footer() {
  return (
    <footer className="relative bg-brand-black text-brand-white border-t border-brand-gray-800 overflow-hidden">
      <Container size="xl" className="py-20 md:py-32 relative z-10">
        {/* Секция подписки на рассылку */}
        <section className="mb-20 md:mb-32">
          <div className="max-w-2xl space-y-8">
            <Text variant="eyebrow">Newsletter</Text>
            <Heading level={2}>
              Join the <br />
              <span className="text-stroke-white">ASCENT</span>
            </Heading>
            <Text variant="body" className="max-w-md">
              Подпишись на нашу рассылку и получи скидку 10% на первый заказ.
              Только эксклюзивные дропы, ранний доступ и закулисье бренда.
            </Text>

            <form className="flex flex-col sm:flex-row gap-4 max-w-xl">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  className="border-b-brand-white"
                />
              </div>
              <Button type="submit" variant="primary" size="lg">
                Subscribe
              </Button>
            </form>
          </div>
        </section>

        <Divider variant="fade" className="my-12" />

        {/* Колонки со ссылками */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
          <FooterColumn
            title="Shop"
            links={[
              { label: 'New Arrivals', href: '/catalog?filter=new' },
              { label: 'All Products', href: '/catalog' },
              { label: 'Collections', href: '/collections' },
              { label: 'Sale', href: '/catalog?filter=sale' },
            ]}
          />
          <FooterColumn
            title="Brand"
            links={[
              { label: 'About ASCENT', href: '/about' },
              { label: 'Manifesto', href: '/about#manifesto' },
              { label: 'Campaign', href: '/campaign' },
              { label: 'Lookbook', href: '/lookbook' },
            ]}
          />
          <FooterColumn
            title="Help"
            links={[
              { label: 'Contact', href: '/contact' },
              { label: 'Shipping', href: '/shipping' },
              { label: 'Returns', href: '/returns' },
              { label: 'FAQ', href: '/faq' },
            ]}
          />
          <FooterColumn
            title="Legal"
            links={[
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms of Service', href: '/terms' },
              { label: 'Cookies', href: '/cookies' },
            ]}
          />
        </div>

        <Divider variant="fade" className="my-12" />

        {/* Нижняя часть: логотип + соцсети + копирайт */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <Logo />

          {/* Соцсети */}
          <div className="flex items-center gap-3">
            <InstagramIcon href="https://instagram.com/ascent" />
            <XIcon href="https://x.com/ascent" />
            <YouTubeIcon href="https://youtube.com/@ascent" />
            <TikTokIcon href="https://tiktok.com/@ascent" />
            <TelegramIcon href="https://t.me/ascent" />
          </div>

          <p className="text-xs uppercase tracking-[0.2em] text-brand-gray-500">
            © {new Date().getFullYear()} ASCENT. All rights reserved.
          </p>
        </div>

        {/* Огромный фоновый текст для dark glam атмосферы */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 pointer-events-none select-none overflow-hidden z-0">
          <span className="font-display text-[25vw] leading-none tracking-tighter text-brand-gray-900/40 whitespace-nowrap">
            ASCENT
          </span>
        </div>
      </Container>

      {/* Декоративная нижняя полоса */}
      <div className="relative border-t border-brand-gray-800">
        <Container size="xl" className="py-4">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-brand-gray-600">
            <span>Fall / Winter 2026</span>
            <span>Dark Glam Streetwear</span>
            <span className="hidden md:block">Est. MMXXVI</span>
          </div>
        </Container>
      </div>
    </footer>
  )
}

/**
 * Колонка со ссылками в футере
 */
function FooterColumn({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <div className="space-y-4">
      <Text variant="eyebrow">{title}</Text>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="group flex items-center text-sm text-brand-gray-300 hover:text-brand-white transition-colors duration-300"
            >
              <span className="w-0 group-hover:w-3 h-px bg-brand-white mr-0 group-hover:mr-2 transition-all duration-300" />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}