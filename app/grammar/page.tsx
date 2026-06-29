import Link from 'next/link'
import { LibraryBig, Gamepad2 } from 'lucide-react'
import BackButton from '@/app/components/BackButton'
import { LibraryProgress } from '@/app/components/LibraryProgress'
import AlphabetCard from '@/app/components/AlphabetCard'

const choices = [
  {
    href: '/library',
    icon: LibraryBig,
    label: 'Kütüphane',
    sub: 'Dilbilgisi Kuralları',
    desc: '6 seviye, 30 konu. Her kural için ayrıntılı açıklama ve örnekler.',
    tintClass: 'from-blue-500/8 to-indigo-500/4',
    glow: 'hover:shadow-[0_0_60px_rgba(99,102,241,0.12)]',
    border: 'hover:border-blue-500/25',
    iconBg: 'bg-blue-500/10 group-hover:bg-blue-500/20',
    iconColor: 'text-blue-400',
    line: 'bg-blue-400',
    showProgress: true,
  },
  {
    href: '/grammar/game',
    icon: Gamepad2,
    label: 'Oyun Alanı',
    sub: 'Alıştırma & Test',
    desc: '3 can, anlık geri bildirim. Boşlukları doğru doldur, seviye atla.',
    tintClass: 'from-violet-500/8 to-purple-500/4',
    glow: 'hover:shadow-[0_0_60px_rgba(139,92,246,0.14)]',
    border: 'hover:border-violet-500/25',
    iconBg: 'bg-violet-500/10 group-hover:bg-violet-500/20',
    iconColor: 'text-violet-400',
    line: 'bg-violet-400',
    showProgress: false,
  },
]


export default function GrammarPage() {
  return (
    <div className="min-h-screen flex flex-col items-center px-5 py-16">
      <div className="w-full max-w-2xl mb-10 flex">
        <BackButton />
      </div>

      <div className="text-center mb-12 w-full max-w-2xl">
        <p className="text-[10px] text-slate-700 uppercase tracking-[0.35em] mb-5">Dilbilgisi</p>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
          Nasıl öğrenmek{' '}
          <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
            istersiniz?
          </span>
        </h1>
        <p className="text-slate-600 text-sm mt-4">
          Önce kuralı öğrenin, sonra pekiştirin — ya da direkt oynayın.
        </p>
      </div>

      {/* Top two cards */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl mb-4">
        {choices.map(({ href, icon: Icon, label, sub, desc, tintClass, glow, border, iconBg, iconColor, line, showProgress }) => (
          <Link
            key={href}
            href={href}
            className={`group relative flex-1 flex flex-col
              bg-white/5 backdrop-blur-xl border border-white/5 ${border}
              rounded-3xl p-8 transition-all duration-300 overflow-hidden ${glow}`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${tintClass}
              opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            <div className="relative flex flex-col gap-4">
              <div className={`w-12 h-12 rounded-2xl ${iconBg}
                flex items-center justify-center transition-colors duration-200`}>
                <Icon size={20} strokeWidth={1.4} className={iconColor} />
              </div>
              <div>
                <h2 className="text-lg font-black text-white tracking-tight">{label}</h2>
                <p className="text-slate-600 text-xs mt-0.5 tracking-wide">{sub}</p>
                <p className="text-slate-600 text-xs mt-3 leading-relaxed">{desc}</p>
                {showProgress && <LibraryProgress />}
              </div>
              <div className={`h-px ${line} opacity-30 w-6
                group-hover:opacity-80 group-hover:w-10 transition-all duration-300`} />
            </div>
          </Link>
        ))}
      </div>

      <AlphabetCard />

    </div>
  )
}
