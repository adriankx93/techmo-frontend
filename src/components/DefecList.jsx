import { Wrench, CheckCircle2, AlertCircle, MapPin } from "lucide-react";

export default function DefectList({ data, onStatus }) {
  return (
    <div className="p-8">
      <div className="text-2xl font-bold mb-4">Lista usterek</div>
      <table className="w-full bg-white rounded-xl shadow overflow-hidden">
        <thead className="bg-blue-50">
          <tr>
            <th className="py-3 px-2 text-left font-semibold">Status</th>
            <th className="py-3 px-2 text-left font-semibold">Opis</th>
            <th className="py-3 px-2 text-left font-semibold">Priorytet</th>
            <th className="py-3 px-2 text-left font-semibold">Lokalizacja</th>
            <th className="py-3 px-2 text-left font-semibold">Akcja</th>
          </tr>
        </thead>
        <tbody>
          {data.map(d => (
            <tr key={d.id} className="border-b last:border-b-0">
              <td className="px-2 py-3">
                {d.status === "zgłoszona"
                  ? <AlertCircle className="text-red-400" />
                  : <CheckCircle2 className="text-green-400" />}
              </td>
              <td className="px-2">{d.desc}</td>
              <td className="px-2">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  d.priority === "wysoki" ? "bg-red-100 text-red-700"
                  : d.priority === "średni" ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
                }`}>{d.priority}</span>
              </td>
              <td className="px-2 flex items-center gap-1 text-xs">
                <MapPin className="text-gray-300" size={14} /> {d.location || "Brak"}
              </td>
              <td className="px-2">
                {d.status === "zgłoszona" &&
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded text-xs font-semibold"
                    onClick={() => onStatus(d.id, "usunięta")}
                  >Zamknij</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
