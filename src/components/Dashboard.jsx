import { ClipboardList, Wrench, Package, Archive, Calendar, Warehouse } from "lucide-react";

export default function Dashboard({ stats, chartData, onGoto, date, weather }) {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-xl font-semibold mb-2">Witaj w systemie Obsługa MO</div>
          <div className="text-gray-700 text-sm">
            {date} | Pogoda: {weather ? `${weather.temp}°C, ${weather.desc}` : "Ładowanie..."}
          </div>
        </div>
        <button onClick={() => onGoto("grafik")} className="flex items-center gap-2 bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 shadow">
          <Calendar /> Grafik miesiąca
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <StatTile icon={<ClipboardList />} label="Zadania" value={stats.tasks} color="bg-blue-700" onClick={() => onGoto("tasks")} />
        <StatTile icon={<Wrench />} label="Usterki" value={stats.defects} color="bg-yellow-600" onClick={() => onGoto("defects")} />
        <StatTile icon={<Package />} label="Materiały" value={stats.materials} color="bg-green-700" onClick={() => onGoto("materials")} />
        <StatTile icon={<Warehouse />} label="Magazyn" value={stats.store} color="bg-orange-700" onClick={() => onGoto("store")} />
        <StatTile icon={<Archive />} label="Archiwum" value={stats.archive} color="bg-gray-700" onClick={() => onGoto("archive")} />
      </div>
      {/* Dodaj tu miejsce na wykres/statystyki */}
      <div className="text-lg font-bold mb-2">Statystyka usterek (ilość zgłoszeń dziennie)</div>
      <div className="bg-white rounded-xl p-6 shadow text-gray-600">
        {chartData.length ? (
          <ul>
            {chartData.map(({ day, count }) => (
              <li key={day}>{day}: <b>{count}</b> zgłoszeń</li>
            ))}
          </ul>
        ) : "Brak danych"}
      </div>
    </div>
  );
}

function StatTile({ icon, label, value, color, onClick }) {
  return (
    <div className={`rounded-2xl flex flex-col items-center justify-center py-6 cursor-pointer hover:scale-105 shadow ${color}`} onClick={onClick}>
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-lg font-bold">{label}</div>
      <div className="text-2xl">{value}</div>
    </div>
  );
}
