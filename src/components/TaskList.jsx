import { useState } from "react";
import { CheckCircle2, Circle, Trash2, User2, Plus } from "lucide-react";
import { motion } from "framer-motion";

export default function TaskList({ data, onToggle, onRemark, onAssign, onDelete, onAdd, onDate }) {
  const [newTask, setNewTask] = useState({ desc: "", type: "dzienna", remark: "", assignedTo: "", date: "" });

  return (
    <motion.div className="p-4 md:p-8 animate-fade-in glass shadow-glass" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex justify-between items-center mb-6">
        <div className="text-2xl font-bold text-blue-900">Zadania zmiany dziennej i nocnej</div>
        <button
          className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white rounded-xl px-4 py-2 flex items-center gap-2 shadow"
          onClick={() => {
            if (!newTask.desc || !newTask.date) return;
            onAdd({ ...newTask, done: false });
            setNewTask({ desc: "", type: "dzienna", remark: "", assignedTo: "", date: "" });
          }}>
          <Plus /> Dodaj zadanie
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-7">
        <input className="border rounded p-2 w-56 glass" placeholder="Opis zadania"
          value={newTask.desc} onChange={e => setNewTask(t => ({ ...t, desc: e.target.value }))} />
        <select className="border rounded p-2 glass" value={newTask.type}
          onChange={e => setNewTask(t => ({ ...t, type: e.target.value }))}>
          <option value="dzienna">Dzienna</option>
          <option value="nocna">Nocna</option>
        </select>
        <input type="date" className="border rounded p-2 glass" value={newTask.date}
          onChange={e => setNewTask(t => ({ ...t, date: e.target.value }))} />
        <input className="border rounded p-2 w-32 glass" placeholder="Przypisany"
          value={newTask.assignedTo} onChange={e => setNewTask(t => ({ ...t, assignedTo: e.target.value }))} />
        <textarea className="border rounded p-2 w-40 glass" placeholder="Uwagi"
          value={newTask.remark} onChange={e => setNewTask(t => ({ ...t, remark: e.target.value }))} />
      </div>
      <table className="w-full glass rounded-xl shadow-glass overflow-hidden">
        <thead className="bg-blue-50/60">
          <tr>
            <th className="py-3 px-2">Status</th>
            <th className="py-3 px-2">Opis</th>
            <th className="py-3 px-2">Typ</th>
            <th className="py-3 px-2">Data</th>
            <th className="py-3 px-2">Uwagi</th>
            <th className="py-3 px-2">Przypisany</th>
            <th className="py-3 px-2">Usuń</th>
          </tr>
        </thead>
        <tbody>
          {data.map(t => (
            <tr key={t.id} className={`border-b last:border-b-0 transition-all ${t.done ? "bg-green-100/70" : "hover:bg-blue-50/40"}`}>
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
                  type="date"
                  className="border rounded px-2 py-1 text-xs glass"
                  value={t.date || ""}
                  onChange={e => onDate(t.id, e.target.value)}
                />
              </td>
              <td className="px-2">
                <textarea
                  className="border rounded px-2 py-1 text-xs w-32 h-14 resize-y glass"
                  placeholder="Uwagi"
                  value={t.remark || ""}
                  onChange={e => onRemark(t.id, e.target.value)}
                />
              </td>
              <td className="px-2">
                <div className="flex items-center gap-2">
                  <User2 className="text-gray-400" size={16} />
                  <input
                    className="border rounded px-2 py-1 text-xs glass"
                    placeholder="Imię"
                    value={t.assignedTo || ""}
                    onChange={e => onAssign(t.id, e.target.value)}
                  />
                </div>
              </td>
              <td className="px-2">
                <button onClick={() => onDelete(t.id)}>
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
