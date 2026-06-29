'use client'
import { useState, useCallback } from 'react'
import { BookOpen, Gamepad2, Volume2, CheckCircle2, X } from 'lucide-react'

const ALPHABET = [
  { cyr: 'А', cyrLower: 'а', lat: 'A',    pron: 'a (araba)',      sound: 'а' },
  { cyr: 'Б', cyrLower: 'б', lat: 'B',    pron: 'b',              sound: 'б' },
  { cyr: 'В', cyrLower: 'в', lat: 'V',    pron: 'v',              sound: 'в' },
  { cyr: 'Г', cyrLower: 'г', lat: 'G',    pron: 'g',              sound: 'г' },
  { cyr: 'Д', cyrLower: 'д', lat: 'D',    pron: 'd',              sound: 'д' },
  { cyr: 'Е', cyrLower: 'е', lat: 'Ye',   pron: 'ye (yemek)',     sound: 'е' },
  { cyr: 'Ё', cyrLower: 'ё', lat: 'Yo',   pron: 'yo (yoğurt)',    sound: 'ё' },
  { cyr: 'Ж', cyrLower: 'ж', lat: 'Zh',   pron: 'j (Fransız)',    sound: 'ж' },
  { cyr: 'З', cyrLower: 'з', lat: 'Z',    pron: 'z',              sound: 'з' },
  { cyr: 'И', cyrLower: 'и', lat: 'İ',    pron: 'i',              sound: 'и' },
  { cyr: 'Й', cyrLower: 'й', lat: 'Y',    pron: 'y (kısa)',       sound: 'й краткое' },
  { cyr: 'К', cyrLower: 'к', lat: 'K',    pron: 'k',              sound: 'к' },
  { cyr: 'Л', cyrLower: 'л', lat: 'L',    pron: 'l',              sound: 'л' },
  { cyr: 'М', cyrLower: 'м', lat: 'M',    pron: 'm',              sound: 'м' },
  { cyr: 'Н', cyrLower: 'н', lat: 'N',    pron: 'n',              sound: 'н' },
  { cyr: 'О', cyrLower: 'о', lat: 'O',    pron: 'o',              sound: 'о' },
  { cyr: 'П', cyrLower: 'п', lat: 'P',    pron: 'p',              sound: 'п' },
  { cyr: 'Р', cyrLower: 'р', lat: 'R',    pron: 'r',              sound: 'р' },
  { cyr: 'С', cyrLower: 'с', lat: 'S',    pron: 's',              sound: 'с' },
  { cyr: 'Т', cyrLower: 'т', lat: 'T',    pron: 't',              sound: 'т' },
  { cyr: 'У', cyrLower: 'у', lat: 'U',    pron: 'u',              sound: 'у' },
  { cyr: 'Ф', cyrLower: 'ф', lat: 'F',    pron: 'f',              sound: 'ф' },
  { cyr: 'Х', cyrLower: 'х', lat: 'Kh',   pron: 'h (hava)',       sound: 'х' },
  { cyr: 'Ц', cyrLower: 'ц', lat: 'Ts',   pron: 'ts',             sound: 'ц' },
  { cyr: 'Ч', cyrLower: 'ч', lat: 'Ch',   pron: 'ç',              sound: 'ч' },
  { cyr: 'Ш', cyrLower: 'ш', lat: 'Sh',   pron: 'ş',              sound: 'ш' },
  { cyr: 'Щ', cyrLower: 'щ', lat: 'Shch', pron: 'şç (uzun)',      sound: 'щ' },
  { cyr: 'Ъ', cyrLower: 'ъ', lat: '—',    pron: 'sert işaret',    sound: 'твёрдый знак' },
  { cyr: 'Ы', cyrLower: 'ы', lat: 'Y',    pron: 'ı (belirsiz)',   sound: 'ы' },
  { cyr: 'Ь', cyrLower: 'ь', lat: '—',    pron: 'yumuşak işaret', sound: 'мягкий знак' },
  { cyr: 'Э', cyrLower: 'э', lat: 'E',    pron: 'e',              sound: 'э' },
  { cyr: 'Ю', cyrLower: 'ю', lat: 'Yu',   pron: 'yu',             sound: 'ю' },
  { cyr: 'Я', cyrLower: 'я', lat: 'Ya',   pron: 'ya',             sound: 'я' },
]

function speak(text: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'ru-RU'
  u.rate = 0.8
  window.speechSynthesis.speak(u)
}

// ──────────────────────────────────────────────────────────────
//  Alphabet Table Tab
// ──────────────────────────────────────────────────────────────
function TableTab() {
  const [speaking, setSpeaking] = useState<string | null>(null)

  const handleSpeak = (letter: typeof ALPHABET[0]) => {
    setSpeaking(letter.cyr)
    speak(letter.sound)
    setTimeout(() => setSpeaking(null), 900)
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-x-3 mb-3 px-2">
        <span className="text-[9px] text-slate-700 uppercase tracking-widest font-semibold">Kirilce</span>
        <span className="text-[9px] text-slate-700 uppercase tracking-widest font-semibold">Latince</span>
        <span className="text-[9px] text-slate-700 uppercase tracking-widest font-semibold">Telaffuz</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
        {ALPHABET.map((letter) => (
          <button
            key={letter.cyr}
            onClick={() => handleSpeak(letter)}
            className={`grid grid-cols-3 gap-x-3 items-center py-2 border-b border-white/4 last:border-0
              rounded-lg px-2 transition-all duration-150 text-left w-full group
              ${speaking === letter.cyr
                ? 'bg-emerald-500/10 border-emerald-500/20'
                : 'hover:bg-white/3'
              }`}
          >
            <span className="flex items-center gap-2">
              <span className="text-base font-bold text-white tracking-wide">
                {letter.cyr} {letter.cyrLower}
              </span>
              <Volume2
                size={11}
                className={`shrink-0 transition-opacity duration-150
                  ${speaking === letter.cyr ? 'text-emerald-400 opacity-100' : 'text-slate-600 opacity-0 group-hover:opacity-100'}`}
              />
            </span>
            <span className="text-sm font-mono text-emerald-300">{letter.lat}</span>
            <span className="text-xs text-slate-500 leading-snug">{letter.pron}</span>
          </button>
        ))}
      </div>
      <p className="text-[10px] text-slate-700 mt-4 px-2">Bir harfe tıkla — sesi duy 🔊</p>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────
//  Matching Game Tab
// ──────────────────────────────────────────────────────────────
const PAIRS_PER_ROUND = 5

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

type MatchState = 'idle' | 'correct' | 'wrong'

function GameTab() {
  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)

  // Which pairs for this round (indices into ALPHABET)
  const [pairs, setPairs] = useState<typeof ALPHABET>(() =>
    shuffle(ALPHABET).slice(0, PAIRS_PER_ROUND)
  )
  const [leftItems, setLeftItems] = useState<typeof ALPHABET>(() => shuffle(pairs))
  const [rightItems, setRightItems] = useState<typeof ALPHABET>(() => shuffle(pairs))

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null)
  const [selectedRight, setSelectedRight] = useState<string | null>(null)
  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [flash, setFlash] = useState<{ cyr: string; state: MatchState } | null>(null)
  const [roundDone, setRoundDone] = useState(false)

  const startNewRound = useCallback(() => {
    const newPairs = shuffle(ALPHABET).slice(0, PAIRS_PER_ROUND)
    setPairs(newPairs)
    setLeftItems(shuffle(newPairs))
    setRightItems(shuffle(newPairs))
    setSelectedLeft(null)
    setSelectedRight(null)
    setMatched(new Set())
    setFlash(null)
    setRoundDone(false)
    setRound(r => r + 1)
  }, [])

  const handleLeft = (cyr: string) => {
    if (matched.has(cyr)) return
    speak(cyr)
    setSelectedLeft(cyr)
    if (selectedRight) checkMatch(cyr, selectedRight)
  }

  const handleRight = (cyr: string) => {
    if (matched.has(cyr)) return
    setSelectedRight(cyr)
    if (selectedLeft) checkMatch(selectedLeft, cyr)
  }

  const checkMatch = (left: string, right: string) => {
    if (left === right) {
      // Correct
      speak(left)
      setFlash({ cyr: left, state: 'correct' })
      setTimeout(() => {
        setMatched(prev => {
          const next = new Set(prev)
          next.add(left)
          if (next.size === PAIRS_PER_ROUND) {
            setRoundDone(true)
            setScore(s => s + next.size)
            setTotal(t => t + PAIRS_PER_ROUND)
          }
          return next
        })
        setSelectedLeft(null)
        setSelectedRight(null)
        setFlash(null)
      }, 500)
    } else {
      // Wrong
      setFlash({ cyr: left, state: 'wrong' })
      setTimeout(() => {
        setSelectedLeft(null)
        setSelectedRight(null)
        setFlash(null)
      }, 600)
    }
  }

  if (roundDone) {
    return (
      <div className="flex flex-col items-center gap-6 py-8">
        <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center">
          <CheckCircle2 size={32} className="text-emerald-400" />
        </div>
        <div className="text-center">
          <p className="text-white font-black text-2xl">Tur Tamamlandı!</p>
          <p className="text-slate-500 text-sm mt-1">
            {PAIRS_PER_ROUND} çifti doğru eşleştirdin
          </p>
          {total > 0 && (
            <p className="text-emerald-400 text-xs mt-2 font-mono">
              Toplam: {score} / {total} ✓
            </p>
          )}
        </div>
        <button
          onClick={startNewRound}
          className="px-6 py-3 rounded-2xl bg-emerald-500/15 hover:bg-emerald-500/25
            text-emerald-300 text-sm font-bold transition-all duration-200
            border border-emerald-500/20 hover:border-emerald-500/40"
        >
          Yeni Tur →
        </button>
      </div>
    )
  }

  return (
    <div>
      <p className="text-[10px] text-slate-600 mb-4 px-1">
        Sol sütundan bir harf seç, sağ sütunda eşini bul. Sese tıklayarak harfi duyabilirsin.
      </p>

      {/* Score bar */}
      <div className="flex items-center gap-2 mb-5 px-1">
        <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full bg-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${(matched.size / PAIRS_PER_ROUND) * 100}%` }}
          />
        </div>
        <span className="text-[10px] text-slate-600 font-mono">{matched.size}/{PAIRS_PER_ROUND}</span>
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-2 gap-3">
        {/* Left — Cyrillic */}
        <div className="flex flex-col gap-2">
          <p className="text-[9px] text-slate-700 uppercase tracking-widest mb-1 text-center">Kirilce</p>
          {leftItems.map((item) => {
            const isMatched = matched.has(item.cyr)
            const isSelected = selectedLeft === item.cyr
            const isWrong = flash?.cyr === item.cyr && flash.state === 'wrong' && isSelected
            const isCorrect = flash?.cyr === item.cyr && flash.state === 'correct'

            return (
              <button
                key={item.cyr}
                onClick={() => !isMatched && handleLeft(item.cyr)}
                disabled={isMatched}
                className={`py-3 px-4 rounded-2xl text-center font-bold text-lg transition-all duration-200
                  border select-none
                  ${isMatched
                    ? 'bg-emerald-500/8 border-emerald-500/15 text-emerald-500/40 cursor-default'
                    : isCorrect
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 scale-105'
                    : isWrong
                    ? 'bg-red-500/15 border-red-500/40 text-red-400 animate-shake'
                    : isSelected
                    ? 'bg-violet-500/15 border-violet-400/60 text-white shadow-[0_0_20px_rgba(139,92,246,0.2)]'
                    : 'bg-white/4 border-white/8 text-white hover:bg-white/8 hover:border-white/20 active:scale-95'
                  }`}
              >
                {item.cyr} {item.cyrLower}
              </button>
            )
          })}
        </div>

        {/* Right — Latin */}
        <div className="flex flex-col gap-2">
          <p className="text-[9px] text-slate-700 uppercase tracking-widest mb-1 text-center">Latince</p>
          {rightItems.map((item) => {
            const isMatched = matched.has(item.cyr)
            const isSelected = selectedRight === item.cyr
            const isWrong = flash?.state === 'wrong' && isSelected
            const isCorrect = flash?.cyr === item.cyr && flash.state === 'correct'

            return (
              <button
                key={item.cyr}
                onClick={() => !isMatched && handleRight(item.cyr)}
                disabled={isMatched}
                className={`py-3 px-4 rounded-2xl text-center font-bold text-lg transition-all duration-200
                  border font-mono select-none
                  ${isMatched
                    ? 'bg-emerald-500/8 border-emerald-500/15 text-emerald-500/40 cursor-default'
                    : isCorrect
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 scale-105'
                    : isWrong
                    ? 'bg-red-500/15 border-red-500/40 text-red-400 animate-shake'
                    : isSelected
                    ? 'bg-violet-500/15 border-violet-400/60 text-violet-300 shadow-[0_0_20px_rgba(139,92,246,0.2)]'
                    : 'bg-white/4 border-white/8 text-emerald-300 hover:bg-white/8 hover:border-white/20 active:scale-95'
                  }`}
              >
                {item.lat === '—' ? <span className="text-slate-600">—</span> : item.lat}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────
//  Main export
// ──────────────────────────────────────────────────────────────
export default function AlphabetCard() {
  const [tab, setTab] = useState<'table' | 'game'>('table')

  return (
    <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/5
      hover:border-emerald-500/20 rounded-3xl p-6 sm:p-8 transition-all duration-300
      hover:shadow-[0_0_60px_rgba(16,185,129,0.08)] group overflow-hidden relative">

      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/4 to-teal-500/2
        opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 group-hover:bg-emerald-500/18
            flex items-center justify-center transition-colors duration-200 shrink-0">
            <BookOpen size={20} strokeWidth={1.4} className="text-emerald-400" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white tracking-tight">Kiril Alfabesi</h2>
            <p className="text-slate-600 text-xs mt-0.5 tracking-wide">33 harf · Tıkla, dinle, eşleştir</p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-2 mb-6 p-1 bg-white/3 rounded-2xl w-fit">
          <button
            onClick={() => setTab('table')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200
              ${tab === 'table'
                ? 'bg-emerald-500/20 text-emerald-300 shadow-[0_0_16px_rgba(16,185,129,0.15)]'
                : 'text-slate-500 hover:text-slate-300'}`}
          >
            <BookOpen size={12} />
            Alfabe
          </button>
          <button
            onClick={() => setTab('game')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200
              ${tab === 'game'
                ? 'bg-violet-500/20 text-violet-300 shadow-[0_0_16px_rgba(139,92,246,0.15)]'
                : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Gamepad2 size={12} />
            Eşleştir
          </button>
        </div>

        {tab === 'table' ? <TableTab /> : <GameTab />}
      </div>
    </div>
  )
}
