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
 * Изображения с picsum.photos с seed для стабильности.
 * В реальном проекте замени на свои фото из /public/images/products/
 */
export const products: Product[] = [
  {
    id: 'p-001',
    slug: 'shadow-oversized-tee',
    name: 'Shadow Oversized Tee',
    category: 'tshirts',
    price: 8900,
    color: 'Black',
    description:
      'Oversized футболка из премиального органического хлопка. Свободный крой, спущенные плечи, минималистичный силуэт. Идеальная база для любого образа ASCENT — тишина, в которой рождается стиль.',
    details: [
      'Oversized fit',
      'Спущенная линия плеча',
      'Ребристый воротник',
      'Прямой подол',
      'Вышитый логотип ASCENT на затылке',
      'Сделано в Португалии',
    ],
    material: '100% Organic Cotton, 240 gsm',
    care: [
      'Машинная стирка при 30°C',
      'Не отбеливать',
      'Гладить при низкой температуре',
      'Не сушить в машине',
      'Химчистка запрещена',
    ],
    images: {
      front: 'https://cdn3.spin4spin.com/media/images/2000000470559/735ef60fb17c24c92126464d6d2bae31.jpg',
      back: 'https://picsum.photos/seed/ascent-tee-back/800/1067',
      gallery: [
        'https://picsum.photos/seed/ascent-tee-front/800/1067',
        'https://picsum.photos/seed/ascent-tee-back/800/1067',
        'https://picsum.photos/seed/ascent-tee-detail/800/1067',
        'https://picsum.photos/seed/ascent-tee-model/800/1067',
      ],
    },
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: true,
  },
  {
    id: 'p-002',
    slug: 'ascent-hoodie-noir',
    name: 'Ascent Hoodie Noir',
    category: 'hoodies',
    price: 16900,
    salePrice: 11900,
    color: 'Black',
    description:
      'Худи из плотного футера с начёсом. Объёмный капюшон с двойной кулиской, карман-кенгуру, рубчатые манжеты. Тёплый, мягкий, безупречный. Для тех, кто идёт вверх, не оглядываясь.',
    details: [
      'Regular fit',
      'Двойной капюшон с кулиской',
      'Карман-кенгуру',
      'Рубчатые манжеты и низ',
      'Вышитый логотип ASCENT на груди',
      'Внутренний карман на молнии',
    ],
    material: '80% Cotton, 20% Polyester, 380 gsm',
    care: [
      'Машинная стирка при 30°C',
      'Не отбеливать',
      'Гладить с изнанки',
      'Не сушить в машине',
    ],
    images: {
      front: 'https://picsum.photos/seed/ascent-hoodie-front/800/1067',
      back: 'https://picsum.photos/seed/ascent-hoodie-back/800/1067',
      gallery: [
        'https://picsum.photos/seed/ascent-hoodie-front/800/1067',
        'https://picsum.photos/seed/ascent-hoodie-back/800/1067',
        'https://picsum.photos/seed/ascent-hoodie-detail/800/1067',
        'https://picsum.photos/seed/ascent-hoodie-model/800/1067',
      ],
    },
    sizes: ['M', 'L', 'XL'],
    isSale: true,
  },
  {
    id: 'p-003',
    slug: 'silence-cargo-pants',
    name: 'Silence Cargo Pants',
    category: 'pants',
    price: 14900,
    color: 'Charcoal',
    description:
      'Карго-штаны свободного кроя с боковыми накладными карманами. Регулируемый пояс, прочная хлопковая ткань. Форма посреди хаоса — базовая вещь для уличного гардероба.',
    details: [
      'Relaxed fit',
      '6 функциональных карманов',
      'Регулируемый пояс на кулиске',
      'Застёжка на молнии и пуговице',
      'Усиленные швы',
      'Сделано в Турции',
    ],
    material: '100% Cotton Twill, 320 gsm',
    care: [
      'Машинная стирка при 30°C',
      'Не отбеливать',
      'Гладить при средней температуре',
      'Не сушить в машине',
    ],
    images: {
      front: 'https://picsum.photos/seed/ascent-pants-front/800/1067',
      back: 'https://picsum.photos/seed/ascent-pants-back/800/1067',
      gallery: [
        'https://picsum.photos/seed/ascent-pants-front/800/1067',
        'https://picsum.photos/seed/ascent-pants-back/800/1067',
        'https://picsum.photos/seed/ascent-pants-detail/800/1067',
        'https://picsum.photos/seed/ascent-pants-model/800/1067',
      ],
    },
    sizes: ['S', 'M', 'L'],
    isNew: true,
  },
  {
    id: 'p-004',
    slug: 'manifesto-bomber',
    name: 'Manifesto Bomber',
    category: 'jackets',
    price: 28900,
    color: 'Black',
    description:
      'Бомбер из плотного нейлона с сатиновой подкладкой. Классический силуэт, ребристые манжеты и низ, два боковых кармана. Верхняя одежда как манифест — ничего лишнего.',
    details: [
      'Regular fit',
      'Сатиновая подкладка',
      'Рибана на манжетах и низу',
      'Два боковых кармана на молнии',
      'Внутренний карман',
      'Застёжка на молнии YKK',
      'Карабин на воротнике',
    ],
    material: 'Shell: 100% Nylon, Lining: 100% Polyester',
    care: [
      'Химчистка',
      'Не отбеливать',
      'Не гладить',
      'Не сушить в машине',
    ],
    images: {
      front: 'https://picsum.photos/seed/ascent-bomber-front/800/1067',
      back: 'https://picsum.photos/seed/ascent-bomber-back/800/1067',
      gallery: [
        'https://picsum.photos/seed/ascent-bomber-front/800/1067',
        'https://picsum.photos/seed/ascent-bomber-back/800/1067',
        'https://picsum.photos/seed/ascent-bomber-detail/800/1067',
        'https://picsum.photos/seed/ascent-bomber-model/800/1067',
      ],
    },
    sizes: ['M', 'L', 'XL'],
    isNew: true,
  },
  {
    id: 'p-005',
    slug: 'ascent-logo-tee',
    name: 'Ascent Logo Tee',
    category: 'tshirts',
    price: 6900,
    salePrice: 4900,
    color: 'White',
    description:
      'Базовая футболка с минималистичным вышитым логотипом ASCENT на груди. Прямой крой, мягкий хлопок премиум-класса. Основа гардероба, которая не требует объяснений.',
    details: [
      'Regular fit',
      'Вышитый логотип ASCENT',
      'Ребристый воротник',
      'Усиленные плечевые швы',
      'Прямой подол',
    ],
    material: '100% Cotton, 180 gsm',
    care: [
      'Машинная стирка при 30°C',
      'Гладить с изнанки',
      'Не отбеливать',
      'Не сушить в машине',
    ],
    images: {
      front: 'https://picsum.photos/seed/ascent-logo-front/800/1067',
      back: 'https://picsum.photos/seed/ascent-logo-back/800/1067',
      gallery: [
        'https://picsum.photos/seed/ascent-logo-front/800/1067',
        'https://picsum.photos/seed/ascent-logo-back/800/1067',
        'https://picsum.photos/seed/ascent-logo-detail/800/1067',
        'https://picsum.photos/seed/ascent-logo-model/800/1067',
      ],
    },
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isSale: true,
  },
  {
    id: 'p-006',
    slug: 'nocturne-overcoat',
    name: 'Nocturne Overcoat',
    category: 'jackets',
    price: 38900,
    color: 'Black',
    description:
      'Длинное пальто из премиальной шерстяной смеси. Прямой крой, двубортная застёжка, глубокие прорезные карманы. Вещь, которая задаёт высоту — без слов.',
    details: [
      'Straight fit',
      'Двубортная застёжка на 6 пуговиц',
      'Два прорезных кармана',
      'Шлица сзади',
      'Полная подкладка',
      'Внутренний карман',
      'Сделано в Италии',
    ],
    material: 'Shell: 70% Wool, 30% Polyester, Lining: 100% Viscose',
    care: [
      'Только химчистка',
      'Не отбеливать',
      'Не стирать',
      'Гладить при низкой температуре с изнанки',
    ],
    images: {
      front: 'https://picsum.photos/seed/ascent-coat-front/800/1067',
      back: 'https://picsum.photos/seed/ascent-coat-back/800/1067',
      gallery: [
        'https://picsum.photos/seed/ascent-coat-front/800/1067',
        'https://picsum.photos/seed/ascent-coat-back/800/1067',
        'https://picsum.photos/seed/ascent-coat-detail/800/1067',
        'https://picsum.photos/seed/ascent-coat-model/800/1067',
      ],
    },
    sizes: ['M', 'L'],
    isNew: true,
  },
]