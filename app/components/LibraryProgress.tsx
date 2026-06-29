'use client'
import { useEffect, useState } from 'react'
import { getCompleted } from '@/app/lib/storage'

const TOTAL = 30

export function LibraryProgress() {
  const [done, setDone] = useState(0)
  useEffect(() => { setDone(getCompleted().size) }, [])
  if (done === 0) return null
  return (
    <div className="mt-3 w-full">
      <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-violet-400 rounded-full transition-all duration-700"
          style={{ width: `${Math.round((done / TOTAL) * 100)}%` }}
        />
      </div>
      <p className="text-[10px] text-slate-600 mt-1.5 text-left">{done}/{TOTAL} konu tamamlandı</p>
    </div>
  )
}
