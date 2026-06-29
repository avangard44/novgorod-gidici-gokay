'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowLeftRight, Sparkles, BookOpen, Loader2, ChevronLeft, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import SpotlightCard from '@/app/components/SpotlightCard'

/* ── Types ───────────────────────────────────────────────────── */
type Direction = 'tr-ru' | 'ru-tr'

type WordAnalysis = {
  original: string
  translated: string
  pos: string
  analysis: string
  libraryRef: string
}

type TranslateResult = {
  translatedText: string
  words: WordAnalysis[]
}

/* ── POS badge colors ────────────────────────────────────────── */
const POS_COLOR: Record<string, string> = {
  isim:              'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  'существительное': 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  fiil:              'bg-violet-500/15 text-violet-400 border-violet-500/30',
  'глагол':          'bg-violet-500/15 text-violet-400 border-violet-500/30',
  sıfat:             'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  'прилагательное':  'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  zamir:             'bg-orange-500/15 text-orange-400 border-orange-500/30',
  'местоимение':     'bg-orange-500/15 text-orange-400 border-orange-500/30',
  zarf:              'bg-pink-500/15 text-pink-400 border-pink-500/30',
  'наречие':         'bg-pink-500/15 text-pink-400 border-pink-500/30',
  edat:              'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  'предлог':         'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  bağlaç:            'bg-slate-500/15 text-slate-400 border-slate-500/30',
  'союз':            'bg-slate-500/15 text-slate-400 border-slate-500/30',
}

function posColor(pos: string): string {
  const key = pos.toLowerCase().split(/[,\/]/)[0].trim()
  return POS_COLOR[key] ?? 'bg-white/8 text-slate-400 border-white/15'
}

/* ── Shimmer skeleton ────────────────────────────────────────── */
function ShimmerBlock({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return <div className={`shimmer ${className ?? ''}`} style={style} />
}

function AnalysisSkeleton() {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex gap-3 items-center">
        <ShimmerBlock className="h-10 w-32" />
        <ShimmerBlock className="h-6 w-20" />
      </div>
      <ShimmerBlock className="h-4 w-3/4" />
      <ShimmerBlock className="h-4 w-full" />
      <ShimmerBlock className="h-4 w-5/6" />
      <ShimmerBlock className="h-4 w-2/3" />
      <ShimmerBlock className="h-10 w-40 mt-2" />
    </div>
  )
}

function WordChipSkeleton() {
  const widths = [64, 84, 56, 92, 72, 68, 88, 52, 78, 96, 62, 82, 58, 74]
  return (
    <div className="flex flex-wrap gap-2 p-4">
      {widths.map((w, i) => (
        <ShimmerBlock key={i} className="h-9 rounded-xl" style={{ width: w } as React.CSSProperties} />
      ))}
    </div>
  )
}

/* ── Main page ───────────────────────────────────────────────── */
export default function TranslatorPage() {
  const [inputText, setInputText]   = useState('')
  const [direction, setDirection]   = useState<Direction>('tr-ru')
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState<string | null>(null)
  const [result, setResult]         = useState<TranslateResult | null>(null)
  const [activeWord, setActiveWord] = useState<WordAnalysis | null>(null)
  const [analysisKey, setAnalysisKey] = useState(0) // for re-triggering spring
  const analysisRef = useRef<HTMLDivElement>(null)

  const srcLang = direction === 'tr-ru' ? 'Türkçe' : 'Rusça'
  const tgtLang = direction === 'tr-ru' ? 'Rusça'  : 'Türkçe'

  const handleSwap = () => {
    setDirection(d => d === 'tr-ru' ? 'ru-tr' : 'tr-ru')
    setResult(null)
    setActiveWord(null)
    setError(null)
  }

  const handleTranslate = async () => {
    if (!inputText.trim() || loading) return
    setLoading(true)
    setError(null)
    setResult(null)
    setActiveWord(null)

    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText.trim(), direction }),
      })
      const data = await res.json()
      if (!res.ok || data.error) {
        setError(data.error ?? 'Bilinmeyen hata.')
      } else {
        setResult(data as TranslateResult)
      }
    } catch {
      setError('Sunucuya bağlanılamadı.')
    } finally {
      setLoading(false)
    }
  }

  const handleWordClick = (word: WordAnalysis) => {
    setActiveWord(word)
    setAnalysisKey(k => k + 1)
    setTimeout(() => {
      analysisRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleTranslate()
  }

  const isActive = (word: WordAnalysis) =>
    activeWord?.original === word.original && activeWord?.translated === word.translated

  return (
    <div className="min-h-screen px-4 sm:px-6 py-8">
      <div className="max-w-4xl mx-auto">

        {/* ── Top bar ─────────────────────────────────────────── */}
        <div className="flex items-center gap-3 mb-10">
          <Link href="/"
            className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors
              text-sm font-medium py-2 pr-3 rounded-xl hover:bg-white/5">
            <ChevronLeft size={16} />
            Geri
          </Link>
          <div className="flex-1">
            <p className="text-[10px] text-slate-700 uppercase tracking-[0.35em]">AI Tütör</p>
            <h1 className="text-lg font-black text-white leading-tight">Çevirmen & Gramer Analizi</h1>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-violet-400/60 bg-violet-500/8 border border-violet-500/20 px-3 py-1.5 rounded-xl">
            <Sparkles size={11} />
            Gemini AI
          </div>
        </div>

        {/* ── Translation panels ───────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-start mb-6">

          {/* Input panel */}
          <SpotlightCard className="flex flex-col gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">{srcLang}</span>
            </div>
            <div className="relative">
              <textarea
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={handleKey}
                placeholder={`${srcLang} metnini buraya yaz...`}
                rows={6}
                className="w-full bg-transparent border-none outline-none
                  text-white placeholder:text-slate-600 text-sm leading-relaxed
                  resize-none min-h-[140px]"
              />
              <p className="absolute bottom-1 right-1 text-[10px] text-slate-700 select-none">⌘↵ çevir</p>
            </div>
            <button
              onClick={handleTranslate}
              disabled={!inputText.trim() || loading}
              className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm
                transition-all duration-200 active:scale-[0.98]
                bg-gradient-to-r from-violet-600/25 to-cyan-600/15
                border border-violet-500/40 hover:border-violet-500/60
                hover:shadow-[0_0_36px_rgba(139,92,246,0.25)]
                text-white disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading
                ? <><Loader2 size={16} className="animate-spin" /> Analiz ediliyor...</>
                : <><Sparkles size={16} className="text-violet-400" /> Çevir ve Çözümle</>
              }
            </button>
          </SpotlightCard>

          {/* Swap button */}
          <div className="flex sm:flex-col items-center justify-center py-2 sm:pt-10">
            <button onClick={handleSwap}
              className="p-3 rounded-2xl bg-white/5 border border-white/10
                hover:bg-white/10 hover:border-white/20 transition-all active:scale-95
                text-slate-400 hover:text-white min-h-[48px] min-w-[48px] flex items-center justify-center">
              <ArrowLeftRight size={17} />
            </button>
          </div>

          {/* Output panel */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 px-1">
              <span className="text-xs font-bold text-slate-400">{tgtLang}</span>
              {result && <span className="text-[10px] text-slate-600">· kelimeye tıkla → analiz</span>}
            </div>

            <SpotlightCard className="min-h-[160px] border border-white/10 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl">
              {loading ? (
                <WordChipSkeleton />
              ) : error ? (
                <div className="flex items-start gap-3 p-5 text-red-400">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <p className="text-sm">{error}</p>
                </div>
              ) : result ? (
                <div className="p-4 flex flex-wrap gap-1.5">
                  {result.words.map((word, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleWordClick(word)}
                      className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200
                        min-h-[36px] active:scale-95 leading-tight
                        ${isActive(word)
                          ? 'glow-border text-white'
                          : 'bg-white/5 border border-white/8 text-slate-300 hover:bg-white/10 hover:border-violet-500/30 hover:text-white hover:shadow-[0_0_14px_rgba(139,92,246,0.2)]'
                        }`}
                    >
                      {word.original}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center min-h-[160px]">
                  <p className="text-slate-700 text-sm text-center px-4">Çeviri burada görünecek</p>
                </div>
              )}
            </SpotlightCard>

            {/* Full translated text */}
            {result && (
              <div className="px-4 py-3 bg-white/3 border border-white/6 rounded-xl animate-spring">
                <p className="text-[10px] text-slate-600 uppercase tracking-widest mb-1.5">Tam Çeviri</p>
                <p className="text-sm text-slate-300 leading-relaxed">{result.translatedText}</p>
              </div>
            )}
          </div>
        </div>

        {/* ── Grammar analysis zone ────────────────────────────── */}
        <SpotlightCard
          className="backdrop-blur-xl border border-white/8 rounded-3xl bg-white/4 p-6 sm:p-8 min-h-[220px]"
          color="rgba(139,92,246,0.08)"
        >
          <div ref={analysisRef}>
            <div className="flex items-center gap-2 mb-6">
              <BookOpen size={14} className="text-violet-400" />
              <p className="text-[10px] text-violet-400/70 uppercase tracking-widest font-semibold">Gramer Analiz Alanı</p>
            </div>

            {loading ? (
              <AnalysisSkeleton />
            ) : activeWord ? (
              <div key={analysisKey} className="animate-spring space-y-5">
                {/* Word + POS row */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    {activeWord.original}
                  </span>
                  <span className="text-slate-500 text-lg">→</span>
                  <span className="text-xl font-bold text-cyan-300">{activeWord.translated}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${posColor(activeWord.pos)}`}>
                    {activeWord.pos}
                  </span>
                </div>

                {/* Analysis */}
                <div className="bg-white/4 border border-white/8 rounded-2xl px-5 py-4">
                  <p className="text-[10px] text-slate-600 uppercase tracking-widest mb-3 font-semibold">Gramer Açıklaması</p>
                  <p className="text-slate-300 text-sm leading-relaxed">{activeWord.analysis}</p>
                </div>

                {/* Library link */}
                {activeWord.libraryRef && (
                  <Link
                    href="/library"
                    className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl
                      bg-violet-600/15 border border-violet-500/35
                      hover:bg-violet-600/25 hover:border-violet-500/60
                      hover:shadow-[0_0_28px_rgba(139,92,246,0.25)]
                      transition-all duration-200 active:scale-[0.98] group"
                  >
                    <BookOpen size={14} className="text-violet-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="text-[10px] text-violet-500/60 uppercase tracking-widest font-semibold leading-none mb-0.5">Kütüphanede Oku</p>
                      <p className="text-sm font-bold text-violet-300">{activeWord.libraryRef}</p>
                    </div>
                  </Link>
                )}
              </div>
            ) : result ? (
              <div className="flex flex-col items-center justify-center py-10 text-center animate-fade-in">
                <div className="w-12 h-12 rounded-2xl bg-violet-500/8 border border-violet-500/20
                  flex items-center justify-center mb-4">
                  <BookOpen size={20} className="text-violet-500/50" />
                </div>
                <p className="text-slate-600 text-sm">Üstteki kelimelerden birine tıkla</p>
                <p className="text-slate-700 text-xs mt-1">Gramer analizi burada görünecek</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-12 h-12 rounded-2xl bg-white/4 border border-white/8
                  flex items-center justify-center mb-4">
                  <Sparkles size={20} className="text-slate-600" />
                </div>
                <p className="text-slate-600 text-sm">Metni çevirince kelime analizi burada belirecek</p>
                <p className="text-slate-700 text-xs mt-1">Her kelimeye tıklayarak gramer detaylarını görebilirsin</p>
              </div>
            )}
          </div>
        </SpotlightCard>

        {/* ── Tips ────────────────────────────────────────────── */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icon: '🎯', title: 'Kelime Tıkla', desc: 'Çevirideki her kelimeye tıkla, gramerini öğren' },
            { icon: '📚', title: 'Kütüphane Bağlantısı', desc: 'Her kelime ilgili kural bloğuna yönlendirir' },
            { icon: '⌘↵', title: 'Hızlı Çeviri', desc: 'Ctrl+Enter ile anında çevir ve analiz et' },
          ].map((tip, i) => (
            <div key={tip.title}
              className="flex gap-3 p-4 rounded-2xl bg-white/3 border border-white/6
                hover:bg-white/5 hover:border-white/10 transition-all duration-200"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="text-xl shrink-0">{tip.icon}</span>
              <div>
                <p className="text-xs font-bold text-slate-400 mb-0.5">{tip.title}</p>
                <p className="text-[11px] text-slate-600 leading-snug">{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
