import { Package, Trash2, Plus } from "lucide-react";
import { useState } from "react";

export default function MaterialList({ data, onRemove, onAdd }) {
  const [newMat, setNewMat] = useState("");

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-bold">Braki materiałów</div>
        <div className="flex gap-2">
          <input
            className="border rounded p-2"
            placeholder="Nazwa nowego materiału"
            value={newMat}
            onChange={e => setNewMat(e.target.value)}
          />
          <button
            className="bg-blue-700 hover:bg-blue-800 text-white rounded-xl px-4 py-2 flex items-center gap-2 shadow"
            onClick={() => {
              if (!newMat) return;
              onAdd({ name: newMat });
              setNewMat("");
            }}>
            <Plus /> Dodaj
          </button>
        </div>
      </div>
      <table className="w-full bg-white rounded-xl shadow overflow-hidden">
        <thead className="bg-blue-50">
          <tr>
            <th className="py-3 px-2 text-left font-semibold">Nazwa materiału</th>
            <th className="py-3 px-2 text-left font-semibold">Usuń</th>
          </tr>
        </thead>
        <tbody>
          {data.map(m => (
            <tr key={m.id} className="border-b last:border-b-0">
              <td className="px-2 py-3 flex items-center gap-2"><Package className="text-blue-400" /> {m.name}</td>
              <td className="px-2">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded text-xs font-semibold flex items-center gap-1"
                  onClick={() => onRemove(m.id)}
                >
                  <Trash2 size={15} /> Usuń
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
