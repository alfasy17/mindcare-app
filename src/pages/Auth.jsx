import { useState } from 'react'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'

function Logo() {
  return (
    <div className="flex flex-col items-center gap-3 mb-8">
      <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center shadow-lg">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" fill="white" opacity="0.9"/>
          <path d="M8 12 Q10 8 12 12 Q14 16 16 12" stroke="rgba(20,184,166,0.8)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </svg>
      </div>
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">MindCare</h1>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Mental Health Companion</p>
      </div>
    </div>
  )
}

function Login({ onLogin, onSwitch }) {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleLogin(e) {
    e.preventDefault()
    if (!email || !pass) { setError('Email dan password wajib diisi'); return }
    setLoading(true)
    setError('')
    setTimeout(() => { setLoading(false); onLogin({ name: 'Sarah Amelina', email }) }, 1200)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col justify-center px-6 py-10">
      <Logo />
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-6 border border-gray-100 dark:border-gray-800">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-1">Selamat datang kembali 👋</h2>
        <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">Masuk ke akun MindCare-mu</p>

        {error && (
          <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-2xl p-3 mb-4">
            <p className="text-xs text-rose-600 dark:text-rose-400">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">EMAIL</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 text-sm text-gray-700 dark:text-gray-200 outline-none focus:border-teal-400 dark:focus:border-teal-500 transition-colors placeholder-gray-300 dark:placeholder-gray-600" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">PASSWORD</label>
            <div className="relative">
              <input type={showPass ? 'text' : 'password'} value={pass} onChange={e => setPass(e.target.value)}
                placeholder="Minimal 8 karakter"
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 text-sm text-gray-700 dark:text-gray-200 outline-none focus:border-teal-400 dark:focus:border-teal-500 transition-colors placeholder-gray-300 dark:placeholder-gray-600 pr-12" />
              <button type="button" onClick={() => setShowPass(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div className="flex justify-end">
            <button type="button" className="text-xs text-teal-500 font-medium">Lupa password?</button>
          </div>
          <button type="submit" disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-teal-500 to-cyan-400 text-white font-bold rounded-3xl shadow-lg shadow-teal-200 dark:shadow-teal-900 active:scale-95 transition-all disabled:opacity-70">
            {loading ? '⏳ Masuk...' : 'Masuk'}
          </button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
          <span className="text-xs text-gray-400 dark:text-gray-600">atau</span>
          <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
        </div>

        <button onClick={() => handleLogin({ preventDefault: () => {} })}
          className="w-full py-3 border border-gray-200 dark:border-gray-700 rounded-2xl flex items-center justify-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 active:scale-95 transition-all">
          <span className="text-lg">🔵</span> Lanjutkan dengan Google
        </button>

        {/* Demo Account */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4">
          <p className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-2">🎯 Akun Demo</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-amber-600 dark:text-amber-500">Email: <span className="font-mono font-semibold">demo@mindcare.id</span></p>
              <p className="text-xs text-amber-600 dark:text-amber-500">Password: <span className="font-mono font-semibold">demo1234</span></p>
            </div>
            <button
              onClick={() => {
                setEmail('demo@mindcare.id')
                setPass('demo1234')
                setLoading(true)
                setTimeout(() => {
                  setLoading(false)
                  onLogin({ name: 'Sarah Amelina', email: 'demo@mindcare.id' })
                }, 800)
              }}
              className="bg-amber-400 text-white text-xs font-bold px-4 py-2 rounded-xl active:scale-95 transition-all">
              Coba Demo
            </button>
          </div>
        </div>
      </div>

      <p className="text-center text-sm text-gray-400 dark:text-gray-500 mt-6">
        Belum punya akun?{' '}
        <button onClick={onSwitch} className="text-teal-500 font-semibold">Daftar sekarang</button>
      </p>
    </div>
  )
}

function Register({ onLogin, onSwitch }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name: '', email: '', pass: '', age: '', goal: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const goals = [
    { id: 'anxiety', label: 'Mengatasi Kecemasan', emoji: '😰' },
    { id: 'stress', label: 'Kelola Stres', emoji: '😤' },
    { id: 'sleep', label: 'Tidur Lebih Baik', emoji: '😴' },
    { id: 'mood', label: 'Tingkatkan Mood', emoji: '😊' },
    { id: 'mindful', label: 'Mindfulness', emoji: '🧘' },
    { id: 'social', label: 'Koneksi Sosial', emoji: '💙' },
  ]

  function handleSubmit() {
    setLoading(true)
    setTimeout(() => { setLoading(false); onLogin({ name: form.name, email: form.email }) }, 1200)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col px-6 py-10">
      {step > 1 && (
        <button onClick={() => setStep(s => s - 1)} className="flex items-center gap-1 text-gray-400 dark:text-gray-500 mb-6 self-start">
          <ArrowLeft size={18} /> Kembali
        </button>
      )}

      {step === 1 && (
        <>
          <Logo />
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-6 border border-gray-100 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-1">Buat akun baru ✨</h2>
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">Mulai perjalanan kesehatan mentalmu</p>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">NAMA LENGKAP</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Nama kamu"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 text-sm text-gray-700 dark:text-gray-200 outline-none focus:border-teal-400 transition-colors placeholder-gray-300 dark:placeholder-gray-600" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">EMAIL</label>
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="nama@email.com"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 text-sm text-gray-700 dark:text-gray-200 outline-none focus:border-teal-400 transition-colors placeholder-gray-300 dark:placeholder-gray-600" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">PASSWORD</label>
                <div className="relative">
                  <input type={showPass ? 'text' : 'password'} value={form.pass} onChange={e => setForm(f => ({ ...f, pass: e.target.value }))}
                    placeholder="Minimal 8 karakter"
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 text-sm text-gray-700 dark:text-gray-200 outline-none focus:border-teal-400 transition-colors placeholder-gray-300 dark:placeholder-gray-600 pr-12" />
                  <button type="button" onClick={() => setShowPass(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <button onClick={() => form.name && form.email && form.pass && setStep(2)}
                className="w-full py-4 bg-gradient-to-r from-teal-500 to-cyan-400 text-white font-bold rounded-3xl shadow-lg active:scale-95 transition-all">
                Lanjutkan
              </button>
            </div>
          </div>
          <p className="text-center text-sm text-gray-400 dark:text-gray-500 mt-6">
            Sudah punya akun?{' '}
            <button onClick={onSwitch} className="text-teal-500 font-semibold">Masuk</button>
          </p>
        </>
      )}

      {step === 2 && (
        <div className="flex-1">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Apa tujuanmu? 🎯</h2>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Pilih satu atau lebih yang sesuai</p>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {goals.map(g => (
              <button key={g.id} onClick={() => setForm(f => ({ ...f, goal: g.id }))}
                className={`p-4 rounded-2xl border-2 text-left transition-all ${form.goal === g.id ? 'border-teal-400 bg-teal-50 dark:bg-teal-900/30' : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900'}`}>
                <div className="text-2xl mb-2">{g.emoji}</div>
                <p className={`text-sm font-semibold ${form.goal === g.id ? 'text-teal-600 dark:text-teal-400' : 'text-gray-700 dark:text-gray-300'}`}>{g.label}</p>
              </button>
            ))}
          </div>
          <button onClick={handleSubmit} disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-teal-500 to-cyan-400 text-white font-bold rounded-3xl shadow-lg active:scale-95 transition-all disabled:opacity-70">
            {loading ? '⏳ Membuat akun...' : 'Selesai & Mulai'}
          </button>
        </div>
      )}
    </div>
  )
}

export default function Auth({ onLogin }) {
  const [mode, setMode] = useState('login')
  if (mode === 'login') return <Login onLogin={onLogin} onSwitch={() => setMode('register')} />
  return <Register onLogin={onLogin} onSwitch={() => setMode('login')} />
}
