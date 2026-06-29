'use client'

import { useState, useCallback } from 'react'
import { ChevronDown, ChevronRight, ChevronUp, Menu, X, Volume2, RotateCcw } from 'lucide-react'
import BackButton from '@/app/components/BackButton'
import { grammarBlocks, type Topic, type Block } from './data'

export default function LibraryPage() {
  const [openBlock, setOpenBlock] = useState<string>(grammarBlocks[0].id)
  const [activeTopic, setActiveTopic] = useState<Topic>(grammarBlocks[0].topics[0])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleBlock = (id: string) =>
    setOpenBlock((prev) => (prev === id ? '' : id))

  const selectTopic = (topic: Topic, blockId: string) => {
    setActiveTopic(topic)
    setOpenBlock(blockId)
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Top bar ── */}
      <header className="sticky top-0 z-30 flex items-center gap-3 px-4 sm:px-6 py-3
        bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <BackButton />
        <div className="flex-1 min-w-0">
          <p className="text-[9px] text-slate-600 uppercase tracking-widest hidden sm:block">Kütüphane</p>
          <p className="text-sm font-bold text-white leading-tight truncate">Dilbilgisi Konuları</p>
        </div>

        {/* Mobile topic picker toggle */}
        <button
          className="md:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl
            bg-white/5 border border-white/8 text-slate-400 text-xs font-medium
            hover:bg-white/10 transition-colors min-h-[44px]"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
          <span className="max-w-[120px] truncate">{activeTopic.number} {activeTopic.title}</span>
          {mobileMenuOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
      </header>

      {/* ── Mobile dropdown overlay ── */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-20 top-[57px] bg-slate-950/95 backdrop-blur-xl
          overflow-y-auto border-b border-white/5">
          <MobileTopicList
            openBlock={openBlock}
            activeTopic={activeTopic}
            onToggle={toggleBlock}
            onSelect={selectTopic}
          />
        </div>
      )}

      {/* ── Main layout ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Desktop sidebar ── */}
        <aside className="hidden md:flex flex-col w-64 shrink-0 border-r border-white/5
          bg-slate-950/50 backdrop-blur-xl overflow-y-auto sticky top-[57px]
          h-[calc(100vh-57px)]">
          <nav className="py-2">
            {grammarBlocks.map((block) => (
              <DesktopBlockAccordion
                key={block.id}
                block={block}
                isOpen={openBlock === block.id}
                activeTopic={activeTopic}
                onToggle={() => toggleBlock(block.id)}
                onSelect={(t) => selectTopic(t, block.id)}
              />
            ))}
          </nav>
        </aside>

        {/* ── Content panel ── */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-10 py-8">
          <div className="max-w-3xl mx-auto">
            <TopicContent key={activeTopic.id} topic={activeTopic} />
          </div>
        </main>
      </div>
    </div>
  )
}

/* ── Desktop sidebar accordion ── */
function DesktopBlockAccordion({
  block, isOpen, activeTopic, onToggle, onSelect,
}: {
  block: Block
  isOpen: boolean
  activeTopic: Topic
  onToggle: () => void
  onSelect: (t: Topic) => void
}) {
  return (
    <div className="border-b border-white/5 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3
          text-left hover:bg-white/4 transition-colors group"
      >
        <div>
          <span className="text-[9px] text-violet-500 uppercase tracking-widest font-semibold">
            {block.level}
          </span>
          <p className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors mt-0.5">
            {block.title}
          </p>
        </div>
        <ChevronDown
          size={12}
          className={`text-slate-600 transition-transform duration-200 shrink-0
            ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="pb-1">
          {block.topics.map((topic) => {
            const isActive = activeTopic.id === topic.id
            return (
              <button
                key={topic.id}
                onClick={() => onSelect(topic)}
                className={`w-full text-left px-4 py-2 flex items-center gap-2.5 transition-all
                  ${isActive
                    ? 'bg-violet-600/15 border-r-2 border-violet-500'
                    : 'hover:bg-white/4'}`}
              >
                <span className={`text-[10px] font-mono shrink-0
                  ${isActive ? 'text-violet-400' : 'text-slate-600'}`}>
                  {topic.number}
                </span>
                <span className={`text-xs leading-snug
                  ${isActive ? 'text-white font-medium' : 'text-slate-500'}`}>
                  {topic.title}
                </span>
                {isActive && <ChevronRight size={10} className="text-violet-400 ml-auto shrink-0" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

/* ── Mobile topic list (full-screen overlay) ── */
function MobileTopicList({
  openBlock, activeTopic, onToggle, onSelect,
}: {
  openBlock: string
  activeTopic: Topic
  onToggle: (id: string) => void
  onSelect: (t: Topic, blockId: string) => void
}) {
  return (
    <div>
      {grammarBlocks.map((block) => (
        <div key={block.id} className="border-b border-white/5 last:border-0">
          <button
            onClick={() => onToggle(block.id)}
            className="w-full flex items-center justify-between px-5 py-4 text-left"
          >
            <div>
              <span className="text-[9px] text-violet-500 uppercase tracking-widest font-semibold">
                {block.level}
              </span>
              <p className="text-sm font-semibold text-slate-200 mt-0.5">{block.title}</p>
            </div>
            <ChevronDown
              size={14}
              className={`text-slate-600 transition-transform duration-200
                ${openBlock === block.id ? 'rotate-180' : ''}`}
            />
          </button>
          {openBlock === block.id && (
            <div className="pb-2 px-2">
              {block.topics.map((topic) => {
                const isActive = activeTopic.id === topic.id
                return (
                  <button
                    key={topic.id}
                    onClick={() => onSelect(topic, block.id)}
                    className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl
                      min-h-[48px] transition-colors mb-1
                      ${isActive ? 'bg-violet-600/20 text-white' : 'hover:bg-white/5 text-slate-400'}`}
                  >
                    <span className={`text-[10px] font-mono shrink-0
                      ${isActive ? 'text-violet-400' : 'text-slate-600'}`}>
                      {topic.number}
                    </span>
                    <span className="text-sm leading-snug">{topic.title}</span>
                    {isActive && <ChevronRight size={12} className="text-violet-400 ml-auto shrink-0" />}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ── Speak button (Web Speech API) ── */
function SpeakButton({ text }: { text: string }) {
  const [speaking, setSpeaking] = useState(false)

  const speak = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const utt = new SpeechSynthesisUtterance(text)
    utt.lang = 'ru-RU'
    utt.rate = 0.85
    utt.onstart = () => setSpeaking(true)
    utt.onend = () => setSpeaking(false)
    utt.onerror = () => setSpeaking(false)
    window.speechSynthesis.speak(utt)
  }, [text])

  return (
    <button
      onClick={speak}
      aria-label="Seslendir"
      className={`inline-flex items-center justify-center w-6 h-6 rounded-md transition-colors shrink-0
        ${speaking
          ? 'text-violet-400 bg-violet-500/20'
          : 'text-slate-600 hover:text-violet-400 hover:bg-violet-500/10'}`}
    >
      <Volume2 size={12} />
    </button>
  )
}

/* ── Quiz block ── */
function QuizBlock({ topic }: { topic: Topic }) {
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [completed, setCompleted] = useState(false)
  const [score, setScore] = useState(0)

  if (!topic.quiz || topic.quiz.length === 0) return null

  const q = topic.quiz[currentQ]
  const isCorrect = selected === q.correct

  const handleSelect = (idx: number) => {
    if (selected !== null) return
    setSelected(idx)
    if (idx === q.correct) setScore((s) => s + 1)
  }

  const handleNext = () => {
    if (currentQ + 1 >= topic.quiz!.length) {
      setCompleted(true)
    } else {
      setCurrentQ((q) => q + 1)
      setSelected(null)
    }
  }

  const handleReset = () => {
    setCurrentQ(0)
    setSelected(null)
    setCompleted(false)
    setScore(0)
  }

  return (
    <div className="mt-6 bg-white/4 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden">
      <div className="px-5 sm:px-6 py-4 border-b border-white/5 flex items-center justify-between">
        <p className="text-[10px] text-slate-600 uppercase tracking-widest font-semibold">
          🧠 Kendini Test Et
        </p>
        {!completed && (
          <span className="text-[10px] text-slate-600">
            {currentQ + 1} / {topic.quiz.length}
          </span>
        )}
      </div>

      <div className="p-5 sm:p-6">
        {completed ? (
          <div className="text-center py-4 animate-fade-in">
            <div className="text-3xl mb-3">{score === topic.quiz.length ? '🎉' : '✅'}</div>
            <p className="text-white font-bold text-lg mb-1">
              {score === topic.quiz.length ? 'Mükemmel!' : 'Tebrikler!'}
            </p>
            <p className="text-slate-400 text-sm mb-1">
              Konuyu pekiştirdiniz
            </p>
            <p className="text-violet-400 text-xs mb-5">
              {score} / {topic.quiz.length} doğru
            </p>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 mx-auto px-4 py-2 rounded-xl
                bg-white/5 hover:bg-white/10 border border-white/8 hover:border-white/15
                text-slate-300 text-xs font-medium transition-all"
            >
              <RotateCcw size={12} />
              Tekrar Dene
            </button>
          </div>
        ) : (
          <div className="animate-fade-in" key={currentQ}>
            <p className="text-slate-200 text-sm font-medium mb-4 leading-relaxed">{q.question}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              {q.options.map((opt, idx) => {
                let cls = 'border border-white/8 text-slate-300 hover:bg-white/8 hover:border-white/15'
                if (selected !== null) {
                  if (idx === q.correct) cls = 'border border-green-500/60 bg-green-500/10 text-green-300'
                  else if (idx === selected && !isCorrect) cls = 'border border-red-500/50 bg-red-500/8 text-red-300'
                  else cls = 'border border-white/5 text-slate-600'
                }
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={selected !== null}
                    className={`text-left px-4 py-3 rounded-xl text-xs leading-snug
                      transition-all min-h-[44px] ${cls}`}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
            {selected !== null && (
              <div className="flex items-center justify-between animate-fade-in">
                <span className={`text-xs font-medium ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                  {isCorrect ? '✓ Doğru!' : '✗ Yanlış'}
                </span>
                <button
                  onClick={handleNext}
                  className="px-4 py-2 rounded-xl bg-violet-600/20 hover:bg-violet-600/30
                    border border-violet-500/30 text-violet-300 text-xs font-medium
                    transition-all min-h-[36px]"
                >
                  {currentQ + 1 >= topic.quiz!.length ? 'Bitir' : 'Sonraki Soru →'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Topic content ── */
function TopicContent({ topic }: { topic: Topic }) {
  return (
    <div className="animate-fade-in">
      {/* Title */}
      <div className="mb-7">
        <span className="text-[10px] text-violet-400 uppercase tracking-widest font-semibold">
          {topic.number}
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 leading-tight">
          {topic.title}
        </h2>
      </div>

      {/* Explanation */}
      <div className="bg-white/4 backdrop-blur-xl border border-white/5 rounded-2xl p-5 sm:p-6 mb-5">
        <p className="text-[10px] text-slate-600 uppercase tracking-widest mb-4 font-semibold">
          📖 Açıklama
        </p>
        <ExplanationRenderer text={topic.explanation} />
      </div>

      {/* Examples table */}
      <div className="bg-white/4 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden">
        <div className="px-5 sm:px-6 py-4 border-b border-white/5">
          <p className="text-[10px] text-slate-600 uppercase tracking-widest font-semibold">
            🇷🇺 Örnekler
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ minWidth: '480px' }}>
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-5 sm:px-6 py-3 text-[10px] text-slate-600
                  uppercase tracking-widest font-semibold w-[38%]">
                  Rusça
                </th>
                <th className="text-left px-4 py-3 text-[10px] text-slate-600
                  uppercase tracking-widest font-semibold w-[32%]">
                  Türkçe
                </th>
                <th className="text-left px-4 py-3 text-[10px] text-slate-600
                  uppercase tracking-widest font-semibold">
                  Açıklama
                </th>
              </tr>
            </thead>
            <tbody>
              {topic.examples.map((ex, i) => (
                <tr
                  key={i}
                  className="border-b border-white/4 last:border-0 hover:bg-white/3 transition-colors"
                >
                  <td className="px-5 sm:px-6 py-3.5 font-semibold text-slate-100 align-top">
                    <div className="flex items-center gap-2">
                      <span className="whitespace-nowrap">{ex.russian}</span>
                      <SpeakButton text={ex.russian} />
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-slate-400 align-top">
                    {ex.turkish}
                  </td>
                  <td className="px-4 py-3.5 text-slate-600 text-xs align-top leading-relaxed">
                    {ex.note ?? '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quiz block */}
      <QuizBlock key={topic.id} topic={topic} />
    </div>
  )
}

/* ── Explanation renderer ── */
function ExplanationRenderer({ text }: { text: string }) {
  return (
    <div className="space-y-1.5">
      {text.split('\n').map((line, i) => {
        if (line.trim() === '') return <div key={i} className="h-2" />
        const parts = line.split(/(\*\*.*?\*\*)/)
        return (
          <p key={i} className="text-slate-400 text-sm leading-relaxed">
            {parts.map((part, j) =>
              part.startsWith('**') && part.endsWith('**') ? (
                <strong key={j} className="text-violet-300 font-semibold">
                  {part.slice(2, -2)}
                </strong>
              ) : (
                <span key={j}>{part}</span>
              )
            )}
          </p>
        )
      })}
    </div>
  )
}
