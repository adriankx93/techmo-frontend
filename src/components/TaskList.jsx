import { useState } from "react";
import { CheckCircle2, Circle, Trash2, User2, CalendarPlus2, Plus, Archive } from "lucide-react";

export default function TaskList({ data, onToggle, onRemark, onAssign, onDelete, onAdd, onDate, onArchive }) {
  const [newTask, setNewTask] = useState({ desc: "", type: "dzienna", remark: "", assignedTo: "", date: "" });

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
      <div className="flex justify-between items-center mb-6">
        <div className="text-2xl font-bold text-blue-900">Zadania zmiany dziennej i nocnej</div>
        <button
          className="bg-blue-700 hover:bg-blue-800 text-white rounded-xl px-4 py-2 flex items-center gap-2 shadow"
          onClick={() => {
            if (!newTask.desc || !newTask.date) return;
            onAdd({ ...newTask, done: false });
            setNewTask({ desc: "", type: "dzienna", remark: "", assignedTo: "", date: "" });
          }}>
          <Plus /> Dodaj zadanie
        </button>
      </div>
      <div className="flex gap-2 mb-6 flex-wrap">
        <input className="border rounded-xl p-3 flex-1 min-w-[160px]" placeholder="Opis zadania" value={newTask.desc}
          onChange={e => setNewTask(t => ({ ...t, desc: e.target.value }))} />
        <select className="border rounded-xl p-3" value={newTask.type}
          onChange={e => setNewTask(t => ({ ...t, type: e.target.value }))}>
          <option value="dzienna">Dzienna</option>
          <option value="nocna">Nocna</option>
        </select>
        <input type="date" className="border rounded-xl p-3" value={newTask.date}
          onChange={e => setNewTask(t => ({ ...t, date: e.target.value }))} />
        <input className="border rounded-xl p-3 flex-1 min-w-[100px]" placeholder="Przypisany"
          value={newTask.assignedTo} onChange={e => setNewTask(t => ({ ...t, assignedTo: e.target.value }))} />
        <textarea className="border rounded-xl p-3 flex-1 min-w-[120px]" placeholder="Uwagi"
          value={newTask.remark} onChange={e => setNewTask(t => ({ ...t, remark: e.target.value }))} />
      </div>
      <table className="w-full text-sm text-gray-700">
        <thead className="bg-blue-50">
          <tr>
            <th className="py-3 px-2">Status</th>
            <th className="py-3 px-2">Opis</th>
            <th className="py-3 px-2">Typ</th>
            <th className="py-3 px-2">Data</th>
            <th className="py-3 px-2">Uwagi</th>
            <th className="py-3 px-2">Przypisany</th>
            <th className="py-3 px-2">Usuń</th>
            <th className="py-3 px-2">Archiwizuj</th>
          </tr>
        </thead>
        <tbody>
          {data.map(t => (
            <tr key={t.id}
              className={`border-b last:border-b-0 ${t.done ? "bg-green-50/60" : ""} hover:bg-blue-50/40 transition`}>
              <td className="px-2 py-3 text-center">
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
                <input type="date" className="border rounded px-2 py-1 text-xs" value={t.date || ""}
                  onChange={e => onDate(t.id, e.target.value)} />
              </td>
              <td className="px-2">
                <textarea className="border rounded px-2 py-1 text-xs w-40 h-12 resize-y"
                  placeholder="Uwagi" value={t.remark || ""}
                  onChange={e => onRemark(t.id, e.target.value)} />
              </td>
              <td className="px-2">
                <div className="flex items-center gap-2">
                  <User2 className="text-gray-400" size={16} />
                  <input className="border rounded px-2 py-1 text-xs"
                    placeholder="Imię" value={t.assignedTo || ""}
                    onChange={e => onAssign(t.id, e.target.value)} />
                </div>
              </td>
              <td className="px-2 text-center">
                <button onClick={() => onDelete(t.id)}>
                  <Trash2 className="text-red-400 hover:text-red-700" />
                </button>
              </td>
              <td className="px-2 text-center">
                {t.done && (
                  <button title="Przenieś do archiwum" onClick={() => onArchive(t.id)}>
                    <Archive className="text-gray-500 hover:text-blue-700" />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
