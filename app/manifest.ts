import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Paula Viena — Psicanalista',
    short_name: 'Paula Viena',
    description:
      'Atendimento psicanalítico para adultos — presencial e online. Agende uma conversa inicial.',
    start_url: '/',
    display: 'standalone',
    background_color: '#6c2c72',
    theme_color: '#6c2c72',
    lang: 'pt-BR',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
