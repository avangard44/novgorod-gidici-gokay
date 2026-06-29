import Link from 'next/link'
import { LibraryBig, Gamepad2, BookOpen } from 'lucide-react'
import BackButton from '@/app/components/BackButton'
import { LibraryProgress } from '@/app/components/LibraryProgress'

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

const ALPHABET = [
  { cyr: 'А а', lat: 'A a',    pron: 'a (araba)' },
  { cyr: 'Б б', lat: 'B b',    pron: 'b' },
  { cyr: 'В в', lat: 'V v',    pron: 'v' },
  { cyr: 'Г г', lat: 'G g',    pron: 'g' },
  { cyr: 'Д д', lat: 'D d',    pron: 'd' },
  { cyr: 'Е е', lat: 'Ye ye',  pron: 'ye (yemek)' },
  { cyr: 'Ё ё', lat: 'Yo yo',  pron: 'yo (yoğurt)' },
  { cyr: 'Ж ж', lat: 'Zh zh',  pron: 'j (Fransız)' },
  { cyr: 'З з', lat: 'Z z',    pron: 'z' },
  { cyr: 'И и', lat: 'İ i',    pron: 'i' },
  { cyr: 'Й й', lat: 'Y y',    pron: 'y (kısa)' },
  { cyr: 'К к', lat: 'K k',    pron: 'k' },
  { cyr: 'Л л', lat: 'L l',    pron: 'l' },
  { cyr: 'М м', lat: 'M m',    pron: 'm' },
  { cyr: 'Н н', lat: 'N n',    pron: 'n' },
  { cyr: 'О о', lat: 'O o',    pron: 'o' },
  { cyr: 'П п', lat: 'P p',    pron: 'p' },
  { cyr: 'Р р', lat: 'R r',    pron: 'r' },
  { cyr: 'С с', lat: 'S s',    pron: 's' },
  { cyr: 'Т т', lat: 'T t',    pron: 't' },
  { cyr: 'У у', lat: 'U u',    pron: 'u' },
  { cyr: 'Ф ф', lat: 'F f',    pron: 'f' },
  { cyr: 'Х х', lat: 'Kh kh',  pron: 'h (hava)' },
  { cyr: 'Ц ц', lat: 'Ts ts',  pron: 'ts' },
  { cyr: 'Ч ч', lat: 'Ch ch',  pron: 'ç' },
  { cyr: 'Ш ш', lat: 'Sh sh',  pron: 'ş' },
  { cyr: 'Щ щ', lat: 'Shch',   pron: 'şç (uzun)' },
  { cyr: 'Ъ ъ', lat: '—',      pron: 'sert işaret' },
  { cyr: 'Ы ы', lat: 'Y y',    pron: 'ı (belirsiz)' },
  { cyr: 'Ь ь', lat: '—',      pron: 'yumuşak işaret' },
  { cyr: 'Э э', lat: 'E e',    pron: 'e' },
  { cyr: 'Ю ю', lat: 'Yu yu',  pron: 'yu' },
  { cyr: 'Я я', lat: 'Ya ya',  pron: 'ya' },
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

      {/* Alphabet table card */}
      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/5
        hover:border-emerald-500/25 rounded-3xl p-6 sm:p-8 transition-all duration-300
        hover:shadow-[0_0_60px_rgba(16,185,129,0.1)] group overflow-hidden relative">

        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/3
          opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 group-hover:bg-emerald-500/20
              flex items-center justify-center transition-colors duration-200 shrink-0">
              <BookOpen size={20} strokeWidth={1.4} className="text-emerald-400" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white tracking-tight">Kiril Alfabesi</h2>
              <p className="text-slate-600 text-xs mt-0.5 tracking-wide">Kirilce → Latinleştirme · 33 Harf</p>
            </div>
          </div>

          {/* Column headers */}
          <div className="grid grid-cols-3 gap-x-3 gap-y-0.5 mb-3 px-2">
            <span className="text-[9px] text-slate-700 uppercase tracking-widest font-semibold">Kirilce</span>
            <span className="text-[9px] text-slate-700 uppercase tracking-widest font-semibold">Latince</span>
            <span className="text-[9px] text-slate-700 uppercase tracking-widest font-semibold">Türkçe telaffuz</span>
          </div>

          {/* Alphabet rows — 2 columns side by side on wider screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
            {ALPHABET.map(({ cyr, lat, pron }) => (
              <div key={cyr}
                className="grid grid-cols-3 gap-x-3 items-center py-2 border-b border-white/4 last:border-0
                  hover:bg-white/3 rounded-lg px-2 transition-colors cursor-default">
                <span className="text-base font-bold text-white tracking-wide">{cyr}</span>
                <span className="text-sm font-mono text-emerald-300">{lat}</span>
                <span className="text-xs text-slate-500 leading-snug">{pron}</span>
              </div>
            ))}
          </div>

          <div className="h-px bg-emerald-400 opacity-20 w-6 mt-6
            group-hover:opacity-70 group-hover:w-10 transition-all duration-300" />
        </div>
      </div>

    </div>
  )
}
