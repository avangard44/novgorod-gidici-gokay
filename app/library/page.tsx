'use client'

import { useState } from 'react'
import Link from 'next/link'

type Example = {
  russian: string
  translation: string
}

type Topic = {
  id: string
  title: string
  category: string
  icon: string
  description: string
  rule: string
  examples: Example[]
}

const topics: Topic[] = [
  {
    id: 'gender-nouns',
    title: 'İsimlerin Cinsiyeti',
    category: 'Temel Bilgiler',
    icon: '⚧',
    description: 'Rusçada her ismin bir cinsiyeti vardır: eril, dişil veya nötr.',
    rule: `Rusçada isimler üç cinsiyete ayrılır:\n\n• **Eril (мужской род)** — ünsüzle veya -й ile biten isimler. Örn: стол (masa), трамвай (tramvay)\n\n• **Dişil (женский род)** — -а veya -я ile biten isimler. Örn: книга (kitap), неделя (hafta)\n\n• **Nötr (средний род)** — -о veya -е ile biten isimler. Örn: окно (pencere), море (deniz)\n\n⚠️ -ь ile biten isimler hem eril hem dişil olabilir; sözlükten öğrenilmesi gerekir.`,
    examples: [
      { russian: 'стол — eril', translation: 'masa' },
      { russian: 'книга — dişil', translation: 'kitap' },
      { russian: 'окно — nötr', translation: 'pencere' },
      { russian: 'дверь — dişil', translation: 'kapı' },
      { russian: 'день — eril', translation: 'gün' },
    ],
  },
  {
    id: 'nominative',
    title: 'Yalın Hâl (İmenstelny Padej)',
    category: 'Hâl Ekleri',
    icon: '①',
    description: 'İsmin sözlükteki temel hâlidir. Cümlenin öznesi bu hâlde kullanılır.',
    rule: `**Yalın Hâl (Именительный падеж)** cümlenin öznesi için kullanılır. Soru: "Кто? Что?" (Kim? Ne?)\n\n• Eril: değişmez → брат (erkek kardeş)\n• Dişil: -а / -я → сестра (kız kardeş)\n• Nötr: -о / -е → письмо (mektup)\n\nÇoğul:\n• Çoğu isim: -ы / -и → столы, книги\n• -г, -к, -х, -ж, -ш, -щ, -ч sonrası: -и\n• Nötr: -а / -я → окна, моря`,
    examples: [
      { russian: 'Это мой брат.', translation: 'Bu benim erkek kardeşim.' },
      { russian: 'Кошка спит.', translation: 'Kedi uyuyor.' },
      { russian: 'Письмо готово.', translation: 'Mektup hazır.' },
      { russian: 'Студенты учатся.', translation: 'Öğrenciler ders çalışıyor.' },
    ],
  },
  {
    id: 'genitive',
    title: 'İlgi Hâli (Roditelny Padej)',
    category: 'Hâl Ekleri',
    icon: '②',
    description: 'Sahiplik, yokluk ve miktar ifadelerinde kullanılan hâldir.',
    rule: `**İlgi Hâli (Родительный падеж)** sahiplik, yokluk ve miktarı ifade eder. Soru: "Кого? Чего?" (Kimin? Neyin?)\n\n**Tekil ekler:**\n• Eril (ünsüz): + -а → стол → стола\n• Eril (-й / -ь): -й/-ь + -я → трамвай → трамвая\n• Dişil (-а): -а + -ы → книга → книги\n• Dişil (-я): -я + -и → неделя → недели\n• Nötr (-о): -о + -а → окно → окна\n• Nötr (-е): -е + -я → море → моря\n\n**Kullanım:** нет (yok), много (çok), мало (az), без (—siz) edatından sonra`,
    examples: [
      { russian: 'У меня нет книги.', translation: 'Bende kitap yok.' },
      { russian: 'Это стакан воды.', translation: 'Bu bir bardak su.' },
      { russian: 'Он боится темноты.', translation: 'O karanlıktan korkuyor.' },
      { russian: 'Много студентов.', translation: 'Çok sayıda öğrenci.' },
    ],
  },
  {
    id: 'dative',
    title: 'Yönelme Hâli (Datelny Padej)',
    category: 'Hâl Ekleri',
    icon: '③',
    description: 'Eylemin yöneldiği kişiyi (dolaylı nesne) gösterir.',
    rule: `**Yönelme Hâli (Дательный падеж)** eylemin kime/neye yönelik olduğunu gösterir. Soru: "Кому? Чему?" (Kime? Neye?)\n\n**Tekil ekler:**\n• Eril/Nötr: + -у / -ю → брату, морю\n• Dişil: -а/-я → -е / -и → сестре, недели\n\n**Kullanım:**\n• Vermek, söylemek gibi eylemlerden sonra\n• Yaş ifadelerinde: Мне 20 лет. (Benim yaşım 20.)\n• к (doğru), по (—e göre) edatlarından sonra`,
    examples: [
      { russian: 'Я дал книгу сестре.', translation: 'Kız kardeşime kitap verdim.' },
      { russian: 'Мне двадцать лет.', translation: 'Benim yaşım yirmi.' },
      { russian: 'Иди к другу.', translation: 'Arkadaşına git.' },
      { russian: 'Позвони маме.', translation: 'Anneni ara.' },
    ],
  },
  {
    id: 'accusative',
    title: 'Belirtme Hâli (Vinitelny Padej)',
    category: 'Hâl Ekleri',
    icon: '④',
    description: 'Eylemin doğrudan etkilediği nesneyi (doğrudan nesne) gösterir.',
    rule: `**Belirtme Hâli (Винительный падеж)** doğrudan nesneyi gösterir. Soru: "Кого? Что?" (Kimi? Neyi?)\n\n**Tekil ekler:**\n• Eril cansız: değişmez → вижу стол\n• Eril canlı: -а / -я → вижу брата\n• Dişil: -а → -у / -я → -ю → вижу сестру\n• Nötr: yalın hâl ile aynı → вижу окно\n\n**Kullanım:**\n• Geçişli fiillerin nesnesi: читать (okumak), видеть (görmek)\n• в / на edatlarıyla yön: иду в школу (okula gidiyorum)`,
    examples: [
      { russian: 'Я читаю книгу.', translation: 'Kitap okuyorum.' },
      { russian: 'Я вижу брата.', translation: 'Erkek kardeşimi görüyorum.' },
      { russian: 'Мы идём в школу.', translation: 'Okula gidiyoruz.' },
      { russian: 'Она любит музыку.', translation: 'O müziği seviyor.' },
    ],
  },
  {
    id: 'verb-conjugation',
    title: 'Fiil Çekimi (1. Grup)',
    category: 'Fiiller',
    icon: '▶',
    description: 'Rusçada fiiller iki gruba ayrılır. 1. Grup: -ать / -ять ile biten fiiller.',
    rule: `**1. Grup Fiil Çekimi** — genellikle -ать ve -ять ile biten fiiller.\n\nÖrnek: **читать** (okumak)\n\n| Şahıs | Tekil | Çoğul |\n|---|---|---|\n| 1. | я читаю | мы читаем |\n| 2. | ты читаешь | вы читаете |\n| 3. | он/она читает | они читают |\n\nEk tablosu:\n-ю / -ю — -ешь / -ешь — -ет / -ет — -ем — -ете — -ют\n\n⚠️ Vurgu değişikliğine dikkat edin!`,
    examples: [
      { russian: 'Я читаю газету.', translation: 'Gazete okuyorum.' },
      { russian: 'Ты читаешь книгу.', translation: 'Kitap okuyorsun.' },
      { russian: 'Они читают вместе.', translation: 'Onlar birlikte okuyorlar.' },
      { russian: 'Мы читаем каждый день.', translation: 'Her gün okuyoruz.' },
    ],
  },
  {
    id: 'adjectives',
    title: 'Sıfatlar ve Uyum',
    category: 'Temel Bilgiler',
    icon: '🎨',
    description: 'Rusçada sıfatlar, nitelendirdikleri ismin cinsiyetine ve hâline göre değişir.',
    rule: `**Sıfat Uyumu** — sıfat, ismin cinsiyeti, sayısı ve hâline göre çekimlenir.\n\n**Yalın hâl tekil:**\n• Eril: -ый / -ий → новый (yeni), синий (mavi)\n• Dişil: -ая / -яя → новая, синяя\n• Nötr: -ое / -ее → новое, синее\n\n**Yalın hâl çoğul (tüm cinsiyetler):**\n• -ые / -ие → новые, синие\n\n💡 Telaffuz notu: -ый ve -ий sonları konuşmada genellikle -ий gibi söylenir.`,
    examples: [
      { russian: 'новый дом — eril', translation: 'yeni ev' },
      { russian: 'новая книга — dişil', translation: 'yeni kitap' },
      { russian: 'новое окно — nötr', translation: 'yeni pencere' },
      { russian: 'новые друзья — çoğul', translation: 'yeni arkadaşlar' },
    ],
  },
  {
    id: 'pronouns',
    title: 'Kişi Zamirleri',
    category: 'Temel Bilgiler',
    icon: '👤',
    description: 'Rusçada kişi zamirleri ve yalın hâldeki kullanımları.',
    rule: `**Kişi Zamirleri (Личные местоимения)**\n\n| Türkçe | Rusça | Telaffuz |\n|---|---|---|\n| Ben | я | ya |\n| Sen | ты | tı |\n| O (eril/dişil) | он / она | on / ana |\n| O (nötr) | оно | ano |\n| Biz | мы | mı |\n| Siz / Siz (resmi) | вы | vı |\n| Onlar | они | ani |\n\n💡 **вы** büyük harfle yazıldığında (Вы) saygı zamiri olarak tek kişiye hitap eder.`,
    examples: [
      { russian: 'Я студент.', translation: 'Ben öğrenciyim.' },
      { russian: 'Ты говоришь по-русски?', translation: 'Rusça biliyor musun?' },
      { russian: 'Она врач.', translation: 'O doktordur.' },
      { russian: 'Мы друзья.', translation: 'Biz arkadaşız.' },
    ],
  },
]

const categories = Array.from(new Set(topics.map((t) => t.category)))

export default function LibraryPage() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('Tümü')

  const filtered =
    activeCategory === 'Tümü'
      ? topics
      : topics.filter((t) => t.category === activeCategory)

  return (
    <div className="min-h-full px-6 py-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <p className="text-[10px] text-slate-600 uppercase tracking-widest mb-2">Kütüphane</p>
        <h1 className="text-2xl font-black text-white">Dilbilgisi Konuları</h1>
        <p className="text-slate-500 text-sm mt-1">Bir konuya tıkla, kuralı gör ve hemen alıştırma yap.</p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-7">
        {['Tümü', ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-violet-600/80 text-white shadow shadow-violet-900/40'
                : 'glass text-slate-400 hover:text-white hover:border-white/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Topic grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map((topic) => (
          <div
            key={topic.id}
            className="glass glass-hover rounded-2xl p-5 transition-all duration-300 group cursor-pointer"
          >
            <button
              onClick={() => setSelectedTopic(topic)}
              className="flex items-start gap-4 w-full text-left"
            >
              <span className="text-2xl mt-0.5">{topic.icon}</span>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-medium text-violet-400 uppercase tracking-widest">
                  {topic.category}
                </span>
                <h2 className="font-bold text-slate-100 text-sm mt-0.5 group-hover:text-white transition-colors">
                  {topic.title}
                </h2>
                <p className="text-slate-600 text-xs mt-1 line-clamp-2 leading-relaxed">{topic.description}</p>
              </div>
              <span className="text-slate-700 group-hover:text-violet-400 transition-colors text-base mt-0.5">›</span>
            </button>
            <div className="mt-3 pt-3 border-t border-white/6 flex gap-2">
              <button
                onClick={() => setSelectedTopic(topic)}
                className="flex-1 text-xs text-slate-500 hover:text-slate-300 py-1.5 rounded-lg
                  hover:bg-white/5 transition-colors"
              >
                📖 Kuralı Gör
              </button>
              <Link
                href={`/game/${topic.id}`}
                className="flex-1 text-xs font-semibold text-white bg-violet-600/70 hover:bg-violet-600
                  py-1.5 rounded-lg text-center transition-colors"
              >
                🎮 Oyna
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedTopic && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedTopic(null)}
        >
          <div
            className="glass border border-white/12 rounded-3xl w-full max-w-lg
              max-h-[85vh] overflow-y-auto shadow-2xl shadow-black/60"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="p-6 border-b border-white/8 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedTopic.icon}</span>
                <div>
                  <p className="text-violet-400 text-[10px] uppercase tracking-widest">
                    {selectedTopic.category}
                  </p>
                  <h2 className="font-bold text-lg text-white leading-tight">{selectedTopic.title}</h2>
                </div>
              </div>
              <button
                onClick={() => setSelectedTopic(null)}
                className="text-slate-600 hover:text-white text-xl leading-none mt-0.5 flex-shrink-0
                  transition-colors"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Rule */}
              <div>
                <h3 className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-3">
                  📖 Kural
                </h3>
                <div className="bg-white/4 border border-white/8 rounded-xl p-4 text-sm
                  text-slate-300 leading-relaxed whitespace-pre-line">
                  {selectedTopic.rule.split(/(\*\*.*?\*\*)/).map((part, i) =>
                    part.startsWith('**') ? (
                      <strong key={i} className="font-semibold text-violet-300">
                        {part.slice(2, -2)}
                      </strong>
                    ) : (
                      <span key={i}>{part}</span>
                    )
                  )}
                </div>
              </div>

              {/* Examples */}
              <div>
                <h3 className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-3">
                  🇷🇺 Örnekler
                </h3>
                <div className="space-y-2">
                  {selectedTopic.examples.map((ex, i) => (
                    <div key={i} className="bg-white/4 border border-white/6 rounded-xl p-3
                      flex items-start gap-3">
                      <span className="text-violet-500 font-bold text-xs mt-0.5 min-w-[18px]">
                        {i + 1}.
                      </span>
                      <div>
                        <p className="font-semibold text-slate-200 text-sm">{ex.russian}</p>
                        <p className="text-slate-500 text-xs mt-0.5">{ex.translation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => setSelectedTopic(null)}
                  className="flex-1 glass hover:bg-white/8 text-slate-400 hover:text-white
                    font-medium py-3 rounded-xl transition-colors text-sm"
                >
                  Kapat
                </button>
                <Link
                  href={`/game/${selectedTopic.id}`}
                  className="flex-1 bg-violet-600/80 hover:bg-violet-600 text-white font-bold
                    py-3 rounded-xl transition-colors text-center text-sm"
                >
                  🎮 Oyna!
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
