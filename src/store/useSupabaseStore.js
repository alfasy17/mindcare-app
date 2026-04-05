import { useState, useEffect, useCallback } from 'react'
import { moodDb, journalDb, activityDb, forumDb } from '../lib/db'

// ── Mood ───────────────────────────────────────────────────
export function useMoodStoreSupabase(userId) {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(false)
  const [todayEntry, setTodayEntry] = useState(null)

  useEffect(() => {
    if (!userId) return
    setLoading(true)
    moodDb.getWeek(userId).then(data => {
      setEntries(data)
      const today = new Date().toISOString().split('T')[0]
      setTodayEntry(data.find(e => e.date === today) || null)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [userId])

  async function saveEntry(mood, stress) {
    if (!userId) return
    await moodDb.save(userId, mood, stress)
    const today = new Date().toISOString().split('T')[0]
    const updated = entries.filter(e => e.date !== today)
    const newEntry = { date: today, mood, stress }
    setEntries([...updated, newEntry])
    setTodayEntry(newEntry)
  }

  function getWeekData() {
    const days = ['Min','Sen','Sel','Rab','Kam','Jum','Sab']
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date()
      d.setDate(d.getDate() - (6 - i))
      const dateStr = d.toISOString().split('T')[0]
      const entry = entries.find(e => e.date === dateStr)
      return { day: days[d.getDay()], date: dateStr, mood: entry?.mood || 0, stress: entry?.stress || 0 }
    })
  }

  return { entries, loading, saveEntry, getWeekData, todayEntry }
}

// ── Journal ────────────────────────────────────────────────
export function useJournalStoreSupabase(userId) {
  const [journals, setJournals] = useState([])

  useEffect(() => {
    if (!userId) return
    journalDb.getAll(userId).then(setJournals).catch(() => {})
  }, [userId])

  async function addJournal(text, tag) {
    if (!userId) return
    const newJ = await journalDb.add(userId, text, tag)
    setJournals(prev => [newJ, ...prev])
  }

  async function deleteJournal(id) {
    await journalDb.delete(id)
    setJournals(prev => prev.filter(j => j.id !== id))
  }

  return { journals, addJournal, deleteJournal }
}

// ── Activities ─────────────────────────────────────────────
export function useActivityStoreSupabase(userId) {
  const [activities, setActivities] = useState([])
  const [streak, setStreak] = useState(0)
  const [weekStats, setWeekStats] = useState({ jurnal: 0, meditasi: 0, challenge: 0, napas: 0 })

  useEffect(() => {
    if (!userId) return
    activityDb.getRecent(userId).then(setActivities).catch(() => {})
    activityDb.getStreak(userId).then(setStreak).catch(() => {})
    activityDb.getWeekStats(userId).then(setWeekStats).catch(() => {})
  }, [userId])

  async function logActivity(type, label, duration) {
    if (!userId) return
    await activityDb.log(userId, type, label, duration)
    const newA = { id: Date.now(), type, label, duration, created_at: new Date().toISOString() }
    setActivities(prev => [newA, ...prev.slice(0, 49)])
    setWeekStats(prev => ({ ...prev, [type]: (prev[type] || 0) + 1 }))
    // Refresh streak
    activityDb.getStreak(userId).then(setStreak).catch(() => {})
  }

  function getWeekStats() { return weekStats }

  return { activities, streak, logActivity, getWeekStats }
}

// ── Forum ──────────────────────────────────────────────────
export function useForumStoreSupabase(userId) {
  const [threads, setThreads] = useState([])

  useEffect(() => {
    forumDb.getAll().then(data => {
      if (data.length > 0) setThreads(data)
    }).catch(() => {})
  }, [])

  async function addThread(title, tag) {
    if (!userId) return
    const newT = await forumDb.add(userId, title, tag)
    setThreads(prev => [newT, ...prev])
  }

  async function likeThread(id) {
    await forumDb.like(id)
    setThreads(prev => prev.map(t => t.id === id ? { ...t, likes: t.likes + 1 } : t))
  }

  return { threads, addThread, likeThread }
}
