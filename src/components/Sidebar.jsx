import { LayoutDashboard, ClipboardList, Wrench, Package, LogOut } from "lucide-react";

const menu = [
  { key: "dashboard", icon: <LayoutDashboard />, label: "Dashboard" },
  { key: "tasks", icon: <ClipboardList />, label: "Zadania" },
  { key: "defects", icon: <Wrench />, label: "Usterki" },
  { key: "materials", icon: <Package />, label: "Materiały" }
];

export default function Sidebar({ current, setTab }) {
  return (
    <aside className="bg-blue-950 text-white h-screen w-56 flex flex-col">
      <div className="p-6 text-xl font-bold tracking-wider">Techmo</div>
      <nav className="flex-1 flex flex-col gap-2">
        {menu.map(item =>
          <button
            key={item.key}
            onClick={() => setTab(item.key)}
            className={`flex items-center gap-3 px-5 py-3 text-left hover:bg-blue-900 transition rounded-lg ${current === item.key ? "bg-blue-900" : ""}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        )}
      </nav>
      <button className="flex items-center gap-2 px-5 py-3 mb-4 hover:bg-blue-900 transition rounded-lg">
        <LogOut size={18} /> Wyloguj
      </button>
    </aside>
  );
}
