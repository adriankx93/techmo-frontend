// src/components/Sidebar.jsx
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
      className="glass bg-gradient-to-br from-blue-900/80 to-blue-600/90 text-white w-72 flex flex-col min-h-screen shadow-2xl border-r border-glass"
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
    >
      <div className="flex items-center justify-center py-7">
        <img src="https://cdn-icons-png.flaticon.com/512/2421/2421040.png" alt="logo" className="w-10 h-10 mr-3" />
        <span className="font-extrabold text-2xl tracking-wide drop-shadow">Tech<span className="text-blue-300">MO</span></span>
      </div>
      <nav className="flex-1 mt-2">
        <ul className="space-y-2 px-4">
          {menu.map(({ tab, label, icon }) => (
            <motion.li key={tab} whileHover={{ scale: 1.04 }}>
              <button
                className={`w-full flex items-center gap-3 px-5 py-3 my-1 rounded-xl transition font-semibold
                  ${current === tab ? "bg-blue-400/30 shadow-lg ring-2 ring-blue-200" : "hover:bg-blue-400/10"}`}
                onClick={() => setTab(tab)}
              >
                <span className="text-blue-200">{icon}</span>
                <span className="tracking-wide">{label}</span>
              </button>
            </motion.li>
          ))}
        </ul>
      </nav>
      <motion.button whileTap={{ scale: 0.98 }}
        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 w-11/12 mx-auto mb-8 p-3 text-center rounded-xl font-semibold transition mt-8 flex items-center justify-center gap-2"
        onClick={onLogout}
      >
        <LogOut className="inline" /> Wyloguj
      </motion.button>
    </motion.aside>
  );
}
