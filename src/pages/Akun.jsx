import { useState } from 'react'
import { User, Bell, Clock, Lock, HelpCircle, FileText, Info, LogOut, ChevronRight, Edit3, Camera, Shield, Star } from 'lucide-react'
import { useActivityStore, useJournalStore } from '../store/useStore'

const achievements = [
  { emoji: '🌱', label: 'Pemula', desc: 'Mulai perjalanan', unlocked: true },
  { emoji: '🔥', label: '7 Hari', desc: 'Streak 7 hari', unlocked: true },
  { emoji: '📝', label: '20 Jurnal', desc: 'Tulis 20 jurnal', unlocked: true },
  { emoji: '🧘', label: 'Meditator', desc: 'Meditasi 20x', unlocked: false },
  { emoji: '⭐', label: 'Pro User', desc: 'Aktif 30 hari', unlocked: false },
  { emoji: '💜', label: 'Supporter', desc: 'Bantu 5 orang', unlocked: false },
]

export default function Akun({ onSettings, onLogout, user }) {
  const [logoutConfirm, setLogoutConfirm] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [name, setName] = useState(user?.name || 'Sarah Amelina')
  const { streak, activities, getWeekStats } = useActivityStore()
  const { journals } = useJournalStore()
  const meditasiCount = activities.filter(a => a.type === 'meditasi').length
  const weekStats = getWeekStats()
  const progressPct = Math.min(100, Math.round(((weekStats.jurnal + weekStats.meditasi + weekStats.challenge) / 21) * 100))

  const settings = [
    { icon: User, label: 'Edit Profil', color: 'text-teal-500', bg: 'bg-teal-50 dark:bg-teal-900/30' },
    { icon: Bell, label: 'Notifikasi', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/30', action: onSettings },
    { icon: Clock, label: 'Pengingat Harian', color: 'text-violet-500', bg: 'bg-violet-50 dark:bg-violet-900/30', action: onSettings },
    { icon: Lock, label: 'Privasi & Keamanan', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/30', action: onSettings },
    { icon: Shield, label: 'Keamanan Akun', color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-900/30', action: onSettings },
  ]

  const others = [
    { icon: HelpCircle, label: 'Bantuan & FAQ', color: 'text-gray-500', bg: 'bg-gray-50' },
    { icon: Star, label: 'Beri Rating Aplikasi', color: 'text-amber-500', bg: 'bg-amber-50' },
    { icon: FileText, label: 'Syarat & Ketentuan', color: 'text-gray-500', bg: 'bg-gray-50' },
    { icon: Info, label: 'Tentang MindCare', color: 'text-gray-500', bg: 'bg-gray-50' },
  ]

  return (
    <div className="pb-24">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-teal-500 via-teal-400 to-cyan-400 px-5 pt-6 pb-12">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center text-5xl border-2 border-white/30">👩</div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md">
              <Camera size={13} className="text-teal-500" />
            </button>
          </div>
          <div className="flex-1">
            {editMode ? (
              <input value={name} onChange={e => setName(e.target.value)} onBlur={() => setEditMode(false)}
                className="bg-white/20 text-white font-bold text-lg rounded-xl px-3 py-1 outline-none w-full placeholder-white/60" autoFocus />
            ) : (
              <div className="flex items-center gap-2">
                <h1 className="text-white text-xl font-bold">{name}</h1>
                <button onClick={() => setEditMode(true)}><Edit3 size={14} className="text-white/70" /></button>
              </div>
            )}
            <p className="text-teal-100 text-sm mt-0.5">sarah@email.com</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">Member sejak Jan 2024</span>
              <span className="text-xs bg-amber-400/80 text-white px-2 py-0.5 rounded-full">✨ Free Plan</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-6 space-y-4">
        {/* Stats */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-5">
          <h2 className="font-bold text-gray-800 dark:text-white dark:text-white mb-3">Statistik Kamu</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { emoji: '🔥', value: String(streak), label: 'Hari Streak', color: 'text-orange-500' },
              { emoji: '📝', value: String(journals.length), label: 'Jurnal', color: 'text-violet-500' },
              { emoji: '🧘', value: String(meditasiCount), label: 'Meditasi', color: 'text-teal-500' },
            ].map((s) => (
              <div key={s.label} className="bg-gray-50 rounded-2xl p-3 text-center">
                <div className="text-2xl mb-1">{s.emoji}</div>
                <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 bg-teal-50 dark:bg-teal-900/20 rounded-2xl p-3">
            <div className="flex justify-between items-center mb-1">
              <p className="text-xs text-teal-600 dark:text-teal-400 font-semibold">Progress Minggu Ini</p>
              <p className="text-xs text-teal-500 font-bold">{progressPct}%</p>
            </div>
            <div className="w-full bg-teal-100 dark:bg-teal-900/40 rounded-full h-2">
              <div className="bg-gradient-to-r from-teal-400 to-cyan-400 h-2 rounded-full transition-all" style={{ width: `${progressPct}%` }} />
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-800 dark:text-white">🏆 Pencapaian</h2>
            <span className="text-xs text-gray-400 dark:text-gray-500">3/6 terbuka</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {achievements.map((a, i) => (
              <div key={i} className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all ${a.unlocked ? 'bg-amber-50 border border-amber-100' : 'bg-gray-50 opacity-40'}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${a.unlocked ? 'bg-amber-100' : 'bg-gray-100'}`}>{a.emoji}</div>
                <p className="text-xs font-bold text-gray-700 text-center">{a.label}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 text-center leading-tight">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Banner */}
        <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-3xl p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-base">Upgrade ke Premium ✨</p>
              <p className="text-violet-200 text-xs mt-1">Akses semua fitur tanpa batas</p>
              <p className="text-white font-bold mt-2">Rp 49.000 / bulan</p>
            </div>
            <button className="bg-white text-violet-600 font-bold text-sm px-4 py-2 rounded-2xl flex-shrink-0">Coba Gratis</button>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg overflow-hidden">
          <p className="text-xs text-gray-400 dark:text-gray-500 font-bold px-5 pt-4 pb-2 tracking-wider">PENGATURAN</p>
          {settings.map((s, i) => (
            <button key={i} onClick={s.action} className="w-full flex items-center gap-3 px-5 py-3.5 border-b border-gray-50 dark:border-gray-800 last:border-0 active:bg-gray-50 dark:active:bg-gray-800 transition-colors">
              <div className={`w-9 h-9 ${s.bg} rounded-xl flex items-center justify-center`}>
                <s.icon size={18} className={s.color} />
              </div>
              <span className="flex-1 text-sm font-medium text-gray-700 dark:text-gray-200 text-left">{s.label}</span>
              <ChevronRight size={16} className="text-gray-300 dark:text-gray-600" />
            </button>
          ))}
        </div>

        {/* Others */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg overflow-hidden">
          <p className="text-xs text-gray-400 dark:text-gray-500 font-bold px-5 pt-4 pb-2 tracking-wider">LAINNYA</p>
          {others.map((s, i) => (
            <button key={i} className="w-full flex items-center gap-3 px-5 py-3.5 border-b border-gray-50 dark:border-gray-800 last:border-0 active:bg-gray-50 transition-colors">
              <div className={`w-9 h-9 ${s.bg} rounded-xl flex items-center justify-center`}>
                <s.icon size={18} className={s.color} />
              </div>
              <span className="flex-1 text-sm font-medium text-gray-700 dark:text-gray-200 text-left">{s.label}</span>
              <ChevronRight size={16} className="text-gray-300" />
            </button>
          ))}
        </div>

        {/* Logout */}
        {logoutConfirm ? (
          <div className="bg-rose-50 border border-rose-200 rounded-3xl p-5 space-y-3">
            <p className="text-sm text-rose-700 font-semibold text-center">Yakin ingin keluar dari MindCare?</p>
            <div className="flex gap-2">
              <button onClick={() => setLogoutConfirm(false)} className="flex-1 py-3 rounded-2xl border border-gray-200 text-sm font-medium text-gray-600 bg-white">Batal</button>
              <button onClick={onLogout} className="flex-1 py-3 rounded-2xl bg-rose-500 text-white text-sm font-bold">Ya, Keluar</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setLogoutConfirm(true)}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-3xl border-2 border-rose-200 text-rose-500 font-bold bg-white">
            <LogOut size={18} /> Keluar
          </button>
        )}

        <p className="text-center text-xs text-gray-300 pb-2">MindCare v1.0.0 · Made with 💜</p>
      </div>
    </div>
  )
}
