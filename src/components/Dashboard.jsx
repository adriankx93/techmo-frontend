import { ClipboardList, Wrench, Package, Archive, Warehouse, Calendar, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import WeatherIcon from "./WeatherIcon"; // Dodaj nowy komponent!

export default function Dashboard({ stats, chartData, onGoto, mostTasksUser }) {
  const [date, setDate] = useState(() => new Date().toLocaleDateString("pl-PL", { day: "2-digit", month: "2-digit", year: "numeric" }));
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=52.23&longitude=21.01&current_weather=true")
      .then(r => r.json())
      .then(d => setWeather(d.current_weather));
  }, []);

  const quickLinks = [
    { icon: ClipboardList, title: "Zadania", count: stats.tasks, tab: "tasks", color: "from-blue-300 to-blue-600" },
    { icon: Wrench, title: "Usterki", count: stats.defects, tab: "defects", color: "from-yellow-300 to-yellow-500" },
    { icon: Package, title: "Materiały", count: stats.materials, tab: "materials", color: "from-purple-200 to-purple-400" },
    { icon: Warehouse, title: "Magazyn", count: stats.store, tab: "store", color: "from-sky-300 to-blue-400" },
    { icon: Archive, title: "Archiwum", count: stats.completed, tab: "archive", color: "from-slate-300 to-gray-400" },
    { icon: Calendar, title: "Grafik", count: "", tab: "grafik", color: "from-blue-200 to-teal-200" }
  ];

  return (
    <div className="p-4 sm:p-8">
      {/* Pogoda i data */}
      <motion.div 
        className="glass mb-8 flex items-center gap-6 px-6 py-4 rounded-2xl shadow-lg bg-gradient-to-br from-slate-100/80 to-blue-100/70 backdrop-blur-lg"
        initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
      >
        <WeatherIcon weather={weather} />
        <div className="flex flex-col gap-1">
          <div className="text-blue-900 text-lg font-bold">{date}</div>
          <div className="flex items-center gap-2 text-blue-800">
            {weather
              ? <>
                  <span className="text-2xl font-semibold">{Math.round(weather.temperature)}°C</span>
                  <span className="capitalize text-md opacity-80">{weather.weathercode === 0 ? "Słonecznie" : "Pochmurno"}</span>
                </>
              : <span className="italic opacity-70">Ładowanie pogody...</span>
            }
          </div>
        </div>
      </motion.div>

      {/* Szybkie skróty */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-8">
        {quickLinks.map((item, i) => (
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.97 }}
            key={item.tab}
            className={`group p-0.5 rounded-2xl bg-gradient-to-tr ${item.color} shadow-lg transition border border-blue-100`}
            onClick={() => onGoto(item.tab)}
            style={{ minHeight: 112 }}
          >
            <div className="flex flex-col items-center justify-center bg-white/60 backdrop-blur-xl rounded-2xl py-4 transition-all duration-200 w-full h-full">
              <item.icon size={26} className="mb-2 text-blue-800/90 group-hover:scale-110 transition" />
              <div className="text-lg font-bold text-blue-900 group-hover:text-blue-800">{item.count}</div>
              <div className="text-sm text-blue-700">{item.title}</div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Ważne alerty */}
      <motion.div
        className="glass mb-6 flex items-center gap-3 px-5 py-3 rounded-xl bg-gradient-to-br from-blue-50/70 to-slate-100/80 shadow border border-slate-200"
        initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
      >
        <AlertTriangle className="text-yellow-500" size={20} />
        <span className="text-blue-900 font-medium">Uwaga: 2 zadania pilne do wykonania dzisiaj!</span>
      </motion.div>

      {/* Podsumowanie tygodnia */}
      <div className="mb-6 bg-white/50 border border-blue-100 shadow-lg p-5 rounded-2xl flex flex-col sm:flex-row gap-5 items-center">
        <div>
          <span className="font-semibold text-blue-900">Podsumowanie tygodnia: </span>
          <span className="text-blue-700">{stats.completed} zadań ukończonych, {stats.defects} usterki aktywne</span>
        </div>
        <div className="ml-auto flex gap-2 items-center">
          <span className="text-blue-700">Najaktywniejszy:</span>
          <span
            className="px-3 py-1 rounded-xl font-bold text-blue-900 bg-gradient-to-r from-blue-200 to-blue-100 shadow-sm cursor-help"
            title="Osoba z największą liczbą zrealizowanych zadań"
          >
            {Object.entries(mostTasksUser).sort((a, b) => b[1] - a[1])[0]?.[0] || "brak"}
          </span>
        </div>
      </div>
    </div>
  );
}

// WeatherIcon.jsx - prosty komponent na pogodę (glass animacja, możesz go rozbudować!)
/* --- components/WeatherIcon.jsx --- */
import { Sun, Cloud, CloudRain } from "lucide-react";
export default function WeatherIcon({ weather }) {
  let icon = <Cloud size={34} className="text-slate-400" />;
  if (!weather) icon = <Cloud size={34} className="animate-pulse text-slate-300" />;
  else if (weather.weathercode === 0) icon = <Sun size={34} className="text-yellow-400 animate-bounce" />;
  else if (weather.weathercode === 3 || weather.weathercode === 45) icon = <CloudRain size={34} className="text-blue-400 animate-bounce" />;
  return (
    <div className="glass p-3 rounded-2xl bg-white/60 shadow-lg mr-2 flex items-center">
      {icon}
    </div>
  );
}
