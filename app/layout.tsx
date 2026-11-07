import { Analytics } from '@vercel/analytics/next'
import { cookies } from 'next/headers'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'KIIT Pulse — Campus events & societies',
  description: 'Discover KIIT student societies, campus events and hackathons. Check registration status and follow official KSAC links.',
  applicationName: 'KIIT Pulse',
  generator: 'Next.js',
  openGraph: {
    title: 'KIIT Pulse — Campus events & societies',
    description: 'Find your people, follow your curiosity, and never miss the next big thing happening across KIIT.',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: '#f6f4ef',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const savedTheme = (await cookies()).get('kiit-pulse-theme')?.value
  const theme = savedTheme === 'dark' ? 'dark' : 'light'

  return (
    <html lang="en" data-theme={theme}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
