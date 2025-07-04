// components/Dashboard.jsx
import { ClipboardList, Wrench, Package, Archive, Warehouse, Calendar, Sun, Cloud, CloudRain } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Dashboard({ stats, onGoto, mostTasksUser }) {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=52.23&longitude=21.01&current_weather=true")
      .then(r => r.json()).then(d => setWeather(d.current_weather));
  }, []);
  const weatherIcon = !weather ? <Cloud className="text-blue-300" size={28} /> :
    weather.weathercode === 0 ? <Sun className="text-yellow-400 animate-bounce" size={28} /> :
    weather.weathercode === 3 ? <CloudRain className="text-blue-400 animate-bounce" size={28} /> :
    <Cloud className="text-blue-400" size={28} />;
  const date = new Date().toLocaleDateString("pl-PL");

  return (
    <div className="ml-64 p-7">
      <motion.div className="glass p-6 rounded-3xl shadow-lg mb-8 flex flex-col md:flex-row items-center gap-6"
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-50 rounded-xl">{weatherIcon}</div>
          <div>
            <div className="text-2xl font-bold text-blue-900">{date}</div>
            <div className="text-blue-800 font-medium">
              {weather ? `${Math.round(weather.temperature)}°C, ${weather.weathercode === 0 ? "Słonecznie" : "Pochmurno"}` : "Ładowanie..."}
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-end gap-3">
          <button className="rounded-xl px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold shadow-md hover:scale-105 transition"
            onClick={() => onGoto("tasks")}
          >
            Przejdź do zadań
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-7">
        {[
          { icon: ClipboardList, label: "Zadania", value: stats.tasks, tab: "tasks" },
          { icon: Wrench, label: "Usterki", value: stats.defects, tab: "defects" },
          { icon: Package, label: "Materiały", value: stats.materials, tab: "materials" },
          { icon: Warehouse, label: "Magazyn", value: stats.store || 0, tab: "store" },
          { icon: Archive, label: "Archiwum", value: stats.completed, tab: "archive" },
          { icon: Calendar, label: "Grafik", value: "", tab: "grafik" }
        ].map(({ icon: Icon, label, value, tab }) => (
          <motion.div
            key={label}
            className="glass p-5 rounded-2xl flex flex-col items-center gap-2 cursor-pointer shadow-lg hover:scale-105 transition"
            whileHover={{ y: -6, scale: 1.05 }}
            onClick={() => onGoto(tab)}
          >
            <Icon size={24} className="mb-1 text-blue-800" />
            <div className="text-2xl font-bold text-blue-900">{value}</div>
            <div className="text-blue-700">{label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
