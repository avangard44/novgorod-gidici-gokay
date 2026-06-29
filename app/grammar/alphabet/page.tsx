'use client'
import { useState, useCallback } from 'react'
import { BookOpen, Gamepad2, CheckCircle2 } from 'lucide-react'
import BackButton from '@/app/components/BackButton'

const ALPHABET = [
  { cyr: 'А', cyrLower: 'а', lat: 'A',    pron: 'a (araba)' },
  { cyr: 'Б', cyrLower: 'б', lat: 'B',    pron: 'b' },
  { cyr: 'В', cyrLower: 'в', lat: 'V',    pron: 'v' },
  { cyr: 'Г', cyrLower: 'г', lat: 'G',    pron: 'g' },
  { cyr: 'Д', cyrLower: 'д', lat: 'D',    pron: 'd' },
  { cyr: 'Е', cyrLower: 'е', lat: 'Ye',   pron: 'ye (yemek)' },
  { cyr: 'Ё', cyrLower: 'ё', lat: 'Yo',   pron: 'yo (yoğurt)' },
  { cyr: 'Ж', cyrLower: 'ж', lat: 'Zh',   pron: 'j (Fransız)' },
  { cyr: 'З', cyrLower: 'з', lat: 'Z',    pron: 'z' },
  { cyr: 'И', cyrLower: 'и', lat: 'İ',    pron: 'i' },
  { cyr: 'Й', cyrLower: 'й', lat: 'Y',    pron: 'y (kısa)' },
  { cyr: 'К', cyrLower: 'к', lat: 'K',    pron: 'k' },
  { cyr: 'Л', cyrLower: 'л', lat: 'L',    pron: 'l' },
  { cyr: 'М', cyrLower: 'м', lat: 'M',    pron: 'm' },
  { cyr: 'Н', cyrLower: 'н', lat: 'N',    pron: 'n' },
  { cyr: 'О', cyrLower: 'о', lat: 'O',    pron: 'o' },
  { cyr: 'П', cyrLower: 'п', lat: 'P',    pron: 'p' },
  { cyr: 'Р', cyrLower: 'р', lat: 'R',    pron: 'r' },
  { cyr: 'С', cyrLower: 'с', lat: 'S',    pron: 's' },
  { cyr: 'Т', cyrLower: 'т', lat: 'T',    pron: 't' },
  { cyr: 'У', cyrLower: 'у', lat: 'U',    pron: 'u' },
  { cyr: 'Ф', cyrLower: 'ф', lat: 'F',    pron: 'f' },
  { cyr: 'Х', cyrLower: 'х', lat: 'Kh',   pron: 'h (hava)' },
  { cyr: 'Ц', cyrLower: 'ц', lat: 'Ts',   pron: 'ts' },
  { cyr: 'Ч', cyrLower: 'ч', lat: 'Ch',   pron: 'ç' },
  { cyr: 'Ш', cyrLower: 'ш', lat: 'Sh',   pron: 'ş' },
  { cyr: 'Щ', cyrLower: 'щ', lat: 'Shch', pron: 'şç (uzun)' },
  { cyr: 'Ъ', cyrLower: 'ъ', lat: '—',    pron: 'sert işaret' },
  { cyr: 'Ы', cyrLower: 'ы', lat: 'Y',    pron: 'ı (belirsiz)' },
  { cyr: 'Ь', cyrLower: 'ь', lat: '—',    pron: 'yumuşak işaret' },
  { cyr: 'Э', cyrLower: 'э', lat: 'E',    pron: 'e' },
  { cyr: 'Ю', cyrLower: 'ю', lat: 'Yu',   pron: 'yu' },
  { cyr: 'Я', cyrLower: 'я', lat: 'Ya',   pron: 'ya' },
]

// ──────────────────────────────────────────────────────────────
//  Table tab
// ──────────────────────────────────────────────────────────────
function TableTab() {
  return (
    <div>
      <div className="grid grid-cols-3 gap-x-3 mb-3 px-2">
        <span className="text-[9px] text-slate-700 uppercase tracking-widest font-semibold">Kirilce</span>
        <span className="text-[9px] text-slate-700 uppercase tracking-widest font-semibold">Latince</span>
        <span className="text-[9px] text-slate-700 uppercase tracking-widest font-semibold">Telaffuz</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
        {ALPHABET.map((letter) => (
          <div
            key={letter.cyr}
            className="grid grid-cols-3 gap-x-3 items-center py-2.5 border-b border-white/4
              last:border-0 hover:bg-white/3 rounded-lg px-2 transition-colors"
          >
            <span className="text-base font-bold text-white tracking-wide">
              {letter.cyr} {letter.cyrLower}
            </span>
            <span className="text-sm font-mono text-emerald-300">{letter.lat}</span>
            <span className="text-xs text-slate-500 leading-snug">{letter.pron}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────
//  Matching game tab
// ──────────────────────────────────────────────────────────────
const PAIRS_PER_ROUND = 5

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

type FlashState = { cyr: string; state: 'correct' | 'wrong' } | null

function GameTab() {
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)

  const newRoundState = useCallback(() => {
    const picked = shuffle(ALPHABET).slice(0, PAIRS_PER_ROUND)
    return {
      pairs: picked,
      left: shuffle(picked),
      right: shuffle(picked),
    }
  }, [])

  const [{ pairs: _pairs, left: leftItems, right: rightItems }, setRound] = useState(newRoundState)
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null)
  const [selectedRight, setSelectedRight] = useState<string | null>(null)
  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [flash, setFlash] = useState<FlashState>(null)
  const [roundDone, setRoundDone] = useState(false)

  const startNewRound = useCallback(() => {
    setRound(newRoundState())
    setSelectedLeft(null)
    setSelectedRight(null)
    setMatched(new Set())
    setFlash(null)
    setRoundDone(false)
  }, [newRoundState])

  const checkMatch = useCallback((left: string, right: string) => {
    if (left === right) {
      setFlash({ cyr: left, state: 'correct' })
      setTimeout(() => {
        setMatched(prev => {
          const next = new Set(prev)
          next.add(left)
          if (next.size === PAIRS_PER_ROUND) {
            setRoundDone(true)
            setScore(s => s + PAIRS_PER_ROUND)
            setTotal(t => t + PAIRS_PER_ROUND)
          }
          return next
        })
        setSelectedLeft(null)
        setSelectedRight(null)
        setFlash(null)
      }, 450)
    } else {
      setFlash({ cyr: left, state: 'wrong' })
      setTimeout(() => {
        setSelectedLeft(null)
        setSelectedRight(null)
        setFlash(null)
      }, 550)
    }
  }, [])

  const handleLeft = useCallback((cyr: string, curRight: string | null) => {
    if (matched.has(cyr)) return
    setSelectedLeft(cyr)
    if (curRight) checkMatch(cyr, curRight)
  }, [matched, checkMatch])

  const handleRight = useCallback((cyr: string, curLeft: string | null) => {
    if (matched.has(cyr)) return
    setSelectedRight(cyr)
    if (curLeft) checkMatch(curLeft, cyr)
  }, [matched, checkMatch])

  if (roundDone) {
    return (
      <div className="flex flex-col items-center gap-6 py-10">
        <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center">
          <CheckCircle2 size={32} className="text-emerald-400" />
        </div>
        <div className="text-center">
          <p className="text-white font-black text-2xl">Tur Tamamlandı!</p>
          <p className="text-slate-500 text-sm mt-1">{PAIRS_PER_ROUND} çifti doğru eşleştirdin</p>
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
        Sol sütundan bir harf seç, sağ sütunda eşini bul.
      </p>

      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-5 px-1">
        <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full bg-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${(matched.size / PAIRS_PER_ROUND) * 100}%` }}
          />
        </div>
        <span className="text-[10px] text-slate-600 font-mono">{matched.size}/{PAIRS_PER_ROUND}</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Left — Cyrillic */}
        <div className="flex flex-col gap-2">
          <p className="text-[9px] text-slate-700 uppercase tracking-widest mb-1 text-center">Kirilce</p>
          {leftItems.map((item) => {
            const isMatched = matched.has(item.cyr)
            const isSelected = selectedLeft === item.cyr
            const isCorrect = flash?.cyr === item.cyr && flash.state === 'correct'
            const isWrong = flash?.state === 'wrong' && isSelected

            return (
              <button
                key={item.cyr}
                onClick={() => handleLeft(item.cyr, selectedRight)}
                disabled={isMatched}
                className={`py-3 px-4 rounded-2xl text-center font-bold text-lg transition-all duration-200
                  border select-none
                  ${isMatched
                    ? 'bg-emerald-500/8 border-emerald-500/15 text-emerald-600/40 cursor-default'
                    : isCorrect
                    ? 'bg-emerald-500/20 border-emerald-400/60 text-emerald-300 scale-105'
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
            const isCorrect = flash?.cyr === item.cyr && flash.state === 'correct'
            const isWrong = flash?.state === 'wrong' && isSelected

            return (
              <button
                key={item.cyr}
                onClick={() => handleRight(item.cyr, selectedLeft)}
                disabled={isMatched}
                className={`py-3 px-4 rounded-2xl text-center font-bold text-lg font-mono
                  transition-all duration-200 border select-none
                  ${isMatched
                    ? 'bg-emerald-500/8 border-emerald-500/15 text-emerald-600/40 cursor-default'
                    : isCorrect
                    ? 'bg-emerald-500/20 border-emerald-400/60 text-emerald-300 scale-105'
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
//  Page
// ──────────────────────────────────────────────────────────────
export default function AlphabetPage() {
  const [tab, setTab] = useState<'table' | 'game'>('table')

  return (
    <div className="min-h-screen flex flex-col items-center px-5 py-16">
      <div className="w-full max-w-2xl mb-10 flex">
        <BackButton />
      </div>

      <div className="text-center mb-12 w-full max-w-2xl">
        <p className="text-[10px] text-slate-700 uppercase tracking-[0.35em] mb-5">Alfabe</p>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
          Kiril{' '}
          <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Alfabesi
          </span>
        </h1>
        <p className="text-slate-600 text-sm mt-4">
          33 harf — tablodan öğren, oyunla pekiştir.
        </p>
      </div>

      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/8
        rounded-3xl p-6 sm:p-8 overflow-hidden">

        {/* Tab switcher */}
        <div className="flex gap-2 mb-8 p-1 bg-white/3 rounded-2xl w-fit">
          <button
            onClick={() => setTab('table')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200
              ${tab === 'table'
                ? 'bg-emerald-500/20 text-emerald-300 shadow-[0_0_16px_rgba(16,185,129,0.12)]'
                : 'text-slate-500 hover:text-slate-300'}`}
          >
            <BookOpen size={12} />
            Alfabe
          </button>
          <button
            onClick={() => setTab('game')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200
              ${tab === 'game'
                ? 'bg-violet-500/20 text-violet-300 shadow-[0_0_16px_rgba(139,92,246,0.12)]'
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
