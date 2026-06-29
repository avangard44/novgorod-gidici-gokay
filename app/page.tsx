import Link from 'next/link'
import { Languages, BookOpen } from 'lucide-react'
import { StreakWidget } from '@/app/components/StreakWidget'
import { AchievementsShowcase } from '@/app/components/AchievementsShowcase'

const choices = [
  {
    href: '/translator',
    icon: Languages,
    label: 'Çevirmen',
    sub: 'Rusça ↔ Türkçe',
    tintClass: 'from-cyan-500/8 to-teal-500/4',
    glow: 'hover:shadow-[0_0_60px_rgba(34,211,238,0.10)]',
    border: 'hover:border-cyan-500/25',
    iconBg: 'bg-cyan-500/10 group-hover:bg-cyan-500/20',
    iconColor: 'text-cyan-400',
    line: 'bg-cyan-400',
  },
  {
    href: '/grammar',
    icon: BookOpen,
    label: 'Dilbilgisi',
    sub: 'Rusça Gramer',
    tintClass: 'from-violet-500/8 to-indigo-500/4',
    glow: 'hover:shadow-[0_0_60px_rgba(139,92,246,0.12)]',
    border: 'hover:border-violet-500/25',
    iconBg: 'bg-violet-500/10 group-hover:bg-violet-500/20',
    iconColor: 'text-violet-400',
    line: 'bg-violet-400',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-16">
      {/* Streak widget — top right */}
      <div className="fixed top-4 right-4 z-20">
        <StreakWidget />
      </div>

      {/* Title */}
      <div className="text-center mb-14">
        <p className="text-[10px] text-slate-700 uppercase tracking-[0.35em] mb-5">
          Rusça Öğrenme Platformu
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05]">
          <span className="text-white">Novgorod </span>
          <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Gidici Gökay
          </span>
        </h1>
        <p className="text-slate-600 text-sm mt-4">Ne yapmak istersiniz?</p>
      </div>

      {/* Cards */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
        {choices.map(({ href, icon: Icon, label, sub, tintClass, glow, border, iconBg, iconColor, line }) => (
          <Link
            key={href}
            href={href}
            className={`group relative flex-1 flex flex-col items-center text-center
              bg-white/5 backdrop-blur-xl border border-white/5 ${border}
              rounded-3xl px-8 py-10 min-h-[160px] sm:min-h-[200px]
              transition-all duration-300 overflow-hidden ${glow}`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${tintClass}
              opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            <div className="relative flex flex-col items-center gap-5">
              <div className={`w-14 h-14 rounded-2xl ${iconBg}
                flex items-center justify-center transition-colors duration-200`}>
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

      {/* Achievement showcase (visible after first unlock) */}
      <AchievementsShowcase />
    </div>
  )
}
