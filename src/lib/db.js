import { supabase } from './supabase'

// ── AUTH ───────────────────────────────────────────────────
export const auth = {
  async signUp(email, password, name) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } }
    })
    if (error) throw error

    // Create profile
    if (data.user) {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        name,
        email,
      })
    }
    return data
  },

  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  onAuthChange(callback) {
    return supabase.auth.onAuthStateChange((_event, session) => {
      callback(session?.user || null)
    })
  }
}

// ── MOOD ───────────────────────────────────────────────────
export const moodDb = {
  async save(userId, mood, stress) {
    const today = new Date().toISOString().split('T')[0]
    const { error } = await supabase
      .from('mood_entries')
      .upsert({ user_id: userId, mood, stress, date: today }, { onConflict: 'user_id,date' })
    if (error) throw error
  },

  async getWeek(userId) {
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 6)
    const { data, error } = await supabase
      .from('mood_entries')
      .select('*')
      .eq('user_id', userId)
      .gte('date', weekAgo.toISOString().split('T')[0])
      .order('date', { ascending: true })
    if (error) throw error
    return data || []
  },

  async getToday(userId) {
    const today = new Date().toISOString().split('T')[0]
    const { data } = await supabase
      .from('mood_entries')
      .select('*')
      .eq('user_id', userId)
      .eq('date', today)
      .single()
    return data
  }
}

// ── JOURNAL ────────────────────────────────────────────────
export const journalDb = {
  async add(userId, text, tag) {
    const { data, error } = await supabase
      .from('journals')
      .insert({ user_id: userId, text, tag })
      .select()
      .single()
    if (error) throw error
    return data
  },

  async getAll(userId) {
    const { data, error } = await supabase
      .from('journals')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data || []
  },

  async delete(id) {
    const { error } = await supabase.from('journals').delete().eq('id', id)
    if (error) throw error
  }
}

// ── ACTIVITIES ─────────────────────────────────────────────
export const activityDb = {
  async log(userId, type, label, duration) {
    const { error } = await supabase
      .from('activities')
      .insert({ user_id: userId, type, label, duration })
    if (error) throw error
  },

  async getRecent(userId, limit = 20) {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)
    if (error) throw error
    return data || []
  },

  async getWeekStats(userId) {
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    const { data, error } = await supabase
      .from('activities')
      .select('type')
      .eq('user_id', userId)
      .gte('created_at', weekAgo.toISOString())
    if (error) throw error
    const rows = data || []
    return {
      jurnal: rows.filter(r => r.type === 'jurnal').length,
      meditasi: rows.filter(r => r.type === 'meditasi').length,
      challenge: rows.filter(r => r.type === 'challenge').length,
      napas: rows.filter(r => r.type === 'napas').length,
    }
  },

  async getStreak(userId) {
    const { data } = await supabase
      .from('activities')
      .select('created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(30)
    if (!data?.length) return 0

    const days = [...new Set(data.map(d => d.created_at.split('T')[0]))]
    let streak = 0
    const today = new Date()
    for (let i = 0; i < days.length; i++) {
      const expected = new Date(today)
      expected.setDate(today.getDate() - i)
      if (days[i] === expected.toISOString().split('T')[0]) streak++
      else break
    }
    return streak
  }
}

// ── FORUM ──────────────────────────────────────────────────
export const forumDb = {
  async getAll() {
    const { data, error } = await supabase
      .from('forum_threads')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data || []
  },

  async add(userId, title, tag) {
    const { data, error } = await supabase
      .from('forum_threads')
      .insert({ user_id: userId, title, tag })
      .select()
      .single()
    if (error) throw error
    return data
  },

  async like(id) {
    const { error } = await supabase.rpc('increment_likes', { thread_id: id })
    if (error) {
      // fallback manual
      const { data } = await supabase.from('forum_threads').select('likes').eq('id', id).single()
      await supabase.from('forum_threads').update({ likes: (data?.likes || 0) + 1 }).eq('id', id)
    }
  }
}

// ── PROFILE ────────────────────────────────────────────────
export const profileDb = {
  async get(userId) {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single()
    return data
  },

  async update(userId, updates) {
    const { error } = await supabase.from('profiles').update(updates).eq('id', userId)
    if (error) throw error
  }
}
