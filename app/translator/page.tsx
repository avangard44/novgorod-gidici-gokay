import { Languages } from 'lucide-react'
import BackButton from '@/app/components/BackButton'

export default function TranslatorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm mb-10 flex">
        <BackButton />
      </div>
      <div className="glass rounded-3xl p-10 sm:p-12 max-w-sm w-full flex flex-col
        items-center gap-6 text-center backdrop-blur-xl border border-white/5">
        <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
          <Languages size={24} strokeWidth={1.4} className="text-cyan-400" />
        </div>
        <div>
          <p className="text-[10px] text-slate-600 uppercase tracking-widest mb-2">Yakında</p>
          <h1 className="text-xl font-bold text-white mb-3">Çevirmen</h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            Rusça ↔ Türkçe anlık çeviri ve sözlük özelliği geliştiriliyor. Çok yakında burada olacak.
          </p>
        </div>
        <div className="w-full h-px bg-white/5" />
        <p className="text-slate-700 text-xs">Скоро · Çok yakında · Coming soon</p>
      </div>
    </div>
  )
}
