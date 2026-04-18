import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const BASE_URL = 'https://paula-viena.henriqueweiand.workers.dev'
const SITE_NAME = 'Paula Viena — Psicanalista'
const TITLE =
  'Paula Viena — Psicanalista | Análise para adultos · Presencial e online'
const DESCRIPTION =
  'Você aprendeu a ser forte para todo mundo. Mas quem cuida de você? Atendimento psicanalítico para adultos — presencial e online. Agende uma conversa inicial pelo WhatsApp.'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: TITLE,
    template: '%s | Paula Viena — Psicanalista',
  },
  description: DESCRIPTION,
  keywords: [
    'psicanálise',
    'psicanalista',
    'Paula Viena',
    'terapia',
    'saúde mental',
    'análise para adultos',
    'atendimento online',
    'atendimento presencial',
    'ansiedade',
    'angústia',
  ],
  authors: [{ name: 'Paula Viena', url: BASE_URL }],
  creator: 'Paula Viena',
  publisher: 'Paula Viena',

  // ── Canonical & indexing ──────────────────────────────────────
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },

  // ── Open Graph (Facebook, LinkedIn, WhatsApp…) ────────────────
  openGraph: {
    type: 'profile',
    url: BASE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    locale: 'pt_BR',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Paula Viena — Psicanalista',
        type: 'image/png',
      },
    ],
  },

  // ── Twitter / X ───────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: '/og-image.png',
        alt: 'Paula Viena — Psicanalista',
      },
    ],
  },

  // ── Icons ─────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },

  // ── Extra: WhatsApp/Telegram rely on og:image too ─────────────
  other: {
    'theme-color': '#6c2c72',
  },
}

export const viewport: Viewport = {
  themeColor: '#6c2c72',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className} suppressHydrationWarning>{children}</body>
    </html>
  )
}
