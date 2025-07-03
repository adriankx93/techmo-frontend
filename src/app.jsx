import React, { useState, useEffect } from "react";
import { apiGet, apiPost, apiPut, apiDelete } from "./api";
import { Wrench, PackageSearch, Bell, BarChart2 } from "lucide-react";

const cards = [
  {
    title: "Otwarte usterki",
    icon: <Wrench size={38} className="text-red-500" />,
    stat: (data) => data.defects.filter(d => d.status === "zgłoszona").length,
    bg: "bg-red-50",
    footer: "Kliknij by zobaczyć szczegóły"
  },
  {
    title: "Braki materiałów",
    icon: <PackageSearch size={38} className="text-blue-500" />,
    stat: (data) => data.materials.length,
    bg: "bg-blue-50",
    footer: "Lista do zakupu"
  },
  {
    title: "Nowe zgłoszenia",
    icon: <Bell size={38} className="text-yellow-500" />,
    stat: (data) => data.defects.filter(d => d.status === "zgłoszona" && d.priority === "wysoki").length,
    bg: "bg-yellow-50",
    footer: "Priorytet wysokie"
  }
];

export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [tasks, setTasks] = useState([]);
  const [defects, setDefects] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    apiGet("/tasks").then(setTasks);
    apiGet("/defects").then(setDefects);
    apiGet("/materials").then(setMaterials);
    apiGet("/logs").then(setLogs);
  }, [tab]);

  // Przykładowy prosty wykres: liczba usterek dziennie
  const chartData = (() => {
    const days = {};
    defects.forEach(d => {
      const day = (d.timestamp || d.id).toString().slice(0, 10);
      days[day] = (days[day] || 0) + 1;
    });
    return Object.entries(days).map(([day, count]) => ({ day, count }));
  })();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pb-12">
      {/* HEADER */}
      <header className="flex items-center gap-4 bg-white shadow px-8 py-4">
        <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=48&h=48" className="rounded-full border border-blue-200 shadow" />
        <h1 className="text-2xl font-bold text-blue-900">Techmo CMMS Panel</h1>
        <nav className="flex gap-6 ml-8">
          <button className={tab === "dashboard" ? "font-bold text-blue-700" : "text-gray-500"} onClick={() => setTab("dashboard")}>Dashboard</button>
          <button className={tab === "usterki" ? "font-bold text-blue-700" : "text-gray-500"} onClick={() => setTab("usterki")}>Usterki</button>
          <button className={tab === "materialy" ? "font-bold text-blue-700" : "text-gray-500"} onClick={() => setTab("materialy")}>Materiały</button>
          <button className={tab === "zadania" ? "font-bold text-blue-700" : "text-gray-500"} onClick={() => setTab("zadania")}>Zadania</button>
          <button className={tab === "logs" ? "font-bold text-blue-700" : "text-gray-500"} onClick={() => setTab("logs")}>Logi</button>
        </nav>
      </header>

      {/* DASHBOARD */}
      {tab === "dashboard" &&
        <div className="max-w-6xl mx-auto mt-8 px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {cards.map((card, i) =>
              <div key={i} className={`rounded-2xl shadow-md p-6 ${card.bg} flex flex-col items-center`}>
                {card.icon}
                <div className="text-3xl font-bold mt-3">{card.stat({ defects, materials })}</div>
                <div className="font-semibold text-gray-700 mt-2">{card.title}</div>
                <div className="text-gray-400 text-xs mt-2">{card.footer}</div>
              </div>
            )}
          </div>

          {/* Wykres */}
          <div className="mt-10 p-6 bg-white rounded-xl shadow">
            <div className="font-bold mb-2 flex items-center gap-2"><BarChart2 className="text-blue-400" /> Usterki w czasie</div>
            <div className="w-full h-64">
              <svg width="100%" height="100%">
                {chartData.map((item, idx) =>
                  <rect key={item.day} x={idx * 40 + 40} y={200 - item.count * 10} width="30" height={item.count * 10} fill="#60a5fa" />
                )}
                {/* Oś X */}
                {chartData.map((item, idx) =>
                  <text key={item.day} x={idx * 40 + 55} y={215} fontSize="12" textAnchor="middle">{item.day.slice(-5)}</text>
                )}
              </svg>
            </div>
          </div>

          {/* Ilustracja */}
          <div className="flex justify-center mt-12">
            <img alt="maintenance" src="https://undraw.co/api/illustrations/9f97beac-c004-405b-9a80-7ca4de2201e7" className="w-96 rounded-2xl shadow" />
          </div>
        </div>
      }

      {/* USTERKI */}
      {tab === "usterki" &&
        <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow">
          <h2 className="font-bold text-xl text-blue-800 mb-4">Lista usterek</h2>
          <ul>
            {defects.map(d => (
              <li key={d.id} className="flex gap-4 items-center p-4 border-b last:border-b-0">
                <Wrench className="text-red-400" />
                <div>
                  <div className="font-semibold">{d.desc}</div>
                  <div className="text-xs text-gray-500">{d.priority} • {d.status}</div>
                </div>
                <span className={"ml-auto rounded-lg px-2 py-1 text-xs " + (d.status === "zgłoszona" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700")}>
                  {d.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      }

      {/* MATERIAŁY */}
      {tab === "materialy" &&
        <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-2xl shadow">
          <h2 className="font-bold text-xl text-blue-800 mb-4">Braki materiałów</h2>
          <ul>
            {materials.map(m => (
              <li key={m.id} className="flex items-center justify-between py-2">
                <div className="flex gap-2 items-center">
                  <PackageSearch className="text-blue-400" /> <span>{m.name}</span>
                </div>
                <button className="text-xs text-red-500 underline" onClick={() => { apiDelete(`/materials/${m.id}`); setMaterials(materials.filter(x => x.id !== m.id)); }}>Usuń</button>
              </li>
            ))}
          </ul>
        </div>
      }

      {/* ZADANIA */}
      {tab === "zadania" &&
        <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow">
          <h2 className="font-bold text-xl text-blue-800 mb-4">Zadania zmiany</h2>
          <ul>
            {tasks.map(t => (
              <li key={t.id} className="flex gap-2 items-center p-2 border-b last:border-b-0">
                <input type="checkbox" checked={!!t.done} onChange={() => { apiPut(`/tasks/${t.id}`, { ...t, done: !t.done }); setTasks(tasks.map(x => x.id === t.id ? { ...x, done: !x.done } : x)); }} />
                <span className="font-semibold">{t.desc}</span>
                <span className="ml-auto text-xs text-gray-400">{t.type}</span>
              </li>
            ))}
          </ul>
        </div>
      }

      {/* LOGI */}
      {tab === "logs" &&
        <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow">
          <h2 className="font-bold text-xl text-blue-800 mb-4">Logi operacji</h2>
          <ul className="text-xs text-gray-600 max-h-80 overflow-auto">
            {logs.map(log =>
              <li key={log.id} className="border-b last:border-b-0 py-1">{log.timestamp}: <b>{log.user}</b> – {log.action}</li>
            )}
          </ul>
        </div>
      }
    </div>
  );
}
