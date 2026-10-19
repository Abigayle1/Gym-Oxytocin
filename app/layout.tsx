import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

//Browser Name & Logo
export const metadata: Metadata = {
  title: 'Gym Oxytocin',
  description: 'Transform your life at GymOxytocin. Personal training, fitness assessments, therapeutic massages, and more at 54 Waltham Park Road.',
  icons: {
    icon: "/Media/Gym-Oxytocin-logo.jpg",
    apple: "/Media/Gym-Oxytocin-logo.jpg",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
