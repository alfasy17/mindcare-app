import { useState, useRef, useEffect } from 'react'
import { Phone, Bot, Users, MessageCircle, ChevronLeft, Send, Star, Clock, Shield, AlertTriangle } from 'lucide-react'
import { useForumStore } from '../store/useStore'
import { useForumStoreSupabase } from '../store/useSupabaseStore'

const psikolog = [
  { name: 'Dr. Amelia Putri', spec: 'Anxiety & Depression', rating: 4.9, reviews: 128, status: 'online', price: 'Rp 150.000/sesi', avatar: '👩‍⚕️', exp: '8 tahun' },
  { name: 'Dr. Budi Santoso', spec: 'Trauma & PTSD', rating: 4.8, reviews: 95, status: 'online', price: 'Rp 175.000/sesi', avatar: '👨‍⚕️', exp: '12 tahun' },
  { name: 'Dr. Citra Dewi', spec: 'Relationship & Family', rating: 4.7, reviews: 74, status: 'busy', price: 'Rp 130.000/sesi', avatar: '👩‍⚕️', exp: '6 tahun' },
]

const forumThreads = [
  { title: 'Cara mengatasi overthinking sebelum tidur', replies: 24, likes: 47, tag: 'Anxiety', time: '2 jam lalu', hot: true },
  { title: 'Tips work-life balance untuk remote worker', replies: 18, likes: 35, tag: 'Self-Care', time: '5 jam lalu', hot: false },
  { title: 'Bagaimana cara cerita ke orang tua tentang mental health?', replies: 31, likes: 62, tag: 'Keluarga', time: '1 hari lalu', hot: true },
  { title: 'Rekomendasi buku self-help yang bagus', replies: 15, likes: 28, tag: 'Edukasi', time: '2 hari lalu', hot: false },
]

const peers = [
  { name: 'Anonim_Biru42', status: 'online', mood: '😊', topic: 'Anxiety', dot: 'bg-emerald-400' },
  { name: 'Anonim_Hijau17', status: 'online', mood: '😐', topic: 'Mindfulness', dot: 'bg-emerald-400' },
  { name: 'Anonim_Ungu88', status: 'away', mood: '🙂', topic: 'Self-Care', dot: 'bg-amber-400' },
  { name: 'Anonim_Merah55', status: 'offline', mood: '😟', topic: 'Depression', dot: 'bg-gray-300' },
  { name: 'Anonim_Kuning23', status: 'online', mood: '😄', topic: 'Gratitude', dot: 'bg-emerald-400' },
]

const rooms = [
  { emoji: '💜', name: 'Anxiety Support Group', online: 8, desc: 'Ruang aman untuk berbagi tentang kecemasan', color: 'bg-violet-50 border-violet-200', btn: 'bg-violet-500' },
  { emoji: '🌊', name: 'Mindfulness Circle', online: 5, desc: 'Praktik mindfulness bersama', color: 'bg-cyan-50 border-cyan-200', btn: 'bg-cyan-500' },
  { emoji: '🌱', name: 'Depression Support', online: 12, desc: 'Saling mendukung dalam perjalanan pemulihan', color: 'bg-emerald-50 border-emerald-200', btn: 'bg-emerald-500' },
  { emoji: '☀️', name: 'General Wellness', online: 20, desc: 'Obrolan umum seputar kesehatan mental', color: 'bg-amber-50 border-amber-200', btn: 'bg-amber-500' },
]

const aiReplies = [
  'Aku mendengarmu. Itu pasti tidak mudah. Mau cerita lebih lanjut? 💙',
  'Terima kasih sudah berbagi. Perasaanmu valid dan penting. 🌿',
  'Kamu sudah melakukan hal yang berani dengan berbicara. Aku bangga padamu! ✨',
  'Coba tarik napas dalam dulu. Kamu tidak sendirian dalam ini. 🤗',
  'Itu terdengar berat. Sudah berapa lama kamu merasakan ini? 💜',
  'Ingat, meminta bantuan adalah tanda kekuatan, bukan kelemahan. 🌟',
]

function PsikologList({ onBack, showToast }) {
  const [booking, setBooking] = useState(null)
  const [bookingDone, setBookingDone] = useState(null)
  const [selectedTime, setSelectedTime] = useState('')
  const times = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '19:00', '20:00']

  function confirmBooking() {
    if (!selectedTime) return
    setBookingDone(booking)
    setBooking(null)
    setSelectedTime('')
    showToast?.(`Janji dengan ${bookingDone?.name || psikolog[booking]?.name} pukul ${selectedTime} berhasil dibuat! 📅`, 'success')
  }

  return (
    <div className="pb-24">
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 px-5 pt-6 pb-6">
        <button onClick={onBack} className="flex items-center gap-1 text-blue-200 mb-4 text-sm"><ChevronLeft size={18} /> Kembali</button>
        <h2 className="text-white text-xl font-bold">👨‍⚕️ Psikolog Online</h2>
        <p className="text-blue-200 text-sm mt-1">Konsultasi dengan profesional terpercaya</p>
      </div>
      <div className="px-4 pt-4 space-y-3">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl p-3 flex items-center gap-2">
          <Shield size={16} className="text-blue-500 flex-shrink-0" />
          <p className="text-xs text-blue-600 dark:text-blue-400">Semua psikolog telah terverifikasi dan berlisensi resmi</p>
        </div>

        {/* Booking modal */}
        {booking !== null && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center p-4" onClick={() => setBooking(null)}>
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
              <h3 className="font-bold text-gray-800 dark:text-white text-lg mb-1">Buat Janji</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">dengan {psikolog[booking].name}</p>
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-2">PILIH WAKTU</p>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {times.map(t => (
                  <button key={t} onClick={() => setSelectedTime(t)}
                    className={`py-2 rounded-xl text-sm font-medium transition-all ${selectedTime === t ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'}`}>
                    {t}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setBooking(null)} className="flex-1 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">Batal</button>
                <button onClick={confirmBooking} disabled={!selectedTime}
                  className="flex-1 py-3 rounded-2xl bg-blue-500 text-white text-sm font-bold disabled:opacity-50">
                  Konfirmasi
                </button>
              </div>
            </div>
          </div>
        )}

        {psikolog.map((p, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-start gap-3">
              <div className="relative">
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-3xl">{p.avatar}</div>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-900 ${p.status === 'online' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-800 dark:text-white">{p.name}</p>
                <p className="text-xs text-blue-500 font-medium">{p.spec}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <div className="flex items-center gap-1">
                    <Star size={11} className="text-amber-400 fill-amber-400" />
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">{p.rating}</span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">({p.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={11} className="text-gray-400" />
                    <span className="text-xs text-gray-400 dark:text-gray-500">{p.exp}</span>
                  </div>
                </div>
                <p className="text-xs text-teal-600 dark:text-teal-400 font-semibold mt-1">{p.price}</p>
              </div>
            </div>
            {bookingDone === i && (
              <div className="mt-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 rounded-xl p-2 text-center">
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">✅ Janji sudah dibuat untuk hari ini</p>
              </div>
            )}
            <div className="flex gap-2 mt-3">
              <button className="flex-1 py-2 rounded-xl border border-blue-200 dark:border-blue-700 text-blue-500 dark:text-blue-400 text-sm font-medium">Lihat Profil</button>
              <button onClick={() => p.status === 'online' ? showToast?.('Fitur chat psikolog segera hadir! 🚀', 'info') : setBooking(i)}
                className={`flex-1 py-2 rounded-xl text-white text-sm font-semibold ${p.status === 'online' ? 'bg-blue-500' : 'bg-indigo-500'}`}>
                {p.status === 'online' ? 'Chat Sekarang' : 'Buat Janji'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Forum({ onBack, showToast, forumStore }) {
  const { threads, addThread, likeThread } = forumStore || useForumStore()
  const [showNew, setShowNew] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newTag, setNewTag] = useState('Anxiety')
  const [search, setSearch] = useState('')
  const tagColors = { Anxiety: 'bg-violet-100 text-violet-600', 'Self-Care': 'bg-teal-100 text-teal-600', Keluarga: 'bg-pink-100 text-pink-600', Edukasi: 'bg-blue-100 text-blue-600', Umum: 'bg-gray-100 text-gray-600' }
  const filtered = threads.filter(t => t.title.toLowerCase().includes(search.toLowerCase()))

  function handlePost() {
    if (!newTitle.trim()) return
    addThread(newTitle, newTag)
    setNewTitle(''); setShowNew(false)
    showToast?.('Thread berhasil dibuat! 💬', 'success')
  }

  return (
    <div className="pb-24">
      <div className="bg-gradient-to-br from-violet-500 to-purple-600 px-5 pt-6 pb-6">
        <button onClick={onBack} className="flex items-center gap-1 text-violet-200 mb-4 text-sm"><ChevronLeft size={18} /> Kembali</button>
        <h2 className="text-white text-xl font-bold">💬 Forum Komunitas</h2>
        <p className="text-violet-200 text-sm mt-1">Berbagi dan saling mendukung</p>
      </div>
      <div className="px-4 pt-4 space-y-3">
        <div className="bg-white dark:bg-gray-900 rounded-2xl px-4 py-3 flex items-center gap-2 shadow-sm border border-gray-100 dark:border-gray-800">
          <span className="text-gray-400">🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari thread..."
            className="flex-1 text-sm outline-none bg-transparent text-gray-700 dark:text-gray-200 placeholder-gray-300 dark:placeholder-gray-600" />
        </div>
        <button onClick={() => setShowNew(true)}
          className="w-full bg-gradient-to-r from-violet-500 to-purple-500 text-white py-3 rounded-2xl font-semibold text-sm active:scale-95 transition-transform">
          + Buat Thread Baru
        </button>
        {showNew && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-lg border border-violet-100 dark:border-violet-800 space-y-3">
            <h3 className="font-bold text-gray-800 dark:text-white text-sm">Thread Baru</h3>
            <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Judul thread kamu..."
              className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl px-3 py-2.5 text-sm outline-none text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700" />
            <div className="flex gap-2 flex-wrap">
              {['Anxiety','Self-Care','Keluarga','Edukasi','Umum'].map(t => (
                <button key={t} onClick={() => setNewTag(t)}
                  className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${newTag === t ? 'bg-violet-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'}`}>{t}</button>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowNew(false)} className="flex-1 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">Batal</button>
              <button onClick={handlePost} className="flex-1 py-2 rounded-xl bg-violet-500 text-white text-sm font-semibold">Posting</button>
            </div>
          </div>
        )}
        {filtered.map((t) => (
          <div key={t.id} className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tagColors[t.tag] || 'bg-gray-100 text-gray-500'}`}>{t.tag}</span>
              {t.hot && <span className="text-xs bg-rose-100 text-rose-500 px-2 py-0.5 rounded-full font-medium">🔥 Hot</span>}
            </div>
            <p className="text-sm font-semibold text-gray-800 dark:text-white leading-snug">{t.title}</p>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 dark:text-gray-500">💬 {t.replies}</span>
                <span className="text-xs text-gray-400 dark:text-gray-500">{t.time}</span>
              </div>
              <button onClick={() => likeThread(t.id)} className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 hover:text-rose-400 transition-colors">
                ❤️ {t.likes}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AIChat({ onBack }) {
  const [messages, setMessages] = useState([
    { from: 'ai', text: 'Halo! Aku MindBot 🤖 Aku di sini untuk mendengarkan dan mendukungmu. Bagaimana perasaanmu hari ini?' }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, typing])

  function send() {
    if (!input.trim()) return
    const userMsg = { from: 'user', text: input }
    setMessages(m => [...m, userMsg])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(m => [...m, { from: 'ai', text: aiReplies[Math.floor(Math.random() * aiReplies.length)] }])
    }, 1200)
  }

  const quickReplies = ['Aku merasa cemas', 'Aku butuh motivasi', 'Aku tidak bisa tidur', 'Aku merasa kesepian']

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 120px)' }}>
      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-4 flex items-center gap-3">
        <button onClick={onBack}><ChevronLeft size={20} className="text-white" /></button>
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">🤖</div>
        <div>
          <p className="font-bold text-white">MindBot AI</p>
          <p className="text-xs text-teal-100">Selalu online · Aman & Rahasia</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}>
            {m.from === 'ai' && <div className="w-7 h-7 bg-teal-100 rounded-full flex items-center justify-center text-sm flex-shrink-0">🤖</div>}
            <div className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${m.from === 'user' ? 'bg-teal-500 text-white rounded-br-sm' : 'bg-white text-gray-700 shadow-sm rounded-bl-sm'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex items-end gap-2">
            <div className="w-7 h-7 bg-teal-100 rounded-full flex items-center justify-center text-sm">🤖</div>
            <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm flex gap-1">
              {[0, 1, 2].map(i => <div key={i} className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      {messages.length <= 2 && (
        <div className="px-4 py-2 bg-gray-50 flex gap-2 overflow-x-auto">
          {quickReplies.map((q, i) => (
            <button key={i} onClick={() => { setInput(q); }} className="flex-shrink-0 bg-white border border-gray-200 text-gray-600 text-xs px-3 py-1.5 rounded-full whitespace-nowrap">{q}</button>
          ))}
        </div>
      )}
      <div className="bg-white border-t border-gray-100 p-3 flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Ketik pesanmu..." className="flex-1 bg-gray-100 rounded-2xl px-4 py-2.5 text-sm outline-none" />
        <button onClick={send} className="w-11 h-11 bg-teal-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
          <Send size={16} />
        </button>
      </div>
    </div>
  )
}

function PeerSupport({ onBack }) {
  const [chatRoom, setChatRoom] = useState(null)
  const [messages, setMessages] = useState([{ from: 'system', text: 'Selamat datang! Ingat untuk saling menghormati dan menjaga privasi satu sama lain 💜' }])
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  if (chatRoom !== null) {
    const r = rooms[chatRoom]
    function send() {
      if (!input.trim()) return
      setMessages(m => [...m, { from: 'user', text: input }])
      setInput('')
    }
    return (
      <div className="flex flex-col" style={{ height: 'calc(100vh - 120px)' }}>
        <div className={`p-4 flex items-center gap-3`} style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}>
          <button onClick={() => setChatRoom(null)}><ChevronLeft size={20} className="text-white" /></button>
          <span className="text-2xl">{r.emoji}</span>
          <div><p className="font-bold text-white text-sm">{r.name}</p><p className="text-xs text-violet-200">🟢 {r.online} online</p></div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-center'}`}>
              <div className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm ${m.from === 'user' ? 'bg-violet-500 text-white' : 'bg-violet-100 text-violet-700 text-xs'}`}>{m.text}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div className="bg-white border-t border-gray-100 p-3 flex gap-2">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ketik pesan..." className="flex-1 bg-gray-100 rounded-2xl px-4 py-2.5 text-sm outline-none" />
          <button onClick={send} className="w-11 h-11 bg-violet-500 rounded-full flex items-center justify-center text-white"><Send size={16} /></button>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-24">
      <div className="bg-gradient-to-br from-violet-500 to-purple-600 px-5 pt-6 pb-6">
        <button onClick={onBack} className="flex items-center gap-1 text-violet-200 mb-4 text-sm"><ChevronLeft size={18} /> Kembali</button>
        <h2 className="text-white text-xl font-bold">👥 Peer Support Chat</h2>
        <p className="text-violet-200 text-sm mt-1">Terhubung dengan orang yang memahami</p>
      </div>
      <div className="px-4 pt-4 space-y-4">
        <div className="bg-violet-50 border border-violet-100 rounded-2xl p-3 flex items-center gap-2">
          <Shield size={16} className="text-violet-500 flex-shrink-0" />
          <p className="text-xs text-violet-600">Semua percakapan anonim dan terenkripsi. Identitasmu terlindungi.</p>
        </div>
        <div>
          <h3 className="font-bold text-gray-800 dark:text-white dark:text-white mb-3">Ruang Chat Aktif</h3>
          {rooms.map((r, i) => (
            <div key={i} className={`${r.color} border rounded-2xl p-4 mb-3`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{r.emoji}</span>
                  <div>
                    <p className="font-bold text-gray-800 dark:text-white text-sm">{r.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{r.desc}</p>
                    <p className="text-xs text-emerald-500 font-medium mt-1">🟢 {r.online} online</p>
                  </div>
                </div>
                <button onClick={() => setChatRoom(i)} className={`${r.btn} text-white text-xs px-3 py-2 rounded-xl font-semibold flex-shrink-0`}>Gabung</button>
              </div>
            </div>
          ))}
        </div>
        <div>
          <h3 className="font-bold text-gray-800 dark:text-white dark:text-white mb-3">Chat 1-on-1</h3>
          {peers.map((p, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl p-3 mb-2 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center text-xl">{p.mood}</div>
                <div className={`absolute bottom-0 right-0 w-3 h-3 ${p.dot} rounded-full border-2 border-white`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">{p.name}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{p.topic} · {p.status}</p>
              </div>
              <button className="bg-teal-500 text-white text-xs px-3 py-1.5 rounded-xl font-medium">Chat</button>
            </div>
          ))}
        </div>
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle size={16} className="text-rose-500" />
            <p className="text-sm font-bold text-rose-600">Dalam keadaan darurat?</p>
          </div>
          <p className="text-sm text-rose-500">Hubungi hotline crisis: <strong>119 ext 8</strong></p>
          <p className="text-xs text-rose-400 mt-1">Tersedia 24 jam, 7 hari seminggu</p>
        </div>
      </div>
    </div>
  )
}

export default function Dukungan({ showToast, user }) {
  const [view, setView] = useState('main')
  const localForum = useForumStore()
  const supaForum = useForumStoreSupabase(user?.id)
  const forumStore = user?.id ? supaForum : localForum

  if (view === 'psikolog') return <PsikologList onBack={() => setView('main')} showToast={showToast} />
  if (view === 'ai') return <AIChat onBack={() => setView('main')} />
  if (view === 'forum') return <Forum onBack={() => setView('main')} showToast={showToast} forumStore={forumStore} />
  if (view === 'peer') return <PeerSupport onBack={() => setView('main')} />

  const cards = [
    { icon: Phone, title: 'Chat Psikolog Online', desc: '3 psikolog tersedia sekarang', sub: '⭐ Rating 4.8+', color: 'from-blue-500 to-indigo-500', light: 'bg-blue-50', action: 'psikolog' },
    { icon: Bot, title: 'AI Chatbot Pendukung', desc: 'Tersedia 24/7 untuk kamu', sub: '🤖 Respon instan', color: 'from-teal-500 to-cyan-500', light: 'bg-teal-50', action: 'ai' },
    { icon: Users, title: 'Forum Komunitas', desc: 'Diskusi & berbagi pengalaman', sub: '💬 4 thread baru hari ini', color: 'from-violet-500 to-purple-500', light: 'bg-violet-50', action: 'forum' },
    { icon: MessageCircle, title: 'Peer Support Chat', desc: 'Ngobrol dengan sesama', sub: '👥 45 orang online', color: 'from-pink-500 to-rose-500', light: 'bg-pink-50', action: 'peer' },
  ]

  return (
    <div className="pb-24">
      <div className="bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500 px-5 pt-6 pb-6">
        <h1 className="text-white text-2xl font-bold">Dukungan</h1>
        <p className="text-blue-200 text-sm mt-1">Kamu tidak sendirian 💙</p>
      </div>
      <div className="px-4 pt-4 space-y-3">
        {cards.map((c, i) => (
          <button key={i} onClick={() => setView(c.action)}
            className="w-full bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 flex items-center gap-4 active:scale-95 transition-transform text-left">
            <div className={`w-14 h-14 bg-gradient-to-br ${c.color} rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0`}>
              <c.icon size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-800 dark:text-white">{c.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{c.desc}</p>
              <p className="text-xs text-teal-500 font-medium mt-1">{c.sub}</p>
            </div>
            <span className="text-gray-300 text-lg">›</span>
          </button>
        ))}
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle size={16} className="text-rose-500" />
            <p className="text-sm font-bold text-rose-600">Butuh bantuan segera?</p>
          </div>
          <p className="text-sm text-rose-500">Hotline crisis: <strong>119 ext 8</strong> (24/7)</p>
        </div>
      </div>
    </div>
  )
}
