
import type { Metadata } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap'
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'EpiRank - Epigenetic Gene Prioritization',
  description: 'Regulatory-aware gene discovery platform for Alzheimer\'s disease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/50`}>
        <div className="relative min-h-screen overflow-hidden">
          {/* Animated background grid */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20 animate-pulse-slow" />

          {/* Floating gradient orbs */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />

          {/* Main content */}
          <div className="relative z-10 flex">
            <Sidebar />
            <div className="flex-1 ml-20">
              <Header />
              <main className="p-6">
                {children}
              </main>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}