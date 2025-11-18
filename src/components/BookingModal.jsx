import { useState } from 'react'

export default function BookingModal({ open, onClose, homestay, onSubmit }) {
  const [guest_name, setName] = useState('')
  const [guest_email, setEmail] = useState('')
  const [guests, setGuests] = useState(2)
  const [check_in, setIn] = useState('')
  const [check_out, setOut] = useState('')
  const [notes, setNotes] = useState('')

  if (!open) return null

  const submit = (e) => {
    e.preventDefault()
    onSubmit({ homestay_id: homestay.id, guest_name, guest_email, guests: Number(guests), check_in, check_out, notes })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-slate-900">Book {homestay?.title}</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">✕</button>
        </div>
        <p className="text-sm text-slate-500 mb-4">{homestay?.location}, {homestay?.country}</p>
        <form onSubmit={submit} className="space-y-3">
          <input value={guest_name} onChange={(e)=>setName(e.target.value)} placeholder="Your name" className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500" />
          <input value={guest_email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" type="email" className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500" />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-500">Check in</label>
              <input type="date" value={check_in} onChange={(e)=>setIn(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="text-xs text-slate-500">Check out</label>
              <input type="date" value={check_out} onChange={(e)=>setOut(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm text-slate-600">Guests</label>
            <input type="number" min={1} max={20} value={guests} onChange={(e)=>setGuests(e.target.value)} className="w-20 rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>

          <textarea value={notes} onChange={(e)=>setNotes(e.target.value)} placeholder="Notes (optional)" className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500" />

          <button type="submit" className="w-full rounded-xl bg-emerald-600 text-white font-medium py-2 hover:bg-emerald-700">Confirm booking</button>
        </form>
      </div>
    </div>
  )
}
