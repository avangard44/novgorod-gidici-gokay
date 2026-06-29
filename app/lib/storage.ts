export type Streak = { lastDate: string; count: number }
export type WrongAnswer = { topicId: string; qIdx: number }

function get<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(`ngk_${key}`)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch { return fallback }
}

function save<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(`ngk_${key}`, JSON.stringify(value))
}

// ── Streak ───────────────────────────────────────────────────────
export function getStreak(): Streak {
  return get<Streak>('streak', { lastDate: '', count: 0 })
}

export function tickStreak(): Streak {
  const today = new Date().toISOString().slice(0, 10)
  const s = getStreak()
  if (s.lastDate === today) return s
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
  const updated: Streak = { lastDate: today, count: s.lastDate === yesterday ? s.count + 1 : 1 }
  save('streak', updated)
  return updated
}

// ── Completed topics ─────────────────────────────────────────────
export function getCompleted(): Set<string> {
  return new Set(get<string[]>('completed', []))
}

export function markCompleted(topicId: string): void {
  const c = getCompleted(); c.add(topicId); save('completed', [...c])
}

// ── Bookmarks ────────────────────────────────────────────────────
export function getBookmarks(): Set<string> {
  return new Set(get<string[]>('bookmarks', []))
}

export function toggleBookmark(topicId: string): boolean {
  const b = getBookmarks()
  if (b.has(topicId)) { b.delete(topicId); save('bookmarks', [...b]); return false }
  b.add(topicId); save('bookmarks', [...b]); return true
}

// ── Wrong answers ────────────────────────────────────────────────
export function getWrongAnswers(): WrongAnswer[] {
  return get<WrongAnswer[]>('wrong', [])
}

export function addWrongAnswer(topicId: string, qIdx: number): void {
  const list = getWrongAnswers()
  if (!list.some(w => w.topicId === topicId && w.qIdx === qIdx))
    save('wrong', [...list, { topicId, qIdx }])
}

export function clearWrongAnswer(topicId: string, qIdx: number): void {
  save('wrong', getWrongAnswers().filter(w => !(w.topicId === topicId && w.qIdx === qIdx)))
}

// ── Zen mode ─────────────────────────────────────────────────────
export function getZenMode(): boolean {
  return get<boolean>('zen', false)
}

export function saveZenMode(v: boolean): void {
  save('zen', v)
}

// ── Hata Kutusu cleared flag ──────────────────────────────────────
export function flagHataCleared(): void {
  save('hata_cleared', true)
}

export function wasHataCleared(): boolean {
  return get<boolean>('hata_cleared', false)
}

// ── Achievements ─────────────────────────────────────────────────
export function getAchievements(): Set<string> {
  return new Set(get<string[]>('achievements', []))
}

export function unlockAchievement(id: string): boolean {
  const a = getAchievements()
  if (a.has(id)) return false
  a.add(id); save('achievements', [...a])
  const nw = get<string[]>('new_ach', [])
  if (!nw.includes(id)) save('new_ach', [...nw, id])
  return true
}

export function getNewAchievements(): string[] {
  return get<string[]>('new_ach', [])
}

export function clearNewAchievements(): void {
  save('new_ach', [])
}

// ── Unlocked blocks (game progression) ───────────────────────────
export function getUnlockedBlocks(): number[] {
  return get<number[]>('unlocked_blocks', [1])
}

export function unlockBlock(blockNum: number): void {
  const current = getUnlockedBlocks()
  if (!current.includes(blockNum)) {
    save('unlocked_blocks', [...current, blockNum].sort((a, b) => a - b))
  }
}
