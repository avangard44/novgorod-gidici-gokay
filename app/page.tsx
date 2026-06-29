import Link from 'next/link'
import { BookOpen, Gamepad2, Languages, ArrowRight } from 'lucide-react'

const cards = [
  {
    href: '/library',
    icon: BookOpen,
    title: 'Kütüphane',
    sub: 'Dilbilgisi Kuralları',
    desc: 'Cinsiyet, hâl ekleri, fiil çekimi — her konu için net açıklama ve örnekler.',
    accent: 'from-blue-500/20 to-indigo-500/10',
    glow: 'group-hover:shadow-[0_0_40px_rgba(99,102,241,0.18)]',
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/10 group-hover:bg-blue-500/20',
    arrow: 'group-hover:text-blue-400',
  },
  {
    href: '/game/gender-nouns',
    icon: Gamepad2,
    title: 'Oyun Alanı',
    sub: 'Alıştırma & Test',
    desc: '3 can, anlık geri bildirim ve puan tablosu. Boşlukları doğru doldur, seviye atla.',
    accent: 'from-violet-500/20 to-purple-500/10',
    glow: 'group-hover:shadow-[0_0_40px_rgba(139,92,246,0.18)]',
    iconColor: 'text-violet-400',
    iconBg: 'bg-violet-500/10 group-hover:bg-violet-500/20',
    arrow: 'group-hover:text-violet-400',
  },
  {
    href: '/translator',
    icon: Languages,
    title: 'Çevirmen',
    sub: 'Yakında',
    desc: 'Rusça ↔ Türkçe anlık çeviri ve sözlük. Çok yakında hizmetinizde.',
    accent: 'from-cyan-500/20 to-teal-500/10',
    glow: 'group-hover:shadow-[0_0_40px_rgba(34,211,238,0.12)]',
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10 group-hover:bg-cyan-500/20',
    arrow: 'group-hover:text-cyan-400',
  },
]

export default function Home() {
  return (
    <div className="min-h-full flex flex-col justify-center px-8 py-12 max-w-3xl mx-auto">

      {/* Hero */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs
          text-slate-400 mb-8 tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Rusça öğrenmeye hazır mısınız?
        </div>

        <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-[1.05] mb-5">
          <span className="text-white">Novgorod</span>
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400
            bg-clip-text text-transparent">
            Gidici Gökay
          </span>
        </h1>

        <p className="text-slate-400 text-lg leading-relaxed max-w-md">
          Oyun oynayarak Rusça dilbilgisi öğrenin.{' '}
          <span className="text-slate-300">Kuralları keşfet, alıştırma yap, seviye atla.</span>
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map(({ href, icon: Icon, title, sub, desc, accent, glow, iconColor, iconBg, arrow }) => (
          <Link
            key={href}
            href={href}
            className={`group relative glass glass-hover rounded-2xl p-6 flex flex-col
              transition-all duration-300 ${glow} overflow-hidden`}
          >
            {/* Gradient tint */}
            <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-0
              group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />

            <div className="relative flex flex-col flex-1">
              <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center
                mb-4 transition-colors duration-200`}>
                <Icon size={18} strokeWidth={1.6} className={iconColor} />
              </div>

              <p className="text-[10px] text-slate-600 uppercase tracking-widest mb-1">{sub}</p>
              <h2 className="text-base font-bold text-white mb-2">{title}</h2>
              <p className="text-slate-500 text-sm leading-relaxed flex-1">{desc}</p>

              <div className={`mt-5 flex items-center gap-1 text-xs text-slate-600
                ${arrow} transition-colors duration-200 font-medium`}>
                Keşfet
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Stats */}
      <div className="flex items-center gap-10 mt-14">
        {[['8', 'Konu'], ['40+', 'Soru'], ['3', 'Modül']].map(([val, label]) => (
          <div key={label}>
            <p className="text-2xl font-black text-white">{val}</p>
            <p className="text-[10px] text-slate-600 uppercase tracking-widest mt-0.5">{label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
