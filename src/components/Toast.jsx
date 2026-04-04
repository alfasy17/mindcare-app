import { useEffect, useState } from 'react'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'

const icons = {
  success: <CheckCircle size={18} className="text-emerald-500" />,
  error: <AlertCircle size={18} className="text-rose-500" />,
  info: <Info size={18} className="text-blue-500" />,
}

const borders = {
  success: 'border-l-4 border-emerald-400',
  error: 'border-l-4 border-rose-400',
  info: 'border-l-4 border-blue-400',
}

function Toast({ id, message, type, onRemove }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 10)
    const t = setTimeout(() => { setVisible(false); setTimeout(() => onRemove(id), 300) }, 2700)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={`flex items-center gap-3 bg-white dark:bg-gray-800 rounded-2xl shadow-xl px-4 py-3 ${borders[type]} transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {icons[type]}
      <p className="text-sm font-medium text-gray-700 dark:text-gray-200 flex-1">{message}</p>
      <button onClick={() => onRemove(id)} className="text-gray-300 dark:text-gray-600 hover:text-gray-500">
        <X size={14} />
      </button>
    </div>
  )
}

export default function ToastContainer({ toasts, onRemove }) {
  return (
    <div className="fixed top-20 right-4 z-[100] space-y-2 max-w-xs w-full">
      {toasts.map(t => (
        <Toast key={t.id} {...t} onRemove={onRemove} />
      ))}
    </div>
  )
}
