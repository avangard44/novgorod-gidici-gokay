'use client'

import { useState, useEffect } from 'react'
import {
  ChevronDown, ChevronRight, ChevronUp, Menu, X,
  Star, AlertCircle, CheckCircle2, RotateCcw, Eye, EyeOff,
  Table2, LayoutGrid, Gamepad2,
} from 'lucide-react'
import Link from 'next/link'
import BackButton from '@/app/components/BackButton'
import SpotlightCard from '@/app/components/SpotlightCard'
import { grammarBlocks, type Topic, type Block, type QuizQuestion, type Example } from './data'
import {
  getBookmarks, toggleBookmark as storageToggleBookmark,
  getCompleted, markCompleted,
  getWrongAnswers, addWrongAnswer, clearWrongAnswer,
  getZenMode, saveZenMode,
  unlockAchievement, flagHataCleared,
  type WrongAnswer,
} from '@/app/lib/storage'

const BLOK1_IDS = ['1-1', '1-2', '1-3', '1-4', '1-5', '1-6']
const RUSSIAN_VOWELS = new Set('аеёиоуыэюяАЕЁИОУЫЭЮЯ')
const ALL_TOPICS = grammarBlocks.flatMap(b => b.topics)

/* ── Sound effects ────────────────────────────────────────────── */
function playSound(type: 'correct' | 'wrong') {
  if (typeof window === 'undefined') return
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const AC = window.AudioContext || (window as any).webkitAudioContext
    if (!AC) return
    const ctx = new AC() as AudioContext
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain); gain.connect(ctx.destination)
    const t = ctx.currentTime
    if (type === 'correct') {
      osc.type = 'sine'
      osc.frequency.setValueAtTime(523, t); osc.frequency.setValueAtTime(784, t + 0.1)
      gain.gain.setValueAtTime(0.25, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4)
      osc.start(t); osc.stop(t + 0.4)
    } else {
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(200, t); osc.frequency.exponentialRampToValueAtTime(60, t + 0.2)
      gain.gain.setValueAtTime(0.2, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22)
      osc.start(t); osc.stop(t + 0.25)
    }
    setTimeout(() => { try { ctx.close() } catch { /* noop */ } }, 600)
  } catch { /* noop */ }
}

/* ── Main page ────────────────────────────────────────────────── */
export default function LibraryPage() {
  const [openBlock, setOpenBlock] = useState(grammarBlocks[0].id)
  const [activeTopic, setActiveTopic] = useState<Topic>(grammarBlocks[0].topics[0])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [view, setView] = useState<'topic' | 'hata'>('topic')
  const [showFavOnly, setShowFavOnly] = useState(false)
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set())
  const [completed, setCompleted] = useState<Set<string>>(new Set())
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>([])
  const [zenMode, setZenModeState] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    setBookmarks(getBookmarks())
    setCompleted(getCompleted())
    setWrongAnswers(getWrongAnswers())
    setZenModeState(getZenMode())
  }, [])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3500)
    return () => clearTimeout(t)
  }, [toast])

  const showAchievementToast = (title: string) => {
    setToast(`🏆 "${title}" başarısı açıldı! Tebrikler!`)
  }

  const toggleZen = () => {
    const next = !zenMode
    setZenModeState(next)
    saveZenMode(next)
  }

  const toggleBlock = (id: string) => setOpenBlock(p => p === id ? '' : id)

  const selectTopic = (topic: Topic, blockId: string) => {
    setActiveTopic(topic); setOpenBlock(blockId)
    setMobileMenuOpen(false); setView('topic')
  }

  const handleBookmarkToggle = (topicId: string) => {
    storageToggleBookmark(topicId); setBookmarks(getBookmarks())
  }

  const handleCompleted = (topicId: string) => {
    markCompleted(topicId)
    const c = getCompleted()
    setCompleted(c)
    if (c.size === 1 && unlockAchievement('ilk-adim')) showAchievementToast('İlk Adım')
    if (BLOK1_IDS.every(id => c.has(id)) && unlockAchievement('blok1-tam')) showAchievementToast('Novgorod Gezgini')
  }

  const handleWrong = (topicId: string, qIdx: number) => {
    addWrongAnswer(topicId, qIdx); setWrongAnswers(getWrongAnswers())
  }

  const handleClearWrong = (topicId: string, qIdx: number) => {
    clearWrongAnswer(topicId, qIdx)
    const newList = getWrongAnswers()
    setWrongAnswers(newList)
    if (newList.length === 0 && wrongAnswers.length > 0) {
      flagHataCleared()
      if (unlockAchievement('hata-avci')) showAchievementToast('Hata Avcısı')
    }
  }

  const visibleBlocks = showFavOnly
    ? grammarBlocks.map(b => ({ ...b, topics: b.topics.filter(t => bookmarks.has(t.id)) })).filter(b => b.topics.length > 0)
    : grammarBlocks

  // Next topic navigation
  const currentTopicIdx = ALL_TOPICS.findIndex(t => t.id === activeTopic.id)
  const nextTopic = currentTopicIdx < ALL_TOPICS.length - 1 ? ALL_TOPICS[currentTopicIdx + 1] : null
  const nextTopicBlock = nextTopic ? grammarBlocks.find(b => b.topics.some(t => t.id === nextTopic.id)) : null

  const sidebarProps = {
    openBlock, activeTopic, view, showFavOnly, visibleBlocks,
    bookmarks, completed, wrongCount: wrongAnswers.length,
    onToggle: toggleBlock, onSelect: selectTopic,
    onBookmarkToggle: handleBookmarkToggle,
    onFavToggle: () => setShowFavOnly(v => !v),
    onHata: () => { setView('hata'); setMobileMenuOpen(false) },
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-30 flex items-center gap-3 px-4 sm:px-6 py-3
        bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <BackButton />
        <div className="flex-1 min-w-0">
          <p className="text-[9px] text-slate-600 uppercase tracking-widest hidden sm:block">Kütüphane</p>
          <p className="text-sm font-bold text-white leading-tight truncate">Dilbilgisi Konuları</p>
        </div>
        {/* Zen mode — desktop only */}
        <button
          onClick={toggleZen}
          title={zenMode ? 'Zen modunu kapat' : 'Zen modunu aç'}
          className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl
            bg-white/5 border border-white/8 hover:bg-white/10 transition-colors min-h-[40px]
            text-xs font-medium"
        >
          {zenMode
            ? <><Eye size={14} className="text-violet-400" /><span className="text-violet-400">Çık</span></>
            : <><EyeOff size={14} className="text-slate-500" /><span className="text-slate-500">Odak</span></>
          }
        </button>
        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl
            bg-white/5 border border-white/8 text-slate-400 text-xs font-medium
            hover:bg-white/10 transition-colors min-h-[44px]"
          onClick={() => setMobileMenuOpen(v => !v)}
        >
          {mobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
          <span className="max-w-[100px] truncate">{activeTopic.number} {activeTopic.title}</span>
          {mobileMenuOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
      </header>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-20 top-[57px] bg-slate-950/95 backdrop-blur-xl overflow-y-auto border-b border-white/5">
          <SidebarContent {...sidebarProps} mobile />
        </div>
      )}

      {/* Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar — slides away in zen mode */}
        <aside
          className={`hidden md:flex flex-col shrink-0 border-r border-white/5
            bg-slate-950/50 backdrop-blur-xl overflow-hidden sticky top-[57px] h-[calc(100vh-57px)]
            transition-all duration-300 ease-in-out
            ${zenMode ? 'w-0 opacity-0 pointer-events-none' : 'w-64 opacity-100'}`}
        >
          <SidebarContent {...sidebarProps} />
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-10 py-8">
          <div className="max-w-3xl mx-auto">
            {view === 'hata'
              ? <HataKutusuView wrongAnswers={wrongAnswers} onClear={handleClearWrong} />
              : <>
                  <TopicContent
                    key={activeTopic.id}
                    topic={activeTopic}
                    isBookmarked={bookmarks.has(activeTopic.id)}
                    onBookmarkToggle={() => handleBookmarkToggle(activeTopic.id)}
                  />

                  {/* ── Navigation bar ───────────────────────────── */}
                  <div className="mt-10 mb-4">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-8" />
                    <div className="flex flex-col sm:flex-row gap-3">
                      {/* Play game button */}
                      <Link
                        href={`/grammar/game?topic=${activeTopic.number}`}
                        className="group flex-1 flex items-center justify-center gap-3
                          py-4 sm:py-5 px-6 rounded-2xl min-h-[64px]
                          bg-gradient-to-r from-violet-600/20 to-indigo-600/15
                          border border-violet-500/40 hover:border-violet-500/70
                          hover:shadow-[0_0_36px_rgba(139,92,246,0.22)]
                          transition-all duration-300 active:scale-[0.98]"
                      >
                        <Gamepad2 size={20} className="text-violet-400 shrink-0 group-hover:scale-110 transition-transform" />
                        <div className="text-left">
                          <p className="text-[10px] text-violet-500/60 uppercase tracking-widest font-semibold">Pratik</p>
                          <p className="text-sm font-black text-white leading-tight">Bu Konunun Oyununu Oyna</p>
                        </div>
                      </Link>

                      {/* Next topic button */}
                      {nextTopic && nextTopicBlock ? (
                        <button
                          onClick={() => selectTopic(nextTopic, nextTopicBlock.id)}
                          className="group flex-1 flex items-center justify-between gap-3
                            py-4 sm:py-5 px-6 rounded-2xl min-h-[64px]
                            bg-white/3 border border-white/8
                            hover:bg-white/6 hover:border-white/15
                            transition-all duration-200 active:scale-[0.98] text-left"
                        >
                          <div className="min-w-0">
                            <p className="text-[10px] text-slate-600 uppercase tracking-widest font-semibold">Sonraki Konu</p>
                            <p className="text-sm font-semibold text-slate-300 leading-tight truncate">{nextTopic.title}</p>
                          </div>
                          <ChevronRight size={16} className="text-slate-600 group-hover:text-slate-400 shrink-0 transition-colors" />
                        </button>
                      ) : (
                        <div className="flex-1 flex items-center justify-center py-4 px-6 rounded-2xl
                          bg-white/2 border border-white/5 text-center min-h-[64px]">
                          <p className="text-xs text-slate-700">Tüm konuları bitirdin! 🎉</p>
                        </div>
                      )}
                    </div>
                  </div>
                </>
            }
          </div>
        </main>
      </div>

      {/* Achievement toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in
          px-5 py-3 rounded-2xl bg-violet-950/95 border border-violet-500/50
          backdrop-blur-xl shadow-2xl text-white text-sm font-medium whitespace-nowrap">
          {toast}
        </div>
      )}
    </div>
  )
}

/* ── Sidebar content ──────────────────────────────────────────── */
type SidebarProps = {
  openBlock: string; activeTopic: Topic; view: 'topic' | 'hata'
  showFavOnly: boolean; visibleBlocks: Block[]; bookmarks: Set<string>
  completed: Set<string>; wrongCount: number
  onToggle: (id: string) => void; onSelect: (t: Topic, b: string) => void
  onBookmarkToggle: (id: string) => void; onFavToggle: () => void
  onHata: () => void; mobile?: boolean
}

function SidebarContent({
  openBlock, activeTopic, view, showFavOnly, visibleBlocks,
  bookmarks, completed, wrongCount,
  onToggle, onSelect, onBookmarkToggle, onFavToggle, onHata, mobile,
}: SidebarProps) {
  return (
    <div>
      <div className={`${mobile ? 'px-5' : 'px-3'} pt-3 pb-2 flex flex-col gap-1`}>
        <button onClick={onFavToggle}
          className={`w-full flex items-center gap-2 py-2 px-3 rounded-xl text-xs font-medium transition-all min-h-[40px]
            ${showFavOnly ? 'bg-yellow-500/15 text-yellow-300 border border-yellow-500/25' : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'}`}>
          <Star size={12} className={showFavOnly ? 'fill-yellow-400 text-yellow-400' : ''} />
          Favorilerim
          {bookmarks.size > 0 && <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 font-bold">{bookmarks.size}</span>}
        </button>
        <button onClick={onHata}
          className={`w-full flex items-center gap-2 py-2 px-3 rounded-xl text-xs font-medium transition-all min-h-[40px]
            ${view === 'hata' ? 'bg-red-500/15 text-red-300 border border-red-500/25' : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'}`}>
          <AlertCircle size={12} />
          Hata Kutusu
          {wrongCount > 0 && <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-400 font-bold">{wrongCount}</span>}
        </button>
      </div>
      <div className="h-px bg-white/5 mx-4 mb-1" />
      <nav className="py-1">
        {visibleBlocks.map(block => {
          const done = block.topics.filter(t => completed.has(t.id)).length
          const pct = block.topics.length > 0 ? Math.round((done / block.topics.length) * 100) : 0
          return (
            <BlockAccordion key={block.id} block={block} isOpen={openBlock === block.id}
              activeTopic={activeTopic} bookmarks={bookmarks} progressPct={pct}
              mobile={!!mobile} onToggle={() => onToggle(block.id)}
              onSelect={t => onSelect(t, block.id)} onBookmarkToggle={onBookmarkToggle} />
          )
        })}
        {visibleBlocks.length === 0 && <p className="text-center text-slate-600 text-xs py-8">Henüz favori yok ⭐</p>}
      </nav>
    </div>
  )
}

/* ── Block accordion ──────────────────────────────────────────── */
function BlockAccordion({ block, isOpen, activeTopic, bookmarks, progressPct, mobile, onToggle, onSelect, onBookmarkToggle }: {
  block: Block; isOpen: boolean; activeTopic: Topic; bookmarks: Set<string>
  progressPct: number; mobile: boolean; onToggle: () => void
  onSelect: (t: Topic) => void; onBookmarkToggle: (id: string) => void
}) {
  return (
    <div className="border-b border-white/5 last:border-0">
      <button onClick={onToggle}
        className={`w-full flex items-center justify-between text-left hover:bg-white/4 transition-colors group
          ${mobile ? 'px-5 py-4' : 'px-4 py-3'}`}>
        <div className="flex-1 min-w-0 pr-2">
          <span className="text-[9px] text-violet-500 uppercase tracking-widest font-semibold">{block.level}</span>
          <p className={`font-semibold text-slate-300 group-hover:text-white transition-colors mt-0.5 ${mobile ? 'text-sm' : 'text-xs'}`}>
            {block.title}
          </p>
          {progressPct > 0 && (
            <div className="mt-2 h-[2px] bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full transition-all duration-700" style={{ width: `${progressPct}%` }} />
            </div>
          )}
        </div>
        <ChevronDown size={mobile ? 14 : 12}
          className={`text-slate-600 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className={mobile ? 'pb-2 px-2' : 'pb-1'}>
          {block.topics.map(topic => {
            const isActive = activeTopic.id === topic.id
            const isBookmarked = bookmarks.has(topic.id)
            return (
              <div key={topic.id} className="relative flex items-center">
                <button onClick={() => onSelect(topic)}
                  className={`flex-1 text-left flex items-center gap-2.5 transition-all pr-8
                    ${mobile
                      ? `px-4 py-3 rounded-xl mb-1 min-h-[48px] ${isActive ? 'glow-border' : 'hover:bg-white/5'}`
                      : `px-4 py-2 ${isActive ? 'bg-violet-600/15 border-r-2 border-violet-500' : 'hover:bg-white/4'}`
                    }`}>
                  <span className={`text-[10px] font-mono shrink-0 ${isActive ? 'text-violet-400' : 'text-slate-600'}`}>{topic.number}</span>
                  <span className={`leading-snug ${mobile ? 'text-sm' : 'text-xs'} ${isActive ? 'text-white font-medium' : 'text-slate-500'}`}>{topic.title}</span>
                  {isActive && !mobile && <ChevronRight size={10} className="text-violet-400 ml-auto shrink-0" />}
                </button>
                <button onClick={e => { e.stopPropagation(); onBookmarkToggle(topic.id) }}
                  className="absolute right-2 p-1.5 transition-colors" aria-label="Favori">
                  <Star size={10} className={isBookmarked ? 'fill-yellow-400 text-yellow-400' : 'text-slate-700 hover:text-yellow-500'} />
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

/* ── Russian cell with tooltip ───────────────────────────────── */
function RussianCell({ text, note }: { text: string; note?: string }) {
  const [open, setOpen] = useState(false)
  if (!note) return <span className="font-semibold text-slate-100">{text}</span>
  return (
    <span className="relative inline-flex items-center"
      onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen(v => !v)}>
      <span className="font-semibold text-slate-100 border-b border-dashed border-slate-600/50 cursor-help">{text}</span>
      {open && (
        <span className="absolute bottom-full left-0 mb-2 z-50 block pointer-events-none
          px-2.5 py-1.5 rounded-lg text-[11px] text-slate-200 leading-snug
          bg-slate-900/95 border border-violet-500/25 backdrop-blur-xl shadow-2xl
          max-w-[220px] whitespace-normal animate-fade-in">
          {note}
        </span>
      )}
    </span>
  )
}

/* ── Flash card ──────────────────────────────────────────────── */
function FlashCard({ example }: { example: Example }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <div className="relative h-36 sm:h-40 cursor-pointer select-none" style={{ perspective: '1000px' }}
      onClick={() => setFlipped(v => !v)}>
      <div className="w-full h-full transition-transform duration-500 relative"
        style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'none' }}>
        {/* Front — Russian */}
        <div className="absolute inset-0 bg-white/6 border border-white/10 rounded-2xl
          flex flex-col items-center justify-center p-4 gap-2"
          style={{ backfaceVisibility: 'hidden' }}>
          <p className="text-xl font-bold text-white text-center">{example.russian}</p>
          {example.note && <p className="text-[10px] text-slate-600 text-center">{example.note}</p>}
          <p className="text-[9px] text-slate-700 mt-1">tıkla →</p>
        </div>
        {/* Back — Turkish + association */}
        <div className="absolute inset-0 bg-violet-600/8 border border-violet-500/20 rounded-2xl
          flex flex-col items-center justify-center p-4 gap-2"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
          <p className="text-lg font-semibold text-violet-200 text-center">{example.turkish}</p>
          {example.association && (
            <div className="mt-1 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 max-w-full">
              <p className="text-[11px] text-amber-300 text-center leading-snug">{example.association}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Examples section (table / cards toggle) ─────────────────── */
function ExamplesSection({ examples }: { examples: Example[] }) {
  const [mode, setMode] = useState<'table' | 'cards'>('table')
  return (
    <div className="bg-white/4 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden">
      <div className="px-5 sm:px-6 py-3.5 border-b border-white/5 flex items-center justify-between gap-3">
        <p className="text-[10px] text-slate-600 uppercase tracking-widest font-semibold shrink-0">
          🇷🇺 Örnekler
          <span className="ml-2 text-slate-700 normal-case tracking-normal font-normal hidden sm:inline">
            (tıkla → ipucu)
          </span>
        </p>
        <div className="flex items-center gap-0.5 bg-white/5 rounded-lg p-1 shrink-0">
          <button onClick={() => setMode('table')}
            className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium transition-all
              ${mode === 'table' ? 'bg-white/10 text-white' : 'text-slate-600 hover:text-slate-400'}`}>
            <Table2 size={10} /> Tablo
          </button>
          <button onClick={() => setMode('cards')}
            className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium transition-all
              ${mode === 'cards' ? 'bg-white/10 text-white' : 'text-slate-600 hover:text-slate-400'}`}>
            <LayoutGrid size={10} /> Kartlar
          </button>
        </div>
      </div>

      {mode === 'table' ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ minWidth: '300px' }}>
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-5 sm:px-6 py-3 text-[10px] text-slate-600 uppercase tracking-widest font-semibold w-[50%]">Rusça</th>
                <th className="text-left px-4 py-3 text-[10px] text-slate-600 uppercase tracking-widest font-semibold">Türkçe</th>
              </tr>
            </thead>
            <tbody>
              {examples.map((ex, i) => (
                <tr key={i} className="border-b border-white/4 last:border-0 hover:bg-white/3 transition-colors">
                  <td className="px-5 sm:px-6 py-3 align-top">
                    <RussianCell text={ex.russian} note={ex.note} />
                    {ex.association && (
                      <div className="mt-1.5 inline-flex items-start gap-1.5 px-2.5 py-1 rounded-lg
                        bg-amber-500/8 border border-amber-500/15 max-w-full">
                        <span className="text-[10px] text-amber-400 leading-snug">{ex.association}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-400 align-top text-sm">{ex.turkish}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4">
          {examples.map((ex, i) => <FlashCard key={i} example={ex} />)}
        </div>
      )}
    </div>
  )
}

/* ── Motion verbs interactive block ─────────────────────────── */
const MOTION_TABS = [
  {
    key: 'tekyön',
    label: 'Tek Yön',
    subtitle: 'идти · ехать',
    badge: '→ belirli yön',
    desc: 'Şu an, tek bir yöne doğru hareket',
    badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/25',
    pairs: [
      { icon: '🚶', label: 'Yaya', verb: 'идти', conj: 'иду · идёшь · идёт · идём · идут', example: 'Я иду в школу.' },
      { icon: '🚗', label: 'Araçla', verb: 'ехать', conj: 'еду · едешь · едет · едем · едут', example: 'Я еду в Москву.' },
    ],
    arrow: '→',
    arrowColor: 'text-cyan-400',
  },
  {
    key: 'ciftyön',
    label: 'Çift Yön',
    subtitle: 'ходить · ездить',
    badge: '↔ alışkanlık',
    desc: 'Alışkanlık, gidip gelme veya genel hareket',
    badgeColor: 'text-violet-400 bg-violet-500/10 border-violet-500/25',
    pairs: [
      { icon: '🚶', label: 'Yaya', verb: 'ходить', conj: 'хожу · ходишь · ходит · ходим · ходят', example: 'Я хожу в школу каждый день.' },
      { icon: '🚗', label: 'Araçla', verb: 'ездить', conj: 'езжу · ездишь · ездит · ездим · ездят', example: 'Он ездит на работу.' },
    ],
    arrow: '↔',
    arrowColor: 'text-violet-400',
  },
  {
    key: 'ulasim',
    label: 'Ulaşım Türü',
    subtitle: 'Yürüyerek vs. Araçla',
    badge: '≠ araç tipi',
    desc: 'Hareket türüne göre doğru fiil grubunu seç',
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
    pairs: [
      { icon: '👣', label: 'Yürüyerek', verb: 'идти / ходить', conj: 'пешком (yürüyerek)', example: 'Я иду пешком.' },
      { icon: '🚌', label: 'Araç ile', verb: 'ехать / ездить', conj: 'на автобусе / на машине', example: 'Я еду на автобусе.' },
    ],
    arrow: '≠',
    arrowColor: 'text-emerald-400',
  },
]

function MotionVerbsBlock() {
  const [activeTab, setActiveTab] = useState(0)
  const tab = MOTION_TABS[activeTab]

  return (
    <div className="bg-white/4 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden mb-5">
      <div className="px-5 sm:px-6 py-4 border-b border-white/5">
        <p className="text-[10px] text-slate-600 uppercase tracking-widest font-semibold">
          🔄 İnteraktif Hareket Fiilleri
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/5">
        {MOTION_TABS.map((t, i) => (
          <button key={t.key} onClick={() => setActiveTab(i)}
            className={`flex-1 py-3 px-2 text-[10px] sm:text-xs font-semibold transition-all border-b-2
              ${i === activeTab ? 'border-violet-500 text-white bg-white/4' : 'border-transparent text-slate-600 hover:text-slate-400 hover:bg-white/3'}`}>
            <span className="block">{t.label}</span>
            <span className={`text-[9px] font-normal ${i === activeTab ? 'text-slate-400' : 'text-slate-700'}`}>{t.subtitle}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-5 animate-fade-in">
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${tab.badgeColor}`}>{tab.badge}</span>
          <p className="text-slate-500 text-xs">{tab.desc}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {tab.pairs.map((pair, i) => (
            <div key={i} className="bg-white/4 border border-white/8 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{pair.icon}</span>
                <span className="text-[10px] text-slate-600 font-medium uppercase tracking-wide">{pair.label}</span>
              </div>
              <p className={`text-2xl font-black mb-1 ${tab.arrowColor}`}>
                {tab.arrow} <span className="text-white">{pair.verb}</span>
              </p>
              <p className="text-[10px] text-slate-600 font-mono mb-3 leading-relaxed">{pair.conj}</p>
              <div className="bg-slate-900/60 rounded-lg px-3 py-2 border border-white/5">
                <p className="text-xs text-slate-300 font-medium">{pair.example}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Stress question ─────────────────────────────────────────── */
function StressQuestion({ q, onCorrect, onWrong }: {
  q: QuizQuestion; onCorrect: () => void; onWrong: () => void
}) {
  const [selected, setSelected] = useState<number | null>(null)
  const word = q.stressWord || q.question
  const chars = [...word]
  const vowelPositions = chars.map((ch, i) => RUSSIAN_VOWELS.has(ch) ? i : -1).filter(i => i !== -1)
  const correctCharIdx = vowelPositions[q.correct]

  return (
    <div>
      <p className="text-slate-500 text-[11px] mb-3 text-center">
        Vurgulu sesli harfi bul — tıkla:
      </p>
      <div className="flex flex-wrap gap-0.5 justify-center text-3xl font-black mb-4">
        {chars.map((ch, i) => {
          const vIdx = vowelPositions.indexOf(i)
          if (vIdx === -1) return <span key={i} className="text-white">{ch}</span>
          let cls = 'px-1 rounded transition-all border border-transparent cursor-pointer'
          if (selected === null) {
            cls += ' text-violet-300 hover:bg-violet-500/20 hover:border-violet-500/40'
          } else if (i === correctCharIdx) {
            cls += ' text-cyan-400 border-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.7)]'
          } else if (vIdx === selected) {
            cls += ' text-red-400 border-red-500/50'
          } else {
            cls += ' text-slate-600 cursor-default'
          }
          return (
            <button key={i} className={cls} disabled={selected !== null}
              onClick={() => {
                setSelected(vIdx)
                if (vIdx === q.correct) { playSound('correct'); onCorrect() }
                else { playSound('wrong'); onWrong() }
              }}>
              {ch}
            </button>
          )
        })}
      </div>
      {selected !== null && (
        <p className={`text-center text-xs font-medium animate-fade-in ${selected === q.correct ? 'text-cyan-400' : 'text-red-400'}`}>
          {selected === q.correct
            ? `✓ Doğru! Vurgu "${chars[correctCharIdx]}" harfine düşüyor.`
            : `✗ Vurgu "${chars[correctCharIdx]}" harfine düşüyor — tekrar bak!`}
        </p>
      )}
    </div>
  )
}

/* ── Ending constructor question ─────────────────────────────── */
function EndingQuestion({ q, onCorrect, onWrong }: {
  q: QuizQuestion; onCorrect: () => void; onWrong: () => void
}) {
  const [selected, setSelected] = useState<number | null>(null)
  const parts = q.question.split('[...]')
  const before = parts[0] ?? q.question
  const after = parts[1] ?? ''
  const selectedEnding = selected !== null ? q.options[selected] : null

  return (
    <div>
      <p className="text-slate-500 text-[11px] mb-3 text-center">Doğru eki seç:</p>
      <p className="text-xl text-center font-bold text-white mb-5 leading-relaxed">
        {before}
        <span className={`inline-block min-w-[44px] px-2 py-0.5 mx-0.5 rounded-lg border text-center transition-all
          ${selected === null ? 'border-dashed border-slate-600 text-slate-600'
            : selected === q.correct ? 'border-green-500 bg-green-500/10 text-green-300'
            : 'border-red-500 bg-red-500/8 text-red-300'}`}>
          {selectedEnding ?? '…'}
        </span>
        {after}
      </p>
      <div className="flex flex-wrap gap-2 justify-center">
        {q.options.map((opt, idx) => {
          let cls = 'px-5 py-2 rounded-xl border text-sm font-mono font-bold transition-all min-h-[40px]'
          if (selected !== null) {
            if (idx === q.correct) cls += ' border-green-500/60 bg-green-500/10 text-green-300'
            else if (idx === selected) cls += ' border-red-500/50 bg-red-500/8 text-red-300'
            else cls += ' border-white/5 text-slate-700'
          } else {
            cls += ' border-violet-500/30 bg-violet-500/5 text-violet-300 hover:bg-violet-500/15 cursor-pointer'
          }
          return (
            <button key={idx} className={cls} disabled={selected !== null}
              onClick={() => {
                setSelected(idx)
                if (idx === q.correct) { playSound('correct'); onCorrect() }
                else { playSound('wrong'); onWrong() }
              }}>
              {opt}
            </button>
          )
        })}
      </div>
      {selected !== null && (
        <p className={`mt-3 text-center text-xs font-medium animate-fade-in ${selected === q.correct ? 'text-green-400' : 'text-red-400'}`}>
          {selected === q.correct ? '✓ Doğru ek!' : `✗ Doğru ek: ${q.options[q.correct]}`}
        </p>
      )}
    </div>
  )
}

/* ── Quiz block ──────────────────────────────────────────────── */
function QuizBlock({ topic, onCompleted, onWrong }: {
  topic: Topic; onCompleted: (id: string) => void; onWrong: (id: string, qIdx: number) => void
}) {
  const [currentQ, setCurrentQ] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  if (!topic.quiz || topic.quiz.length === 0) return null
  const q = topic.quiz[currentQ]

  const handleCorrect = () => { setAnswered(true); setScore(s => s + 1) }
  const handleWrong = () => { setAnswered(true); onWrong(topic.id, currentQ) }

  const handleSelectMC = (idx: number) => {
    if (selected !== null) return
    setSelected(idx)
    const correct = idx === q.correct
    playSound(correct ? 'correct' : 'wrong')
    if (correct) handleCorrect(); else handleWrong()
  }

  const handleNext = () => {
    if (currentQ + 1 >= topic.quiz!.length) { setDone(true); onCompleted(topic.id) }
    else { setCurrentQ(c => c + 1); setSelected(null); setAnswered(false) }
  }

  const handleReset = () => { setCurrentQ(0); setSelected(null); setAnswered(false); setScore(0); setDone(false) }

  return (
    <div className="mt-6 bg-white/4 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden">
      <div className="px-5 sm:px-6 py-4 border-b border-white/5 flex items-center justify-between">
        <p className="text-[10px] text-slate-600 uppercase tracking-widest font-semibold">
          {q.type === 'stress' ? '🎯 Vurgu Ustası' : q.type === 'ending' ? '✏️ Ek Sihirbazı' : '🧠 Kendini Test Et'}
        </p>
        {!done && <span className="text-[10px] text-slate-600">{currentQ + 1} / {topic.quiz.length}</span>}
      </div>

      <div className="p-5 sm:p-6">
        {done ? (
          <div className="text-center py-4 animate-fade-in">
            <div className="text-3xl mb-3">{score === topic.quiz.length ? '🎉' : '✅'}</div>
            <p className="text-white font-bold text-lg mb-1">{score === topic.quiz.length ? 'Mükemmel!' : 'Tebrikler!'}</p>
            <p className="text-violet-400 text-xs mb-5">{score} / {topic.quiz.length} doğru</p>
            <button onClick={handleReset}
              className="flex items-center gap-2 mx-auto px-4 py-2 rounded-xl
                bg-white/5 hover:bg-white/10 border border-white/8 hover:border-white/15
                text-slate-300 text-xs font-medium transition-all">
              <RotateCcw size={12} /> Tekrar Dene
            </button>
          </div>
        ) : (
          <div key={currentQ} className="animate-fade-in">
            {/* Question body by type */}
            {q.type === 'stress' ? (
              <StressQuestion q={q}
                onCorrect={() => { handleCorrect(); setTimeout(handleNext, 900) }}
                onWrong={() => { handleWrong() }} />
            ) : q.type === 'ending' ? (
              <EndingQuestion q={q}
                onCorrect={() => { handleCorrect(); setTimeout(handleNext, 900) }}
                onWrong={() => { handleWrong() }} />
            ) : (
              <>
                <p className="text-slate-200 text-sm font-medium mb-4 leading-relaxed">{q.question}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {q.options.map((opt, idx) => {
                    let cls = 'border border-white/8 text-slate-300 hover:bg-white/8 hover:border-white/15'
                    if (selected !== null) {
                      if (idx === q.correct) cls = 'border border-green-500/60 bg-green-500/10 text-green-300'
                      else if (idx === selected) cls = 'border border-red-500/50 bg-red-500/8 text-red-300'
                      else cls = 'border border-white/5 text-slate-600'
                    }
                    return (
                      <button key={idx} onClick={() => handleSelectMC(idx)} disabled={selected !== null}
                        className={`text-left px-4 py-3 rounded-xl text-xs leading-snug transition-all min-h-[44px] ${cls}`}>
                        {opt}
                      </button>
                    )
                  })}
                </div>
              </>
            )}

            {/* Next button for non-auto-advance types */}
            {answered && !q.type && (
              <div className="flex items-center justify-between animate-fade-in">
                <span className={`text-xs font-medium ${selected === q.correct ? 'text-green-400' : 'text-red-400'}`}>
                  {selected === q.correct ? '✓ Doğru!' : '✗ Yanlış'}
                </span>
                <button onClick={handleNext}
                  className="px-4 py-2 rounded-xl bg-violet-600/20 hover:bg-violet-600/30
                    border border-violet-500/30 text-violet-300 text-xs font-medium transition-all min-h-[36px]">
                  {currentQ + 1 >= topic.quiz!.length ? 'Bitir' : 'Sonraki →'}
                </button>
              </div>
            )}
            {/* Next for wrong stress/ending answers */}
            {answered && q.type && (
              <div className="mt-4 flex justify-end animate-fade-in">
                <button onClick={handleNext}
                  className="px-4 py-2 rounded-xl bg-violet-600/20 hover:bg-violet-600/30
                    border border-violet-500/30 text-violet-300 text-xs font-medium transition-all">
                  {currentQ + 1 >= topic.quiz!.length ? 'Bitir' : 'Sonraki →'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Topic content ───────────────────────────────────────────── */
function TopicContent({ topic, isBookmarked, onBookmarkToggle }: {
  topic: Topic; isBookmarked: boolean; onBookmarkToggle: () => void
}) {
  return (
    <div className="animate-fade-in">
      {/* Title row */}
      <div className="mb-7 flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <span className="text-[10px] text-violet-400 uppercase tracking-widest font-semibold">{topic.number}</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 leading-tight">{topic.title}</h2>
        </div>
        <button onClick={onBookmarkToggle} className="p-2 rounded-xl hover:bg-white/5 transition-colors mt-1 shrink-0" aria-label="Favori">
          <Star size={16} className={isBookmarked ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600 hover:text-yellow-400'} />
        </button>
      </div>

      {/* Explanation */}
      <SpotlightCard className="bg-white/4 backdrop-blur-xl border border-white/5 rounded-2xl p-5 sm:p-6 mb-5">
        <p className="text-[10px] text-slate-600 uppercase tracking-widest mb-4 font-semibold">📖 Açıklama</p>
        <ExplanationRenderer text={topic.explanation} />
      </SpotlightCard>

      {/* Special component (motion verbs) */}
      {topic.specialComponent === 'motionVerbs' && <MotionVerbsBlock />}

      {/* Examples */}
      <ExamplesSection examples={topic.examples} />
    </div>
  )
}

/* ── Hata Kutusu view ────────────────────────────────────────── */

function HataKutusuView({ wrongAnswers, onClear }: {
  wrongAnswers: WrongAnswer[]; onClear: (topicId: string, qIdx: number) => void
}) {
  const cards = wrongAnswers
    .map(w => {
      const topic = ALL_TOPICS.find(t => t.id === w.topicId)
      const question = topic?.quiz?.[w.qIdx]
      if (!topic || !question) return null
      return { topicId: w.topicId, qIdx: w.qIdx, topic, question }
    })
    .filter(Boolean) as Array<{ topicId: string; qIdx: number; topic: Topic; question: QuizQuestion }>

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
        <div className="text-5xl mb-5">🎉</div>
        <h2 className="text-2xl font-black text-white mb-2">Harika!</h2>
        <p className="text-slate-500 text-sm">Hiç hata yok. Devam et!</p>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-7">
        <span className="text-[10px] text-red-400 uppercase tracking-widest font-semibold">Hata Kutusu</span>
        <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Hataları Gider</h2>
        <p className="text-slate-500 text-sm mt-1">{cards.length} soru seni bekliyor</p>
      </div>
      <div className="space-y-4">
        {cards.map(card => (
          <HataQuizCard key={`${card.topicId}-${card.qIdx}`} card={card}
            onClear={() => onClear(card.topicId, card.qIdx)} />
        ))}
      </div>
    </div>
  )
}

function HataQuizCard({ card, onClear }: {
  card: { topic: Topic; question: QuizQuestion; topicId: string; qIdx: number }; onClear: () => void
}) {
  const [selected, setSelected] = useState<number | null>(null)
  const [cleared, setCleared] = useState(false)
  if (cleared) return null
  const isCorrect = selected === card.question.correct

  const handleSelect = (idx: number) => {
    if (selected !== null) return
    setSelected(idx)
    const correct = idx === card.question.correct
    playSound(correct ? 'correct' : 'wrong')
    if (correct) setTimeout(() => { setCleared(true); onClear() }, 700)
  }

  return (
    <div className="bg-white/4 border border-white/5 rounded-2xl overflow-hidden animate-fade-in">
      <div className="px-5 py-3 border-b border-white/5 flex items-center gap-2">
        <span className="text-[10px] text-violet-400 font-mono">{card.topic.number}</span>
        <span className="text-[10px] text-slate-600">{card.topic.title}</span>
      </div>
      <div className="p-5">
        {card.question.type === 'stress' ? (
          <StressQuestion q={card.question}
            onCorrect={() => setTimeout(() => { setCleared(true); onClear() }, 700)}
            onWrong={() => {}} />
        ) : card.question.type === 'ending' ? (
          <EndingQuestion q={card.question}
            onCorrect={() => setTimeout(() => { setCleared(true); onClear() }, 700)}
            onWrong={() => {}} />
        ) : (
          <>
            <p className="text-slate-200 text-sm font-medium mb-4 leading-relaxed">{card.question.question}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {card.question.options.map((opt, idx) => {
                let cls = 'border border-white/8 text-slate-300 hover:bg-white/8'
                if (selected !== null) {
                  if (idx === card.question.correct) cls = 'border border-green-500/60 bg-green-500/10 text-green-300'
                  else if (idx === selected) cls = 'border border-red-500/50 bg-red-500/8 text-red-300'
                  else cls = 'border border-white/5 text-slate-600'
                }
                return (
                  <button key={idx} onClick={() => handleSelect(idx)} disabled={selected !== null}
                    className={`text-left px-4 py-3 rounded-xl text-xs transition-all min-h-[44px] ${cls}`}>
                    {opt}
                  </button>
                )
              })}
            </div>
            {selected !== null && (
              <p className={`mt-3 text-xs font-medium animate-fade-in ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {isCorrect ? '✓ Doğru! Listeden kaldırılıyor...' : '✗ Yanlış. Tekrar dene!'}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}

/* ── Explanation renderer ─────────────────────────────────────── */
function ExplanationRenderer({ text }: { text: string }) {
  return (
    <div className="space-y-1.5">
      {text.split('\n').map((line, i) => {
        if (line.trim() === '') return <div key={i} className="h-2" />
        const parts = line.split(/(\*\*.*?\*\*)/)
        return (
          <p key={i} className="text-slate-400 text-sm leading-relaxed">
            {parts.map((part, j) =>
              part.startsWith('**') && part.endsWith('**')
                ? <strong key={j} className="text-violet-300 font-semibold">{part.slice(2, -2)}</strong>
                : <span key={j}>{part}</span>
            )}
          </p>
        )
      })}
    </div>
  )
}
