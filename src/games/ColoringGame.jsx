import { useState } from 'react'
import { ChevronLeft, RotateCcw } from 'lucide-react'

const palette = [
  '#ef4444','#f97316','#eab308','#22c55e',
  '#14b8a6','#3b82f6','#8b5cf6','#ec4899',
  '#ffffff','#d1d5db','#6b7280','#1f2937',
  '#fde68a','#bbf7d0','#bfdbfe','#fce7f3',
]

const models = [
  {
    id: 'nature', label: 'Pemandangan Alam', emoji: '🏔️',
    shapes: [
      { id: 'sky', d: 'M0,0 H300 V130 H0 Z', fill: '#bfdbfe' },
      { id: 'sun', d: 'M250,35 m-22,0 a22,22 0 1,0 44,0 a22,22 0 1,0 -44,0', fill: '#fde68a' },
      { id: 'cloud1', d: 'M30,55 Q40,42 55,52 Q60,38 75,48 Q90,36 95,52 Q105,48 100,62 Q85,70 55,68 Q35,70 30,55 Z', fill: '#ffffff' },
      { id: 'cloud2', d: 'M150,42 Q162,30 177,40 Q182,26 197,36 Q212,24 217,40 Q227,36 224,50 Q210,58 180,56 Q157,58 150,42 Z', fill: '#ffffff' },
      { id: 'mtn1', d: 'M0,200 L90,95 L180,200 Z', fill: '#86efac' },
      { id: 'mtn2', d: 'M110,200 L220,75 L300,200 Z', fill: '#6ee7b7' },
      { id: 'snow', d: 'M220,75 L200,112 L240,112 Z', fill: '#ffffff' },
      { id: 'ground', d: 'M0,182 Q75,168 150,178 Q225,168 300,182 L300,240 H0 Z', fill: '#86efac' },
      { id: 'trunk1', d: 'M55,182 H65 V210 H55 Z', fill: '#92400e' },
      { id: 'leaves1', d: 'M60,138 L38,182 H82 Z', fill: '#16a34a' },
      { id: 'leaves1b', d: 'M60,155 L33,195 H87 Z', fill: '#16a34a' },
      { id: 'trunk2', d: 'M235,182 H245 V210 H235 Z', fill: '#92400e' },
      { id: 'leaves2', d: 'M240,138 L218,182 H262 Z', fill: '#16a34a' },
      { id: 'leaves2b', d: 'M240,155 L213,195 H267 Z', fill: '#16a34a' },
      { id: 'river', d: 'M118,240 Q128,208 138,193 Q148,183 158,193 Q168,208 178,240 Z', fill: '#7dd3fc' },
      { id: 'flower1', d: 'M85,198 m-7,0 a7,7 0 1,0 14,0 a7,7 0 1,0 -14,0', fill: '#fca5a5' },
      { id: 'flower2', d: 'M200,203 m-6,0 a6,6 0 1,0 12,0 a6,6 0 1,0 -12,0', fill: '#fdba74' },
    ]
  },
  {
    id: 'ocean', label: 'Pemandangan Laut', emoji: '🌊',
    shapes: [
      { id: 'sky2', d: 'M0,0 H300 V110 H0 Z', fill: '#bae6fd' },
      { id: 'sun2', d: 'M150,45 m-28,0 a28,28 0 1,0 56,0 a28,28 0 1,0 -56,0', fill: '#fde68a' },
      { id: 'sea', d: 'M0,110 Q75,95 150,108 Q225,95 300,110 L300,240 H0 Z', fill: '#38bdf8' },
      { id: 'wave1', d: 'M0,130 Q37,118 75,130 Q112,142 150,130 Q187,118 225,130 Q262,142 300,130 L300,145 Q262,157 225,145 Q187,133 150,145 Q112,157 75,145 Q37,133 0,145 Z', fill: '#7dd3fc' },
      { id: 'wave2', d: 'M0,160 Q37,148 75,160 Q112,172 150,160 Q187,148 225,160 Q262,172 300,160 L300,175 Q262,187 225,175 Q187,163 150,175 Q112,187 75,175 Q37,163 0,175 Z', fill: '#bae6fd' },
      { id: 'island', d: 'M100,108 Q150,88 200,108 Z', fill: '#86efac' },
      { id: 'palm_trunk', d: 'M148,108 Q152,90 155,70', fill: 'none', stroke: '#92400e', strokeWidth: '5', strokeLinecap: 'round' },
      { id: 'palm_leaf1', d: 'M155,70 Q175,55 185,65 Q170,72 155,70 Z', fill: '#16a34a' },
      { id: 'palm_leaf2', d: 'M155,70 Q135,55 125,65 Q140,72 155,70 Z', fill: '#16a34a' },
      { id: 'palm_leaf3', d: 'M155,70 Q165,48 178,52 Q165,62 155,70 Z', fill: '#16a34a' },
      { id: 'boat', d: 'M50,125 L90,125 L85,135 L55,135 Z', fill: '#fde68a' },
      { id: 'sail', d: 'M70,125 L70,100 L90,125 Z', fill: '#ffffff' },
      { id: 'cloud_sea1', d: 'M20,40 Q30,28 45,38 Q50,24 65,34 Q80,22 85,38 Q95,34 92,48 Q78,56 48,54 Q25,56 20,40 Z', fill: '#ffffff' },
      { id: 'cloud_sea2', d: 'M200,30 Q210,18 225,28 Q230,14 245,24 Q260,12 265,28 Q275,24 272,38 Q258,46 228,44 Q205,46 200,30 Z', fill: '#ffffff' },
      { id: 'fish1', d: 'M60,180 Q75,173 85,180 Q75,187 60,180 Z', fill: '#f97316' },
      { id: 'fish2', d: 'M200,195 Q215,188 225,195 Q215,202 200,195 Z', fill: '#ec4899' },
    ]
  },
  {
    id: 'space', label: 'Luar Angkasa', emoji: '🚀',
    shapes: [
      { id: 'bg_space', d: 'M0,0 H300 V240 H0 Z', fill: '#0f172a' },
      { id: 'planet1', d: 'M80,80 m-45,0 a45,45 0 1,0 90,0 a45,45 0 1,0 -90,0', fill: '#7c3aed' },
      { id: 'ring', d: 'M20,80 Q80,55 140,80 Q80,105 20,80 Z', fill: 'none', stroke: '#a78bfa', strokeWidth: '4' },
      { id: 'planet2', d: 'M230,160 m-30,0 a30,30 0 1,0 60,0 a30,30 0 1,0 -60,0', fill: '#0ea5e9' },
      { id: 'moon', d: 'M240,50 m-20,0 a20,20 0 1,0 40,0 a20,20 0 1,0 -40,0', fill: '#fde68a' },
      { id: 'rocket_body', d: 'M148,130 L152,130 L155,170 L145,170 Z', fill: '#e2e8f0' },
      { id: 'rocket_top', d: 'M145,130 L150,110 L155,130 Z', fill: '#ef4444' },
      { id: 'rocket_wing_l', d: 'M145,165 L138,178 L145,172 Z', fill: '#3b82f6' },
      { id: 'rocket_wing_r', d: 'M155,165 L162,178 L155,172 Z', fill: '#3b82f6' },
      { id: 'rocket_fire', d: 'M146,170 Q150,185 154,170 Z', fill: '#f97316' },
      { id: 'star1', d: 'M30,20 L32,26 L38,26 L33,30 L35,36 L30,32 L25,36 L27,30 L22,26 L28,26 Z', fill: '#fde68a' },
      { id: 'star2', d: 'M270,100 L271,104 L275,104 L272,106 L273,110 L270,108 L267,110 L268,106 L265,104 L269,104 Z', fill: '#fde68a' },
      { id: 'star3', d: 'M180,20 L181,23 L184,23 L182,25 L183,28 L180,26 L177,28 L178,25 L176,23 L179,23 Z', fill: '#ffffff' },
      { id: 'star4', d: 'M50,150 L51,153 L54,153 L52,155 L53,158 L50,156 L47,158 L48,155 L46,153 L49,153 Z', fill: '#ffffff' },
      { id: 'star5', d: 'M260,30 L261,33 L264,33 L262,35 L263,38 L260,36 L257,38 L258,35 L256,33 L259,33 Z', fill: '#fde68a' },
      { id: 'nebula', d: 'M170,60 Q200,40 220,70 Q240,100 210,110 Q180,120 165,95 Q150,70 170,60 Z', fill: '#7c3aed', opacity: '0.3' },
      { id: 'comet', d: 'M100,200 L130,185', fill: 'none', stroke: '#e2e8f0', strokeWidth: '2', strokeLinecap: 'round' },
    ]
  },
  {
    id: 'garden', label: 'Taman Bunga', emoji: '🌸',
    shapes: [
      { id: 'sky_g', d: 'M0,0 H300 V120 H0 Z', fill: '#fce7f3' },
      { id: 'ground_g', d: 'M0,120 H300 V240 H0 Z', fill: '#bbf7d0' },
      { id: 'path', d: 'M120,240 Q140,180 150,150 Q160,180 180,240 Z', fill: '#fde68a' },
      { id: 'sun_g', d: 'M260,35 m-22,0 a22,22 0 1,0 44,0 a22,22 0 1,0 -44,0', fill: '#fde68a' },
      { id: 'cloud_g', d: 'M40,45 Q52,32 67,42 Q72,28 87,38 Q102,26 107,42 Q117,38 114,52 Q100,60 70,58 Q47,60 40,45 Z', fill: '#ffffff' },
      // Bunga besar kiri
      { id: 'stem1', d: 'M60,200 Q58,170 62,140', fill: 'none', stroke: '#16a34a', strokeWidth: '4', strokeLinecap: 'round' },
      { id: 'petal1a', d: 'M62,140 Q50,120 55,108 Q65,118 62,140 Z', fill: '#f9a8d4' },
      { id: 'petal1b', d: 'M62,140 Q74,120 80,108 Q70,118 62,140 Z', fill: '#f9a8d4' },
      { id: 'petal1c', d: 'M62,140 Q42,132 35,122 Q48,128 62,140 Z', fill: '#fda4af' },
      { id: 'petal1d', d: 'M62,140 Q82,132 90,122 Q76,128 62,140 Z', fill: '#fda4af' },
      { id: 'center1', d: 'M62,140 m-10,0 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0', fill: '#fde68a' },
      // Bunga besar kanan
      { id: 'stem2', d: 'M230,200 Q228,170 232,140', fill: 'none', stroke: '#16a34a', strokeWidth: '4', strokeLinecap: 'round' },
      { id: 'petal2a', d: 'M232,140 Q220,120 225,108 Q235,118 232,140 Z', fill: '#c4b5fd' },
      { id: 'petal2b', d: 'M232,140 Q244,120 250,108 Q240,118 232,140 Z', fill: '#c4b5fd' },
      { id: 'petal2c', d: 'M232,140 Q212,132 205,122 Q218,128 232,140 Z', fill: '#a78bfa' },
      { id: 'petal2d', d: 'M232,140 Q252,132 260,122 Q246,128 232,140 Z', fill: '#a78bfa' },
      { id: 'center2', d: 'M232,140 m-10,0 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0', fill: '#fde68a' },
      // Bunga kecil
      { id: 'sm1', d: 'M110,175 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0', fill: '#fca5a5' },
      { id: 'sm2', d: 'M150,165 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0', fill: '#fdba74' },
      { id: 'sm3', d: 'M190,175 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0', fill: '#86efac' },
      { id: 'butterfly', d: 'M148,100 Q138,88 130,95 Q138,105 148,100 Z M152,100 Q162,88 170,95 Q162,105 152,100 Z', fill: '#f97316' },
    ]
  },
]

export default function ColoringGame({ onBack }) {
  const [modelIdx, setModelIdx] = useState(null)
  const [colors, setColors] = useState({})
  const [selected, setSelected] = useState('#ef4444')
  const [history, setHistory] = useState([])

  function selectModel(idx) {
    const init = {}
    models[idx].shapes.forEach(s => { init[s.id] = s.fill })
    setColors(init)
    setHistory([])
    setModelIdx(idx)
  }

  function paint(id) {
    setHistory(h => [...h, { ...colors }])
    setColors(c => ({ ...c, [id]: selected }))
  }

  function undo() {
    if (!history.length) return
    setColors(history[history.length - 1])
    setHistory(h => h.slice(0, -1))
  }

  function reset() {
    const init = {}
    models[modelIdx].shapes.forEach(s => { init[s.id] = s.fill })
    setColors(init)
    setHistory([])
  }

  // Model selection screen
  if (modelIdx === null) {
    return (
      <div className="pb-24">
        <div className="bg-gradient-to-br from-amber-400 to-orange-500 px-5 pt-6 pb-6">
          <button onClick={onBack} className="flex items-center gap-1 text-amber-100 text-sm mb-3">
            <ChevronLeft size={18} /> Kembali
          </button>
          <h2 className="text-white text-xl font-bold">🎨 Coloring</h2>
          <p className="text-amber-100 text-sm mt-0.5">Pilih gambar yang ingin diwarnai</p>
        </div>
        <div className="px-4 pt-4 grid grid-cols-2 gap-3">
          {models.map((m, i) => (
            <button key={m.id} onClick={() => selectModel(i)}
              className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center gap-3 active:scale-95 transition-transform">
              <span className="text-5xl">{m.emoji}</span>
              <p className="font-semibold text-gray-700 dark:text-gray-200 text-sm text-center">{m.label}</p>
            </button>
          ))}
        </div>
      </div>
    )
  }

  const model = models[modelIdx]

  return (
    <div className="pb-24">
      <div className="bg-gradient-to-br from-amber-400 to-orange-500 px-5 pt-6 pb-6">
        <div className="flex items-center justify-between mb-2">
          <button onClick={() => setModelIdx(null)} className="flex items-center gap-1 text-amber-100 text-sm">
            <ChevronLeft size={18} /> Pilih Gambar
          </button>
          <div className="flex gap-2">
            <button onClick={undo} disabled={!history.length}
              className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center disabled:opacity-40">
              <RotateCcw size={15} className="text-white" />
            </button>
            <button onClick={reset} className="bg-white/20 text-white text-xs px-3 py-1.5 rounded-xl font-medium">Reset</button>
          </div>
        </div>
        <h2 className="text-white text-xl font-bold">{model.emoji} {model.label}</h2>
        <p className="text-amber-100 text-sm mt-0.5">Tap warna → tap area gambar</p>
      </div>

      <div className="px-4 pt-4 space-y-4">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-4 border border-gray-100 dark:border-gray-800">
          <svg viewBox="0 0 300 240" className="w-full rounded-2xl border border-gray-100 dark:border-gray-700"
            style={{ background: '#f8fafc' }}>
            {model.shapes.map(s => (
              s.stroke
                ? <path key={s.id} d={s.d} fill={colors[s.id] || s.fill}
                    stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap={s.strokeLinecap}
                    className="cursor-pointer hover:opacity-80" onClick={() => paint(s.id)} />
                : <path key={s.id} d={s.d} fill={colors[s.id] || s.fill}
                    stroke="#00000012" strokeWidth="1" opacity={s.opacity || 1}
                    className="cursor-pointer hover:opacity-80 active:opacity-60 transition-all"
                    onClick={() => paint(s.id)} />
            ))}
          </svg>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-4 border border-gray-100 dark:border-gray-800">
          <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-3">PILIH WARNA</p>
          <div className="grid grid-cols-8 gap-2">
            {palette.map(c => (
              <button key={c} onClick={() => setSelected(c)}
                className={`w-full aspect-square rounded-xl transition-all ${selected === c ? 'scale-110 ring-2 ring-offset-2 ring-gray-400 dark:ring-offset-gray-900' : 'active:scale-95'}`}
                style={{ backgroundColor: c, border: c === '#ffffff' ? '1px solid #e5e7eb' : 'none' }} />
            ))}
          </div>
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
            <div className="w-8 h-8 rounded-xl border border-gray-200 dark:border-gray-700 flex-shrink-0" style={{ backgroundColor: selected }} />
            <p className="text-sm text-gray-500 dark:text-gray-400">Warna aktif: <span className="font-mono font-semibold text-gray-700 dark:text-gray-200">{selected}</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}
