import { useState, useEffect, useRef } from 'react'
import { Play, Pause, ChevronLeft, Heart, Share2, Bookmark } from 'lucide-react'
import ArticleDetail from './ArticleDetail'
import ColoringGame from '../games/ColoringGame'
import SpotDifferenceGame from '../games/SpotDifferenceGame'

const quotes = [
  { text: 'Kamu lebih kuat dari yang kamu kira, lebih berani dari yang kamu percaya.', author: 'A.A. Milne' },
  { text: 'Setiap hari adalah kesempatan baru untuk menjadi versi terbaik dirimu.', author: 'MindCare' },
  { text: 'Merawat diri sendiri bukan egois, itu kebutuhan.', author: 'Audre Lorde' },
  { text: 'Kemajuan, bukan kesempurnaan, adalah tujuannya.', author: 'Unknown' },
]

const affirmations = [
  { text: 'Aku layak mendapatkan kebahagiaan dan kedamaian', emoji: '💜' },
  { text: 'Aku cukup, aku berharga, aku dicintai', emoji: '✨' },
  { text: 'Setiap langkah kecilku adalah kemajuan yang berarti', emoji: '🌱' },
  { text: 'Aku memiliki kekuatan untuk melewati hari ini', emoji: '💪' },
  { text: 'Aku memilih untuk fokus pada hal-hal positif', emoji: '🌟' },
]

const playlists = [
  {
    emoji: '🌊', name: 'Ocean Waves', desc: 'Suara ombak menenangkan',
    color: 'from-blue-400 to-cyan-500',
    tracks: [
      { name: 'Ocean Waves', url: 'https://cdn.pixabay.com/audio/2022/03/10/audio_270f9b4f1e.mp3' },
      { name: 'Sea Shore', url: 'https://cdn.pixabay.com/audio/2021/09/06/audio_6b8a3e6b3e.mp3' },
    ]
  },
  {
    emoji: '🎹', name: 'Piano Relaxing', desc: 'Melodi piano yang lembut',
    color: 'from-violet-400 to-purple-500',
    tracks: [
      { name: 'Relaxing Piano', url: 'https://cdn.pixabay.com/audio/2024/02/28/audio_a0e9f6b3c2.mp3' },
      { name: 'Soft Piano', url: 'https://cdn.pixabay.com/audio/2022/10/25/audio_946b4b8a4e.mp3' },
    ]
  },
  {
    emoji: '🌙', name: 'Sleep Sounds', desc: 'Bantu tidur lebih nyenyak',
    color: 'from-indigo-400 to-blue-600',
    tracks: [
      { name: 'Rain Sounds', url: 'https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3' },
      { name: 'Night Ambience', url: 'https://cdn.pixabay.com/audio/2021/10/25/audio_5c1e4b3a2f.mp3' },
    ]
  },
  {
    emoji: '☕', name: 'Cafe Jazz', desc: 'Vibes kafe yang cozy',
    color: 'from-amber-400 to-orange-500',
    tracks: [
      { name: 'Cafe Jazz', url: 'https://cdn.pixabay.com/audio/2022/08/02/audio_884fe92c21.mp3' },
      { name: 'Smooth Jazz', url: 'https://cdn.pixabay.com/audio/2022/03/15/audio_8cb749d4b2.mp3' },
    ]
  },
]

const articles = [
  { id: 'anxiety-sleep', cat: 'Anxiety', title: 'Cara Mengatasi Overthinking Sebelum Tidur', time: '5 menit', emoji: '🧠', color: 'bg-violet-100 text-violet-600' },
  { id: 'self-care-habits', cat: 'Self-Care', title: '10 Kebiasaan Kecil untuk Mental Health yang Lebih Baik', time: '7 menit', emoji: '💚', color: 'bg-teal-100 text-teal-600' },
  { id: 'burnout', cat: 'Depression', title: 'Mengenal Tanda-tanda Burnout dan Cara Mengatasinya', time: '6 menit', emoji: '🌿', color: 'bg-emerald-100 text-emerald-600' },
  { id: 'anxiety-sleep', cat: 'Mindfulness', title: 'Panduan Praktis Mindfulness untuk Pemula', time: '4 menit', emoji: '🧘', color: 'bg-blue-100 text-blue-600' },
]

const puzzleLevels = [
  { id: 'easy', label: 'Mudah (3×3)', emoji: '🟢', size: 3, desc: '8 keping puzzle' },
  { id: 'medium', label: 'Sedang (4×4)', emoji: '🟡', size: 4, desc: '15 keping puzzle' },
  { id: 'hard', label: 'Sulit (5×5)', emoji: '🔴', size: 5, desc: '24 keping puzzle' },
]

function PuzzleGame({ onBack }) {
  const [levelIdx, setLevelIdx] = useState(null)
  const [tiles, setTiles] = useState([])
  const [moves, setMoves] = useState(0)
  const [best, setBest] = useState({})

  function startLevel(idx) {
    const size = puzzleLevels[idx].size
    const total = size * size
    let arr = Array.from({ length: total }, (_, i) => (i + 1) % total)
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    setTiles(arr); setMoves(0); setLevelIdx(idx)
  }

  function move(i) {
    const size = puzzleLevels[levelIdx].size
    const empty = tiles.indexOf(0)
    const row = a => Math.floor(a / size), col = a => a % size
    if (Math.abs(row(i) - row(empty)) + Math.abs(col(i) - col(empty)) !== 1) return
    const next = [...tiles];
    [next[i], next[empty]] = [next[empty], next[i]]
    setTiles(next); setMoves(m => m + 1)
  }

  const size = levelIdx !== null ? puzzleLevels[levelIdx].size : 3
  const won = levelIdx !== null && tiles.every((t, i) => t === (i + 1) % (size * size))

  useEffect(() => {
    if (won) setBest(b => ({ ...b, [levelIdx]: b[levelIdx] == null || moves < b[levelIdx] ? moves : b[levelIdx] }))
  }, [won])

  if (levelIdx === null) {
    return (
      <div className="pb-24">
        <div className="bg-gradient-to-br from-teal-500 to-cyan-500 px-5 pt-6 pb-6">
          <button onClick={onBack} className="flex items-center gap-1 text-teal-100 mb-3 text-sm"><ChevronLeft size={18} /> Kembali</button>
          <h2 className="text-white text-xl font-bold">🧩 Puzzle Slider</h2>
          <p className="text-teal-100 text-sm mt-0.5">Pilih tingkat kesulitan</p>
        </div>
        <div className="px-4 pt-4 space-y-3">
          {puzzleLevels.map((l, i) => (
            <button key={l.id} onClick={() => startLevel(i)}
              className="w-full bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4 active:scale-95 transition-transform text-left">
              <div className="w-14 h-14 bg-teal-50 dark:bg-teal-900/30 rounded-2xl flex items-center justify-center text-3xl">{l.emoji}</div>
              <div className="flex-1">
                <p className="font-bold text-gray-800 dark:text-white">{l.label}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{l.desc}</p>
                {best[i] != null && <p className="text-xs text-teal-500 font-medium mt-1">🏆 Terbaik: {best[i]} langkah</p>}
              </div>
              <span className="text-gray-300 dark:text-gray-600 text-lg">›</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  const tileSize = size === 3 ? 'w-24 h-24 text-2xl' : size === 4 ? 'w-16 h-16 text-xl' : 'w-12 h-12 text-base'

  return (
    <div className="pb-24">
      <div className="bg-gradient-to-br from-teal-500 to-cyan-500 px-5 pt-6 pb-6">
        <button onClick={() => setLevelIdx(null)} className="flex items-center gap-1 text-teal-100 mb-3 text-sm"><ChevronLeft size={18} /> Pilih Level</button>
        <h2 className="text-white text-xl font-bold">🧩 {puzzleLevels[levelIdx].label}</h2>
        <p className="text-teal-100 text-sm mt-0.5">Susun angka secara berurutan</p>
      </div>
      <div className="px-4 pt-4 space-y-4">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-6 flex flex-col items-center gap-5">
          {won && <div className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-2xl px-4 py-2 text-sm font-semibold w-full text-center">🎉 Selesai dalam {moves} langkah!</div>}
          <div className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
            {tiles.map((t, i) => (
              <button key={i} onClick={() => move(i)}
                className={`${tileSize} rounded-xl font-bold transition-all duration-150 ${t === 0 ? 'bg-gray-100 dark:bg-gray-800' : 'bg-gradient-to-br from-teal-400 to-cyan-500 text-white shadow-md active:scale-95'}`}>
                {t !== 0 && t}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center"><p className="text-2xl font-bold text-gray-800 dark:text-white">{moves}</p><p className="text-xs text-gray-400 dark:text-gray-500">Langkah</p></div>
            {best[levelIdx] != null && <div className="text-center"><p className="text-2xl font-bold text-amber-500">{best[levelIdx]}</p><p className="text-xs text-gray-400 dark:text-gray-500">Terbaik</p></div>}
          </div>
          <button onClick={() => startLevel(levelIdx)} className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-8 py-3 rounded-2xl font-semibold">Acak Ulang</button>
        </div>
      </div>
    </div>
  )
}

const memoryThemes = [
  { id: 'nature', label: 'Alam', emoji: '🌿', cards: ['🌸','🌈','⭐','🦋','🌙','🍀','🌺','🌻','🍃','🌴'] },
  { id: 'food', label: 'Makanan', emoji: '🍕', cards: ['🍕','🍦','🍓','🍩','🥑','🍜','🍣','🧁','🥝','🍇'] },
  { id: 'animals', label: 'Hewan', emoji: '🐶', cards: ['🐶','🐱','🐸','🦊','🐼','🦁','🐨','🦄','🐯','🦋'] },
  { id: 'sports', label: 'Olahraga', emoji: '⚽', cards: ['⚽','🏀','🎾','🏊','🚴','🎯','🏋️','⛷️','🤸','🎱'] },
]

const memoryLevels = [
  { id: 'easy', label: 'Mudah', emoji: '🟢', pairs: 6, cols: 4, desc: '6 pasang · 4 kolom' },
  { id: 'medium', label: 'Sedang', emoji: '🟡', pairs: 8, cols: 4, desc: '8 pasang · 4 kolom' },
  { id: 'hard', label: 'Sulit', emoji: '🔴', pairs: 10, cols: 5, desc: '10 pasang · 5 kolom' },
]

function MemoryGame({ onBack }) {
  const [themeIdx, setThemeIdx] = useState(null)
  const [levelIdx, setLevelIdx] = useState(null)
  const [cards, setCards] = useState([])
  const [selected, setSelected] = useState([])
  const [moves, setMoves] = useState(0)
  const [locked, setLocked] = useState(false)
  const [best, setBest] = useState({})

  function startGame(tIdx, lIdx) {
    const level = memoryLevels[lIdx]
    const emojis = memoryThemes[tIdx].cards.slice(0, level.pairs)
    const init = [...emojis, ...emojis]
      .map((e, i) => ({ id: i, emoji: e, flipped: false, matched: false }))
      .sort(() => Math.random() - 0.5)
    setCards(init); setMoves(0); setSelected([])
    setThemeIdx(tIdx); setLevelIdx(lIdx)
  }

  function flip(id) {
    if (locked || selected.length === 2) return
    const card = cards.find(c => c.id === id)
    if (card.flipped || card.matched) return
    const newCards = cards.map(c => c.id === id ? { ...c, flipped: true } : c)
    const newSel = [...selected, id]
    setCards(newCards); setSelected(newSel)
    if (newSel.length === 2) {
      setMoves(m => m + 1); setLocked(true)
      const [a, b] = newSel.map(sid => newCards.find(c => c.id === sid))
      if (a.emoji === b.emoji) {
        setTimeout(() => {
          setCards(c => c.map(x => newSel.includes(x.id) ? { ...x, matched: true } : x))
          setSelected([]); setLocked(false)
        }, 500)
      } else {
        setTimeout(() => {
          setCards(c => c.map(x => newSel.includes(x.id) ? { ...x, flipped: false } : x))
          setSelected([]); setLocked(false)
        }, 900)
      }
    }
  }

  const won = cards.length > 0 && cards.every(c => c.matched)
  useEffect(() => {
    if (won && themeIdx !== null && levelIdx !== null) {
      const key = `${themeIdx}_${levelIdx}`
      setBest(b => ({ ...b, [key]: b[key] == null || moves < b[key] ? moves : b[key] }))
    }
  }, [won])

  // Step 1: Choose theme
  if (themeIdx === null) {
    return (
      <div className="pb-24">
        <div className="bg-gradient-to-br from-pink-500 to-rose-500 px-5 pt-6 pb-6">
          <button onClick={onBack} className="flex items-center gap-1 text-pink-100 mb-3 text-sm">
            <ChevronLeft size={18} /> Kembali
          </button>
          <h2 className="text-white text-xl font-bold">🃏 Memory Match</h2>
          <p className="text-pink-100 text-sm mt-0.5">Pilih tema kartu</p>
        </div>
        <div className="px-4 pt-4 grid grid-cols-2 gap-3">
          {memoryThemes.map((t, i) => (
            <button key={t.id} onClick={() => setThemeIdx(i)}
              className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center gap-3 active:scale-95 transition-transform">
              <span className="text-4xl">{t.emoji}</span>
              <p className="font-semibold text-gray-700 dark:text-gray-200 text-sm">{t.label}</p>
              <div className="flex gap-1 flex-wrap justify-center">
                {t.cards.slice(0, 4).map((e, j) => <span key={j} className="text-lg">{e}</span>)}
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Step 2: Choose level
  if (levelIdx === null) {
    const theme = memoryThemes[themeIdx]
    return (
      <div className="pb-24">
        <div className="bg-gradient-to-br from-pink-500 to-rose-500 px-5 pt-6 pb-6">
          <button onClick={() => setThemeIdx(null)} className="flex items-center gap-1 text-pink-100 mb-3 text-sm">
            <ChevronLeft size={18} /> Pilih Tema
          </button>
          <h2 className="text-white text-xl font-bold">{theme.emoji} {theme.label}</h2>
          <p className="text-pink-100 text-sm mt-0.5">Pilih tingkat kesulitan</p>
        </div>
        <div className="px-4 pt-4 space-y-3">
          {memoryLevels.map((l, i) => {
            const key = `${themeIdx}_${i}`
            return (
              <button key={l.id} onClick={() => startGame(themeIdx, i)}
                className="w-full bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4 active:scale-95 transition-transform text-left">
                <div className="w-14 h-14 bg-pink-50 dark:bg-pink-900/30 rounded-2xl flex items-center justify-center text-3xl">{l.emoji}</div>
                <div className="flex-1">
                  <p className="font-bold text-gray-800 dark:text-white">{l.label}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{l.desc}</p>
                  {best[key] != null && (
                    <p className="text-xs text-pink-500 font-medium mt-1">🏆 Terbaik: {best[key]} langkah</p>
                  )}
                </div>
                <span className="text-gray-300 dark:text-gray-600 text-lg">›</span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // Step 3: Play
  const theme = memoryThemes[themeIdx]
  const level = memoryLevels[levelIdx]

  return (
    <div className="pb-24">
      <div className="bg-gradient-to-br from-pink-500 to-rose-500 px-5 pt-6 pb-6">
        <button onClick={() => setLevelIdx(null)} className="flex items-center gap-1 text-pink-100 mb-3 text-sm">
          <ChevronLeft size={18} /> Pilih Level
        </button>
        <h2 className="text-white text-xl font-bold">{theme.emoji} {theme.label} · {level.label}</h2>
        <p className="text-pink-100 text-sm mt-0.5">Temukan semua {level.pairs} pasangan</p>
      </div>
      <div className="px-4 pt-4 space-y-4">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-5">
          {won && (
            <div className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-2xl px-4 py-2 text-sm font-semibold text-center mb-4">
              🎉 Selesai dalam {moves} langkah!
            </div>
          )}
          <div className="grid gap-2 mb-4" style={{ gridTemplateColumns: `repeat(${level.cols}, 1fr)` }}>
            {cards.map(c => (
              <button key={c.id} onClick={() => flip(c.id)}
                className={`rounded-xl transition-all duration-300 flex items-center justify-center
                  ${level.cols === 5 ? 'h-12 text-xl' : 'h-16 text-2xl'}
                  ${c.flipped || c.matched ? 'bg-pink-100 dark:bg-pink-900/30' : 'bg-gradient-to-br from-pink-400 to-rose-500'}
                  ${c.matched ? 'opacity-40' : ''}`}>
                {(c.flipped || c.matched) ? c.emoji : ''}
              </button>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Langkah: <span className="font-bold text-gray-700 dark:text-gray-200">{moves}</span>
            </p>
            <button onClick={() => startGame(themeIdx, levelIdx)}
              className="bg-pink-500 text-white text-sm px-4 py-2 rounded-xl font-medium">
              Main Lagi
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Booster() {
  const [game, setGame] = useState(null)
  const [playing, setPlaying] = useState(null)
  const [trackIdx, setTrackIdx] = useState(0)
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState([])
  const [qIdx] = useState(Math.floor(Math.random() * quotes.length))
  const [article, setArticle] = useState(null)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const audioRef = useRef(null)
  const audioCtxRef = useRef(null)
  const nodesRef = useRef([])

  // Generate relaxing sounds via Web Audio API
  function createSound(type) {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    audioCtxRef.current = ctx
    nodesRef.current = []

    if (type === 0) {
      // Ocean waves - filtered noise
      for (let i = 0; i < 3; i++) {
        const bufferSize = ctx.sampleRate * 2
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
        const data = buffer.getChannelData(0)
        for (let j = 0; j < bufferSize; j++) data[j] = Math.random() * 2 - 1
        const source = ctx.createBufferSource()
        source.buffer = buffer
        source.loop = true
        const filter = ctx.createBiquadFilter()
        filter.type = 'lowpass'
        filter.frequency.value = 400 + i * 100
        const gain = ctx.createGain()
        gain.gain.value = 0.15
        // LFO for wave effect
        const lfo = ctx.createOscillator()
        lfo.frequency.value = 0.1 + i * 0.05
        const lfoGain = ctx.createGain()
        lfoGain.gain.value = 0.1
        lfo.connect(lfoGain)
        lfoGain.connect(gain.gain)
        lfo.start()
        source.connect(filter)
        filter.connect(gain)
        gain.connect(ctx.destination)
        source.start()
        nodesRef.current.push(source, lfo)
      }
    } else if (type === 1) {
      // Piano - sine tones
      const notes = [261.63, 329.63, 392, 523.25]
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator()
        osc.type = 'sine'
        osc.frequency.value = freq
        const gain = ctx.createGain()
        gain.gain.value = 0
        // Gentle arpeggio
        const now = ctx.currentTime
        for (let t = 0; t < 60; t += 2) {
          gain.gain.setValueAtTime(0, now + t + i * 0.5)
          gain.gain.linearRampToValueAtTime(0.08, now + t + i * 0.5 + 0.1)
          gain.gain.exponentialRampToValueAtTime(0.001, now + t + i * 0.5 + 1.5)
        }
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()
        nodesRef.current.push(osc)
      })
    } else if (type === 2) {
      // Rain - white noise with filter
      const bufferSize = ctx.sampleRate * 2
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let j = 0; j < bufferSize; j++) data[j] = Math.random() * 2 - 1
      const source = ctx.createBufferSource()
      source.buffer = buffer
      source.loop = true
      const filter = ctx.createBiquadFilter()
      filter.type = 'highpass'
      filter.frequency.value = 1000
      const gain = ctx.createGain()
      gain.gain.value = 0.3
      source.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)
      source.start()
      nodesRef.current.push(source)
    } else if (type === 3) {
      // Jazz - warm tones
      const jazzNotes = [220, 277.18, 329.63, 369.99, 440]
      jazzNotes.forEach((freq, i) => {
        const osc = ctx.createOscillator()
        osc.type = 'triangle'
        osc.frequency.value = freq
        const gain = ctx.createGain()
        gain.gain.value = 0
        const now = ctx.currentTime
        const pattern = [0, 0.8, 1.6, 2.4, 3.2]
        for (let t = 0; t < 60; t += 4) {
          const beat = pattern[i % pattern.length]
          gain.gain.setValueAtTime(0, now + t + beat)
          gain.gain.linearRampToValueAtTime(0.06, now + t + beat + 0.05)
          gain.gain.exponentialRampToValueAtTime(0.001, now + t + beat + 0.7)
        }
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()
        nodesRef.current.push(osc)
      })
    }
  }

  function stopSound() {
    nodesRef.current.forEach(n => { try { n.stop() } catch {} })
    nodesRef.current = []
    audioCtxRef.current?.close()
    audioCtxRef.current = null
  }

  useEffect(() => {
    if (playing === null) {
      stopSound()
      return
    }
    stopSound()
    createSound(playing)
    return () => stopSound()
  }, [playing])

  function togglePlay(i) {
    if (playing === i) {
      stopSound()
      setPlaying(null)
    } else {
      setPlaying(i)
      setTrackIdx(0)
      setProgress(0)
    }
  }

  // Fake progress animation
  useEffect(() => {
    if (playing === null) { setProgress(0); return }
    const interval = setInterval(() => {
      setProgress(p => p >= 1 ? 0 : p + 0.001)
    }, 100)
    return () => clearInterval(interval)
  }, [playing])

  function skipTrack() {
    if (playing === null) return
    setTrackIdx(idx => (idx + 1) % playlists[playing].tracks.length)
    setProgress(0)
  }

  if (game === 'puzzle') return <PuzzleGame onBack={() => setGame(null)} />
  if (game === 'memory') return <MemoryGame onBack={() => setGame(null)} />
  if (game === 'coloring') return <ColoringGame onBack={() => setGame(null)} />
  if (game === 'spot') return <SpotDifferenceGame onBack={() => setGame(null)} />
  if (article) return <ArticleDetail articleId={article} onBack={() => setArticle(null)} />

  return (
    <div className="pb-24">
      <div className="bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 px-5 pt-6 pb-6">
        <h1 className="text-white text-2xl font-bold">Mood Booster ✨</h1>
        <p className="text-amber-100 text-sm mt-1">Semangat! Hari ini pasti lebih baik 🌟</p>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* Quote */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs bg-amber-100 text-amber-600 px-2 py-1 rounded-full font-semibold">💬 QUOTE HARI INI</span>
            <div className="flex gap-2">
              <button onClick={() => setLiked(l => !l)} className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${liked ? 'bg-rose-100' : 'bg-gray-100'}`}>
                <Heart size={14} className={liked ? 'text-rose-500 fill-rose-500' : 'text-gray-400'} />
              </button>
              <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <Share2 size={14} className="text-gray-400" />
              </button>
            </div>
          </div>
          <p className="text-gray-700 font-medium italic leading-relaxed text-base">"{quotes[qIdx].text}"</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">— {quotes[qIdx].author}</p>
        </div>

        {/* Affirmations */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-5">
          <h2 className="font-bold text-gray-800 dark:text-white dark:text-white mb-3">🌟 Affirmasi Harian</h2>
          {affirmations.slice(0, 3).map((a, i) => (
            <div key={i} className="flex items-center gap-3 bg-violet-50 dark:bg-violet-900/20 rounded-2xl p-3 mb-2 border border-violet-100 dark:border-violet-800">
              <span className="text-xl">{a.emoji}</span>
              <p className="text-sm text-violet-700 font-medium flex-1">{a.text}</p>
              <button onClick={() => setSaved(s => s.includes(i) ? s.filter(x => x !== i) : [...s, i])}>
                <Bookmark size={14} className={saved.includes(i) ? 'text-violet-500 fill-violet-500' : 'text-gray-300'} />
              </button>
            </div>
          ))}
        </div>

        {/* Playlist */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-5">
          <h2 className="font-bold text-gray-800 dark:text-white mb-3">🎵 Playlist Relaksasi</h2>
          <div className="grid grid-cols-2 gap-3">
            {playlists.map((p, i) => (
              <button key={i} onClick={() => togglePlay(i)}
                className={`bg-gradient-to-br ${p.color} rounded-2xl p-4 text-white text-left relative overflow-hidden active:scale-95 transition-transform`}>
                <div className="text-3xl mb-2">{p.emoji}</div>
                <p className="text-sm font-bold">{p.name}</p>
                <p className="text-xs opacity-75 mt-0.5">{p.desc}</p>
                <div className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center ${playing === i ? 'bg-white/40' : 'bg-white/20'}`}>
                  {playing === i ? <Pause size={13} /> : <Play size={13} />}
                </div>
                {playing === i && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                    <div className="h-full bg-white/70 transition-all" style={{ width: `${progress * 100}%` }} />
                  </div>
                )}
              </button>
            ))}
          </div>

          {playing !== null && (
            <div className="mt-3 bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{playlists[playing].emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-700 dark:text-gray-200">{playlists[playing].name}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
                    {playlists[playing].tracks[trackIdx].name}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => togglePlay(playing)} className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white">
                    <Pause size={14} />
                  </button>
                </div>
              </div>

              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                <div className="bg-teal-500 h-1.5 rounded-full transition-all" style={{ width: `${progress * 100}%` }} />
              </div>

              <div className="flex gap-1.5">
                {playlists[playing].tracks.map((t, i) => (
                  <div key={i}
                    className={`flex-1 py-1 rounded-lg text-xs font-medium text-center truncate ${
                      trackIdx === i
                        ? 'bg-teal-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}>
                    {t.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mini Games */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-5">
          <h2 className="font-bold text-gray-800 dark:text-white dark:text-white mb-3">🎮 Mini Games Anti-Stres</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { emoji: '🧩', name: 'Puzzle Slider', desc: 'Susun angka 1-8', action: 'puzzle', color: 'from-teal-400 to-cyan-500' },
              { emoji: '🃏', name: 'Memory Match', desc: 'Temukan pasangan', action: 'memory', color: 'from-pink-400 to-rose-500' },
              { emoji: '🎨', name: 'Coloring', desc: 'Mewarnai gambar', action: 'coloring', color: 'from-amber-400 to-orange-500' },
              { emoji: '🔍', name: 'Spot Difference', desc: 'Temukan perbedaan', action: 'spot', color: 'from-violet-400 to-purple-500' },
            ].map((g, i) => (
              <button key={i} onClick={() => setGame(g.action)}
                className={`rounded-2xl p-4 text-center transition-all active:scale-95 bg-gradient-to-br ${g.color} text-white`}>
                <div className="text-3xl mb-1">{g.emoji}</div>
                <p className="text-sm font-bold">{g.name}</p>
                <p className="text-xs opacity-75">{g.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Articles */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-800 dark:text-white">📚 Konten Edukasi</h2>
            <button className="text-xs text-teal-500 font-medium">Lihat semua</button>
          </div>
          {articles.map((a, i) => (
            <button key={i} onClick={() => setArticle(a.id)}
              className="flex items-start gap-3 py-3 border-b border-gray-50 dark:border-gray-800 last:border-0 w-full text-left active:bg-gray-50 dark:active:bg-gray-800 rounded-xl px-1 transition-colors">
              <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">{a.emoji}</div>
              <div className="flex-1">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${a.color}`}>{a.cat}</span>
                <p className="text-sm font-semibold text-gray-800 dark:text-white mt-1 leading-snug">{a.title}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">⏱ {a.time} baca</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
