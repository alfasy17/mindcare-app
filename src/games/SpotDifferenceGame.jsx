import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'

const levels = [
  {
    id: 'city', title: 'Pemandangan Kota', emoji: '🏙️', totalDiff: 5,
    base: <>
      <rect x="0" y="0" width="280" height="120" fill="#bfdbfe"/>
      <circle cx="230" cy="35" r="22" fill="#fde68a"/>
      <ellipse cx="60" cy="50" rx="35" ry="18" fill="white"/>
      <ellipse cx="90" cy="42" rx="25" ry="15" fill="white"/>
      <rect x="10" y="70" width="50" height="130" fill="#6b7280"/>
      <rect x="15" y="78" width="12" height="12" fill="#fde68a"/>
      <rect x="33" y="78" width="12" height="12" fill="#fde68a"/>
      <rect x="15" y="98" width="12" height="12" fill="#fde68a"/>
      <rect x="33" y="98" width="12" height="12" fill="#93c5fd"/>
      <rect x="90" y="50" width="60" height="150" fill="#4b5563"/>
      <rect x="97" y="60" width="14" height="14" fill="#fde68a"/>
      <rect x="119" y="60" width="14" height="14" fill="#fde68a"/>
      <rect x="97" y="82" width="14" height="14" fill="#93c5fd"/>
      <rect x="119" y="82" width="14" height="14" fill="#fde68a"/>
      <rect x="118" y="35" width="4" height="18" fill="#374151"/>
      <rect x="190" y="80" width="70" height="120" fill="#6b7280"/>
      <rect x="198" y="90" width="14" height="14" fill="#fde68a"/>
      <rect x="220" y="90" width="14" height="14" fill="#fde68a"/>
      <rect x="242" y="90" width="14" height="14" fill="#fde68a"/>
      <rect x="198" y="112" width="14" height="12" fill="#93c5fd"/>
      <rect x="220" y="112" width="14" height="12" fill="#fde68a"/>
      <rect x="0" y="175" width="280" height="25" fill="#374151"/>
      <rect x="20" y="185" width="30" height="5" fill="#fde68a"/>
      <rect x="80" y="185" width="30" height="5" fill="#fde68a"/>
      <rect x="140" y="185" width="30" height="5" fill="#fde68a"/>
      <rect x="68" y="145" width="8" height="30" fill="#92400e"/>
      <circle cx="72" cy="135" r="18" fill="#16a34a"/>
      <rect x="168" y="145" width="8" height="30" fill="#92400e"/>
      <circle cx="172" cy="135" r="18" fill="#16a34a"/>
    </>,
    diff: <>
      <rect x="0" y="0" width="280" height="120" fill="#93c5fd"/>
      {/* no sun */}
      <ellipse cx="60" cy="50" rx="35" ry="18" fill="white"/>
      <ellipse cx="90" cy="42" rx="25" ry="15" fill="white"/>
      <rect x="10" y="70" width="50" height="130" fill="#6b7280"/>
      <rect x="15" y="78" width="12" height="12" fill="#fde68a"/>
      <rect x="33" y="78" width="12" height="12" fill="#fde68a"/>
      <rect x="15" y="98" width="12" height="12" fill="#fde68a"/>
      <rect x="33" y="98" width="12" height="12" fill="#fca5a5"/>
      <rect x="90" y="50" width="60" height="150" fill="#4b5563"/>
      <rect x="97" y="60" width="14" height="14" fill="#fde68a"/>
      <rect x="119" y="60" width="14" height="14" fill="#fde68a"/>
      <rect x="97" y="82" width="14" height="14" fill="#93c5fd"/>
      <rect x="119" y="82" width="14" height="14" fill="#fde68a"/>
      {/* no antenna */}
      <rect x="190" y="80" width="70" height="120" fill="#6b7280"/>
      <rect x="198" y="90" width="14" height="14" fill="#fde68a"/>
      <rect x="220" y="90" width="14" height="14" fill="#fde68a"/>
      <rect x="242" y="90" width="14" height="14" fill="#fde68a"/>
      <rect x="198" y="112" width="14" height="12" fill="#93c5fd"/>
      <rect x="220" y="112" width="14" height="12" fill="#fca5a5"/>
      <rect x="0" y="175" width="280" height="25" fill="#374151"/>
      <rect x="20" y="185" width="30" height="5" fill="#fde68a"/>
      <rect x="80" y="185" width="30" height="5" fill="#fde68a"/>
      <rect x="140" y="185" width="30" height="5" fill="#fde68a"/>
      <rect x="68" y="145" width="8" height="30" fill="#92400e"/>
      <circle cx="72" cy="135" r="18" fill="#7c3aed"/>
      <rect x="168" y="145" width="8" height="30" fill="#92400e"/>
      <circle cx="172" cy="135" r="18" fill="#16a34a"/>
    </>,
    differences: [
      { id:1, cx:230, cy:35, r:26, label:'Matahari hilang' },
      { id:2, cx:39, cy:104, r:14, label:'Warna jendela berbeda' },
      { id:3, cx:120, cy:44, r:14, label:'Antena hilang' },
      { id:4, cx:227, cy:118, r:14, label:'Warna jendela berbeda' },
      { id:5, cx:72, cy:135, r:22, label:'Warna pohon berbeda' },
    ]
  },
  {
    id: 'beach', title: 'Pantai Tropis', emoji: '🏖️', totalDiff: 5,
    base: <>
      <rect x="0" y="0" width="280" height="110" fill="#bae6fd"/>
      <circle cx="140" cy="45" r="30" fill="#fde68a"/>
      <rect x="0" y="110" width="280" height="90" fill="#38bdf8"/>
      <rect x="0" y="175" width="280" height="25" fill="#fde68a"/>
      <ellipse cx="60" cy="175" rx="50" ry="12" fill="#fbbf24"/>
      <ellipse cx="220" cy="175" rx="50" ry="12" fill="#fbbf24"/>
      <rect x="55" y="120" width="6" height="55" fill="#92400e"/>
      <path d="M58,120 Q40,100 25,110 Q40,118 58,120 Z" fill="#16a34a"/>
      <path d="M58,120 Q76,100 90,110 Q76,118 58,120 Z" fill="#16a34a"/>
      <path d="M58,120 Q50,95 60,85 Q65,100 58,120 Z" fill="#16a34a"/>
      <rect x="130" y="145" width="20" height="30" fill="#ef4444"/>
      <path d="M130,145 L140,130 L150,145 Z" fill="#ffffff"/>
      <ellipse cx="60" cy="40" rx="28" ry="14" fill="white"/>
      <ellipse cx="200" cy="30" rx="32" ry="16" fill="white"/>
      <circle cx="220" cy="155" r="8" fill="#f97316"/>
      <circle cx="240" cy="160" r="6" fill="#ec4899"/>
    </>,
    diff: <>
      <rect x="0" y="0" width="280" height="110" fill="#bae6fd"/>
      <circle cx="140" cy="45" r="30" fill="#fde68a"/>
      <rect x="0" y="110" width="280" height="90" fill="#38bdf8"/>
      <rect x="0" y="175" width="280" height="25" fill="#fde68a"/>
      <ellipse cx="60" cy="175" rx="50" ry="12" fill="#fbbf24"/>
      <ellipse cx="220" cy="175" rx="50" ry="12" fill="#fbbf24"/>
      <rect x="55" y="120" width="6" height="55" fill="#92400e"/>
      <path d="M58,120 Q40,100 25,110 Q40,118 58,120 Z" fill="#16a34a"/>
      <path d="M58,120 Q76,100 90,110 Q76,118 58,120 Z" fill="#f97316"/>
      <path d="M58,120 Q50,95 60,85 Q65,100 58,120 Z" fill="#16a34a"/>
      {/* boat color changed */}
      <rect x="130" y="145" width="20" height="30" fill="#3b82f6"/>
      <path d="M130,145 L140,130 L150,145 Z" fill="#ffffff"/>
      {/* cloud missing */}
      <ellipse cx="200" cy="30" rx="32" ry="16" fill="white"/>
      {/* extra star */}
      <circle cx="220" cy="155" r="8" fill="#f97316"/>
      <circle cx="240" cy="160" r="6" fill="#ec4899"/>
      <circle cx="170" cy="150" r="7" fill="#a78bfa"/>
    </>,
    differences: [
      { id:1, cx:83, cy:108, r:18, label:'Warna daun berbeda' },
      { id:2, cx:140, cy:158, r:18, label:'Warna perahu berbeda' },
      { id:3, cx:60, cy:40, r:22, label:'Awan hilang' },
      { id:4, cx:170, cy:150, r:16, label:'Bola ekstra muncul' },
      { id:5, cx:140, cy:45, r:10, label:'Ukuran matahari berbeda' },
    ]
  },
  {
    id: 'forest', title: 'Hutan Ajaib', emoji: '🌲', totalDiff: 5,
    base: <>
      <rect x="0" y="0" width="280" height="100" fill="#d1fae5"/>
      <circle cx="50" cy="40" r="18" fill="#fde68a"/>
      <rect x="0" y="100" width="280" height="100" fill="#86efac"/>
      <rect x="30" y="60" width="12" height="140" fill="#92400e"/>
      <path d="M36,60 L10,100 L62,100 Z" fill="#16a34a"/>
      <path d="M36,80 L5,125 L67,125 Z" fill="#15803d"/>
      <rect x="120" y="40" width="14" height="160" fill="#92400e"/>
      <path d="M127,40 L98,90 L156,90 Z" fill="#16a34a"/>
      <path d="M127,65 L92,118 L162,118 Z" fill="#15803d"/>
      <rect x="220" y="70" width="12" height="130" fill="#92400e"/>
      <path d="M226,70 L200,112 L252,112 Z" fill="#16a34a"/>
      <path d="M226,90 L196,135 L256,135 Z" fill="#15803d"/>
      <circle cx="80" cy="170" r="10" fill="#fca5a5"/>
      <circle cx="160" cy="180" r="8" fill="#fdba74"/>
      <circle cx="200" cy="165" r="9" fill="#c4b5fd"/>
      <path d="M60,150 Q70,140 80,150 Q70,160 60,150 Z M64,150 Q70,143 76,150 Z" fill="#f97316"/>
    </>,
    diff: <>
      <rect x="0" y="0" width="280" height="100" fill="#d1fae5"/>
      {/* no sun */}
      <rect x="0" y="100" width="280" height="100" fill="#86efac"/>
      <rect x="30" y="60" width="12" height="140" fill="#92400e"/>
      <path d="M36,60 L10,100 L62,100 Z" fill="#16a34a"/>
      <path d="M36,80 L5,125 L67,125 Z" fill="#15803d"/>
      <rect x="120" y="40" width="14" height="160" fill="#92400e"/>
      <path d="M127,40 L98,90 L156,90 Z" fill="#f97316"/>
      <path d="M127,65 L92,118 L162,118 Z" fill="#15803d"/>
      <rect x="220" y="70" width="12" height="130" fill="#92400e"/>
      <path d="M226,70 L200,112 L252,112 Z" fill="#16a34a"/>
      <path d="M226,90 L196,135 L256,135 Z" fill="#15803d"/>
      <circle cx="80" cy="170" r="10" fill="#fca5a5"/>
      <circle cx="160" cy="180" r="14" fill="#fdba74"/>
      <circle cx="200" cy="165" r="9" fill="#c4b5fd"/>
      <path d="M60,150 Q70,140 80,150 Q70,160 60,150 Z M64,150 Q70,143 76,150 Z" fill="#f97316"/>
      <circle cx="240" cy="185" r="8" fill="#fde68a"/>
    </>,
    differences: [
      { id:1, cx:50, cy:40, r:22, label:'Matahari hilang' },
      { id:2, cx:127, cy:65, r:30, label:'Warna pohon tengah berbeda' },
      { id:3, cx:160, cy:180, r:18, label:'Ukuran bunga berbeda' },
      { id:4, cx:240, cy:185, r:16, label:'Bunga ekstra muncul' },
      { id:5, cx:127, cy:40, r:15, label:'Ukuran pohon berbeda' },
    ]
  },
]

export default function SpotDifferenceGame({ onBack }) {
  const [levelIdx, setLevelIdx] = useState(null)
  const [found, setFound] = useState([])
  const [wrong, setWrong] = useState(null)
  const [hints, setHints] = useState([])

  function selectLevel(i) { setLevelIdx(i); setFound([]); setHints([]) }

  function handleClickRight(e) {
    const level = levels[levelIdx]
    const svg = e.currentTarget
    const rect = svg.getBoundingClientRect()
    const scaleX = 280 / rect.width
    const scaleY = 200 / rect.height
    const x = (e.clientX - rect.left) * scaleX
    const y = (e.clientY - rect.top) * scaleY
    for (const diff of level.differences) {
      if (found.includes(diff.id)) continue
      if (Math.sqrt((x - diff.cx) ** 2 + (y - diff.cy) ** 2) <= diff.r + 8) {
        setFound(f => [...f, diff.id]); return
      }
    }
    setWrong({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    setTimeout(() => setWrong(null), 600)
  }

  function showHint() {
    const level = levels[levelIdx]
    const unfound = level.differences.filter(d => !found.includes(d.id) && !hints.includes(d.id))
    if (unfound.length) setHints(h => [...h, unfound[0].id])
  }

  // Level select
  if (levelIdx === null) {
    return (
      <div className="pb-24">
        <div className="bg-gradient-to-br from-violet-500 to-indigo-600 px-5 pt-6 pb-6">
          <button onClick={onBack} className="flex items-center gap-1 text-violet-200 text-sm mb-3">
            <ChevronLeft size={18} /> Kembali
          </button>
          <h2 className="text-white text-xl font-bold">🔍 Spot the Difference</h2>
          <p className="text-violet-200 text-sm mt-0.5">Pilih level yang ingin dimainkan</p>
        </div>
        <div className="px-4 pt-4 space-y-3">
          {levels.map((l, i) => (
            <button key={l.id} onClick={() => selectLevel(i)}
              className="w-full bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4 active:scale-95 transition-transform text-left">
              <div className="w-14 h-14 bg-violet-50 dark:bg-violet-900/30 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">{l.emoji}</div>
              <div className="flex-1">
                <p className="font-bold text-gray-800 dark:text-white">{l.title}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Temukan {l.totalDiff} perbedaan</p>
              </div>
              <span className="text-gray-300 dark:text-gray-600 text-lg">›</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  const level = levels[levelIdx]
  const won = found.length === level.totalDiff

  return (
    <div className="pb-24">
      <div className="bg-gradient-to-br from-violet-500 to-indigo-600 px-5 pt-6 pb-6">
        <div className="flex items-center justify-between mb-2">
          <button onClick={() => setLevelIdx(null)} className="flex items-center gap-1 text-violet-200 text-sm">
            <ChevronLeft size={18} /> Pilih Level
          </button>
          <button onClick={showHint} disabled={won}
            className="bg-white/20 text-white text-xs px-3 py-1.5 rounded-xl font-medium disabled:opacity-40">
            💡 Hint
          </button>
        </div>
        <h2 className="text-white text-xl font-bold">{level.emoji} {level.title}</h2>
        <p className="text-violet-200 text-sm mt-0.5">Temukan {level.totalDiff} perbedaan</p>
      </div>

      <div className="px-4 pt-4 space-y-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="flex gap-2">
            {Array.from({ length: level.totalDiff }).map((_, i) => (
              <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${i < found.length ? 'bg-emerald-400 text-white scale-110' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
                {i < found.length ? '✓' : i + 1}
              </div>
            ))}
          </div>
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">{found.length}/{level.totalDiff}</p>
        </div>

        {won && (
          <div className="bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 rounded-2xl p-4 text-center">
            <p className="text-emerald-700 dark:text-emerald-400 font-bold text-lg">🎉 Semua perbedaan ditemukan!</p>
            <button onClick={() => setLevelIdx(null)} className="mt-2 bg-emerald-500 text-white text-sm px-4 py-2 rounded-xl font-medium">Coba Level Lain</button>
          </div>
        )}

        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-3 border border-gray-100 dark:border-gray-800">
          <p className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-2 text-center">GAMBAR ASLI</p>
          <svg viewBox="0 0 280 200" className="w-full rounded-2xl border border-gray-100 dark:border-gray-700">{level.base}</svg>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-3 border border-gray-100 dark:border-gray-800">
          <p className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-2 text-center">TEMUKAN PERBEDAANNYA 👆</p>
          <div className="relative">
            <svg viewBox="0 0 280 200" className="w-full rounded-2xl border border-gray-100 dark:border-gray-700 cursor-crosshair" onClick={handleClickRight}>
              {level.diff}
              {found.map(id => {
                const d = level.differences.find(x => x.id === id)
                return <circle key={id} cx={d.cx} cy={d.cy} r={d.r + 6} fill="none" stroke="#22c55e" strokeWidth="3" strokeDasharray="6,3" className="animate-pulse" />
              })}
              {hints.filter(id => !found.includes(id)).map(id => {
                const d = level.differences.find(x => x.id === id)
                return <circle key={id} cx={d.cx} cy={d.cy} r={d.r + 10} fill="rgba(251,191,36,0.2)" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4,4" />
              })}
            </svg>
            {wrong && (
              <div className="absolute pointer-events-none" style={{ left: wrong.x - 12, top: wrong.y - 12 }}>
                <div className="w-6 h-6 rounded-full bg-rose-400/60 border-2 border-rose-500 animate-ping" />
              </div>
            )}
          </div>
        </div>

        {found.length > 0 && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-2">DITEMUKAN</p>
            {found.map(id => {
              const d = level.differences.find(x => x.id === id)
              return (
                <div key={id} className="flex items-center gap-2 py-1.5">
                  <div className="w-5 h-5 bg-emerald-400 rounded-full flex items-center justify-center text-white text-xs font-bold">✓</div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{d.label}</p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
