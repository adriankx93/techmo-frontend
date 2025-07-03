import { CheckCircle2, Circle, User2 } from "lucide-react";

export default function TaskList({ data, onToggle, onRemark, onAssign }) {
  return (
    <div className="p-8">
      <div className="text-2xl font-bold mb-4">Zadania</div>
      <table className="w-full bg-white rounded-xl shadow overflow-hidden">
        <thead className="bg-blue-50">
          <tr>
            <th className="py-3 px-2 text-left font-semibold">Status</th>
            <th className="py-3 px-2 text-left font-semibold">Opis</th>
            <th className="py-3 px-2 text-left font-semibold">Typ</th>
            <th className="py-3 px-2 text-left font-semibold">Uwagi</th>
            <th className="py-3 px-2 text-left font-semibold">Przypisany</th>
          </tr>
        </thead>
        <tbody>
          {data.map(t => (
            <tr key={t.id} className="border-b last:border-b-0">
              <td className="px-2 py-3">
                <button onClick={() => onToggle(t.id)} title="Oznacz jako wykonane">
                  {t.done
                    ? <CheckCircle2 className="text-green-500" />
                    : <Circle className="text-gray-300" />}
                </button>
              </td>
              <td className="px-2">{t.desc}</td>
              <td className="px-2">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${t.type === "dzienna" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {t.type}
                </span>
              </td>
              <td className="px-2">
                <input
                  className="border rounded px-2 py-1 text-xs"
                  placeholder="Uwagi"
                  value={t.remark || ""}
                  onChange={e => onRemark(t.id, e.target.value)}
                />
              </td>
              <td className="px-2">
                <div className="flex items-center gap-2">
                  <User2 className="text-gray-400" size={16} />
                  <input
                    className="border rounded px-2 py-1 text-xs"
                    placeholder="Imię"
                    value={t.assignedTo || ""}
                    onChange={e => onAssign(t.id, e.target.value)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
