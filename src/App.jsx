import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import BottomNav from './components/BottomNav'
import PageTransition from './components/PageTransition'
import ToastContainer from './components/Toast'
import InstallPrompt from './components/InstallPrompt'
import Monitor from './pages/Monitor'
import Aktivitas from './pages/Aktivitas'
import Dukungan from './pages/Dukungan'
import Booster from './pages/Booster'
import Akun from './pages/Akun'
import Onboarding from './pages/Onboarding'
import Auth from './pages/Auth'
import Settings from './pages/Settings'
import { useDarkMode } from './hooks/useDarkMode'
import { useToast } from './store/useStore'
import { auth } from './lib/db'
import './index.css'

const tabLabels = { monitor: 'Monitor', aktivitas: 'Aktivitas', dukungan: 'Dukungan', booster: 'Booster', akun: 'Akun' }

function SidebarNav({ tab, setTab, dark, setDark, user, onSettings }) {
  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 fixed h-full z-40 transition-colors duration-300">
      <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center shadow-sm">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" fill="white" opacity="0.9"/>
              <path d="M8 12 Q10 8 12 12 Q14 16 16 12" stroke="rgba(20,184,166,0.7)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <span className="font-bold text-gray-800 dark:text-white text-lg">MindCare</span>
            <p className="text-xs text-gray-400 dark:text-gray-500">Mental Health Companion</p>
          </div>
        </div>
      </div>
      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center text-xl">👩</div>
          <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">{user?.name || 'Pengguna'}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">🔥 7 Hari Streak</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {[
          { id: 'monitor', emoji: '📊', label: 'Monitor' },
          { id: 'aktivitas', emoji: '🧘', label: 'Aktivitas' },
          { id: 'dukungan', emoji: '💙', label: 'Dukungan' },
          { id: 'booster', emoji: '✨', label: 'Booster' },
          { id: 'akun', emoji: '👤', label: 'Akun' },
        ].map((item) => (
          <button key={item.id} onClick={() => setTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all ${
              tab === item.id
                ? 'bg-teal-50 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 font-semibold'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}>
            <span className="text-lg">{item.emoji}</span>
            <span className="text-sm">{item.label}</span>
            {tab === item.id && <div className="ml-auto w-1.5 h-1.5 bg-teal-500 rounded-full" />}
          </button>
        ))}
      </nav>
      <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 space-y-3">
        <button onClick={() => setDark(d => !d)}
          className="w-full flex items-center justify-between px-4 py-2.5 bg-gray-50 dark:bg-gray-800 rounded-2xl transition-colors">
          <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">{dark ? 'Mode Gelap' : 'Mode Terang'}</span>
          <div className={`w-10 h-6 rounded-full flex items-center transition-all px-0.5 ${dark ? 'bg-teal-500 justify-end' : 'bg-gray-200 justify-start'}`}>
            <div className="w-5 h-5 bg-white rounded-full shadow flex items-center justify-center">
              {dark ? <Moon size={11} className="text-teal-500" /> : <Sun size={11} className="text-amber-400" />}
            </div>
          </div>
        </button>
        <p className="text-center text-xs text-gray-300 dark:text-gray-600">MindCare v1.0.0</p>
      </div>
    </aside>
  )
}

export default function App() {
  const [tab, setTab] = useState('monitor')
  const [dark, setDark] = useDarkMode()
  const [appState, setAppState] = useState('loading')
  const [user, setUser] = useState(null)
  const [showSettings, setShowSettings] = useState(false)
  const { toasts, show: showToast, remove: removeToast } = useToast()

  useEffect(() => {
    const seen = localStorage.getItem('mindcare-onboarded')

    // Listen to Supabase auth state
    const { data: { subscription } } = auth.onAuthChange((supaUser) => {
      if (supaUser) {
        const userData = {
          id: supaUser.id,
          name: supaUser.user_metadata?.name || supaUser.email?.split('@')[0],
          email: supaUser.email,
        }
        setUser(userData)
        localStorage.setItem('mindcare-user', JSON.stringify(userData))
        setAppState('app')
      } else {
        setUser(null)
        localStorage.removeItem('mindcare-user')
        if (seen) setAppState('auth')
        else setAppState('onboarding')
      }
    })

    // Initial check
    auth.getUser().then(supaUser => {
      if (supaUser) {
        const userData = {
          id: supaUser.id,
          name: supaUser.user_metadata?.name || supaUser.email?.split('@')[0],
          email: supaUser.email,
        }
        setUser(userData)
        setAppState('app')
      } else {
        if (seen) setAppState('auth')
        else setAppState('onboarding')
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  function handleOnboardingDone() {
    localStorage.setItem('mindcare-onboarded', 'true')
    setAppState('auth')
  }

  function handleLogin(userData) {
    localStorage.setItem('mindcare-user', JSON.stringify(userData))
    setUser(userData)
    setAppState('app')
  }

  async function handleLogout() {
    await auth.signOut()
    localStorage.removeItem('mindcare-user')
    setUser(null)
    setAppState('auth')
  }

  // Loading splash
  if (appState === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-500 to-cyan-400 flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-3xl bg-white/20 flex items-center justify-center mb-4 animate-pulse">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" fill="white"/>
          </svg>
        </div>
        <h1 className="text-white text-2xl font-bold">MindCare</h1>
        <p className="text-teal-100 text-sm mt-1">Mental Health Companion</p>
      </div>
    )
  }

  if (appState === 'onboarding') return <Onboarding onDone={handleOnboardingDone} />
  if (appState === 'auth') return <Auth onLogin={handleLogin} />

  const pageMap = {
    monitor: <Monitor showToast={showToast} user={user} />,
    aktivitas: <Aktivitas showToast={showToast} user={user} />,
    dukungan: <Dukungan showToast={showToast} user={user} />,
    booster: <Booster showToast={showToast} />,
    akun: <Akun onSettings={() => setShowSettings(true)} onLogout={handleLogout} user={user} showToast={showToast} />,
  }

  if (showSettings) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        <div className="lg:max-w-3xl lg:mx-auto">
          <Settings onBack={() => setShowSettings(false)} dark={dark} setDark={setDark} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex transition-colors duration-300">
      <SidebarNav tab={tab} setTab={setTab} dark={dark} setDark={setDark} user={user} onSettings={() => setShowSettings(true)} />

      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Mobile header */}
        <header className="lg:hidden bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-sm transition-colors duration-300">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" fill="white" opacity="0.9"/>
                <path d="M8 12 Q10 8 12 12 Q14 16 16 12" stroke="rgba(20,184,166,0.7)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="font-bold text-gray-800 dark:text-white text-lg">MindCare</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setDark(d => !d)}
              className="w-9 h-9 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center transition-colors">
              {dark ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-gray-500" />}
            </button>
            <span className="text-xs bg-teal-50 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 px-3 py-1.5 rounded-full font-semibold">🔥 7 Hari</span>
          </div>
        </header>

        {/* Desktop header */}
        <header className="hidden lg:flex bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-8 py-4 items-center justify-between sticky top-0 z-30 shadow-sm transition-colors duration-300">
          <div>
            <h2 className="font-bold text-gray-800 dark:text-white text-lg">{tabLabels[tab]}</h2>
            <p className="text-xs text-gray-400 dark:text-gray-500">Kamis, 2 April 2026</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm bg-teal-50 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 px-4 py-2 rounded-full font-semibold">🌿 Hari ini lebih baik</span>
            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-xl">👩</div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto pb-20 lg:pb-6 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
          <div className="lg:max-w-3xl lg:mx-auto">
            <PageTransition pageKey={tab}>
              {pageMap[tab]}
            </PageTransition>
          </div>
        </main>

        <div className="lg:hidden">
          <BottomNav active={tab} onChange={setTab} />
        </div>
      </div>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <InstallPrompt />
    </div>
  )
}
