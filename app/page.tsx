import Link from 'next/link'
import { Languages, BookOpen } from 'lucide-react'

const choices = [
  {
    href: '/translator',
    icon: Languages,
    label: 'Çevirmen',
    sub: 'Rusça ↔ Türkçe',
    glow: 'hover:shadow-[0_0_60px_rgba(34,211,238,0.10)]',
    border: 'hover:border-cyan-500/25',
    tint: 'group-hover:opacity-100',
    tintClass: 'from-cyan-500/8 to-teal-500/4',
    iconBg: 'bg-cyan-500/10 group-hover:bg-cyan-500/20',
    iconColor: 'text-cyan-400',
    line: 'bg-cyan-400',
  },
  {
    href: '/grammar',
    icon: BookOpen,
    label: 'Dilbilgisi',
    sub: 'Rusça Gramer',
    glow: 'hover:shadow-[0_0_60px_rgba(139,92,246,0.12)]',
    border: 'hover:border-violet-500/25',
    tint: 'group-hover:opacity-100',
    tintClass: 'from-violet-500/8 to-indigo-500/4',
    iconBg: 'bg-violet-500/10 group-hover:bg-violet-500/20',
    iconColor: 'text-violet-400',
    line: 'bg-violet-400',
  },
]

export default function Home() {
  return (
    <div className="min-h-full flex flex-col items-center justify-center px-6 py-20">
      {/* Title */}
      <div className="text-center mb-16">
        <p className="text-[10px] text-slate-700 uppercase tracking-[0.35em] mb-6">
          Rusça Öğrenme Platformu
        </p>
        <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-[1.05]">
          <span className="text-white">Novgorod </span>
          <br className="sm:hidden" />
          <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400
            bg-clip-text text-transparent">
            Gidici Gökay
          </span>
        </h1>
        <p className="text-slate-600 text-sm mt-5">Ne yapmak istersiniz?</p>
      </div>

      {/* Two glass cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
        {choices.map(({ href, icon: Icon, label, sub, glow, border, tintClass, iconBg, iconColor, line }) => (
          <Link
            key={href}
            href={href}
            className={`group relative flex flex-col items-center text-center
              bg-white/5 backdrop-blur-md border border-white/10 ${border}
              rounded-3xl px-8 py-10 transition-all duration-300 overflow-hidden ${glow}`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${tintClass}
              opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

            <div className="relative flex flex-col items-center gap-5">
              <div className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center
                justify-center transition-colors duration-200`}>
                <Icon size={22} strokeWidth={1.4} className={iconColor} />
              </div>
              <div>
                <h2 className="text-xl font-black text-white tracking-tight">{label}</h2>
                <p className="text-slate-600 text-xs mt-1 tracking-wide">{sub}</p>
              </div>
              <div className={`h-px ${line} opacity-30 w-6
                group-hover:opacity-80 group-hover:w-10 transition-all duration-300`} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
