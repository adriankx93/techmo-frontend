import { useState } from "react";
import { Wrench, Trash2, Plus, CheckCircle2, Circle } from "lucide-react";
import { motion } from "framer-motion";

const statusColors = {
  zgłoszona: "bg-orange-100 text-orange-800",
  "w realizacji": "bg-blue-100 text-blue-800",
  usunięta: "bg-green-100 text-green-700",
};

export default function DefectList({ data, onStatus, onAdd, onDelete }) {
  const [newDef, setNewDef] = useState({ desc: "", priority: "średni", location: "" });

  return (
    <motion.div className="p-4 md:p-8 glass animate-fade-in shadow-glass">
      <div className="flex justify-between items-center mb-6">
        <div className="text-2xl font-bold text-blue-900 flex gap-3 items-center"><Wrench /> Usterki</div>
        <button
          className="bg-gradient-to-r from-blue-500 to-blue-300 hover:from-blue-600 hover:to-blue-400 text-white rounded-xl px-4 py-2 flex items-center gap-2"
          onClick={() => {
            if (!newDef.desc) return;
            onAdd({ ...newDef });
            setNewDef({ desc: "", priority: "średni", location: "" });
          }}>
          <Plus /> Zgłoś usterkę
        </button>
      </div>
      <div className="flex gap-2 mb-7">
        <input className="border rounded p-2 glass w-1/3" placeholder="Opis usterki"
          value={newDef.desc} onChange={e => setNewDef(d => ({ ...d, desc: e.target.value }))} />
        <input className="border rounded p-2 glass w-1/4" placeholder="Lokalizacja"
          value={newDef.location} onChange={e => setNewDef(d => ({ ...d, location: e.target.value }))} />
        <select className="border rounded p-2 glass w-1/5"
          value={newDef.priority}
          onChange={e => setNewDef(d => ({ ...d, priority: e.target.value }))}>
          <option value="wysoki">Wysoki</option>
          <option value="średni">Średni</option>
          <option value="niski">Niski</option>
        </select>
      </div>
      <table className="w-full glass rounded-xl shadow-glass overflow-hidden">
        <thead className="bg-blue-50/60">
          <tr>
            <th className="py-3 px-2">Status</th>
            <th className="py-3 px-2">Opis</th>
            <th className="py-3 px-2">Lokalizacja</th>
            <th className="py-3 px-2">Priorytet</th>
            <th className="py-3 px-2">Akcje</th>
          </tr>
        </thead>
        <tbody>
          {data.map(d => (
            <tr key={d.id} className="border-b last:border-b-0 hover:bg-blue-50/30">
              <td className="px-2 py-3">
                <select
                  className={`rounded px-2 py-1 text-xs font-semibold glass ${statusColors[d.status] || ""}`}
                  value={d.status}
                  onChange={e => onStatus(d.id, e.target.value)}
                >
                  <option value="zgłoszona">Zgłoszona</option>
                  <option value="w realizacji">W realizacji</option>
                  <option value="usunięta">Usunięta</option>
                </select>
              </td>
              <td className="px-2">{d.desc}</td>
              <td className="px-2">{d.location}</td>
              <td className="px-2">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold
                  ${d.priority === "wysoki" ? "bg-red-100 text-red-600"
                      : d.priority === "średni" ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}>
                  {d.priority}
                </span>
              </td>
              <td className="px-2">
                <button onClick={() => onDelete(d.id)}>
                  <Trash2 className="text-red-400 hover:text-red-700" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
