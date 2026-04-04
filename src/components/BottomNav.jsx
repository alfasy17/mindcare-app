import { Activity, Brain, Users, Sparkles, User } from 'lucide-react'

const tabs = [
  { id: 'monitor', icon: Activity, label: 'Monitor' },
  { id: 'aktivitas', icon: Brain, label: 'Aktivitas' },
  { id: 'dukungan', icon: Users, label: 'Dukungan' },
  { id: 'booster', icon: Sparkles, label: 'Booster' },
  { id: 'akun', icon: User, label: 'Akun' },
]

export default function BottomNav({ active, onChange }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex z-50 shadow-xl transition-colors duration-300">
      {tabs.map((t) => {
        const isActive = active === t.id
        return (
          <button key={t.id} onClick={() => onChange(t.id)}
            className={`flex-1 flex flex-col items-center py-2.5 gap-0.5 transition-all ${
              isActive ? 'text-teal-500' : 'text-gray-400 dark:text-gray-600'
            }`}>
            <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-teal-50 dark:bg-teal-900/40 scale-110' : ''}`}>
              <t.icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
            </div>
            <span className={`text-xs transition-all ${isActive ? 'font-bold text-teal-500' : 'font-medium'}`}>{t.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
