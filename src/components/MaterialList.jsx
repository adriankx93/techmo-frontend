import { Package, Trash2, Plus } from "lucide-react";
import { useState } from "react";

const statusOptions = [
  { value: "brak", label: "Brak" },
  { value: "zakupiono", label: "Zakupiono" },
  { value: "na stanie", label: "Na stanie" }
];

export default function MaterialList({ data, onRemove, onAdd, onStatus }) {
  const [newMat, setNewMat] = useState("");

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-bold">Braki materiałów</div>
        <div className="flex gap-2 w-2/3">
          <input
            className="border rounded p-2 flex-1 min-w-0"
            placeholder="Nazwa nowego materiału (np. Śruba M8, filtr HEPA...)"
            value={newMat}
            onChange={e => setNewMat(e.target.value)}
          />
          <button
            className="bg-blue-700 hover:bg-blue-800 text-white rounded-xl px-6 py-2 flex items-center gap-2 shadow"
            onClick={() => {
              if (!newMat) return;
              onAdd({ name: newMat, status: "brak" });
              setNewMat("");
            }}>
            <Plus /> Dodaj
          </button>
        </div>
      </div>
      <table className="w-full bg-white rounded-xl shadow overflow-hidden">
        <thead className="bg-blue-50">
          <tr>
            <th className="py-3 px-2 text-left font-semibold w-1/2">Nazwa materiału</th>
            <th className="py-3 px-2 text-left font-semibold w-1/6">Status</th>
            <th className="py-3 px-2 text-left font-semibold w-1/6">Usuń</th>
          </tr>
        </thead>
        <tbody>
          {data.map(m => (
            <tr key={m.id} className="border-b last:border-b-0">
              <td className="px-2 py-4 flex items-center gap-2 text-lg">
                <Package className="text-blue-400" /> {m.name}
              </td>
              <td className="px-2">
                <select
                  className={`
                    border rounded px-2 py-1 bg-white
                    ${m.status === "brak" ? "text-red-500" : m.status === "zakupiono" ? "text-green-600" : "text-blue-700"}
                  `}
                  value={m.status || "brak"}
                  onChange={e => onStatus(m.id, e.target.value)}
                >
                  {statusOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </td>
              <td className="px-2">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded text-xs font-semibold flex items-center gap-1"
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
