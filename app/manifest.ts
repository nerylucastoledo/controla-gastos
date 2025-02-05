import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Controla gastos',
    short_name: 'ControlaGasto',
    description: 'Com o Controla gastos você irá conseguir entender para onde o seu dinheiro esta indo e ter maior controle sobre ele.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#121212',
    icons: [
      {
        src: '/images/icon-180x180.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/images/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/icon-225x25.png',
        sizes: '225x225',
        type: 'image/png',
      },
      {
        src: '/images/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}