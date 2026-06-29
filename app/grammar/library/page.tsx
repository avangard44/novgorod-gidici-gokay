'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronDown, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { grammarBlocks, type Topic, type Block } from './data'

export default function GrammarLibraryPage() {
  const [openBlock, setOpenBlock] = useState<string>(grammarBlocks[0].id)
  const [activeTopic, setActiveTopic] = useState<Topic>(grammarBlocks[0].topics[0])

  const toggleBlock = (id: string) => {
    setOpenBlock((prev) => (prev === id ? '' : id))
  }

  const selectTopic = (topic: Topic, blockId: string) => {
    setActiveTopic(topic)
    setOpenBlock(blockId)
  }

  return (
    <div className="flex h-full min-h-screen">
      {/* ── Sidebar ── */}
      <aside className="w-64 shrink-0 border-r border-white/8 flex flex-col glass overflow-y-auto">
        {/* Header */}
        <div className="px-4 py-5 border-b border-white/8">
          <Link
            href="/grammar"
            className="flex items-center gap-1.5 text-slate-600 hover:text-slate-300
              text-xs transition-colors mb-3"
          >
            <ChevronLeft size={12} />
            Geri
          </Link>
          <p className="text-[10px] text-slate-600 uppercase tracking-widest">Kütüphane</p>
          <h1 className="text-sm font-bold text-white mt-0.5">Dilbilgisi Konuları</h1>
        </div>

        {/* Accordion */}
        <nav className="flex-1 py-2">
          {grammarBlocks.map((block) => (
            <BlockAccordion
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
      <main className="flex-1 overflow-y-auto px-8 py-10 max-w-3xl">
        <TopicContent topic={activeTopic} />
      </main>
    </div>
  )
}

/* ── Block accordion ── */
function BlockAccordion({
  block,
  isOpen,
  activeTopic,
  onToggle,
  onSelect,
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
                    : 'hover:bg-white/4'
                  }`}
              >
                <span className={`text-[10px] font-mono shrink-0
                  ${isActive ? 'text-violet-400' : 'text-slate-600'}`}>
                  {topic.number}
                </span>
                <span className={`text-xs leading-snug
                  ${isActive ? 'text-white font-medium' : 'text-slate-500 hover:text-slate-300'}`}>
                  {topic.title}
                </span>
                {isActive && (
                  <ChevronRight size={10} className="text-violet-400 ml-auto shrink-0" />
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

/* ── Topic content ── */
function TopicContent({ topic }: { topic: Topic }) {
  return (
    <div key={topic.id} className="animate-fade-in">
      {/* Title */}
      <div className="mb-8">
        <span className="text-[10px] text-violet-400 uppercase tracking-widest font-semibold">
          {topic.number}
        </span>
        <h2 className="text-2xl font-black text-white mt-1 leading-tight">{topic.title}</h2>
      </div>

      {/* Explanation */}
      <div className="glass rounded-2xl p-6 mb-6">
        <p className="text-[10px] text-slate-600 uppercase tracking-widest mb-4 font-semibold">
          📖 Açıklama
        </p>
        <ExplanationRenderer text={topic.explanation} />
      </div>

      {/* Examples table */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/8">
          <p className="text-[10px] text-slate-600 uppercase tracking-widest font-semibold">
            🇷🇺 Örnekler
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/6">
                <th className="text-left px-6 py-3 text-[10px] text-slate-600 uppercase tracking-widest font-semibold w-[34%]">
                  Rusça
                </th>
                <th className="text-left px-4 py-3 text-[10px] text-slate-600 uppercase tracking-widest font-semibold w-[34%]">
                  Türkçe
                </th>
                <th className="text-left px-4 py-3 text-[10px] text-slate-600 uppercase tracking-widest font-semibold">
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
                  <td className="px-6 py-3.5 font-semibold text-slate-100 align-top">
                    {ex.russian}
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
    </div>
  )
}

/* ── Explanation renderer — handles **bold** and newlines ── */
function ExplanationRenderer({ text }: { text: string }) {
  return (
    <div className="space-y-2">
      {text.split('\n').map((line, i) => {
        if (line.trim() === '') return <div key={i} className="h-1" />
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
