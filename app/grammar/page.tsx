import Link from 'next/link'
import { LibraryBig, Gamepad2, ChevronLeft } from 'lucide-react'

const choices = [
  {
    href: '/grammar/library',
    icon: LibraryBig,
    label: 'Kütüphane',
    sub: 'Dilbilgisi Kuralları',
    desc: '6 seviye, 30 konu. Her kural için ayrıntılı açıklama ve örnekler.',
    glow: 'hover:shadow-[0_0_60px_rgba(99,102,241,0.12)]',
    border: 'hover:border-blue-500/25',
    tintClass: 'from-blue-500/8 to-indigo-500/4',
    iconBg: 'bg-blue-500/10 group-hover:bg-blue-500/20',
    iconColor: 'text-blue-400',
    line: 'bg-blue-400',
  },
  {
    href: '/grammar/game',
    icon: Gamepad2,
    label: 'Oyun Alanı',
    sub: 'Alıştırma & Test',
    desc: '3 can, anlık geri bildirim ve puan tablosu. Boşlukları doğru doldur.',
    glow: 'hover:shadow-[0_0_60px_rgba(139,92,246,0.14)]',
    border: 'hover:border-violet-500/25',
    tintClass: 'from-violet-500/8 to-purple-500/4',
    iconBg: 'bg-violet-500/10 group-hover:bg-violet-500/20',
    iconColor: 'text-violet-400',
    line: 'bg-violet-400',
  },
]

export default function GrammarPage() {
  return (
    <div className="min-h-full flex flex-col items-center justify-center px-6 py-20">
      {/* Back */}
      <div className="w-full max-w-lg mb-10">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-slate-700 hover:text-slate-300
            text-xs transition-colors"
        >
          <ChevronLeft size={12} />
          Ana Sayfa
        </Link>
      </div>

      {/* Title */}
      <div className="text-center mb-14 w-full max-w-lg">
        <p className="text-[10px] text-slate-700 uppercase tracking-[0.35em] mb-5">Dilbilgisi</p>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
          Nasıl öğrenmek
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-violet-400
            bg-clip-text text-transparent">
            istersiniz?
          </span>
        </h1>
        <p className="text-slate-600 text-sm mt-4">
          Önce kuralı öğrenin, sonra pekiştirin — ya da direkt oynayın.
        </p>
      </div>

      {/* Two glass cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
        {choices.map(({ href, icon: Icon, label, sub, desc, glow, border, tintClass, iconBg, iconColor, line }) => (
          <Link
            key={href}
            href={href}
            className={`group relative flex flex-col bg-white/5 backdrop-blur-md
              border border-white/10 ${border} rounded-3xl p-8
              transition-all duration-300 overflow-hidden ${glow}`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${tintClass}
              opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

            <div className="relative flex flex-col gap-4">
              <div className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center
                justify-center transition-colors duration-200`}>
                <Icon size={20} strokeWidth={1.4} className={iconColor} />
              </div>
              <div>
                <h2 className="text-lg font-black text-white tracking-tight">{label}</h2>
                <p className="text-slate-600 text-xs mt-0.5 tracking-wide">{sub}</p>
                <p className="text-slate-600 text-xs mt-3 leading-relaxed">{desc}</p>
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
