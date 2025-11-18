import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import SearchBar from './components/SearchBar'
import Card from './components/Card'
import BookingModal from './components/BookingModal'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [modalOpen, setModalOpen] = useState(false)
  const [active, setActive] = useState(null)

  const fetchFeatured = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API}/api/homestays/featured`)
      const data = await res.json()
      setItems(data)
    } catch (e) {
      setError('Failed to load homestays')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFeatured()
  }, [])

  const onSearch = async ({ q, guests }) => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (q) params.append('q', q)
      if (guests) params.append('guests', guests)
      const res = await fetch(`${API}/api/homestays?${params.toString()}`)
      const data = await res.json()
      setItems(data)
    } catch {
      setError('Search failed')
    } finally {
      setLoading(false)
    }
  }

  const onBook = (homestay) => {
    setActive(homestay)
    setModalOpen(true)
  }

  const submitBooking = async (payload) => {
    try {
      const res = await fetch(`${API}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Failed')
      setModalOpen(false)
      alert('Booking request sent!')
    } catch (e) {
      alert('Could not create booking')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <header className="sticky top-0 z-40 backdrop-blur bg-white/60 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-semibold text-slate-900 tracking-tight">toshi home</div>
          <nav className="text-sm text-slate-600 flex items-center gap-6">
            <a href="#" className="hover:text-slate-900">Browse</a>
            <a href="#" className="hover:text-slate-900">About</a>
            <a href="/test" className="hover:text-slate-900">Status</a>
          </nav>
        </div>
      </header>

      <main>
        <Hero />
        <SearchBar onSearch={onSearch} />

        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-900">Featured stays</h2>
            <button onClick={fetchFeatured} className="text-sm text-slate-600 hover:text-slate-900">Reset</button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-64 rounded-2xl bg-slate-100 animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-slate-600">{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map(item => (
                <Card key={item.id} item={item} onBook={onBook} />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-10 text-sm text-slate-500">
          <div className="flex items-center justify-between">
            <p>© {new Date().getFullYear()} toshi home — simple stays, natural feel.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-slate-700">Privacy</a>
              <a href="#" className="hover:text-slate-700">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      <BookingModal open={modalOpen} onClose={()=>setModalOpen(false)} homestay={active} onSubmit={submitBooking} />
    </div>
  )
}

export default App
