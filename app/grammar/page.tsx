import Link from 'next/link'
import { LibraryBig, Gamepad2, ChevronLeft } from 'lucide-react'

const choices = [
  {
    href: '/library',
    icon: LibraryBig,
    label: 'Kütüphane',
    sub: 'Dilbilgisi Kuralları',
    desc: 'Cinsiyet, hâl ekleri, fiil çekimi — her konu için açıklama ve örnekler.',
    accent: 'from-blue-500/10 to-indigo-500/5',
    glow: 'hover:shadow-[0_0_60px_rgba(99,102,241,0.12)]',
    border: 'hover:border-blue-500/30',
    iconBg: 'bg-blue-500/10 group-hover:bg-blue-500/18',
    iconColor: 'text-blue-400',
    dot: 'bg-blue-400',
  },
  {
    href: '/game/gender-nouns',
    icon: Gamepad2,
    label: 'Oyun Alanı',
    sub: 'Alıştırma & Test',
    desc: '3 can, anlık geri bildirim ve puan tablosu. Boşlukları doğru doldur.',
    accent: 'from-violet-500/10 to-purple-500/5',
    glow: 'hover:shadow-[0_0_60px_rgba(139,92,246,0.14)]',
    border: 'hover:border-violet-500/30',
    iconBg: 'bg-violet-500/10 group-hover:bg-violet-500/18',
    iconColor: 'text-violet-400',
    dot: 'bg-violet-400',
  },
]

export default function GrammarPage() {
  return (
    <div className="min-h-full flex flex-col items-center justify-center px-6 py-16">
      {/* Back */}
      <Link
        href="/"
        className="flex items-center gap-1.5 text-slate-600 hover:text-slate-300
          text-xs transition-colors mb-12 self-start max-w-xl w-full mx-auto"
      >
        <ChevronLeft size={13} />
        Ana Sayfa
      </Link>

      {/* Title */}
      <div className="text-center mb-16 max-w-xl w-full mx-auto">
        <p className="text-[10px] text-slate-600 uppercase tracking-[0.3em] mb-5">
          Dilbilgisi
        </p>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
          Ne yapmak
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
            istersiniz?
          </span>
        </h1>
        <p className="text-slate-600 text-sm mt-4">
          Önce kuralı öğrenin, sonra pekiştirin — ya da direkt oynayın.
        </p>
      </div>

      {/* Two choices */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-xl">
        {choices.map(({ href, icon: Icon, label, sub, desc, accent, glow, border, iconBg, iconColor, dot }) => (
          <Link
            key={href}
            href={href}
            className={`group relative flex flex-col
              bg-white/5 backdrop-blur-md border border-white/10 ${border}
              rounded-3xl p-8 transition-all duration-300 overflow-hidden ${glow}`}
          >
            {/* gradient tint */}
            <div className={`absolute inset-0 bg-gradient-to-br ${accent}
              opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

            <div className="relative flex flex-col gap-4">
              <div className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center transition-colors duration-200`}>
                <Icon size={20} strokeWidth={1.4} className={iconColor} />
              </div>

              <div>
                <h2 className="text-lg font-black text-white tracking-tight">{label}</h2>
                <p className="text-slate-500 text-xs mt-0.5 tracking-wide">{sub}</p>
                <p className="text-slate-600 text-xs mt-3 leading-relaxed">{desc}</p>
              </div>

              <div className={`w-5 h-px ${dot} opacity-40 group-hover:opacity-100 group-hover:w-8 transition-all duration-300 mt-1`} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
