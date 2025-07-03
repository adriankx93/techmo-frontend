import { useState } from "react";
import { Wrench, Trash2, Plus, Archive } from "lucide-react";

export default function DefectList({ data, onStatus, onAdd, onDelete, onArchive }) {
  const [newDefect, setNewDefect] = useState({ desc: "", priority: "średni", location: "" });

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
      <div className="flex justify-between items-center mb-6">
        <div className="text-2xl font-bold text-blue-900">Lista usterek</div>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl px-4 py-2 flex items-center gap-2 shadow"
          onClick={() => {
            if (!newDefect.desc || !newDefect.location) return;
            onAdd(newDefect);
            setNewDefect({ desc: "", priority: "średni", location: "" });
          }}>
          <Plus /> Zgłoś usterkę
        </button>
      </div>
      <div className="flex gap-2 mb-6 flex-wrap">
        <input className="border rounded-xl p-3 flex-1 min-w-[140px]" placeholder="Opis"
          value={newDefect.desc} onChange={e => setNewDefect(d => ({ ...d, desc: e.target.value }))} />
        <select className="border rounded-xl p-3"
          value={newDefect.priority}
          onChange={e => setNewDefect(d => ({ ...d, priority: e.target.value }))}>
          <option value="niski">Niski</option>
          <option value="średni">Średni</option>
          <option value="wysoki">Wysoki</option>
        </select>
        <input className="border rounded-xl p-3 flex-1 min-w-[100px]" placeholder="Lokalizacja"
          value={newDefect.location} onChange={e => setNewDefect(d => ({ ...d, location: e.target.value }))} />
      </div>
      <table className="w-full text-sm text-gray-700">
        <thead>
          <tr>
            <th className="py-2">Opis</th>
            <th className="py-2">Status</th>
            <th className="py-2">Priorytet</th>
            <th className="py-2">Lokalizacja</th>
            <th className="py-2">Akcje</th>
            <th className="py-2">Archiwizuj</th>
          </tr>
        </thead>
        <tbody>
          {data.map(d => (
            <tr key={d.id} className={`border-b last:border-b-0 hover:bg-yellow-50/30 ${d.status === "usunięta" ? "bg-green-50/60" : ""}`}>
              <td className="py-2">{d.desc}</td>
              <td className="py-2">
                <select className="border rounded p-1"
                  value={d.status}
                  onChange={e => onStatus(d.id, e.target.value)}>
                  <option value="zgłoszona">Zgłoszona</option>
                  <option value="w trakcie">W trakcie</option>
                  <option value="usunięta">Usunięta</option>
                </select>
              </td>
              <td className="py-2">{d.priority}</td>
              <td className="py-2">{d.location}</td>
              <td className="py-2 flex gap-1 justify-center">
                <button onClick={() => onDelete(d.id)}>
                  <Trash2 className="text-red-400 hover:text-red-700" />
                </button>
              </td>
              <td className="py-2 text-center">
                {d.status === "usunięta" && (
                  <button title="Przenieś do archiwum" onClick={() => onArchive(d.id)}>
                    <Archive className="text-gray-500 hover:text-yellow-700" />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
