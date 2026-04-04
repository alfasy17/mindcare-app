import { useState, useEffect, useCallback } from 'react'

// Generic localStorage hook
function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved ? JSON.parse(saved) : initial
    } catch { return initial }
  })

  const set = useCallback((v) => {
    setValue(prev => {
      const next = typeof v === 'function' ? v(prev) : v
      localStorage.setItem(key, JSON.stringify(next))
      return next
    })
  }, [key])

  return [value, set]
}

// ── Mood & Stress ──────────────────────────────────────────
export function useMoodStore() {
  const [entries, setEntries] = useLocalStorage('mc_mood_entries', [])

  function saveEntry(mood, stress) {
    const today = new Date().toISOString().split('T')[0]
    setEntries(prev => {
      const filtered = prev.filter(e => e.date !== today)
      return [...filtered, { date: today, mood, stress, ts: Date.now() }]
    })
  }

  function getWeekData() {
    const days = ['Min','Sen','Sel','Rab','Kam','Jum','Sab']
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date()
      d.setDate(d.getDate() - (6 - i))
      const dateStr = d.toISOString().split('T')[0]
      const entry = entries.find(e => e.date === dateStr)
      return {
        day: days[d.getDay()],
        date: dateStr,
        mood: entry?.mood || 0,
        stress: entry?.stress || 0,
      }
    })
  }

  const todayStr = new Date().toISOString().split('T')[0]
  const todayEntry = entries.find(e => e.date === todayStr)

  return { entries, saveEntry, getWeekData, todayEntry }
}

// ── Journal ────────────────────────────────────────────────
export function useJournalStore() {
  const [journals, setJournals] = useLocalStorage('mc_journals', [])

  function addJournal(text, tag) {
    setJournals(prev => [{
      id: Date.now(),
      text,
      tag,
      date: new Date().toISOString(),
    }, ...prev])
  }

  function deleteJournal(id) {
    setJournals(prev => prev.filter(j => j.id !== id))
  }

  return { journals, addJournal, deleteJournal }
}

// ── Streak & Activities ────────────────────────────────────
export function useActivityStore() {
  const [activities, setActivities] = useLocalStorage('mc_activities', [])
  const [streak, setStreak] = useLocalStorage('mc_streak', 0)
  const [lastActive, setLastActive] = useLocalStorage('mc_last_active', null)

  function logActivity(type, label, duration) {
    const today = new Date().toISOString().split('T')[0]
    setActivities(prev => [{
      id: Date.now(),
      type,
      label,
      duration,
      date: new Date().toISOString(),
    }, ...prev.slice(0, 49)])

    // Update streak
    if (lastActive !== today) {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yStr = yesterday.toISOString().split('T')[0]
      setStreak(lastActive === yStr ? s => s + 1 : 1)
      setLastActive(today)
    }
  }

  function getWeekStats() {
    const now = new Date()
    const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000)
    const recent = activities.filter(a => new Date(a.date) >= weekAgo)
    return {
      jurnal: recent.filter(a => a.type === 'jurnal').length,
      meditasi: recent.filter(a => a.type === 'meditasi').length,
      challenge: recent.filter(a => a.type === 'challenge').length,
      napas: recent.filter(a => a.type === 'napas').length,
    }
  }

  return { activities, streak, logActivity, getWeekStats }
}

// ── Challenge ──────────────────────────────────────────────
export function useChallengeStore() {
  const [completed, setCompleted] = useLocalStorage('mc_challenges', [])
  const [points, setPoints] = useLocalStorage('mc_points', 0)

  function completeChallenge(id, pts) {
    const key = `${new Date().toISOString().split('T')[0]}_${id}`
    if (completed.includes(key)) return false
    setCompleted(prev => [...prev, key])
    setPoints(p => p + pts)
    return true
  }

  function isDoneToday(id) {
    const key = `${new Date().toISOString().split('T')[0]}_${id}`
    return completed.includes(key)
  }

  return { points, completeChallenge, isDoneToday }
}

// ── Forum ──────────────────────────────────────────────────
export function useForumStore() {
  const [threads, setThreads] = useLocalStorage('mc_forum', [
    { id: 1, title: 'Cara mengatasi overthinking sebelum tidur', replies: 24, likes: 47, tag: 'Anxiety', time: '2 jam lalu', hot: true, author: 'Anonim_Biru' },
    { id: 2, title: 'Tips work-life balance untuk remote worker', replies: 18, likes: 35, tag: 'Self-Care', time: '5 jam lalu', hot: false, author: 'Anonim_Hijau' },
    { id: 3, title: 'Bagaimana cara cerita ke orang tua tentang mental health?', replies: 31, likes: 62, tag: 'Keluarga', time: '1 hari lalu', hot: true, author: 'Anonim_Ungu' },
    { id: 4, title: 'Rekomendasi buku self-help yang bagus', replies: 15, likes: 28, tag: 'Edukasi', time: '2 hari lalu', hot: false, author: 'Anonim_Merah' },
  ])

  function addThread(title, tag) {
    setThreads(prev => [{
      id: Date.now(),
      title,
      tag,
      replies: 0,
      likes: 0,
      time: 'Baru saja',
      hot: false,
      author: 'Kamu',
    }, ...prev])
  }

  function likeThread(id) {
    setThreads(prev => prev.map(t => t.id === id ? { ...t, likes: t.likes + 1 } : t))
  }

  return { threads, addThread, likeThread }
}

// ── Bookmarks ──────────────────────────────────────────────
export function useBookmarkStore() {
  const [bookmarks, setBookmarks] = useLocalStorage('mc_bookmarks', [])

  function toggle(id) {
    setBookmarks(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id])
  }

  function isBookmarked(id) { return bookmarks.includes(id) }

  return { bookmarks, toggle, isBookmarked }
}

// ── Toast ──────────────────────────────────────────────────
export function useToast() {
  const [toasts, setToasts] = useState([])

  function show(message, type = 'success') {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000)
  }

  function remove(id) {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  return { toasts, show, remove }
}
