/**
 * Структура пункта навигации.
 * Каждый пункт может иметь фоновое видео или изображение,
 * которое показывается при hover в меню.
 */
export interface NavigationItem {
  id: string
  label: string
  number: string // "01", "02", ... для streetwear-эстетики
  href: string
  description?: string
  media: {
    type: 'image' | 'video'
    src: string
  }
}

export const mainNavigation: NavigationItem[] = [
  {
    id: 'new',
    label: 'New Arrivals',
    number: '01',
    href: '/catalog?new=1',
    description: 'Свежие дропы и эксклюзивные вещи',
    media: {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&q=80',
    },
  },
  {
    id: 'collections',
    label: 'Collections',
    number: '02',
    href: '/catalog',
    description: 'Кураторские подборки по темам и сезонам',
    media: {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1600&q=80',
    },
  },
  {
    id: 'campaign',
    label: 'Campaign',
    number: '03',
    href: '/campaign',
    description: 'Кампейны и визуальные истории бренда',
    media: {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&q=80',
    },
  },
  {
    id: 'manifesto',
    label: 'Manifesto',
    number: '04',
    href: '/about',
    description: 'Философия ASCENT и наш путь',
    media: {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&q=80',
    },
  },
  {
    id: 'lookbook',
    label: 'Lookbook',
    number: '05',
    href: '/lookbook',
    description: 'Фото-истории и стиль от ASCENT',
    media: {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80',
    },
  },
  {
    id: 'contact',
    label: 'Contact',
    number: '06',
    href: '/contact',
    description: 'Свяжись с нами или найди магазин',
    media: {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1600&q=80',
    },
  },
]