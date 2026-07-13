import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Разрешаем любые remote-изображения в dev-режиме
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
        pathname: '/**',
      },
    ],
    // Отключаем оптимизацию в dev для надёжности
    // В production это нужно будет убрать для производительности
    unoptimized: process.env.NODE_ENV === 'development',
  },
}

export default nextConfig