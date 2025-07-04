import { useState } from "react";
import { Package, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function MaterialList({ data, onAdd, onRemove, onStatus }) {
  const [newMat, setNewMat] = useState({ name: "", status: "na stanie" });

  return (
    <motion.div className="p-4 md:p-8 glass animate-fade-in shadow-glass">
      <div className="flex justify-between items-center mb-6">
        <div className="text-2xl font-bold text-blue-900 flex gap-2 items-center"><Package /> Materiały</div>
        <button
          className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white rounded-xl px-4 py-2 flex items-center gap-2"
          onClick={() => {
            if (!newMat.name) return;
            onAdd(newMat);
            setNewMat({ name: "", status: "na stanie" });
          }}>
          <Plus /> Dodaj materiał
        </button>
      </div>
      <div className="flex gap-2 mb-7">
        <input className="border rounded p-2 glass w-1/2" placeholder="Nazwa materiału"
          value={newMat.name} onChange={e => setNewMat(m => ({ ...m, name: e.target.value }))} />
        <select className="border rounded p-2 glass w-1/4"
          value={newMat.status} onChange={e => setNewMat(m => ({ ...m, status: e.target.value }))}>
          <option value="na stanie">Na stanie</option>
          <option value="zakupiono">Zakupiono</option>
        </select>
      </div>
      <table className="w-full glass rounded-xl shadow-glass overflow-hidden">
        <thead className="bg-blue-50/60">
          <tr>
            <th className="py-3 px-2">Status</th>
            <th className="py-3 px-2">Nazwa</th>
            <th className="py-3 px-2">Akcje</th>
          </tr>
        </thead>
        <tbody>
          {data.map(m => (
            <tr key={m.id} className="border-b last:border-b-0 hover:bg-blue-50/30">
              <td className="px-2 py-3">
                <select
                  className={`rounded px-2 py-1 text-xs font-semibold glass
                    ${m.status === "zakupiono" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}
                  value={m.status}
                  onChange={e => onStatus(m.id, e.target.value)}
                >
                  <option value="na stanie">Na stanie</option>
                  <option value="zakupiono">Zakupiono</option>
                </select>
              </td>
              <td className="px-2">{m.name}</td>
              <td className="px-2">
                <button onClick={() => onRemove(m.id)}>
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
