// components/Sidebar.jsx
import { ClipboardList, Wrench, Package, LogOut, Archive } from "lucide-react";

export default function Sidebar({ current, setTab, onLogout }) {
  return (
    <aside className="bg-blue-900 text-white w-60 flex flex-col min-h-screen shadow-2xl">
      <div className="font-bold text-2xl text-center py-7 tracking-wider">Obsługa MO</div>
      <nav className="flex-1">
        <ul className="space-y-2 px-3">
          <li>
            <button className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl transition 
            ${current === "dashboard" ? "bg-blue-700" : "hover:bg-blue-800"}`} onClick={() => setTab("dashboard")}>
              <ClipboardList /> Dashboard
            </button>
          </li>
          <li>
            <button className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl transition 
            ${current === "tasks" ? "bg-blue-700" : "hover:bg-blue-800"}`} onClick={() => setTab("tasks")}>
              <ClipboardList /> Zadania
            </button>
          </li>
          <li>
            <button className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl transition 
            ${current === "defects" ? "bg-blue-700" : "hover:bg-blue-800"}`} onClick={() => setTab("defects")}>
              <Wrench /> Usterki
            </button>
          </li>
          <li>
            <button className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl transition 
            ${current === "materials" ? "bg-blue-700" : "hover:bg-blue-800"}`} onClick={() => setTab("materials")}>
              <Package /> Materiały
            </button>
          </li>
          <li>
            <button className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl transition 
            ${current === "archive" ? "bg-blue-700" : "hover:bg-blue-800"}`} onClick={() => setTab("archive")}>
              <Archive /> Archiwum
            </button>
          </li>
        </ul>
      </nav>
      <button className="bg-red-500 hover:bg-red-700 w-full p-4 text-center" onClick={onLogout}>
        <LogOut className="inline mr-2" /> Wyloguj
      </button>
    </aside>
  );
}
