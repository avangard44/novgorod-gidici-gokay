'use client'
import { useEffect, useState } from 'react'
import {
  getAchievements, unlockAchievement, getNewAchievements, clearNewAchievements,
  getCompleted, getStreak, wasHataCleared,
} from '@/app/lib/storage'

const BLOK1_IDS = ['1-1', '1-2', '1-3', '1-4', '1-5', '1-6']

const DEFS = [
  {
    id: 'ilk-adim',
    icon: '🎯',
    title: 'İlk Adım',
    desc: 'İlk quiz\'i tamamla',
    color: 'cyan',
    glowClass: 'shadow-[0_0_24px_rgba(34,211,238,0.25)]',
    borderClass: 'border-cyan-500/50',
    textClass: 'text-cyan-400',
    bgClass: 'bg-cyan-500/8',
  },
  {
    id: 'blok1-tam',
    icon: '🏆',
    title: 'Novgorod Gezgini',
    desc: 'Blok 1\'i tamamen bitir',
    color: 'violet',
    glowClass: 'shadow-[0_0_24px_rgba(139,92,246,0.25)]',
    borderClass: 'border-violet-500/50',
    textClass: 'text-violet-400',
    bgClass: 'bg-violet-500/8',
  },
  {
    id: 'demir-irade',
    icon: '🔥',
    title: 'Demir İrade',
    desc: '3 günlük seri yap',
    color: 'orange',
    glowClass: 'shadow-[0_0_24px_rgba(249,115,22,0.25)]',
    borderClass: 'border-orange-500/50',
    textClass: 'text-orange-400',
    bgClass: 'bg-orange-500/8',
  },
  {
    id: 'hata-avci',
    icon: '🔍',
    title: 'Hata Avcısı',
    desc: 'Hata kutusunu temizle',
    color: 'emerald',
    glowClass: 'shadow-[0_0_24px_rgba(16,185,129,0.25)]',
    borderClass: 'border-emerald-500/50',
    textClass: 'text-emerald-400',
    bgClass: 'bg-emerald-500/8',
  },
]

function checkConditions(): string[] {
  const newlyUnlocked: string[] = []
  const completed = getCompleted()
  const streak = getStreak()

  if (completed.size > 0 && unlockAchievement('ilk-adim')) newlyUnlocked.push('ilk-adim')
  if (BLOK1_IDS.every(id => completed.has(id)) && unlockAchievement('blok1-tam')) newlyUnlocked.push('blok1-tam')
  if (streak.count >= 3 && unlockAchievement('demir-irade')) newlyUnlocked.push('demir-irade')
  if (wasHataCleared() && unlockAchievement('hata-avci')) newlyUnlocked.push('hata-avci')

  return newlyUnlocked
}

export function AchievementsShowcase() {
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set())
  const [toast, setToast] = useState<string | null>(null)
  const [newIds, setNewIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    checkConditions()
    const achievements = getAchievements()
    setUnlocked(achievements)

    const freshIds = getNewAchievements()
    if (freshIds.length > 0) {
      setNewIds(new Set(freshIds))
      const label = freshIds
        .map(id => DEFS.find(d => d.id === id)?.title)
        .filter(Boolean)
        .join(' ve ')
      setToast(`🏆 ${label} — başarı kilidi açıldı!`)
      clearNewAchievements()
      setTimeout(() => setToast(null), 4000)
    }
  }, [])

  const anyUnlocked = unlocked.size > 0

  if (!anyUnlocked) return null   // hide showcase until at least one achievement

  return (
    <div className="w-full max-w-lg mt-10 animate-fade-in">
      <p className="text-[10px] text-slate-700 uppercase tracking-[0.35em] mb-5 text-center">
        Başarılar
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {DEFS.map(def => {
          const isUnlocked = unlocked.has(def.id)
          const isNew = newIds.has(def.id)
          return (
            <div
              key={def.id}
              className={`relative flex flex-col items-center text-center p-4 rounded-2xl border
                transition-all duration-500
                ${isUnlocked
                  ? `${def.bgClass} ${def.borderClass} ${def.glowClass} ${isNew ? 'animate-pulse' : ''}`
                  : 'bg-white/3 border-white/5 opacity-35 grayscale'
                }`}
            >
              <span className="text-2xl mb-2">{def.icon}</span>
              <p className={`text-[11px] font-bold leading-tight mb-1
                ${isUnlocked ? def.textClass : 'text-slate-600'}`}>
                {def.title}
              </p>
              <p className="text-[10px] text-slate-600 leading-tight">{def.desc}</p>
              {isUnlocked && (
                <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full
                  flex items-center justify-center text-[9px]
                  bg-green-500 text-white font-bold`}>
                  ✓
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Toast */}
      {toast && (
        <div className="mt-4 px-4 py-3 rounded-2xl bg-violet-900/80 border border-violet-500/40
          backdrop-blur-xl text-white text-sm font-medium text-center animate-fade-in">
          {toast}
        </div>
      )}
    </div>
  )
}
