import { ClipboardList, Wrench, Package, Archive } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Dashboard({ stats, chartData, onGoto, mostTasksUser }) {
  const [date, setDate] = useState(() => new Date().toLocaleDateString("pl-PL", { day: "2-digit", month: "2-digit", year: "numeric" }));
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=52.23&longitude=21.01&current_weather=true")
      .then(r => r.json())
      .then(d => setWeather(d.current_weather));
  }, []);

  const weatherIcon = weather
    ? weather.weathercode === 0
      ? <span className="sun"></span>
      : <span className="cloud"></span>
    : <span className="animate-pulse text-slate-500">…</span>;

  return (
    <motion.div className="py-6 px-2 md:px-8" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex flex-wrap gap-6 mb-6 items-center">
        <div className="text-2xl font-bold text-blue-900 drop-shadow">Panel główny</div>
        <div className="ml-auto text-blue-800 font-bold flex gap-4 items-center">
          <span>{date}</span>
          <span className="flex gap-2 items-center">
            {weatherIcon}
            {weather ? (
              <span>
                {Math.round(weather.temperature)}°C{" "}
                <span className="capitalize">{weather.weathercode === 0 ? "Słonecznie" : "Pochmurno"}</span>
              </span>
            ) : "Ładowanie pogody…"}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-7 my-7">
        <DashboardCard icon={<ClipboardList size={22} />} title="Zadania" count={stats.tasks}
          color="from-blue-600 to-blue-300" onClick={() => onGoto("tasks")} />
        <DashboardCard icon={<Wrench size={22} />} title="Usterki" count={stats.defects}
          color="from-yellow-500 to-yellow-300" onClick={() => onGoto("defects")} />
        <DashboardCard icon={<Package size={22} />} title="Materiały" count={stats.materials}
          color="from-purple-500 to-purple-300" onClick={() => onGoto("materials")} />
        <DashboardCard icon={<Archive size={22} />} title="Archiwum" count={stats.completed}
          color="from-gray-500 to-gray-300" onClick={() => onGoto("archive")} />
      </div>
      <div className="mt-6 mb-3 text-md font-semibold text-blue-700">
        Najaktywniejszy pracownik:{" "}
        <span className="font-bold text-blue-800 drop-shadow">
          {Object.entries(mostTasksUser).sort((a, b) => b[1] - a[1])[0]?.[0] || "brak"}
        </span>
      </div>
    </motion.div>
  );
}

function DashboardCard({ icon, title, count, color, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`glass p-6 rounded-2xl shadow-glass border border-glass flex flex-col items-center cursor-pointer select-none transition`}
      style={{ background: `linear-gradient(120deg, var(--tw-gradient-stops))` }}
      onClick={onClick}
    >
      <div className={`mb-2 text-xl`}>{icon}</div>
      <div className="font-bold text-2xl text-slate-900">{count}</div>
      <div className="text-slate-700 text-sm">{title}</div>
    </motion.div>
  );
}
