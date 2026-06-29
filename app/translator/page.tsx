import { Languages } from 'lucide-react'

export default function TranslatorPage() {
  return (
    <div className="min-h-full flex flex-col items-center justify-center px-4 text-center">
      <div className="glass rounded-3xl p-12 max-w-sm w-full flex flex-col items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
          <Languages size={24} strokeWidth={1.4} className="text-cyan-400" />
        </div>

        <div>
          <p className="text-[10px] text-slate-600 uppercase tracking-widest mb-2">Yakında</p>
          <h1 className="text-xl font-bold text-white mb-2">Çevirmen</h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            Rusça ↔ Türkçe anlık çeviri ve sözlük özelliği geliştiriliyor. Çok yakında burada olacak.
          </p>
        </div>

        <div className="w-full h-px bg-white/6" />

        <p className="text-slate-700 text-xs">Скоро · Çok yakında · Coming soon</p>
      </div>
    </div>
  )
}
