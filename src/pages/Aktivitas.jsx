import { useState, useEffect, useRef } from 'react'
import { BookOpen, Brain, Wind, Target, ChevronLeft, Play, Pause, Check, Clock, Flame } from 'lucide-react'
import { useJournalStore, useActivityStore, useChallengeStore } from '../store/useStore'

const activityCards = [
  { id: 'jurnal', icon: BookOpen, label: 'Tulis Jurnal', desc: 'Ceritakan harimu', gradient: 'from-violet-500 to-purple-600', light: 'bg-violet-50', iconColor: 'text-violet-500' },
  { id: 'meditasi', icon: Brain, label: 'Meditasi', desc: 'Tenangkan pikiran', gradient: 'from-teal-500 to-cyan-500', light: 'bg-teal-50', iconColor: 'text-teal-500' },
  { id: 'napas', icon: Wind, label: 'Atur Napas', desc: 'Teknik pernapasan', gradient: 'from-blue-500 to-indigo-500', light: 'bg-blue-50', iconColor: 'text-blue-500' },
  { id: 'challenge', icon: Target, label: 'Challenge Seru', desc: 'Tugas kecil harian', gradient: 'from-orange-400 to-amber-500', light: 'bg-orange-50', iconColor: 'text-orange-500' },
]

const meditasiList = [
  { title: 'Meditasi Pemula', duration: '5 menit', secs: 300, desc: 'Cocok untuk yang baru mulai bermeditasi', emoji: '🌱', color: 'from-teal-400 to-emerald-400' },
  { title: 'Relaksasi Tubuh', duration: '10 menit', secs: 600, desc: 'Body scan untuk melepas ketegangan otot', emoji: '🌊', color: 'from-blue-400 to-cyan-400' },
  { title: 'Meditasi Tidur', duration: '15 menit', secs: 900, desc: 'Bantu pikiran tenang sebelum tidur', emoji: '🌙', color: 'from-indigo-400 to-violet-400' },
  { title: 'Fokus & Konsentrasi', duration: '8 menit', secs: 480, desc: 'Tingkatkan fokus untuk produktivitas', emoji: '🎯', color: 'from-amber-400 to-orange-400' },
]

const journalPrompts = [
  'Apa 3 hal yang membuatmu bersyukur hari ini?',
  'Apa tantangan terbesar yang kamu hadapi hari ini?',
  'Bagaimana perasaanmu sekarang, dan mengapa?',
  'Apa yang ingin kamu capai besok?',
  'Siapa yang membuatmu merasa didukung hari ini?',
]

const challenges = [
  { title: 'Syukur Pagi', desc: 'Sebutkan 3 hal yang bikin kamu bersyukur hari ini', emoji: '🙏', points: 10 },
  { title: 'Hubungi Seseorang', desc: 'Kirim pesan ke teman atau keluarga yang sudah lama tidak dihubungi', emoji: '💌', points: 15 },
  { title: 'Jalan Kaki 10 Menit', desc: 'Luangkan waktu 10 menit untuk berjalan santai di luar', emoji: '🚶', points: 20 },
  { title: 'Digital Detox 1 Jam', desc: 'Jauhkan diri dari gadget selama 1 jam penuh', emoji: '📵', points: 25 },
]

const riwayat = [
  { icon: '📝', label: 'Tulis Jurnal', time: 'Hari ini, 08:30', dur: '10 mnt', color: 'bg-violet-100' },
  { icon: '🧘', label: 'Meditasi Pemula', time: 'Kemarin, 21:00', dur: '5 mnt', color: 'bg-teal-100' },
  { icon: '💨', label: 'Atur Napas 4-7-8', time: 'Kemarin, 14:15', dur: '8 mnt', color: 'bg-blue-100' },
  { icon: '🎯', label: 'Challenge Harian', time: '2 hari lalu', dur: '5 mnt', color: 'bg-orange-100' },
  { icon: '🧘', label: 'Relaksasi Tubuh', time: '3 hari lalu', dur: '10 mnt', color: 'bg-teal-100' },
]

function Jurnal({ onBack, showToast }) {
  const [text, setText] = useState('')
  const [saved, setSaved] = useState(false)
  const [promptIdx] = useState(Math.floor(Math.random() * journalPrompts.length))
  const [tag, setTag] = useState('pagi')
  const { journals, addJournal } = useJournalStore()
  const { logActivity } = useActivityStore()
  const tagEmoji = { pagi: '🌅', siang: '☀️', malam: '🌙' }

  function handleSave() {
    if (!text.trim()) return
    addJournal(text, tag)
    logActivity('jurnal', 'Tulis Jurnal', '~5 mnt')
    setSaved(true)
    showToast?.('Jurnal tersimpan 📝', 'success')
    setTimeout(() => { setSaved(false); setText('') }, 1500)
  }

  return (
    <div className="pb-24">
      <div className="bg-gradient-to-br from-violet-500 to-purple-600 px-5 pt-6 pb-6">
        <button onClick={onBack} className="flex items-center gap-1 text-violet-200 mb-4 text-sm">
          <ChevronLeft size={18} /> Kembali
        </button>
        <h2 className="text-white text-xl font-bold">📝 Tulis Jurnal</h2>
        <p className="text-violet-200 text-sm mt-1">{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
      </div>
      <div className="px-4 pt-4 space-y-4">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-5">
          <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold mb-2">WAKTU</p>
          <div className="flex gap-2 mb-4">
            {['pagi', 'siang', 'malam'].map(t => (
              <button key={t} onClick={() => setTag(t)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${tag === t ? 'bg-violet-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                {tagEmoji[t]} {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          <div className="bg-violet-50 rounded-2xl p-3 mb-3 border border-violet-100">
            <p className="text-xs text-violet-500 font-semibold mb-1">💭 PROMPT HARI INI</p>
            <p className="text-sm text-violet-700 italic">"{journalPrompts[promptIdx]}"</p>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Mulai menulis di sini... Tidak ada yang menghakimi, ini ruang amanmu 💜"
            className="w-full h-44 text-sm text-gray-700 dark:text-gray-200 resize-none outline-none leading-relaxed placeholder-gray-300"
          />
          <div className="flex justify-between items-center pt-3 border-t border-gray-100">
            <span className="text-xs text-gray-400 dark:text-gray-500">{text.length} karakter</span>
            <button
              onClick={handleSave}
              className={`px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all ${text.trim() ? 'bg-violet-500 active:scale-95' : 'bg-gray-200'}`}>
              {saved ? '✅ Tersimpan' : 'Simpan'}
            </button>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-5">
          <h3 className="font-bold text-gray-800 dark:text-white mb-3">Jurnal Sebelumnya</h3>
          {journals.length === 0 ? (
            <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-4">Belum ada jurnal. Mulai tulis sekarang! ✍️</p>
          ) : journals.slice(0, 5).map((j) => {
            const tagEmojis = { pagi: '🌅', siang: '☀️', malam: '🌙' }
            const d = new Date(j.date)
            const label = d.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })
            return (
              <div key={j.id} className="flex items-start gap-3 py-3 border-b border-gray-50 dark:border-gray-800 last:border-0">
                <div className="w-9 h-9 bg-violet-100 dark:bg-violet-900/30 rounded-xl flex items-center justify-center text-base flex-shrink-0">{tagEmojis[j.tag] || '📝'}</div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">{label}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5 leading-snug line-clamp-2">{j.text}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function Meditasi({ onBack, showToast }) {
  const [active, setActive] = useState(null)
  const [timeLeft, setTimeLeft] = useState(0)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)
  const { logActivity } = useActivityStore()

  function startSession(idx) {
    setActive(idx)
    setTimeLeft(meditasiList[idx].secs)
    setRunning(false)
  }

  function togglePlay() {
    if (running) {
      clearInterval(intervalRef.current)
      setRunning(false)
    } else {
      setRunning(true)
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
              clearInterval(intervalRef.current)
              setRunning(false)
              const m = meditasiList[active]
              logActivity('meditasi', m.title, m.duration)
              showToast?.(`Meditasi selesai! Luar biasa 🧘`, 'success')
              return 0
            }
          return t - 1
        })
      }, 1000)
    }
  }

  useEffect(() => () => clearInterval(intervalRef.current), [])

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
  const progress = active !== null ? 1 - timeLeft / meditasiList[active].secs : 0

  if (active !== null) {
    const m = meditasiList[active]
    return (
      <div className="pb-24">
        <div className={`bg-gradient-to-br ${m.color} px-5 pt-6 pb-6`}>
          <button onClick={() => { setActive(null); clearInterval(intervalRef.current); setRunning(false) }} className="flex items-center gap-1 text-white/70 mb-4 text-sm">
            <ChevronLeft size={18} /> Kembali
          </button>
          <h2 className="text-white text-xl font-bold">{m.emoji} {m.title}</h2>
          <p className="text-white/70 text-sm mt-1">{m.duration}</p>
        </div>
        <div className="px-4 pt-4">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-8 flex flex-col items-center gap-6">
            <div className="relative w-44 h-44">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#f3f4f6" strokeWidth="8" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="url(#grad)" strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress)}`}
                  strokeLinecap="round" className="transition-all duration-1000" />
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#14b8a6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl">{m.emoji}</span>
                <span className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{fmt(timeLeft)}</span>
                <span className="text-xs text-gray-400 dark:text-gray-500">tersisa</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">{running ? 'Fokus pada napasmu... 🌬️' : timeLeft === 0 ? '🎉 Sesi selesai! Luar biasa!' : 'Siap untuk memulai?'}</p>
            <button onClick={togglePlay} disabled={timeLeft === 0}
              className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-all active:scale-95 ${timeLeft === 0 ? 'bg-gray-200' : 'bg-gradient-to-br from-teal-500 to-cyan-400'}`}>
              {running ? <Pause size={24} /> : <Play size={24} />}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-24">
      <div className="bg-gradient-to-br from-teal-500 to-cyan-500 px-5 pt-6 pb-6">
        <button onClick={onBack} className="flex items-center gap-1 text-teal-100 mb-4 text-sm"><ChevronLeft size={18} /> Kembali</button>
        <h2 className="text-white text-xl font-bold">🧘 Meditasi Terpandu</h2>
        <p className="text-teal-100 text-sm mt-1">Pilih sesi yang sesuai kebutuhanmu</p>
      </div>
      <div className="px-4 pt-4 space-y-3">
        {meditasiList.map((m, i) => (
          <button key={i} onClick={() => startSession(i)}
            className="w-full bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-50 flex items-center gap-4 active:scale-95 transition-transform text-left">
            <div className={`w-14 h-14 bg-gradient-to-br ${m.color} rounded-2xl flex items-center justify-center text-2xl shadow-sm`}>{m.emoji}</div>
            <div className="flex-1">
              <p className="font-bold text-gray-800 dark:text-white">{m.title}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{m.desc}</p>
              <div className="flex items-center gap-1 mt-1.5">
                <Clock size={12} className="text-teal-500" />
                <span className="text-xs text-teal-500 font-medium">{m.duration}</span>
              </div>
            </div>
            <div className="w-8 h-8 bg-teal-50 rounded-full flex items-center justify-center">
              <Play size={14} className="text-teal-500 ml-0.5" />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function Napas({ onBack, showToast }) {
  const [phase, setPhase] = useState(-1)
  const [count, setCount] = useState(0)
  const [cycles, setCycles] = useState(0)
  const [technique, setTechnique] = useState('478')
  const { logActivity } = useActivityStore()

  const techniques = {
    '478': { name: '4-7-8', phases: ['Tarik Napas', 'Tahan', 'Buang Napas'], durations: [4, 7, 8], colors: ['from-blue-400 to-cyan-400', 'from-violet-400 to-purple-400', 'from-teal-400 to-emerald-400'] },
    'box': { name: 'Box Breathing', phases: ['Tarik Napas', 'Tahan', 'Buang Napas', 'Tahan'], durations: [4, 4, 4, 4], colors: ['from-blue-400 to-cyan-400', 'from-violet-400 to-purple-400', 'from-teal-400 to-emerald-400', 'from-amber-400 to-orange-400'] },
  }

  const tech = techniques[technique]

  useEffect(() => {
    if (phase < 0) return
    setCount(tech.durations[phase])
    const interval = setInterval(() => {
      setCount(c => {
        if (c <= 1) {
          clearInterval(interval)
          const next = (phase + 1) % tech.phases.length
          if (next === 0) {
              setCycles(cy => {
                const newCy = cy + 1
                if (newCy === 3) {
                  logActivity('napas', `Latihan ${techniques[technique].name}`, '~5 mnt')
                  showToast?.('Latihan napas selesai! 💨', 'success')
                }
                return newCy
              })
            }
          setTimeout(() => setPhase(next), 300)
          return 0
        }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [phase])

  const isRunning = phase >= 0
  const scale = phase === 0 ? 'scale-125' : phase === 2 ? 'scale-90' : 'scale-110'
  const gradient = phase >= 0 ? tech.colors[phase] : 'from-gray-300 to-gray-400'

  return (
    <div className="pb-24">
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 px-5 pt-6 pb-6">
        <button onClick={onBack} className="flex items-center gap-1 text-blue-200 mb-4 text-sm"><ChevronLeft size={18} /> Kembali</button>
        <h2 className="text-white text-xl font-bold">💨 Latihan Pernapasan</h2>
        <p className="text-blue-200 text-sm mt-1">Pilih teknik yang ingin kamu coba</p>
      </div>
      <div className="px-4 pt-4 space-y-4">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-4">
          <div className="flex gap-2">
            {Object.entries(techniques).map(([key, t]) => (
              <button key={key} onClick={() => { setTechnique(key); setPhase(-1); setCycles(0) }}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${technique === key ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                {t.name}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-8 flex flex-col items-center gap-6">
          <div className={`w-44 h-44 rounded-full bg-gradient-to-br ${gradient} flex flex-col items-center justify-center transition-all duration-1000 ${isRunning ? scale : 'scale-100'} shadow-xl`}>
            <span className="text-white text-4xl font-bold">{isRunning ? count : '💨'}</span>
            <span className="text-white/80 text-sm mt-1">{isRunning ? tech.phases[phase] : 'Siap?'}</span>
          </div>

          {isRunning && (
            <div className="flex gap-2">
              {tech.phases.map((p, i) => (
                <div key={i} className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${phase === i ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                  {p}
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{cycles}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">Siklus</p>
            </div>
            <button
              onClick={() => phase < 0 ? setPhase(0) : setPhase(-1)}
              className={`px-8 py-3 rounded-2xl font-bold text-white transition-all active:scale-95 ${isRunning ? 'bg-rose-400' : 'bg-gradient-to-r from-blue-500 to-indigo-500'}`}>
              {isRunning ? 'Berhenti' : 'Mulai'}
            </button>
          </div>
        </div>

        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
          <p className="text-sm font-bold text-blue-700 mb-2">Teknik {tech.name}</p>
          {tech.phases.map((p, i) => (
            <div key={i} className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</div>
              <p className="text-sm text-blue-700">{p} — <span className="font-semibold">{tech.durations[i]} detik</span></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Challenge({ onBack, showToast }) {
  const { points, completeChallenge, isDoneToday } = useChallengeStore()
  const { logActivity } = useActivityStore()
  const { streak } = useActivityStore()
  const today = challenges[new Date().getDay() % challenges.length]

  function complete(i) {
    const ok = completeChallenge(i, challenges[i].points)
    if (ok) {
      logActivity('challenge', challenges[i].title, '~5 mnt')
      showToast?.(`+${challenges[i].points} poin! Challenge selesai 🎯`, 'success')
    }
  }

  return (
    <div className="pb-24">
      <div className="bg-gradient-to-br from-orange-400 to-amber-500 px-5 pt-6 pb-6">
        <button onClick={onBack} className="flex items-center gap-1 text-orange-100 mb-4 text-sm"><ChevronLeft size={18} /> Kembali</button>
        <h2 className="text-white text-xl font-bold">🎯 Daily Challenge</h2>
        <p className="text-orange-100 text-sm mt-1">Tugas kecil untuk hari yang lebih baik</p>
      </div>
      <div className="px-4 pt-4 space-y-4">
        {/* Points */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold">TOTAL POIN</p>
            <p className="text-3xl font-bold text-amber-500">{points} <span className="text-base text-gray-400">pts</span></p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold">STREAK</p>
            <div className="flex items-center gap-1 justify-end">
              <Flame size={18} className="text-orange-400" />
              <p className="text-2xl font-bold text-orange-400">{streak}</p>
            </div>
          </div>
        </div>

        {/* Challenge Hari Ini */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs bg-amber-400 text-white px-2 py-0.5 rounded-full font-semibold">CHALLENGE HARI INI</span>
          </div>
          <div className="flex items-start gap-4">
            <div className="text-4xl">{today.emoji}</div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 dark:text-white dark:text-white text-base">{today.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{today.desc}</p>
              <p className="text-xs text-amber-500 font-semibold mt-2">+{today.points} poin</p>
            </div>
          </div>
          <button
            onClick={() => complete(new Date().getDay() % challenges.length)}
            className={`w-full mt-4 py-3 rounded-2xl font-bold text-sm transition-all ${isDoneToday(new Date().getDay() % challenges.length) ? 'bg-emerald-400 text-white' : 'bg-gradient-to-r from-orange-400 to-amber-500 text-white active:scale-95'}`}>
            {isDoneToday(new Date().getDay() % challenges.length) ? '✅ Selesai! Keren banget!' : 'Tandai Selesai'}
          </button>
        </div>

        {/* Semua Challenge */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-5">
          <h3 className="font-bold text-gray-800 dark:text-white dark:text-white mb-3">Semua Challenge</h3>
          {challenges.map((c, i) => (
            <div key={i} className={`flex items-center gap-3 p-3 rounded-2xl mb-2 transition-all ${isDoneToday(i) ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800' : 'bg-gray-50 dark:bg-gray-800'}`}>
              <div className="text-2xl">{c.emoji}</div>
              <div className="flex-1">
                <p className={`text-sm font-semibold ${isDoneToday(i) ? 'text-emerald-600 line-through' : 'text-gray-700 dark:text-gray-200'}`}>{c.title}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{c.desc}</p>
              </div>
              <button onClick={() => complete(i)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isDoneToday(i) ? 'bg-emerald-400 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'}`}>
                <Check size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Streak */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-5">
          <h3 className="font-bold text-gray-800 dark:text-white dark:text-white mb-3">🔥 Streak Minggu Ini</h3>
          <div className="flex gap-2">
            {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((d, i) => (
              <div key={d} className="flex-1 flex flex-col items-center gap-1.5">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${i < 5 ? 'bg-gradient-to-br from-orange-400 to-amber-500 text-white shadow-sm' : 'bg-gray-100 text-gray-300'}`}>
                  {i < 5 ? '✓' : '·'}
                </div>
                <span className="text-xs text-gray-400 dark:text-gray-500">{d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Aktivitas({ showToast }) {
  const [view, setView] = useState('main')
  const { activities, streak, getWeekStats } = useActivityStore()
  const weekStats = getWeekStats()

  if (view === 'jurnal') return <Jurnal onBack={() => setView('main')} showToast={showToast} />
  if (view === 'meditasi') return <Meditasi onBack={() => setView('main')} showToast={showToast} />
  if (view === 'napas') return <Napas onBack={() => setView('main')} showToast={showToast} />
  if (view === 'challenge') return <Challenge onBack={() => setView('main')} showToast={showToast} />

  return (
    <div className="pb-24">
      <div className="bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 px-5 pt-6 pb-6">
        <h1 className="text-white text-2xl font-bold">Aktivitas Self-Care</h1>
        <p className="text-violet-200 text-sm mt-1">Pilih aktivitas untuk hari ini 💜</p>
      </div>
      <div className="px-4 pt-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {activityCards.map((a) => (
            <button key={a.id} onClick={() => setView(a.id)}
              className={`bg-gradient-to-br ${a.gradient} rounded-2xl p-5 text-white text-left active:scale-95 transition-transform shadow-md`}>
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-3">
                <a.icon size={22} />
              </div>
              <p className="font-bold text-sm">{a.label}</p>
              <p className="text-xs opacity-75 mt-0.5">{a.desc}</p>
            </button>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800 dark:text-white">Pencapaian Minggu Ini 🏆</h2>
            <div className="flex items-center gap-1 bg-orange-50 dark:bg-orange-900/30 px-2 py-1 rounded-xl">
              <Flame size={14} className="text-orange-400" />
              <span className="text-xs font-bold text-orange-500">{streak} hari</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { e: '📝', l: 'Jurnal', n: weekStats.jurnal, max: 7 },
              { e: '🧘', l: 'Meditasi', n: weekStats.meditasi, max: 7 },
              { e: '🎯', l: 'Challenge', n: weekStats.challenge, max: 7 }
            ].map((s) => (
              <div key={s.l} className="bg-gray-50 rounded-2xl p-3 text-center">
                <div className="text-2xl mb-1">{s.e}</div>
                <div className="text-xl font-bold text-teal-600">{s.n}x</div>
                <div className="text-xs text-gray-400 dark:text-gray-500">{s.l}</div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                  <div className="bg-teal-400 h-1.5 rounded-full" style={{ width: `${(s.n / s.max) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-5">
          <h2 className="font-bold text-gray-800 dark:text-white mb-3">Riwayat Aktivitas</h2>
          {activities.length === 0 ? (
            <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-4">Belum ada aktivitas. Yuk mulai! 🌱</p>
          ) : activities.slice(0, 8).map((r) => {
            const icons = { jurnal: { icon: '📝', color: 'bg-violet-100 dark:bg-violet-900/30' }, meditasi: { icon: '🧘', color: 'bg-teal-100 dark:bg-teal-900/30' }, napas: { icon: '💨', color: 'bg-blue-100 dark:bg-blue-900/30' }, challenge: { icon: '🎯', color: 'bg-orange-100 dark:bg-orange-900/30' } }
            const cfg = icons[r.type] || { icon: '✨', color: 'bg-gray-100' }
            const d = new Date(r.date)
            const timeLabel = d.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' }) + ', ' + d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
            return (
              <div key={r.id} className="flex items-center gap-3 py-3 border-b border-gray-50 dark:border-gray-800 last:border-0">
                <div className={`w-11 h-11 ${cfg.color} rounded-2xl flex items-center justify-center text-xl flex-shrink-0`}>{cfg.icon}</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">{r.label}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{timeLabel}</p>
                </div>
                <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-xl">
                  <Clock size={11} className="text-gray-400" />
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{r.duration}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
