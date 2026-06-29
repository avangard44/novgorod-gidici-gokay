import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import Link from 'next/link'
import { BookOpen, Gamepad2, Languages } from 'lucide-react'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })

export const metadata: Metadata = {
  title: 'Novgorod Gidici Gökay',
  description: 'Oyun oynayarak Rusça dilbilgisi öğrenin',
}

const navItems = [
  { href: '/library',    icon: BookOpen,   label: 'Kütüphane' },
  { href: '/game/gender-nouns', icon: Gamepad2,  label: 'Oyun' },
  { href: '/translator', icon: Languages,  label: 'Çevirmen' },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${geist.variable} h-full antialiased`}>
      <body className="h-full flex bg-slate-950 text-slate-100 overflow-hidden">

        {/* ── Animated background spheres ── */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
          {/* Sphere 1 — deep blue/indigo */}
          <div className="sphere-a absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full
            bg-gradient-to-br from-blue-600/30 via-indigo-700/20 to-transparent blur-3xl" />
          {/* Sphere 2 — violet/purple */}
          <div className="sphere-b absolute top-1/2 -right-40 w-[600px] h-[600px] rounded-full
            bg-gradient-to-tl from-violet-600/25 via-purple-800/15 to-transparent blur-3xl" />
          {/* Sphere 3 — teal accent */}
          <div className="sphere-c absolute -bottom-40 left-1/3 w-[480px] h-[480px] rounded-full
            bg-gradient-to-tr from-cyan-600/15 via-blue-700/10 to-transparent blur-3xl" />
        </div>

        {/* ── Sidebar ── */}
        <aside className="relative z-20 flex flex-col items-center gap-2 py-6 px-3 w-16
          glass border-r border-white/8 shrink-0">

          {/* Logo dot */}
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500
            flex items-center justify-center text-[11px] font-black text-white mb-4 shadow-lg">
            N
          </div>

          <nav className="flex flex-col gap-1 flex-1">
            {navItems.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                title={label}
                className="group flex items-center justify-center w-10 h-10 rounded-xl
                  text-slate-500 hover:text-white transition-all duration-200
                  hover:bg-white/8 hover:shadow-[0_0_16px_rgba(139,92,246,0.2)]"
              >
                <Icon size={18} strokeWidth={1.6} />
              </Link>
            ))}
          </nav>

          {/* Bottom hint */}
          <div className="w-6 h-px bg-white/8 mb-1" />
          <div className="text-[9px] text-slate-700 tracking-widest rotate-90 origin-center select-none">
            NGG
          </div>
        </aside>

        {/* ── Main content ── */}
        <main className="relative z-10 flex-1 overflow-y-auto">
          {children}
        </main>

      </body>
    </html>
  )
}
