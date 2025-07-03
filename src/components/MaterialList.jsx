import { useState } from "react";
import { Package, Trash2, Plus } from "lucide-react";

export default function MaterialList({ data, onAdd, onRemove, onStatus, onToStore }) {
  const [newMat, setNewMat] = useState({ name: "", status: "na stanie" });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-bold">Materiały</div>
        <button
          className="bg-green-700 hover:bg-green-800 text-white rounded-xl px-4 py-2 flex items-center gap-2 shadow"
          onClick={() => {
            if (!newMat.name) return;
            onAdd(newMat);
            setNewMat({ name: "", status: "na stanie" });
          }}>
          <Plus /> Dodaj materiał
        </button>
      </div>
      <div className="flex gap-2 mb-6">
        <input
          className="border rounded p-2 w-3/5"
          placeholder="Nazwa materiału"
          value={newMat.name}
          onChange={e => setNewMat(m => ({ ...m, name: e.target.value }))}
        />
        <select
          className="border rounded p-2"
          value={newMat.status}
          onChange={e => setNewMat(m => ({ ...m, status: e.target.value }))}
        >
          <option value="na stanie">Na stanie</option>
          <option value="do zakupu">Do zakupu</option>
          <option value="zakupiono">Zakupiono</option>
        </select>
      </div>
      <table className="w-full bg-white rounded-xl shadow overflow-hidden">
        <thead className="bg-blue-50">
          <tr>
            <th className="py-3 px-2">Nazwa</th>
            <th className="py-3 px-2">Status</th>
            <th className="py-3 px-2">Usuń</th>
          </tr>
        </thead>
        <tbody>
          {data.map(m => (
            <tr key={m.id} className="border-b last:border-b-0 hover:bg-green-50/40">
              <td className="px-2">{m.name}</td>
              <td className="px-2">
                <select
                  className="border rounded px-2 py-1 text-xs"
                  value={m.status}
                  onChange={e => {
                    onStatus(m.id, e.target.value);
                    if (e.target.value === "zakupiono") onToStore(m.id);
                  }}
                >
                  <option value="na stanie">Na stanie</option>
                  <option value="do zakupu">Do zakupu</option>
                  <option value="zakupiono">Zakupiono</option>
                </select>
              </td>
              <td className="px-2">
                <button onClick={() => onRemove(m.id)}>
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
