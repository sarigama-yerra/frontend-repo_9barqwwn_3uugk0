export default function Card({ item, onBook }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-[4/3] overflow-hidden bg-slate-100">
        {item.images && item.images.length > 0 ? (
          <img src={item.images[0]} alt={item.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-emerald-50 to-teal-50" />
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-slate-900 truncate">{item.title}</h3>
          {item.rating && (
            <span className="text-sm text-emerald-700">★ {item.rating.toFixed(1)}</span>
          )}
        </div>
        <p className="text-sm text-slate-500 truncate">{item.location}, {item.country}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-slate-900 font-semibold">${item.price_per_night}<span className="text-slate-500 font-normal text-sm">/night</span></span>
          <button onClick={()=>onBook(item)} className="text-emerald-700 hover:text-emerald-800 text-sm font-medium">Book</button>
        </div>
      </div>
    </div>
  )
}
