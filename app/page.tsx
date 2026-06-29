import Link from 'next/link'
import { Languages, BookOpen } from 'lucide-react'

const choices = [
  {
    href: '/translator',
    icon: Languages,
    label: 'Çevirmen',
    sub: 'Rusça ↔ Türkçe',
    accent: 'from-cyan-500/10 to-teal-500/5',
    glow: 'hover:shadow-[0_0_60px_rgba(34,211,238,0.12)]',
    border: 'hover:border-cyan-500/30',
    iconBg: 'bg-cyan-500/10 group-hover:bg-cyan-500/18',
    iconColor: 'text-cyan-400',
    dot: 'bg-cyan-400',
  },
  {
    href: '/grammar',
    icon: BookOpen,
    label: 'Dilbilgisi',
    sub: 'Rusça Gramer',
    accent: 'from-violet-500/10 to-indigo-500/5',
    glow: 'hover:shadow-[0_0_60px_rgba(139,92,246,0.12)]',
    border: 'hover:border-violet-500/30',
    iconBg: 'bg-violet-500/10 group-hover:bg-violet-500/18',
    iconColor: 'text-violet-400',
    dot: 'bg-violet-400',
  },
]

export default function Home() {
  return (
    <div className="min-h-full flex flex-col items-center justify-center px-6 py-16">
      {/* Title */}
      <div className="text-center mb-16">
        <p className="text-[10px] text-slate-600 uppercase tracking-[0.3em] mb-5">
          Rusça Öğrenme Platformu
        </p>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
          <span className="text-white">Novgorod </span>
          <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Gidici Gökay
          </span>
        </h1>
        <p className="text-slate-600 text-sm mt-4">Ne yapmak istersiniz?</p>
      </div>

      {/* Two choices */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-xl">
        {choices.map(({ href, icon: Icon, label, sub, accent, glow, border, iconBg, iconColor, dot }) => (
          <Link
            key={href}
            href={href}
            className={`group relative flex flex-col items-center text-center
              bg-white/5 backdrop-blur-md border border-white/10 ${border}
              rounded-3xl p-10 transition-all duration-300 overflow-hidden ${glow}`}
          >
            {/* gradient tint */}
            <div className={`absolute inset-0 bg-gradient-to-br ${accent}
              opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

            <div className="relative flex flex-col items-center gap-5">
              <div className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center transition-colors duration-200`}>
                <Icon size={22} strokeWidth={1.4} className={iconColor} />
              </div>

              <div>
                <h2 className="text-xl font-black text-white tracking-tight">{label}</h2>
                <p className="text-slate-500 text-xs mt-1 tracking-wide">{sub}</p>
              </div>

              <div className={`w-5 h-px ${dot} opacity-40 group-hover:opacity-100 group-hover:w-8 transition-all duration-300`} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
