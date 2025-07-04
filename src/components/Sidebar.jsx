// components/Sidebar.jsx
import { ClipboardList, Wrench, Package, Archive, Warehouse, Calendar } from "lucide-react";

export default function Sidebar({ current, setTab, onLogout }) {
  return (
    <aside className="h-screen glass px-4 py-7 w-60 flex flex-col shadow-xl fixed top-0 left-0 z-20">
      <div className="font-extrabold text-2xl mb-8 tracking-widest text-blue-800 drop-shadow">
        Obsługa MO
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {[
            { tab: "dashboard", icon: <ClipboardList />, label: "Dashboard" },
            { tab: "tasks", icon: <ClipboardList />, label: "Zadania" },
            { tab: "defects", icon: <Wrench />, label: "Usterki" },
            { tab: "materials", icon: <Package />, label: "Materiały" },
            { tab: "archive", icon: <Archive />, label: "Archiwum" },
            { tab: "grafik", icon: <Calendar />, label: "Grafik" },
          ].map(({ tab, icon, label }) => (
            <li key={tab}>
              <button
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition glass hover:bg-blue-100/40
                  ${current === tab ? "bg-gradient-to-r from-blue-400/50 to-blue-200/40 text-blue-900 shadow-md" : "text-blue-800"}
                `}
                onClick={() => setTab(tab)}
              >
                <span className="opacity-70">{icon}</span>
                <span className="font-semibold">{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <button className="mt-auto w-full py-3 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 text-white font-bold shadow-lg hover:scale-105 transition"
        onClick={onLogout}
      >
        Wyloguj
      </button>
    </aside>
  );
}
