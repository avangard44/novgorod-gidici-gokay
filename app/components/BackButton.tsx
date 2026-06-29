'use client'

import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'

export default function BackButton() {
  const router = useRouter()
  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-1.5 px-3 py-2 rounded-xl
        bg-white/5 hover:bg-white/10 border border-white/8 hover:border-white/15
        text-slate-500 hover:text-slate-200 text-xs font-medium
        transition-all duration-200 backdrop-blur-md min-h-[44px] sm:min-h-0"
    >
      <ChevronLeft size={13} />
      Geri
    </button>
  )
}
