import { ClipboardList, Wrench, Package, Archive, Warehouse, Calendar, LogOut } from "lucide-react";
import { motion } from "framer-motion";

const menu = [
  { key: "dashboard", icon: ClipboardList, label: "Dashboard" },
  { key: "tasks", icon: ClipboardList, label: "Zadania" },
  { key: "defects", icon: Wrench, label: "Usterki" },
  { key: "materials", icon: Package, label: "Materiały" },
  { key: "store", icon: Warehouse, label: "Magazyn" },
  { key: "archive", icon: Archive, label: "Archiwum" },
  { key: "grafik", icon: Calendar, label: "Grafik" },
];

export default function Sidebar({ current, setTab, onLogout }) {
  return (
    <motion.aside
      initial={{ x: -70, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 18 }}
      className="backdrop-blur-xl bg-white/40 border-r border-blue-100 shadow-2xl min-h-screen w-64 px-4 py-8 flex flex-col"
      style={{ background: "rgba(255,255,255,0.45)", boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.10)" }}
    >
      <div className="font-extrabold text-3xl text-center mb-8 tracking-wider text-blue-900 drop-shadow-lg select-none" style={{ letterSpacing: '0.06em' }}>
        Obsługa MO
      </div>
      <nav className="flex-1">
        <ul className="space-y-1">
          {menu.map(item => {
            const Icon = item.icon;
            const isActive = current === item.key;
            return (
              <li key={item.key}>
                <button
                  onClick={() => setTab(item.key)}
                  className={`w-full flex items-center gap-4 px-5 py-3 rounded-2xl transition-all duration-200
                    ${isActive
                      ? "bg-gradient-to-r from-blue-600/70 to-blue-400/50 text-white shadow-lg scale-[1.03]"
                      : "hover:bg-blue-100/70 text-blue-900/90"}
                    font-semibold text-lg tracking-tight focus:outline-none`}
                  style={{
                    boxShadow: isActive ? "0 6px 20px 0 rgba(30, 64, 175, 0.16)" : "",
                    backdropFilter: "blur(8px)"
                  }}
                >
                  <Icon size={22} className={isActive ? "text-white" : "text-blue-700/80"} />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="mt-12 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-400 via-red-500 to-pink-500 text-white font-bold py-3 rounded-2xl shadow-lg hover:from-red-500 hover:to-red-700 focus:outline-none transition-all"
        onClick={onLogout}
      >
        <LogOut size={20} /> Wyloguj
      </motion.button>
      <div className="mt-6 text-center text-blue-800/40 text-xs select-none">by <span className="font-semibold">Twój Zespół</span></div>
    </motion.aside>
  );
}
