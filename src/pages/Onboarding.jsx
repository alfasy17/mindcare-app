import { useState } from 'react'

const slides = [
  {
    emoji: '🧠',
    gradient: 'from-teal-400 to-cyan-500',
    title: 'Selamat Datang di MindCare',
    desc: 'Teman perjalanan kesehatan mentalmu. Aman, mudah, dan selalu ada untukmu.',
  },
  {
    emoji: '📊',
    gradient: 'from-violet-400 to-purple-500',
    title: 'Pantau Kondisi Mentalmu',
    desc: 'Track mood dan level stres harian. Lihat pola dan insight mingguan untuk memahami dirimu lebih baik.',
  },
  {
    emoji: '🧘',
    gradient: 'from-blue-400 to-indigo-500',
    title: 'Aktivitas Self-Care',
    desc: 'Meditasi terpandu, jurnal, latihan napas, dan daily challenge untuk menjaga keseimbangan mentalmu.',
  },
  {
    emoji: '💙',
    gradient: 'from-pink-400 to-rose-500',
    title: 'Kamu Tidak Sendirian',
    desc: 'Terhubung dengan psikolog, AI chatbot 24/7, dan komunitas yang saling mendukung.',
  },
]

export default function Onboarding({ onDone }) {
  const [idx, setIdx] = useState(0)
  const slide = slides[idx]
  const isLast = idx === slides.length - 1

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col">
      {/* Skip */}
      <div className="flex justify-end px-6 pt-6">
        {!isLast && (
          <button onClick={onDone} className="text-sm text-gray-400 dark:text-gray-500 font-medium">
            Lewati
          </button>
        )}
      </div>

      {/* Illustration */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-6">
        <div className={`w-48 h-48 rounded-full bg-gradient-to-br ${slide.gradient} flex items-center justify-center shadow-2xl mb-10 transition-all duration-500`}>
          <span className="text-8xl">{slide.emoji}</span>
        </div>

        {/* Dots */}
        <div className="flex gap-2 mb-8">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)}
              className={`rounded-full transition-all duration-300 ${i === idx ? 'w-6 h-2.5 bg-teal-500' : 'w-2.5 h-2.5 bg-gray-200 dark:bg-gray-700'}`} />
          ))}
        </div>

        <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center leading-tight mb-3">
          {slide.title}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-center text-sm leading-relaxed max-w-xs">
          {slide.desc}
        </p>
      </div>

      {/* Actions */}
      <div className="px-6 pb-10 space-y-3">
        {isLast ? (
          <>
            <button onClick={onDone}
              className="w-full py-4 bg-gradient-to-r from-teal-500 to-cyan-400 text-white font-bold rounded-3xl shadow-lg shadow-teal-200 dark:shadow-teal-900 active:scale-95 transition-all">
              Mulai Sekarang
            </button>
          </>
        ) : (
          <button onClick={() => setIdx(i => i + 1)}
            className="w-full py-4 bg-gradient-to-r from-teal-500 to-cyan-400 text-white font-bold rounded-3xl shadow-lg shadow-teal-200 dark:shadow-teal-900 active:scale-95 transition-all">
            Selanjutnya
          </button>
        )}
      </div>
    </div>
  )
}
