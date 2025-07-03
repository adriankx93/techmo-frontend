import { useState } from "react";
import { Trash2, Plus, Package } from "lucide-react";
export default function MaterialList({ data, onAdd, onRemove, onStatus }) {
  const [newMat, setNewMat] = useState({ name: "", status: "na stanie" });

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
      <div className="flex justify-between items-center mb-6">
        <div className="text-2xl font-bold text-blue-900">Materiały</div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2 flex items-center gap-2 shadow"
          onClick={() => { if (!newMat.name) return; onAdd(newMat); setNewMat({ name: "", status: "na stanie" }); }}>
          <Plus /> Dodaj
        </button>
      </div>
      <div className="flex gap-2 mb-6">
        <input className="border rounded-xl p-3 flex-1 min-w-[160px]" placeholder="Nazwa materiału" value={newMat.name}
          onChange={e => setNewMat(m => ({ ...m, name: e.target.value }))} />
        <select className="border rounded-xl p-3" value={newMat.status}
          onChange={e => setNewMat(m => ({ ...m, status: e.target.value }))}>
          <option value="na stanie">Na stanie</option>
          <option value="zakupiono">Zakupiono</option>
        </select>
      </div>
      <table className="w-full text-sm text-gray-700">
        <thead>
          <tr>
            <th className="py-2">Nazwa</th>
            <th className="py-2">Status</th>
            <th className="py-2">Przenieś do magazynu</th>
            <th className="py-2">Usuń</th>
          </tr>
        </thead>
        <tbody>
          {data.map(m => (
            <tr key={m.id} className="border-b last:border-b-0">
              <td className="py-2">{m.name}</td>
              <td className="py-2">
                <select className="border rounded-xl p-1"
                  value={m.status}
                  onChange={e => onStatus(m.id, e.target.value)}>
                  <option value="na stanie">Na stanie</option>
                  <option value="zakupiono">Zakupiono</option>
                </select>
              </td>
              <td className="py-2 text-center">
                {m.status === "zakupiono" && (
                  <button className="text-teal-600 hover:text-teal-900" onClick={() => onStatus(m.id, "zakupiono")}>
                    <Package />
                  </button>
                )}
              </td>
              <td className="py-2 text-center">
                <button className="text-red-400 hover:text-red-700" onClick={() => onRemove(m.id)}>
                  <Trash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
