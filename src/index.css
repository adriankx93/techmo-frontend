import { ClipboardList, Wrench, Package, LogOut, Archive as ArchiveIcon, Warehouse, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const menu = [
  { tab: "dashboard", label: "Dashboard", icon: <ClipboardList /> },
  { tab: "tasks", label: "Zadania", icon: <ClipboardList /> },
  { tab: "defects", label: "Usterki", icon: <Wrench /> },
  { tab: "materials", label: "Materiały", icon: <Package /> },
  { tab: "store", label: "Magazyn", icon: <Warehouse /> },
  { tab: "archive", label: "Archiwum", icon: <ArchiveIcon /> },
  { tab: "grafik", label: "Grafik", icon: <Calendar /> },
];

export default function Sidebar({ current, setTab, onLogout }) {
  return (
    <motion.aside
      className="glass bg-gradient-to-br from-slate-200/90 via-slate-300/90 to-slate-400/90
      text-blue-900 w-72 flex flex-col min-h-screen shadow-2xl border-r border-glass"
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
    >
      <div className="flex items-center justify-center py-7 mb-4 border-b border-slate-300">
        <img src="https://cdn-icons-png.flaticon.com/512/2421/2421040.png" alt="logo" className="w-10 h-10 mr-3" />
        <span className="font-extrabold text-2xl tracking-wide">Tech<span className="text-blue-500">MO</span></span>
      </div>
      <nav className="flex-1 mt-2">
        <ul className="space-y-3 px-6">
          {menu.map(({ tab, label, icon }) => (
            <li key={tab}>
              <button
                className={`w-full flex items-center gap-3 px-5 py-3 rounded-2xl text-lg font-medium transition
                  border-2 border-transparent shadow-sm hover:border-blue-300 hover:shadow-md
                  ${
                    current === tab
                      ? "bg-blue-500 text-white shadow-lg scale-105 border-blue-500"
                      : "bg-white/70 text-blue-900 hover:bg-blue-100/70"
                  }`}
                onClick={() => setTab(tab)}
              >
                <span className={current === tab ? "text-white" : "text-blue-500"}>{icon}</span>
                <span>{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <motion.button whileTap={{ scale: 0.98 }}
        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 w-11/12 mx-auto mb-8 p-3 text-center rounded-2xl font-semibold text-white transition mt-8 flex items-center justify-center gap-2 shadow"
        onClick={onLogout}
      >
        <LogOut className="inline" /> Wyloguj
      </motion.button>
    </motion.aside>
  );
}
