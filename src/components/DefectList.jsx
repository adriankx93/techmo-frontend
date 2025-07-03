import { useState } from "react";
import { Wrench, Trash2, Plus } from "lucide-react";

const statuses = ["zgłoszona", "w trakcie", "usunięta"];

export default function DefectList({ data, onStatus, onAdd, onDelete }) {
  const [newDef, setNewDef] = useState({ desc: "", priority: "średni", location: "" });

  return (
    <div className="p-8">
      <div className="flex justify-between mb-4">
        <div className="text-2xl font-bold">Lista usterek</div>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl px-4 py-2 flex items-center gap-2 shadow"
          onClick={() => {
            if (!newDef.desc) return;
            onAdd({ ...newDef, status: "zgłoszona", id: Date.now() });
            setNewDef({ desc: "", priority: "średni", location: "" });
          }}
        >
          <Plus /> Dodaj usterkę
        </button>
      </div>
      <div className="flex gap-2 mb-4">
        <input className="border rounded p-2 w-2/5" placeholder="Opis usterki"
          value={newDef.desc} onChange={e => setNewDef(d => ({ ...d, desc: e.target.value }))} />
        <select className="border rounded p-2"
          value={newDef.priority} onChange={e => setNewDef(d => ({ ...d, priority: e.target.value }))}>
          <option>wysoki</option>
          <option>średni</option>
          <option>niski</option>
        </select>
        <input className="border rounded p-2 w-1/3" placeholder="Lokalizacja"
          value={newDef.location} onChange={e => setNewDef(d => ({ ...d, location: e.target.value }))} />
      </div>
      <table className="w-full bg-white rounded-xl shadow overflow-hidden">
        <thead className="bg-yellow-100">
          <tr>
            <th className="py-3 px-2">Status</th>
            <th className="py-3 px-2">Opis</th>
            <th className="py-3 px-2">Priorytet</th>
            <th className="py-3 px-2">Lokalizacja</th>
            <th className="py-3 px-2">Usuń</th>
          </tr>
        </thead>
        <tbody>
          {data.map(d => (
            <tr key={d.id} className="border-b last:border-b-0">
              <td className="px-2">
                <select
                  className={`border rounded px-2 py-1 bg-white
                    ${d.status === "usunięta" ? "text-green-600" : d.status === "w trakcie" ? "text-blue-700" : "text-yellow-700"}
                  `}
                  value={d.status}
                  onChange={e => onStatus(d.id, e.target.value)}
                >
                  {statuses.map(s => <option key={s}>{s}</option>)}
                </select>
              </td>
              <td className="px-2">{d.desc}</td>
              <td className="px-2">{d.priority}</td>
              <td className="px-2">{d.location}</td>
              <td className="px-2">
                <button onClick={() => onDelete(d.id)}>
                  <Trash2 className="text-red-400 hover:text-red-700" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}