import { useState } from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { useMoodStore, useActivityStore } from '../store/useStore'
import { useMoodStoreSupabase, useActivityStoreSupabase } from '../store/useSupabaseStore'

const moods = [
  { emoji: '😄', label: 'Sangat Baik', value: 5, bg: 'bg-emerald-50', border: 'border-emerald-300', text: 'text-emerald-600', bar: 'bg-emerald-400' },
  { emoji: '🙂', label: 'Baik', value: 4, bg: 'bg-lime-50', border: 'border-lime-300', text: 'text-lime-600', bar: 'bg-lime-400' },
  { emoji: '😐', label: 'Netral', value: 3, bg: 'bg-yellow-50', border: 'border-yellow-300', text: 'text-yellow-600', bar: 'bg-yellow-400' },
  { emoji: '😟', label: 'Kurang Baik', value: 2, bg: 'bg-orange-50', border: 'border-orange-300', text: 'text-orange-600', bar: 'bg-orange-400' },
  { emoji: '😢', label: 'Buruk', value: 1, bg: 'bg-rose-50', border: 'border-rose-300', text: 'text-rose-600', bar: 'bg-rose-400' },
]

const moodEmoji = [null, '😢', '😟', '😐', '🙂', '😄']

function getStressConfig(val) {
  if (val <= 3) return { color: 'bg-emerald-400', text: 'text-emerald-600', label: 'Rendah', msg: 'Kamu baik-baik saja 😊' }
  if (val <= 6) return { color: 'bg-amber-400', text: 'text-amber-600', label: 'Sedang', msg: 'Perlu sedikit istirahat 🌿' }
  return { color: 'bg-rose-400', text: 'text-rose-600', label: 'Tinggi', msg: 'Yuk coba teknik relaksasi 💆' }
}

function getTrend(data, key) {
  if (!data || data.length < 2) return 'same'
  const last = data[data.length - 1][key]
  const prev = data[data.length - 2][key]
  if (last > prev) return 'up'
  if (last < prev) return 'down'
  return 'same'
}

export default function Monitor({ showToast, user }) {
  const [selectedMood, setSelectedMood] = useState(null)
  const [stress, setStress] = useState(5)
  const [saved, setSaved] = useState(false)
  const [view, setView] = useState('week')

  const localStore = useMoodStore()
  const supaStore = useMoodStoreSupabase(user?.id)
  const store = user?.id ? supaStore : localStore
  const { saveEntry, getWeekData, todayEntry } = store
  const chartData = getWeekData()

  const stressCfg = getStressConfig(stress)
  const moodTrend = getTrend(chartData, 'mood')
  const stressTrend = getTrend(chartData, 'stress')
  const selectedMoodObj = moods.find(m => m.value === selectedMood)

  useState(() => {
    if (todayEntry) {
      setSelectedMood(todayEntry.mood)
      setStress(todayEntry.stress)
    }
  })

  function handleSave() {
    if (!selectedMood) return
    saveEntry(selectedMood, stress)
    setSaved(true)
    showToast?.('Check-in hari ini tersimpan! 💪', 'success')
    setTimeout(() => setSaved(false), 2500)
  }

  const localActivity = useActivityStore()
  const supaActivity = useActivityStoreSupabase(user?.id)
  const { streak } = user?.id ? supaActivity : localActivity

  const validMoods = chartData.filter(d => d.mood > 0)
  const avgMoodVal = validMoods.length
    ? Math.round(validMoods.reduce((a, b) => a + b.mood, 0) / validMoods.length)
    : 0
  const avgMoodEmoji = moodEmoji[avgMoodVal] || '😊'
  const avgMoodLabel = moods.find(m => m.value === avgMoodVal)?.label || 'Baik'

  const validStress = chartData.filter(d => d.stress > 0)
  const avgStress = validStress.length
    ? (validStress.reduce((a, b) => a + b.stress, 0) / validStress.length).toFixed(1)
    : '-'

  return (
    <div className="pb-24">
      <div className="bg-gradient-to-br from-teal-500 via-teal-400 to-cyan-400 px-5 pt-6 pb-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-teal-100 text-sm">
              {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
            <h1 className="text-white text-2xl font-bold mt-1">
              Halo, {user?.name?.split(' ')[0] || 'Kamu'} 👋
            </h1>
            <p className="text-teal-100 text-sm mt-1">Bagaimana perasaanmu hari ini?</p>
          </div>
          <div className="bg-white/20 rounded-2xl px-3 py-2 text-center">
            <p className="text-white text-xl font-bold">{streak}</p>
            <p className="text-teal-100 text-xs">Hari Streak 🔥</p>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* Mood Card */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-5 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800 dark:text-white text-base">Mood Tracker</h2>
            <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-full">Pilih satu</span>
          </div>
          <div className="flex gap-2">
            {moods.map((m) => (
              <button key={m.value} onClick={() => setSelectedMood(m.value)}
                className={`flex-1 flex flex-col items-center py-3 px-1 rounded-2xl border-2 transition-all duration-200 ${
                  selectedMood === m.value
                    ? `${m.bg} ${m.border} scale-105 shadow-sm`
                    : 'border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
                }`}>
                <span className="text-2xl">{m.emoji}</span>
                <span className={`text-xs mt-1.5 font-medium leading-tight text-center ${
                  selectedMood === m.value ? m.text : 'text-gray-400 dark:text-gray-500'
                }`}>
                  {m.label}
                </span>
              </button>
            ))}
          </div>
          {selectedMoodObj && (
            <div className={`mt-3 ${selectedMoodObj.bg} rounded-2xl p-3 flex items-center gap-2`}>
              <span className="text-xl">{selectedMoodObj.emoji}</span>
              <p className={`text-sm font-medium ${selectedMoodObj.text}`}>
                Mood kamu: {selectedMoodObj.label}
              </p>
            </div>
          )}
        </div>

        {/* Stress Card */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-5 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-bold text-gray-800 dark:text-white text-base">Level Stres</h2>
            <div className={`${stressCfg.color} text-white text-sm font-bold w-9 h-9 rounded-full flex items-center justify-center shadow-sm`}>
              {stress}
            </div>
          </div>
          <p className={`text-sm font-medium ${stressCfg.text} mb-4`}>{stressCfg.label} — {stressCfg.msg}</p>
          <div className="relative mb-2">
            <div className="w-full h-3 bg-gradient-to-r from-emerald-300 via-amber-300 to-rose-400 rounded-full" />
            <input type="range" min="1" max="10" value={stress}
              onChange={(e) => setStress(Number(e.target.value))}
              className="absolute inset-0 w-full opacity-0 cursor-pointer h-3" />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-500 rounded-full shadow-md pointer-events-none transition-all"
              style={{ left: `calc(${((stress - 1) / 9) * 100}% - 10px)` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-1">
            <span>😌 Santai</span>
            <span>😰 Sangat Stres</span>
          </div>
          {stress >= 7 && (
            <div className="mt-3 bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800 rounded-2xl p-3">
              <p className="text-xs text-rose-600 dark:text-rose-400 font-medium">
                💡 Tips: Coba teknik pernapasan 4-7-8 di menu Aktivitas.
              </p>
            </div>
          )}
        </div>

        {/* Save Button */}
        <button onClick={handleSave} disabled={!selectedMood}
          className={`w-full py-4 rounded-3xl font-bold text-base transition-all duration-200 ${
            saved
              ? 'bg-emerald-400 text-white scale-95'
              : selectedMood
              ? 'bg-gradient-to-r from-teal-500 to-cyan-400 text-white shadow-lg shadow-teal-200 active:scale-95'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-300 dark:text-gray-600 cursor-not-allowed'
          }`}>
          {saved ? '✅ Tersimpan! Tetap semangat ya 💪' : 'Simpan Check-in Hari Ini'}
        </button>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">Rata-rata Mood</p>
              {moodTrend === 'up'
                ? <TrendingUp size={14} className="text-emerald-500" />
                : moodTrend === 'down'
                ? <TrendingDown size={14} className="text-rose-500" />
                : <Minus size={14} className="text-gray-400" />}
            </div>
            <p className="text-3xl mb-1">{avgMoodEmoji}</p>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">{avgMoodLabel}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">7 hari terakhir</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">Rata-rata Stres</p>
              {stressTrend === 'down'
                ? <TrendingDown size={14} className="text-emerald-500" />
                : stressTrend === 'up'
                ? <TrendingUp size={14} className="text-rose-500" />
                : <Minus size={14} className="text-gray-400" />}
            </div>
            <p className="text-2xl font-bold text-amber-500 mb-1">{avgStress}</p>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Sedang</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">7 hari terakhir</p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-5 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800 dark:text-white text-base">Riwayat</h2>
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-0.5">
              {['week', 'month'].map(v => (
                <button key={v} onClick={() => setView(v)}
                  className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                    view === v
                      ? 'bg-white dark:bg-gray-700 text-teal-600 dark:text-teal-400 shadow-sm'
                      : 'text-gray-400 dark:text-gray-500'
                  }`}>
                  {v === 'week' ? '7 Hari' : 'Bulan'}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 bg-teal-400 rounded-full" />
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">Mood Harian</p>
            </div>
            <div className="flex items-end gap-1.5 h-24">
              {chartData.map((d, i) => {
                const mood = moods.find(m => m.value === d.mood)
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-sm">{d.mood > 0 ? moodEmoji[d.mood] : ''}</span>
                    <div className="w-full flex items-end justify-center" style={{ height: '56px' }}>
                      <div
                        className={`w-full ${mood?.bar || 'bg-gray-200 dark:bg-gray-700'} rounded-t-lg transition-all`}
                        style={{ height: `${(d.mood / 5) * 56}px` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex gap-1.5 mt-1">
              {chartData.map((d) => (
                <div key={d.day} className="flex-1 text-center text-xs text-gray-400 dark:text-gray-600">{d.day}</div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 bg-amber-400 rounded-full" />
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">Level Stres</p>
            </div>
            <div className="flex items-end gap-1.5 h-24">
              {chartData.map((d, i) => {
                const cfg = getStressConfig(d.stress)
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {d.stress > 0 ? d.stress : ''}
                    </span>
                    <div className="w-full flex items-end justify-center" style={{ height: '56px' }}>
                      <div
                        className={`w-full ${d.stress > 0 ? cfg.color : 'bg-gray-200 dark:bg-gray-700'} rounded-t-lg transition-all`}
                        style={{ height: `${(d.stress / 10) * 56}px` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex gap-1.5 mt-1">
              {chartData.map((d) => (
                <div key={d.day} className="flex-1 text-center text-xs text-gray-400 dark:text-gray-600">{d.day}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Insight Card */}
        <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 border border-violet-100 dark:border-violet-800 rounded-3xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">💡</span>
            <h3 className="font-bold text-violet-700 dark:text-violet-400">Insight Minggu Ini</h3>
          </div>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-violet-600 dark:text-violet-400">
              <span>📈</span><span>Mood terbaikmu di hari Rabu dan Sabtu</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-violet-600 dark:text-violet-400">
              <span>⚠️</span><span>Stres cenderung tinggi di hari Kamis</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-violet-600 dark:text-violet-400">
              <span>🎯</span><span>Coba tambah aktivitas relaksasi di hari kerja</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
