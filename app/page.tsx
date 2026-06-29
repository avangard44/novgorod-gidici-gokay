import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f0f14] text-white flex flex-col">
      {/* Nav */}
      <nav className="px-6 py-4 flex items-center justify-between border-b border-white/5">
        <span className="text-sm font-semibold tracking-widest text-white/40 uppercase">
          NGG
        </span>
        <div className="flex items-center gap-6 text-sm text-white/40">
          <Link href="/library" className="hover:text-white transition-colors">Kütüphane</Link>
          <Link href="/game/gender-nouns" className="hover:text-white transition-colors">Oyun</Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/50 text-xs font-medium px-4 py-1.5 rounded-full mb-10 tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Rusça öğrenmeye hazır mısınız?
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-none mb-4">
          <span className="text-white">Novgorod</span>
          <br />
          <span className="bg-gradient-to-r from-red-400 via-orange-300 to-yellow-400 bg-clip-text text-transparent">
            Gidici Gökay
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-white/50 text-lg sm:text-xl mt-6 mb-4 max-w-md leading-relaxed">
          Oyun oynayarak Rusça dilbilgisi öğrenin!
        </p>

        {/* Concept description */}
        <p className="text-white/30 text-sm max-w-sm leading-relaxed mb-14">
          <span className="text-white/50 font-medium">Kütüphane</span>'de kuralları keşfedin,{' '}
          <span className="text-white/50 font-medium">Oyun Alanı</span>'nda pekiştirin.
          Her alıştırma sizi bir adım daha ileri taşır.
        </p>

        {/* CTA cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          {/* Library card */}
          <Link
            href="/library"
            className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 rounded-2xl p-7 text-left transition-all duration-300 overflow-hidden"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

            <div className="relative">
              <div className="w-12 h-12 bg-blue-500/15 group-hover:bg-blue-500/25 rounded-xl flex items-center justify-center text-2xl mb-5 transition-colors duration-300">
                📚
              </div>
              <h2 className="text-lg font-bold text-white mb-1.5 group-hover:text-blue-300 transition-colors duration-200">
                Kütüphane
              </h2>
              <p className="text-white/40 text-sm leading-relaxed">
                Dilbilgisi kurallarını kategorilere göre inceleyin. Her konuda örnekler ve açıklamalar.
              </p>
              <div className="mt-5 flex items-center gap-1.5 text-xs text-blue-400/60 group-hover:text-blue-400 transition-colors duration-200 font-medium">
                Kuralları Keşfet
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </div>
            </div>
          </Link>

          {/* Game card */}
          <Link
            href="/game/gender-nouns"
            className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 rounded-2xl p-7 text-left transition-all duration-300 overflow-hidden"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

            <div className="relative">
              <div className="w-12 h-12 bg-red-500/15 group-hover:bg-red-500/25 rounded-xl flex items-center justify-center text-2xl mb-5 transition-colors duration-300">
                🎮
              </div>
              <h2 className="text-lg font-bold text-white mb-1.5 group-hover:text-red-300 transition-colors duration-200">
                Oyun Alanı
              </h2>
              <p className="text-white/40 text-sm leading-relaxed">
                Boşluk doldurun, doğru cevabı seçin. 3 can, puan tablosu ve anlık geri bildirim.
              </p>
              <div className="mt-5 flex items-center gap-1.5 text-xs text-red-400/60 group-hover:text-red-400 transition-colors duration-200 font-medium">
                Oynamaya Başla
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-8 mt-14 text-center">
          {[
            { value: '8', label: 'Konu' },
            { value: '40+', label: 'Soru' },
            { value: '5', label: 'Kategori' },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-2xl font-black text-white">{value}</p>
              <p className="text-xs text-white/30 mt-0.5 uppercase tracking-widest">{label}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-white/5 text-center">
        <p className="text-white/20 text-xs tracking-wide">
          Привет! Добро пожаловать 🇷🇺 — Rusça dilbilgisi platformu
        </p>
      </footer>
    </div>
  )
}
