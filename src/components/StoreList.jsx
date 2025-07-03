import { Trash2, Plus } from "lucide-react";
export default function StoreList({ data, onRemove, onReturn }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
      <div className="text-2xl font-bold text-blue-900 mb-6">Stan magazynu</div>
      <table className="w-full text-sm text-gray-700">
        <thead>
          <tr>
            <th className="py-2">Nazwa</th>
            <th className="py-2">Status</th>
            <th className="py-2">Przywróć do materiałów</th>
            <th className="py-2">Usuń</th>
          </tr>
        </thead>
        <tbody>
          {data.map(m => (
            <tr key={m.id} className="border-b last:border-b-0">
              <td className="py-2">{m.name}</td>
              <td className="py-2">{m.status}</td>
              <td className="py-2 text-center">
                <button className="text-blue-600 hover:text-blue-900" onClick={() => onReturn(m.id)}>
                  <Plus />
                </button>
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
