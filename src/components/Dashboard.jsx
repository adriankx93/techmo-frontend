import { ClipboardList, Wrench, Package, Archive, Warehouse, Calendar } from "lucide-react"; 
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Dashboard({ stats, chartData, onGoto, mostTasksUser }) {
  const [date, setDate] = useState(() =>
    new Date().toLocaleDateString("pl-PL", { day: "2-digit", month: "2-digit", year: "numeric" })
  );
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=52.23&longitude=21.01&current_weather=true")
      .then(r => r.json())
      .then(d => setWeather(d.current_weather));
  }, []);

  // Przetwarzanie kodu pogody na polski opis:
  function getWeatherDesc(code) {
    switch (code) {
      case 0: return "Słonecznie";
      case 1: return "Przewaga słońca";
      case 2: return "Częściowo pochmurno";
      case 3: return "Pochmurno";
      case 45: case 48: return "Mgła";
      case 51: case 53: case 55: return "Mżawka";
      case 61: case 63: case 65: return "Deszcz";
      case 71: case 73: case 75: return "Śnieg";
      case 80: case 81: case 82: return "Przelotne opady";
      default: return "Brak danych";
    }
  }

  return (
    <div className="py-6">
      <div className="flex flex-wrap gap-6 mb-6 items-center">
        <div className="text-2xl font-bold text-blue-900 drop-shadow">Panel główny</div>
        <div className="ml-auto flex gap-4 items-center bg-white/30 backdrop-blur rounded-xl shadow px-5 py-2 border border-blue-100">
          <span className="font-bold text-blue-800">{date}</span>
          <span>
            {weather ? (
              <span className="flex items-center gap-2">
                <span className="text-lg font-bold">{Math.round(weather.temperature)}°C</span>
                <span className="capitalize text-blue-600 font-semibold">{getWeatherDesc(weather.weathercode)}</span>
              </span>
            ) : (
              "Ładowanie pogody..."
            )}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 my-7">
        <DashboardCard icon={<ClipboardList size={32} />} title="Zadania" count={stats.tasks}
          gradient="from-blue-600 to-blue-300" onClick={() => onGoto("tasks")} />
        <DashboardCard icon={<Wrench size={32} />} title="Usterki" count={stats.defects}
          gradient="from-yellow-500 to-yellow-200" onClick={() => onGoto("defects")} />
        <DashboardCard icon={<Package size={32} />} title="Materiały" count={stats.materials}
          gradient="from-purple-500 to-purple-200" onClick={() => onGoto("materials")} />
        <DashboardCard icon={<Warehouse size={32} />} title="Magazyn" count={stats.store}
          gradient="from-teal-600 to-teal-300" onClick={() => onGoto("store")} />
        <DashboardCard icon={<Archive size={32} />} title="Archiwum" count={stats.completed}
          gradient="from-gray-500 to-gray-300" onClick={() => onGoto("archive")} />
        <DashboardCard icon={<Calendar size={32} />} title="Grafik" count=" " 
          gradient="from-green-600 to-green-200" onClick={() => onGoto("grafik")} />
      </div>
      <div className="mt-7 mb-3 text-md font-semibold text-blue-700 glass">
        Najaktywniejszy pracownik:{" "}
        <span className="font-bold">
          {Object.entries(mostTasksUser)
            .sort((a, b) => b[1] - a[1])[0]?.[0] || "brak"}
        </span>
      </div>
    </div>
  );
}

// Glassmorphism, animacje, shadow
function DashboardCard({ icon, title, count, gradient, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.08, boxShadow: "0 8px 40px 0 rgba(31,38,135,0.19)" }}
      whileTap={{ scale: 0.96 }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, type: "spring" }}
      onClick={onClick}
      className={`
        cursor-pointer rounded-2xl shadow-2xl border border-white/30
        bg-white/40 backdrop-blur-xl flex flex-col items-center justify-center gap-2
        p-6 transition-all hover:shadow-3xl
        `}
      style={{
        background: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))`,
        // tailwind utility gradient fallback
        backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops, ${gradient}))`
      }}
    >
      <div className="mb-1 text-blue-900 drop-shadow">{icon}</div>
      <div className="font-bold text-3xl text-blue-900">{count}</div>
      <div className="text-blue-800 text-base">{title}</div>
    </motion.div>
  );
}
