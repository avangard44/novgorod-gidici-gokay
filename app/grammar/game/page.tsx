import Link from 'next/link'
import { Gamepad2, ChevronLeft } from 'lucide-react'

export default function GrammarGamePage() {
  return (
    <div className="min-h-full flex flex-col items-center justify-center px-4 py-20">
      <div className="w-full max-w-sm mb-10">
        <Link
          href="/grammar"
          className="flex items-center gap-1.5 text-slate-700 hover:text-slate-300
            text-xs transition-colors"
        >
          <ChevronLeft size={12} />
          Dilbilgisi
        </Link>
      </div>

      <div className="glass rounded-3xl p-12 max-w-sm w-full flex flex-col items-center gap-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center">
          <Gamepad2 size={26} strokeWidth={1.4} className="text-violet-400" />
        </div>
        <div>
          <p className="text-[10px] text-slate-600 uppercase tracking-widest mb-2">Yakında</p>
          <h1 className="text-xl font-bold text-white mb-3">Oyun Alanı</h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            Kütüphanedeki konulara özel sorular, 3 can sistemi ve puan tablosu. Çok yakında burada.
          </p>
        </div>
        <div className="w-full h-px bg-white/6" />
        <Link
          href="/grammar/library"
          className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
        >
          Önce Kütüphane'yi keşfet →
        </Link>
      </div>
    </div>
  )
}
