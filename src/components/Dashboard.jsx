import { ClipboardList, Wrench, Package, Archive, Warehouse, Calendar } from "lucide-react";
import { useEffect, useState } from "react";

// Dodaj prognozę pogody dla Warszawy (open-meteo.com API)
export default function Dashboard({ stats, chartData, onGoto, mostTasksUser }) {
  const [date, setDate] = useState(() => new Date().toLocaleDateString("pl-PL", { day: "2-digit", month: "2-digit", year: "numeric" }));
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=52.23&longitude=21.01&current_weather=true")
      .then(r => r.json())
      .then(d => setWeather(d.current_weather));
  }, []);

  return (
    <div className="py-6">
      <div className="flex flex-wrap gap-6 mb-6 items-center">
        <div className="text-2xl font-bold text-blue-900">Panel główny</div>
        <div className="ml-auto text-blue-800 font-bold flex gap-4 items-center">
          <span>{date}</span>
          <span>
            {weather ? (
              <>
                <span className="mr-2">{Math.round(weather.temperature)}°C</span>
                <span className="capitalize">{weather.weathercode === 0 ? "Słonecznie" : "Pochmurno"}</span>
              </>
            ) : "Ładowanie pogody..."}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-7 my-7">
        <DashboardCard icon={<ClipboardList size={32} />} title="Zadania" count={stats.tasks}
          color="from-blue-600 to-blue-400" onClick={() => onGoto("tasks")} />
        <DashboardCard icon={<Wrench size={32} />} title="Usterki" count={stats.defects}
          color="from-yellow-500 to-yellow-300" onClick={() => onGoto("defects")} />
        <DashboardCard icon={<Package size={32} />} title="Materiały" count={stats.materials}
          color="from-purple-500 to-purple-300" onClick={() => onGoto("materials")} />
        <DashboardCard icon={<Warehouse size={32} />} title="Magazyn" count={stats.store}
          color="from-teal-600 to-teal-300" onClick={() => onGoto("store")} />
        <DashboardCard icon={<Archive size={32} />} title="Archiwum" count={stats.completed}
          color="from-gray-500 to-gray-300" onClick={() => onGoto("archive")} />
        <DashboardCard icon={<Calendar size={32} />} title="Grafik" count=" " color="from-green-600 to-green-300"
          onClick={() => onGoto("grafik")} />
      </div>
      <div className="mt-6 mb-3 text-md font-semibold text-blue-700">
        Najaktywniejszy pracownik:{" "}
        <span className="font-bold">
          {Object.entries(mostTasksUser)
            .sort((a, b) => b[1] - a[1])[0]?.[0] || "brak"}
        </span>
      </div>
    </div>
  );
}

function DashboardCard({ icon, title, count, color, onClick }) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-lg p-6 border border-blue-100 flex flex-col items-center hover:scale-105 hover:bg-blue-50 transition cursor-pointer`}
      style={{ background: `linear-gradient(120deg, var(--tw-gradient-stops))` }}
      onClick={onClick}
    >
      <div className={`mb-2 text-xl text-gray-900`}>{icon}</div>
      <div className="font-bold text-2xl">{count}</div>
      <div className="text-blue-900 text-sm">{title}</div>
    </div>
  );
}
