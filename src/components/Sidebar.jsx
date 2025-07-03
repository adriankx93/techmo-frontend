// components/Sidebar.jsx
import { ClipboardList, Wrench, Package, LogOut, Archive as ArchiveIcon, Warehouse, Calendar } from "lucide-react";
export default function Sidebar({ current, setTab, onLogout }) {
  return (
    <aside className="bg-gradient-to-tr from-blue-900 via-blue-800 to-blue-700 text-white w-64 flex flex-col min-h-screen shadow-2xl rounded-r-3xl">
      <div className="font-extrabold text-3xl text-center py-9 tracking-tight drop-shadow-lg">Obsługa MO</div>
      <nav className="flex-1">
        <ul className="space-y-3 px-5">
          <li>
            <button className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl font-bold text-lg transition-all 
              ${current === "dashboard" ? "bg-blue-600/70 shadow-lg" : "hover:bg-blue-900/60"}`}
              onClick={() => setTab("dashboard")}>
              <ClipboardList /> Dashboard
            </button>
          </li>
          <li>
            <button className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl font-bold text-lg transition-all 
              ${current === "tasks" ? "bg-blue-600/70 shadow-lg" : "hover:bg-blue-900/60"}`}
              onClick={() => setTab("tasks")}>
              <ClipboardList /> Zadania
            </button>
          </li>
          <li>
            <button className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl font-bold text-lg transition-all 
              ${current === "defects" ? "bg-blue-600/70 shadow-lg" : "hover:bg-blue-900/60"}`}
              onClick={() => setTab("defects")}>
              <Wrench /> Usterki
            </button>
          </li>
          <li>
            <button className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl font-bold text-lg transition-all 
              ${current === "materials" ? "bg-blue-600/70 shadow-lg" : "hover:bg-blue-900/60"}`}
              onClick={() => setTab("materials")}>
              <Package /> Materiały
            </button>
          </li>
          <li>
            <button className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl font-bold text-lg transition-all 
              ${current === "store" ? "bg-blue-600/70 shadow-lg" : "hover:bg-blue-900/60"}`}
              onClick={() => setTab("store")}>
              <Warehouse /> Magazyn
            </button>
          </li>
          <li>
            <button className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl font-bold text-lg transition-all 
              ${current === "grafik" ? "bg-blue-600/70 shadow-lg" : "hover:bg-blue-900/60"}`}
              onClick={() => setTab("grafik")}>
              <Calendar /> Grafik
            </button>
          </li>
          <li>
            <button className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl font-bold text-lg transition-all 
              ${current === "archive" ? "bg-blue-600/70 shadow-lg" : "hover:bg-blue-900/60"}`}
              onClick={() => setTab("archive")}>
              <ArchiveIcon /> Archiwum
            </button>
          </li>
        </ul>
      </nav>
      <button className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 w-full py-4 text-center font-bold rounded-br-3xl"
        onClick={onLogout}>
        <LogOut className="inline mr-2" /> Wyloguj
      </button>
    </aside>
  );
}
