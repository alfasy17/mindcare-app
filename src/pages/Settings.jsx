import { useState } from 'react'
import { ChevronLeft, ChevronRight, Moon, Bell, Clock, Lock, Shield, Trash2, Download, Globe } from 'lucide-react'

function Toggle({ value, onChange }) {
  return (
    <button onClick={() => onChange(!value)}
      className={`w-12 h-6 rounded-full flex items-center transition-all px-0.5 ${value ? 'bg-teal-500 justify-end' : 'bg-gray-200 dark:bg-gray-700 justify-start'}`}>
      <div className="w-5 h-5 bg-white rounded-full shadow transition-all" />
    </button>
  )
}

function Section({ title, children }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
      <p className="text-xs text-gray-400 dark:text-gray-500 font-bold px-5 pt-4 pb-2 tracking-wider">{title}</p>
      {children}
    </div>
  )
}

function Row({ icon: Icon, iconColor, iconBg, label, right, onClick, danger }) {
  return (
    <button onClick={onClick}
      className={`w-full flex items-center gap-3 px-5 py-3.5 border-b border-gray-50 dark:border-gray-800 last:border-0 active:bg-gray-50 dark:active:bg-gray-800 transition-colors text-left`}>
      <div className={`w-9 h-9 ${iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
        <Icon size={17} className={iconColor} />
      </div>
      <span className={`flex-1 text-sm font-medium ${danger ? 'text-rose-500' : 'text-gray-700 dark:text-gray-200'}`}>{label}</span>
      {right || <ChevronRight size={15} className="text-gray-300 dark:text-gray-600" />}
    </button>
  )
}

export default function Settings({ onBack, dark, setDark }) {
  const [notif, setNotif] = useState({ daily: true, reminder: true, community: false, tips: true })
  const [reminder, setReminder] = useState('08:00')
  const [lang, setLang] = useState('id')
  const [privacy, setPrivacy] = useState({ anonymous: true, shareData: false })
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  return (
    <div className="pb-24">
      <div className="bg-gradient-to-br from-gray-700 to-gray-900 px-5 pt-6 pb-6">
        <button onClick={onBack} className="flex items-center gap-1 text-gray-300 mb-4 text-sm">
          <ChevronLeft size={18} /> Kembali
        </button>
        <h2 className="text-white text-xl font-bold">Pengaturan</h2>
        <p className="text-gray-400 text-sm mt-1">Sesuaikan MindCare untukmu</p>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* Tampilan */}
        <Section title="TAMPILAN">
          <Row icon={Moon} iconColor="text-indigo-500" iconBg="bg-indigo-50 dark:bg-indigo-900/30"
            label="Mode Gelap"
            right={<Toggle value={dark} onChange={setDark} />} />
          <Row icon={Globe} iconColor="text-blue-500" iconBg="bg-blue-50 dark:bg-blue-900/30"
            label="Bahasa"
            right={
              <select value={lang} onChange={e => setLang(e.target.value)}
                className="text-sm text-gray-500 dark:text-gray-400 bg-transparent outline-none">
                <option value="id">Indonesia</option>
                <option value="en">English</option>
              </select>
            } />
        </Section>

        {/* Notifikasi */}
        <Section title="NOTIFIKASI">
          {[
            { key: 'daily', label: 'Check-in Harian', desc: 'Pengingat untuk track mood' },
            { key: 'reminder', label: 'Pengingat Aktivitas', desc: 'Meditasi & challenge harian' },
            { key: 'community', label: 'Update Komunitas', desc: 'Balasan forum & chat' },
            { key: 'tips', label: 'Tips Kesehatan Mental', desc: 'Konten edukasi mingguan' },
          ].map(n => (
            <div key={n.key} className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-50 dark:border-gray-800 last:border-0">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{n.label}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{n.desc}</p>
              </div>
              <Toggle value={notif[n.key]} onChange={v => setNotif(p => ({ ...p, [n.key]: v }))} />
            </div>
          ))}
        </Section>

        {/* Pengingat */}
        <Section title="PENGINGAT HARIAN">
          <div className="px-5 py-4">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">Waktu Check-in</p>
            <div className="flex gap-2 flex-wrap">
              {['07:00', '08:00', '09:00', '12:00', '20:00', '21:00'].map(t => (
                <button key={t} onClick={() => setReminder(t)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${reminder === t ? 'bg-teal-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'}`}>
                  {t}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">Pengingat aktif setiap hari pukul <span className="text-teal-500 font-semibold">{reminder}</span></p>
          </div>
        </Section>

        {/* Privasi */}
        <Section title="PRIVASI & KEAMANAN">
          {[
            { key: 'anonymous', label: 'Mode Anonim di Komunitas', desc: 'Sembunyikan identitas di forum & chat' },
            { key: 'shareData', label: 'Bagikan Data Anonim', desc: 'Bantu tingkatkan layanan MindCare' },
          ].map(p => (
            <div key={p.key} className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-50 dark:border-gray-800 last:border-0">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{p.label}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{p.desc}</p>
              </div>
              <Toggle value={privacy[p.key]} onChange={v => setPrivacy(pr => ({ ...pr, [p.key]: v }))} />
            </div>
          ))}
          <Row icon={Lock} iconColor="text-orange-500" iconBg="bg-orange-50 dark:bg-orange-900/30" label="Ubah Password" />
          <Row icon={Shield} iconColor="text-teal-500" iconBg="bg-teal-50 dark:bg-teal-900/30" label="Verifikasi Dua Langkah" />
        </Section>

        {/* Data */}
        <Section title="DATA">
          <Row icon={Download} iconColor="text-blue-500" iconBg="bg-blue-50 dark:bg-blue-900/30" label="Export Data Mood & Jurnal"
            right={<span className="text-xs text-blue-500 font-medium">PDF / CSV</span>} />
          <Row icon={Trash2} iconColor="text-rose-500" iconBg="bg-rose-50 dark:bg-rose-900/30"
            label="Hapus Semua Data" danger
            onClick={() => setShowDeleteConfirm(true)} />
        </Section>

        {showDeleteConfirm && (
          <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-3xl p-5 space-y-3">
            <p className="text-sm font-bold text-rose-700 dark:text-rose-400">⚠️ Hapus semua data?</p>
            <p className="text-xs text-rose-500 dark:text-rose-400">Tindakan ini tidak bisa dibatalkan. Semua jurnal, data mood, dan riwayat aktivitas akan dihapus permanen.</p>
            <div className="flex gap-2">
              <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 py-2.5 rounded-2xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800">Batal</button>
              <button className="flex-1 py-2.5 rounded-2xl bg-rose-500 text-white text-sm font-bold">Hapus</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
