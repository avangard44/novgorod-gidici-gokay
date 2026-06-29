import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })

export const metadata: Metadata = {
  title: 'Novgorod Gidici Gökay',
  description: 'Oyun oynayarak Rusça dilbilgisi öğrenin',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full bg-slate-950 text-slate-100 overflow-x-hidden">

        {/* Animated background spheres */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden>
          <div className="sphere-a absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full
            bg-gradient-to-br from-blue-600/25 via-indigo-700/15 to-transparent blur-3xl" />
          <div className="sphere-b absolute top-1/2 -right-40 w-[560px] h-[560px] rounded-full
            bg-gradient-to-tl from-violet-600/20 via-purple-800/12 to-transparent blur-3xl" />
          <div className="sphere-c absolute -bottom-40 left-1/3 w-[440px] h-[440px] rounded-full
            bg-gradient-to-tr from-cyan-600/12 via-blue-700/8 to-transparent blur-3xl" />
        </div>

        {children}
      </body>
    </html>
  )
}
