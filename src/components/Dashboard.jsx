import { useEffect, useState } from "react";
import { ClipboardList, Wrench, Package, CheckCircle2 } from "lucide-react";

// Prosta funkcja pobierania pogody z Open-Meteo (brak klucza potrzebny)
async function getWeather() {
  // Warszawa: 52.2297, 21.0122
  const url = "https://api.open-meteo.com/v1/forecast?latitude=52.2297&longitude=21.0122&current_weather=true";
  const res = await fetch(url);
  const data = await res.json();
  const w = data.current_weather;
  return {
    temp: w?.temperature ?? "--",
    desc: w?.weathercode === 0 ? "Słonecznie" : w?.weathercode === 3 ? "Pochmurno" : "Zmiennie"
  };
}

export default function Dashboard({ stats, chartData, setTab }) {
  const [weather, setWeather] = useState({ temp: "--", desc: "Ładowanie..." });
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    getWeather().then(setWeather);
    const interval = setInterval(() => setDate(new Date()), 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="text-xl text-blue-900 font-bold">
          {date.toLocaleDateString("pl-PL", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </div>
        <div className="flex items-center gap-3 bg-blue-100 px-5 py-2 rounded-xl">
          <span className="font-semibold text-blue-900">Warszawa</span>
          <span className="text-2xl font-bold">{weather.temp}°C</span>
          <span className="italic text-blue-700">{weather.desc}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <button className="rounded-2xl bg-blue-600 text-white p-6 shadow flex flex-col items-center hover:scale-105 transition"
          onClick={() => setTab("tasks")}>
          <ClipboardList size={38} />
          <div className="mt-2 text-xl font-bold">{stats.tasks}</div>
          <div className="text-sm">Zadania</div>
        </button>
        <button className="rounded-2xl bg-yellow-500 text-white p-6 shadow flex flex-col items-center hover:scale-105 transition"
          onClick={() => setTab("defects")}>
          <Wrench size={38} />
          <div className="mt-2 text-xl font-bold">{stats.defects}</div>
          <div className="text-sm">Usterki</div>
        </button>
        <button className="rounded-2xl bg-green-600 text-white p-6 shadow flex flex-col items-center hover:scale-105 transition"
          onClick={() => setTab("materials")}>
          <Package size={38} />
          <div className="mt-2 text-xl font-bold">{stats.materials}</div>
          <div className="text-sm">Materiały</div>
        </button>
        <button className="rounded-2xl bg-blue-400 text-white p-6 shadow flex flex-col items-center hover:scale-105 transition"
          onClick={() => setTab("tasks")}>
          <CheckCircle2 size={38} />
          <div className="mt-2 text-xl font-bold">{stats.completed}</div>
          <div className="text-sm">Wykonane</div>
        </button>
      </div>
      {/* Możesz tu dołożyć wykres lub inne widgety */}
    </div>
  );
}
