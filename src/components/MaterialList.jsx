import { Package, Trash2 } from "lucide-react";

export default function MaterialList({ data, onRemove }) {
  return (
    <div className="p-8">
      <div className="text-2xl font-bold mb-4">Braki materiałów</div>
      <table className="w-full bg-white rounded-xl shadow overflow-hidden">
        <thead className="bg-blue-50">
          <tr>
            <th className="py-3 px-2 text-left font-semibold">Nazwa materiału</th>
            <th className="py-3 px-2 text-left font-semibold">Akcja</th>
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
