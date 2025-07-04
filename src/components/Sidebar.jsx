// src/components/Sidebar.jsx
import { ClipboardList, Wrench, Package, LogOut, Archive as ArchiveIcon, Warehouse, Calendar } from "lucide-react";

export default function Sidebar({ current, setTab, onLogout }) {
  return (
    <aside className="bg-gradient-to-tr from-blue-900 via-blue-800 to-blue-700 text-white w-64 flex flex-col min-h-screen shadow-2xl rounded-r-3xl">
      <div className="font-bold text-2xl text-center py-8 tracking-widest select-none">Obsługa MO</div>
      <nav className="flex-1">
        <ul className="space-y-2 px-4">
          <li>
            <button className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl transition font-semibold
              ${current === "dashboard" ? "bg-blue-600/70 shadow-lg" : "hover:bg-blue-600/40"}`}
              onClick={() => setTab("dashboard")}>
              <ClipboardList /> Dashboard
            </button>
          </li>
          <li>
            <button className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl transition font-semibold
              ${current === "tasks" ? "bg-blue-600/70 shadow-lg" : "hover:bg-blue-600/40"}`}
              onClick={() => setTab("tasks")}>
              <ClipboardList /> Zadania
            </button>
          </li>
          <li>
            <button className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl transition font-semibold
              ${current === "defects" ? "bg-blue-600/70 shadow-lg" : "hover:bg-blue-600/40"}`}
              onClick={() => setTab("defects")}>
              <Wrench /> Usterki
            </button>
          </li>
          <li>
            <button className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl transition font-semibold
              ${current === "materials" ? "bg-blue-600/70 shadow-lg" : "hover:bg-blue-600/40"}`}
              onClick={() => setTab("materials")}>
              <Package /> Materiały
            </button>
          </li>
          <li>
            <button className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl transition font-semibold
              ${current === "store" ? "bg-blue-600/70 shadow-lg" : "hover:bg-blue-600/40"}`}
              onClick={() => setTab("store")}>
              <Warehouse /> Magazyn
            </button>
          </li>
          <li>
            <button className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl transition font-semibold
              ${current === "archive" ? "bg-blue-600/70 shadow-lg" : "hover:bg-blue-600/40"}`}
              onClick={() => setTab("archive")}>
              <ArchiveIcon /> Archiwum
            </button>
          </li>
          <li>
            <button className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl transition font-semibold
              ${current === "grafik" ? "bg-blue-600/70 shadow-lg" : "hover:bg-blue-600/40"}`}
              onClick={() => setTab("grafik")}>
              <Calendar /> Grafik
            </button>
          </li>
        </ul>
      </nav>
      <button className="bg-red-500 hover:bg-red-700 w-full p-4 text-center rounded-b-2xl font-semibold transition mt-8" onClick={onLogout}>
        <LogOut className="inline mr-2" /> Wyloguj
      </button>
    </aside>
  );
}
