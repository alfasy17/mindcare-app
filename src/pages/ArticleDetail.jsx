import { useState } from 'react'
import { ChevronLeft, Bookmark, Share2, Clock, Heart } from 'lucide-react'

const articleContent = {
  'anxiety-sleep': {
    cat: 'Anxiety', emoji: '🧠', time: '5 menit',
    title: 'Cara Mengatasi Overthinking Sebelum Tidur',
    author: 'Dr. Amelia Putri', date: '28 Maret 2026',
    color: 'from-violet-500 to-purple-600',
    content: [
      { type: 'intro', text: 'Overthinking sebelum tidur adalah masalah yang sangat umum. Pikiran yang terus berputar bisa membuat kamu sulit tidur dan bangun dalam kondisi lelah.' },
      { type: 'heading', text: '1. Teknik Journaling 10 Menit' },
      { type: 'text', text: 'Sebelum tidur, luangkan 10 menit untuk menulis semua yang ada di pikiranmu. Tidak perlu rapi — tulis saja apa adanya. Ini membantu "memindahkan" kekhawatiran dari kepala ke kertas.' },
      { type: 'heading', text: '2. Teknik 5-4-3-2-1 Grounding' },
      { type: 'text', text: 'Fokus pada 5 hal yang bisa kamu lihat, 4 yang bisa disentuh, 3 yang bisa didengar, 2 yang bisa dicium, dan 1 yang bisa dirasakan. Ini membantu pikiran kembali ke momen sekarang.' },
      { type: 'tip', text: '💡 Coba lakukan ini sambil berbaring di tempat tidur dengan lampu redup.' },
      { type: 'heading', text: '3. Batasi Screen Time' },
      { type: 'text', text: 'Cahaya biru dari layar HP merangsang otak untuk tetap aktif. Coba matikan gadget 30-60 menit sebelum tidur dan ganti dengan membaca buku atau mendengarkan musik relaksasi.' },
      { type: 'heading', text: '4. Pernapasan 4-7-8' },
      { type: 'text', text: 'Tarik napas 4 detik, tahan 7 detik, buang 8 detik. Ulangi 4 kali. Teknik ini mengaktifkan sistem saraf parasimpatik yang membantu tubuh rileks.' },
      { type: 'tip', text: '🌙 Konsistensi adalah kunci. Coba lakukan rutinitas ini setiap malam selama 2 minggu.' },
    ]
  },
  'self-care-habits': {
    cat: 'Self-Care', emoji: '💚', time: '7 menit',
    title: '10 Kebiasaan Kecil untuk Mental Health yang Lebih Baik',
    author: 'Tim MindCare', date: '25 Maret 2026',
    color: 'from-teal-500 to-emerald-500',
    content: [
      { type: 'intro', text: 'Kesehatan mental yang baik tidak datang dari satu perubahan besar, tapi dari kebiasaan kecil yang dilakukan secara konsisten setiap hari.' },
      { type: 'heading', text: '1. Mulai Hari dengan Gratitude' },
      { type: 'text', text: 'Setiap pagi, sebutkan 3 hal yang kamu syukuri. Penelitian menunjukkan ini meningkatkan kebahagiaan hingga 25%.' },
      { type: 'heading', text: '2. Bergerak 20 Menit Sehari' },
      { type: 'text', text: 'Tidak harus gym. Jalan kaki, stretching, atau dance di kamar sudah cukup untuk melepas endorfin.' },
      { type: 'tip', text: '💪 Olahraga ringan 20 menit setara dengan efek antidepresan ringan.' },
      { type: 'heading', text: '3. Batasi Konsumsi Berita Negatif' },
      { type: 'text', text: 'Tetap informasi tapi batasi waktu membaca berita. Cukup 15-20 menit sehari dari sumber terpercaya.' },
      { type: 'heading', text: '4. Tidur Konsisten' },
      { type: 'text', text: 'Tidur dan bangun di jam yang sama setiap hari, termasuk weekend. Ini mengatur ritme sirkadian dan meningkatkan kualitas tidur.' },
    ]
  },
  'burnout': {
    cat: 'Depression', emoji: '🌿', time: '6 menit',
    title: 'Mengenal Tanda-tanda Burnout dan Cara Mengatasinya',
    author: 'Dr. Budi Santoso', date: '20 Maret 2026',
    color: 'from-emerald-500 to-teal-600',
    content: [
      { type: 'intro', text: 'Burnout bukan sekadar kelelahan biasa. Ini adalah kondisi kelelahan fisik, emosional, dan mental yang disebabkan oleh stres berkepanjangan.' },
      { type: 'heading', text: 'Tanda-tanda Burnout' },
      { type: 'text', text: 'Merasa lelah meski sudah istirahat, kehilangan motivasi, mudah marah, sulit konsentrasi, dan merasa tidak ada yang berarti dari pekerjaan.' },
      { type: 'tip', text: '⚠️ Jika kamu merasakan 3 atau lebih tanda ini selama lebih dari 2 minggu, pertimbangkan untuk berkonsultasi dengan profesional.' },
      { type: 'heading', text: 'Cara Mengatasi Burnout' },
      { type: 'text', text: 'Pertama, akui bahwa kamu sedang burnout. Banyak orang menolak mengakuinya. Kemudian, ambil jeda — bahkan 1-2 hari istirahat total bisa sangat membantu.' },
      { type: 'heading', text: 'Pencegahan Jangka Panjang' },
      { type: 'text', text: 'Set boundaries yang jelas antara kerja dan istirahat. Belajar mengatakan tidak. Prioritaskan self-care bukan sebagai kemewahan tapi kebutuhan.' },
    ]
  },
}

export default function ArticleDetail({ articleId, onBack }) {
  const article = articleContent[articleId] || articleContent['anxiety-sleep']
  const [bookmarked, setBookmarked] = useState(false)
  const [liked, setLiked] = useState(false)

  return (
    <div className="pb-24">
      <div className={`bg-gradient-to-br ${article.color} px-5 pt-6 pb-8`}>
        <div className="flex items-center justify-between mb-4">
          <button onClick={onBack} className="flex items-center gap-1 text-white/70 text-sm">
            <ChevronLeft size={18} /> Kembali
          </button>
          <div className="flex gap-2">
            <button onClick={() => setBookmarked(b => !b)}
              className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
              <Bookmark size={16} className={`text-white ${bookmarked ? 'fill-white' : ''}`} />
            </button>
            <button className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
              <Share2 size={16} className="text-white" />
            </button>
          </div>
        </div>
        <span className="text-xs bg-white/20 text-white px-2 py-1 rounded-full font-medium">{article.cat}</span>
        <h1 className="text-white text-xl font-bold mt-3 leading-snug">{article.title}</h1>
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center gap-1">
            <Clock size={12} className="text-white/70" />
            <span className="text-xs text-white/70">{article.time} baca</span>
          </div>
          <span className="text-white/40">·</span>
          <span className="text-xs text-white/70">{article.author}</span>
          <span className="text-white/40">·</span>
          <span className="text-xs text-white/70">{article.date}</span>
        </div>
      </div>

      <div className="px-5 pt-5 space-y-4">
        {article.content.map((block, i) => {
          if (block.type === 'intro') return (
            <p key={i} className="text-gray-600 dark:text-gray-300 text-base leading-relaxed font-medium">{block.text}</p>
          )
          if (block.type === 'heading') return (
            <h2 key={i} className="text-gray-800 dark:text-white font-bold text-base mt-2">{block.text}</h2>
          )
          if (block.type === 'text') return (
            <p key={i} className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{block.text}</p>
          )
          if (block.type === 'tip') return (
            <div key={i} className="bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800 rounded-2xl p-4">
              <p className="text-sm text-teal-700 dark:text-teal-400 font-medium">{block.text}</p>
            </div>
          )
          return null
        })}

        {/* Like */}
        <div className="flex items-center justify-center gap-3 py-4 border-t border-gray-100 dark:border-gray-800 mt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Artikel ini membantu?</p>
          <button onClick={() => setLiked(l => !l)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${liked ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-500' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
            <Heart size={16} className={liked ? 'fill-rose-500' : ''} />
            <span className="text-sm font-medium">{liked ? 'Terima kasih!' : 'Ya, membantu'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
