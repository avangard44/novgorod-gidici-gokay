'use client'

import { useState, useEffect, useMemo, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import {
  ChevronLeft, RotateCcw, Gamepad2, Play,
  CheckCircle2, XCircle, BookOpen,
} from 'lucide-react'
import Link from 'next/link'
import BackButton from '@/app/components/BackButton'
import SpotlightCard from '@/app/components/SpotlightCard'
import { grammarBlocks, type Block, type Topic, type QuizQuestion } from '@/app/library/data'

/* ── Sounds ──────────────────────────────────────────────────── */
function playSound(type: 'correct' | 'wrong') {
  if (typeof window === 'undefined') return
  try {
    const AC = window.AudioContext || (window as any).webkitAudioContext
    if (!AC) return
    const ctx = new AC() as AudioContext
    const osc = ctx.createOscillator(); const g = ctx.createGain()
    osc.connect(g); g.connect(ctx.destination)
    const t = ctx.currentTime
    if (type === 'correct') {
      osc.type = 'sine'
      osc.frequency.setValueAtTime(523, t); osc.frequency.setValueAtTime(784, t + 0.1)
      g.gain.setValueAtTime(0.25, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.4)
      osc.start(t); osc.stop(t + 0.4)
    } else {
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(220, t); osc.frequency.exponentialRampToValueAtTime(60, t + 0.22)
      g.gain.setValueAtTime(0.2, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.24)
      osc.start(t); osc.stop(t + 0.25)
    }
    setTimeout(() => { try { ctx.close() } catch {} }, 600)
  } catch {}
}

function playVictorySound() {
  if (typeof window === 'undefined') return
  try {
    const AC = window.AudioContext || (window as any).webkitAudioContext
    if (!AC) return
    const ctx = new AC() as AudioContext
    ;[523, 659, 784, 1047, 1175].forEach((freq, i) => {
      const osc = ctx.createOscillator(); const g = ctx.createGain()
      osc.connect(g); g.connect(ctx.destination); osc.type = 'sine'
      const s = ctx.currentTime + i * 0.13
      osc.frequency.setValueAtTime(freq, s)
      g.gain.setValueAtTime(0.3, s); g.gain.exponentialRampToValueAtTime(0.001, s + 0.45)
      osc.start(s); osc.stop(s + 0.5)
    })
    setTimeout(() => { try { ctx.close() } catch {} }, 2000)
  } catch {}
}

function playFailSound() {
  if (typeof window === 'undefined') return
  try {
    const AC = window.AudioContext || (window as any).webkitAudioContext
    if (!AC) return
    const ctx = new AC() as AudioContext
    ;[330, 294, 262].forEach((freq, i) => {
      const osc = ctx.createOscillator(); const g = ctx.createGain()
      osc.connect(g); g.connect(ctx.destination); osc.type = 'sine'
      const s = ctx.currentTime + i * 0.18
      osc.frequency.setValueAtTime(freq, s)
      g.gain.setValueAtTime(0.25, s); g.gain.exponentialRampToValueAtTime(0.001, s + 0.45)
      osc.start(s); osc.stop(s + 0.5)
    })
    setTimeout(() => { try { ctx.close() } catch {} }, 1500)
  } catch {}
}

/* ── Confetti ────────────────────────────────────────────────── */
const CONFETTI_COLORS = ['#818cf8', '#34d399', '#f59e0b', '#ec4899', '#60a5fa', '#fb923c', '#a78bfa']

function Confetti() {
  const particles = useMemo(() =>
    Array.from({ length: 52 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.9,
      duration: 2.4 + Math.random() * 1.8,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      size: 5 + Math.random() * 7,
    })), [])

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(-20px) rotate(0deg);   opacity: 1; }
          100% { transform: translateY(110vh)  rotate(600deg); opacity: 0; }
        }
      `}</style>
      {particles.map(p => (
        <div key={p.id} className="absolute rounded-sm" style={{
          left: `${p.x}%`, top: 0,
          width: `${p.size}px`, height: `${p.size * 0.6}px`,
          backgroundColor: p.color,
          animation: `confettiFall ${p.duration}s ${p.delay}s ease-in forwards`,
        }} />
      ))}
    </div>
  )
}

/* ── Question renderers ──────────────────────────────────────── */
type QuestQ = QuizQuestion & { topicNum: string; topicTitle: string }

const RUSSIAN_VOWELS = new Set('аеёиоуыэюяАЕЁИОУЫЭЮЯ')

function StressQuestion({ q, onAnswer }: { q: QuestQ; onAnswer: (correct: boolean) => void }) {
  const [selected, setSelected] = useState<number | null>(null)
  const word = q.stressWord || q.question
  const chars = [...word]
  const vowelPositions = chars.map((ch, i) => RUSSIAN_VOWELS.has(ch) ? i : -1).filter(i => i !== -1)
  const correctCharIdx = vowelPositions[q.correct]

  const handleClick = (vIdx: number) => {
    if (selected !== null) return
    setSelected(vIdx)
    const correct = vIdx === q.correct
    playSound(correct ? 'correct' : 'wrong')
    setTimeout(() => onAnswer(correct), 900)
  }

  return (
    <div>
      <p className="text-slate-500 text-xs mb-5 text-center">Vurgulu sesli harfi bul — tıkla:</p>
      <div className="flex flex-wrap gap-0.5 justify-center text-4xl font-black mb-5">
        {chars.map((ch, i) => {
          const vIdx = vowelPositions.indexOf(i)
          if (vIdx === -1) return <span key={i} className="text-white">{ch}</span>
          let cls = 'px-1.5 rounded-lg border border-transparent transition-all cursor-pointer min-h-[44px] min-w-[36px] flex items-center justify-center'
          if (selected === null) cls += ' text-violet-300 hover:bg-violet-500/20 hover:border-violet-500/40'
          else if (i === correctCharIdx) cls += ' text-cyan-400 border-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.7)]'
          else if (vIdx === selected) cls += ' text-red-400 border-red-500/50'
          else cls += ' text-slate-600 cursor-default'
          return <button key={i} className={cls} disabled={selected !== null} onClick={() => handleClick(vIdx)}>{ch}</button>
        })}
      </div>
      {selected !== null && (
        <p className={`text-center text-sm font-medium animate-fade-in ${selected === q.correct ? 'text-cyan-400' : 'text-red-400'}`}>
          {selected === q.correct
            ? `✓ Doğru! Vurgu "${chars[correctCharIdx]}" harfine düşüyor.`
            : `✗ Vurgu "${chars[correctCharIdx]}" harfine düşüyor!`}
        </p>
      )}
    </div>
  )
}

function EndingQuestion({ q, onAnswer }: { q: QuestQ; onAnswer: (correct: boolean) => void }) {
  const [selected, setSelected] = useState<number | null>(null)
  const parts = q.question.split('[...]')
  const before = parts[0] ?? q.question
  const after = parts[1] ?? ''

  const handleClick = (idx: number) => {
    if (selected !== null) return
    setSelected(idx)
    const correct = idx === q.correct
    playSound(correct ? 'correct' : 'wrong')
    setTimeout(() => onAnswer(correct), 900)
  }

  return (
    <div>
      <p className="text-slate-500 text-xs mb-4 text-center">Doğru eki seç:</p>
      <p className="text-xl text-center font-bold text-white mb-6 leading-relaxed">
        {before}
        <span className={`inline-block min-w-[44px] px-2 py-0.5 mx-0.5 rounded-lg border text-center
          ${selected === null ? 'border-dashed border-slate-600 text-slate-600'
            : selected === q.correct ? 'border-green-500 bg-green-500/10 text-green-300'
            : 'border-red-500 bg-red-500/10 text-red-300'}`}>
          {selected !== null ? q.options[selected] : '…'}
        </span>
        {after}
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        {q.options.map((opt, idx) => {
          let cls = 'px-6 py-3 rounded-2xl border text-sm font-mono font-bold transition-all min-h-[52px] min-w-[72px]'
          if (selected !== null) {
            if (idx === q.correct) cls += ' border-green-500/60 bg-green-500/10 text-green-300'
            else if (idx === selected) cls += ' border-red-500/50 bg-red-500/10 text-red-300'
            else cls += ' border-white/5 text-slate-700'
          } else {
            cls += ' border-violet-500/30 bg-violet-500/5 text-violet-300 hover:bg-violet-500/15 cursor-pointer active:scale-95'
          }
          return <button key={idx} className={cls} disabled={selected !== null} onClick={() => handleClick(idx)}>{opt}</button>
        })}
      </div>
      {selected !== null && (
        <p className={`mt-4 text-center text-sm font-medium animate-fade-in ${selected === q.correct ? 'text-green-400' : 'text-red-400'}`}>
          {selected === q.correct ? '✓ Doğru ek!' : `✗ Doğru: ${q.options[q.correct]}`}
        </p>
      )}
    </div>
  )
}

function MultipleChoiceQuestion({ q, onAnswer }: { q: QuestQ; onAnswer: (correct: boolean) => void }) {
  const [selected, setSelected] = useState<number | null>(null)

  const handleClick = (idx: number) => {
    if (selected !== null) return
    setSelected(idx)
    const correct = idx === q.correct
    playSound(correct ? 'correct' : 'wrong')
    setTimeout(() => onAnswer(correct), 800)
  }

  return (
    <div className="flex flex-col gap-3">
      {q.options.map((opt, idx) => {
        let cls = 'w-full py-4 px-5 rounded-2xl border text-sm font-medium text-left transition-all min-h-[56px]'
        if (selected !== null) {
          if (idx === q.correct) cls += ' border-green-500/60 bg-green-500/8 text-green-300'
          else if (idx === selected) cls += ' border-red-500/50 bg-red-500/8 text-red-300'
          else cls += ' border-white/5 text-slate-700 bg-transparent'
        } else {
          cls += ' border-white/8 bg-white/3 text-slate-300 hover:bg-white/6 hover:border-white/15 cursor-pointer active:scale-[0.98]'
        }
        return (
          <button key={idx} className={cls} disabled={selected !== null} onClick={() => handleClick(idx)}>
            {selected !== null && idx === q.correct && <CheckCircle2 size={14} className="inline mr-2 text-green-400" />}
            {selected === idx && idx !== q.correct && <XCircle size={14} className="inline mr-2 text-red-400" />}
            {opt}
          </button>
        )
      })}
    </div>
  )
}

/* ── Quest mode ──────────────────────────────────────────────── */
const PASS_THRESHOLD = 8

type QuestSource =
  | { kind: 'topic'; topic: Topic; block: Block }
  | { kind: 'block'; block: Block }

function buildQuestions(source: QuestSource): QuestQ[] {
  const topics = source.kind === 'topic' ? [source.topic] : source.block.topics
  const all: QuestQ[] = topics.flatMap(t =>
    (t.quiz || []).map(q => ({ ...q, topicNum: t.number, topicTitle: t.title }))
  )
  if (all.length === 0) return all
  // Shuffle
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]]
  }
  const limit = source.kind === 'topic' ? all.length : 10
  return all.slice(0, Math.min(limit, all.length))
}

function QuestMode({ source, backHref, onBack }: {
  source: QuestSource
  backHref: string
  onBack: () => void
}) {
  const [questions, setQuestions] = useState<QuestQ[]>([])
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const title = source.kind === 'topic'
    ? `${source.topic.number} — ${source.topic.title}`
    : source.block.title

  useEffect(() => { setQuestions(buildQuestions(source)) }, [])  // eslint-disable-line

  const handleAnswer = (correct: boolean) => {
    const newScore = score + (correct ? 1 : 0)
    if (correct) setScore(newScore)
    const nextIdx = current + 1
    if (nextIdx >= questions.length) {
      const passed = newScore >= Math.min(PASS_THRESHOLD, questions.length)
      if (passed) {
        playVictorySound()
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 5000)
      } else {
        playFailSound()
      }
      setDone(true)
    } else {
      setCurrent(nextIdx)
    }
  }

  const retry = () => {
    setQuestions(buildQuestions(source))
    setCurrent(0); setScore(0); setDone(false)
  }

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="text-5xl mb-4">📭</div>
        <h2 className="text-xl font-black text-white mb-3">Soru Yok</h2>
        <p className="text-slate-500 text-sm mb-6">Bu konuya ait henüz soru eklenmemiş.</p>
        <Link href={backHref} className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-slate-300 text-sm hover:bg-white/8 transition-all">
          ← Kütüphaneye Dön
        </Link>
      </div>
    )
  }

  const total = questions.length
  const threshold = Math.min(PASS_THRESHOLD, total)

  if (done) {
    const passed = score >= threshold
    return (
      <>
        {showConfetti && <Confetti />}
        <div className="flex flex-col items-center text-center py-10 animate-spring-card px-4 max-w-sm mx-auto">
          <div className="text-6xl mb-5">{passed ? '🎉' : '😤'}</div>
          <h2 className="text-3xl font-black text-white mb-2">
            {passed ? 'Harika!' : 'Az Kaldı!'}
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            {passed
              ? 'Bu konuyu çok iyi biliyorsun!'
              : `Geçmek için ${threshold}/${total} gerekiyor.`}
          </p>

          <div className="flex items-end gap-1 mb-2">
            <span className={`text-6xl font-black text-transparent bg-clip-text ${
              passed ? 'bg-gradient-to-b from-cyan-300 to-violet-400' : 'bg-gradient-to-b from-red-300 to-orange-400'
            }`}>{score}</span>
            <span className="text-2xl font-black text-slate-600 mb-3">/{total}</span>
          </div>
          <p className="text-xs text-slate-600 mb-8">doğru cevap</p>

          <div className="flex gap-3 w-full">
            <Link href={backHref}
              className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl
                bg-white/5 border border-white/10 text-slate-300 text-sm font-medium
                hover:bg-white/8 transition-all min-h-[52px]">
              <BookOpen size={14} />
              Kütüphaneye Dön
            </Link>
            <button onClick={retry}
              className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl
                bg-violet-600/20 border border-violet-500/40 text-violet-300 text-sm font-semibold
                hover:bg-violet-600/30 transition-all min-h-[52px]">
              <RotateCcw size={14} />
              Tekrar Oyna
            </button>
          </div>
        </div>
      </>
    )
  }

  const q = questions[current]
  const progressPct = (current / total) * 100

  return (
    <div className="max-w-lg mx-auto px-4 py-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack}
          className="p-2.5 rounded-xl hover:bg-white/5 transition-colors text-slate-500 hover:text-slate-300 min-h-[44px] min-w-[44px] flex items-center justify-center">
          <ChevronLeft size={20} />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-violet-400/70 uppercase tracking-widest font-semibold">
            {source.kind === 'topic' ? 'Konu Oyunu' : 'Blok Sınavı'}
          </p>
          <p className="text-sm font-bold text-slate-300 truncate">{title}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-lg font-black text-white">{score}<span className="text-slate-600 text-sm font-normal">/{total}</span></p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-[3px] bg-white/5 rounded-full overflow-hidden mb-8">
        <div className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full transition-all duration-500"
          style={{ width: `${progressPct}%` }} />
      </div>

      {/* Question card */}
      <div key={current} className="animate-spring-card bg-white/3 backdrop-blur-xl border border-white/8 rounded-3xl p-6 sm:p-8">
        <p className="text-[10px] text-slate-600 uppercase tracking-widest mb-1">
          {q.topicNum} · {q.topicTitle}
        </p>
        <p className="text-xs text-slate-600 mb-5">Soru {current + 1} / {total}</p>

        {q.type !== 'stress' && q.type !== 'ending' && (
          <p className="text-lg font-bold text-white mb-6 leading-snug">{q.question}</p>
        )}

        {q.type === 'stress' && <StressQuestion q={q} onAnswer={handleAnswer} />}
        {q.type === 'ending' && <EndingQuestion q={q} onAnswer={handleAnswer} />}
        {q.type !== 'stress' && q.type !== 'ending' && <MultipleChoiceQuestion q={q} onAnswer={handleAnswer} />}
      </div>

      {/* Back to library */}
      <div className="mt-6 flex justify-center">
        <Link href={backHref}
          className="text-xs text-slate-700 hover:text-slate-500 transition-colors flex items-center gap-1.5">
          <BookOpen size={11} />
          Kütüphaneye Dön
        </Link>
      </div>
    </div>
  )
}

/* ── Game hub ─────────────────────────────────────────────────── */
const BLOCK_COLORS = [
  { glow: 'shadow-[0_0_40px_rgba(34,211,238,0.18)]',   border: 'border-cyan-500/40',   text: 'text-cyan-400',   bg: 'bg-cyan-500/8',   highlight: 'shadow-[0_0_60px_rgba(34,211,238,0.35)] border-cyan-400/70' },
  { glow: 'shadow-[0_0_40px_rgba(99,102,241,0.18)]',   border: 'border-indigo-500/40', text: 'text-indigo-400', bg: 'bg-indigo-500/8', highlight: 'shadow-[0_0_60px_rgba(99,102,241,0.35)] border-indigo-400/70' },
  { glow: 'shadow-[0_0_40px_rgba(139,92,246,0.18)]',   border: 'border-violet-500/40', text: 'text-violet-400', bg: 'bg-violet-500/8', highlight: 'shadow-[0_0_60px_rgba(139,92,246,0.35)] border-violet-400/70' },
  { glow: 'shadow-[0_0_40px_rgba(168,85,247,0.18)]',   border: 'border-purple-500/40', text: 'text-purple-400', bg: 'bg-purple-500/8', highlight: 'shadow-[0_0_60px_rgba(168,85,247,0.35)] border-purple-400/70' },
  { glow: 'shadow-[0_0_40px_rgba(236,72,153,0.18)]',   border: 'border-pink-500/40',   text: 'text-pink-400',   bg: 'bg-pink-500/8',   highlight: 'shadow-[0_0_60px_rgba(236,72,153,0.35)] border-pink-400/70' },
  { glow: 'shadow-[0_0_40px_rgba(249,115,22,0.18)]',   border: 'border-orange-500/40', text: 'text-orange-400', bg: 'bg-orange-500/8', highlight: 'shadow-[0_0_60px_rgba(249,115,22,0.35)] border-orange-400/70' },
]

function GameHub({ highlightTopicNum, onStartTopic, onStartBlock }: {
  highlightTopicNum?: string
  onStartTopic: (topic: Topic, block: Block) => void
  onStartBlock: (block: Block) => void
}) {
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex">
          <BackButton />
        </div>

        <div className="text-center mb-10">
          <p className="text-[10px] text-slate-700 uppercase tracking-[0.35em] mb-4">Oyun Merkezi</p>
          <h1 className="text-4xl font-black text-white mb-3">
            Konu <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Oyunları</span>
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed max-w-sm mx-auto">
            Bir konu seç ve sorularını yanıtla. Tüm konular serbest.
          </p>
        </div>

        <div className="space-y-4">
          {grammarBlocks.map((block, i) => {
            const col = BLOCK_COLORS[i]
            return (
              <div key={block.id} className={`rounded-3xl border ${col.bg} ${col.border} ${col.glow} overflow-hidden`}>
                {/* Block header — click to run block quiz */}
                <button
                  onClick={() => onStartBlock(block)}
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/4 transition-colors group"
                >
                  <div className="text-left">
                    <p className={`text-[9px] uppercase tracking-widest font-bold mb-0.5 ${col.text}`}>{block.level}</p>
                    <p className="text-sm font-black text-white">{block.title}</p>
                  </div>
                  <div className={`flex items-center gap-2 text-xs font-bold ${col.text} group-hover:gap-3 transition-all`}>
                    <Play size={12} className="shrink-0" />
                    <span className="hidden sm:inline">Blok Sınavı</span>
                  </div>
                </button>

                {/* Topic chips */}
                <div className="px-4 pb-4 flex flex-wrap gap-2">
                  {block.topics.map(topic => {
                    const isHighlighted = topic.number === highlightTopicNum
                    return (
                      <button
                        key={topic.id}
                        onClick={() => onStartTopic(topic, block)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all
                          min-h-[40px] active:scale-[0.97]
                          ${isHighlighted
                            ? `${col.highlight} ${col.text} bg-white/10 animate-pulse`
                            : `bg-white/4 border border-white/8 text-slate-400 hover:bg-white/8 hover:border-white/15 hover:${col.text}`
                          }`}
                      >
                        <Gamepad2 size={11} className="shrink-0" />
                        {topic.number} {topic.title}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ── Main ─────────────────────────────────────────────────────── */
function GameContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const topicParam = searchParams.get('topic')   // e.g. "1.3"
  const [questSource, setQuestSource] = useState<QuestSource | null>(null)
  const [backHref, setBackHref] = useState('/library')

  useEffect(() => {
    if (topicParam) {
      // Find the topic with matching number
      for (const block of grammarBlocks) {
        const topic = block.topics.find(t => t.number === topicParam)
        if (topic) {
          setBackHref(`/library`)
          setQuestSource({ kind: 'topic', topic, block })
          return
        }
      }
    }
  }, [topicParam])

  const handleStartTopic = (topic: Topic, block: Block) => {
    setBackHref('/grammar/game')
    setQuestSource({ kind: 'topic', topic, block })
  }

  const handleStartBlock = (block: Block) => {
    setBackHref('/grammar/game')
    setQuestSource({ kind: 'block', block })
  }

  const handleBack = () => {
    setQuestSource(null)
    router.replace('/grammar/game')
  }

  if (questSource) {
    return (
      <QuestMode
        source={questSource}
        backHref={backHref}
        onBack={handleBack}
      />
    )
  }

  return (
    <GameHub
      highlightTopicNum={topicParam ?? undefined}
      onStartTopic={handleStartTopic}
      onStartBlock={handleStartBlock}
    />
  )
}

export default function GamePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <GameContent />
    </Suspense>
  )
}
