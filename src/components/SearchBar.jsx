import { useState } from 'react'
import { Search } from 'lucide-react'

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState('')
  const [guests, setGuests] = useState(2)

  const submit = (e) => {
    e.preventDefault()
    onSearch({ q, guests })
  }

  return (
    <form onSubmit={submit} className="mx-auto -mt-10 max-w-3xl rounded-2xl bg-white/70 backdrop-blur border border-slate-200 shadow-sm p-3 flex flex-col sm:flex-row gap-3">
      <div className="flex items-center gap-2 flex-1 bg-white rounded-xl px-3 py-2 border border-transparent focus-within:border-slate-300">
        <Search className="size-5 text-slate-400" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Where to?"
          className="w-full bg-transparent outline-none text-slate-800 placeholder:text-slate-400"
        />
      </div>
      <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 border border-transparent focus-within:border-slate-300">
        <span className="text-slate-500 text-sm">Guests</span>
        <input type="number" min={1} max={20} value={guests} onChange={(e)=>setGuests(e.target.value)} className="w-16 bg-transparent outline-none text-slate-800" />
      </div>
      <button type="submit" className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors">
        Search
      </button>
    </form>
  )
}
