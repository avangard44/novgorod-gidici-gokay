'use client'
import { useEffect, useState } from 'react'
import { tickStreak, type Streak } from '@/app/lib/storage'

export function StreakWidget() {
  const [streak, setStreak] = useState<Streak | null>(null)
  useEffect(() => { setStreak(tickStreak()) }, [])
  if (!streak || streak.count === 0) return null
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl
      bg-orange-500/10 border border-orange-500/20 backdrop-blur-md">
      <span className="text-sm leading-none">🔥</span>
      <span className="text-sm font-bold text-orange-400 leading-none">{streak.count}</span>
      <span className="text-[10px] text-orange-500/70 font-medium hidden sm:block">gün</span>
    </div>
  )
}
