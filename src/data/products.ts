/**
 * Тип товара ASCENT.
 * Используется в каруселях, каталоге и странице товара.
 */
export interface Product {
  id: string
  slug: string
  name: string
  category: 'tshirts' | 'hoodies' | 'jackets' | 'pants' | 'accessories'
  price: number
  salePrice?: number
  images: {
    front: string
    back: string
    gallery: string[] // Массив всех фото для галереи на странице товара
  }
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL')[]
  isNew?: boolean
  isSale?: boolean
  color: string
  // Новые поля для страницы товара
  description: string
  details: string[]
  material: string
  care: string[]
}

/**
 * Мок-данные товаров ASCENT.
 * Изображения с реальными фото Enfants Riches Deprimes.
 */
export const products: Product[] = [
  {
    id: 'p-001',
    slug: 'white-underground-cotton-longsleeve',
    name: 'White Underground Cotton Longsleeve',
    category: 'tshirts',
    price: 115000,
    color: 'White',
    description:
      'Белая длинношёвная футболка из премиального хлопка. Классический подземный стиль Enfants Riches Deprimes с минималистичным дизайном.',
    details: [
      'Regular fit',
      'Длинные рукава',
      'Премиальный хлопок',
      'Минималистичный дизайн',
      'Комфортный крой',
    ],
    material: '100% Cotton',
    care: [
      'Машинная стирка при 30°C',
      'Не отбеливать',
      'Гладить при низкой температуре',
      'Не сушить в машине',
    ],
    images: {
      front: 'https://i.imgur.com/64937aO.jpg',
      back: 'https://i.imgur.com/64937aO.jpg',
      gallery: [
        'https://i.imgur.com/64937aO.jpg',
      ],
    },
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: true,
  },
  {
    id: 'p-002',
    slug: 'navy-constructivist-hunting-cotton-jacket',
    name: 'Navy Constructivist Hunting Cotton Jacket',
    category: 'jackets',
    price: 330000,
    color: 'Navy',
    description:
      'Тёмно-синяя куртка Enfants Riches Deprimes с конструктивистским дизайном. Премиальный хлопок, идеальна для охотничьего стиля.',
    details: [
      'Hunting style',
      'Конструктивистский дизайн',
      'Премиальный хлопок',
      'Прочная конструкция',
      'Функциональные карманы',
    ],
    material: '100% Cotton',
    care: [
      'Машинная стирка при 30°C',
      'Не отбеливать',
      'Гладить при средней температуре',
      'Не сушить в машине',
    ],
    images: {
      front: 'https://i.imgur.com/TmmjfEs.jpg',
      back: 'https://i.imgur.com/TmmjfEs.jpg',
      gallery: [
        'https://i.imgur.com/TmmjfEs.jpg',
      ],
    },
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: true,
  },
]
