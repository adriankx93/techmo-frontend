import React, { useState } from "react";
import { Calendar, Sun, Moon, User } from "lucide-react";
import { format, isToday } from "date-fns";
import { pl } from "date-fns/locale";

// Mapuj tu nazwiska do typów zmiany, możesz dodać więcej
const shifts = [
  { key: "Artur", label: "Zmiana Artura", icon: <User className="text-blue-500" /> },
  { key: "Sławek", label: "Zmiana Sławka", icon: <User className="text-green-500" /> },
  { key: "Andrzej", label: "Zmiana Andrzeja", icon: <User className="text-orange-500" /> },
  { key: "Darek", label: "Zmiana Darka", icon: <User className="text-purple-500" /> }
];

function getShiftByName(name) {
  return shifts.find(s => name && name.toLowerCase().includes(s.key.toLowerCase())) || shifts[0];
}

function getShiftTypeByHour(hour) {
  // Przyjmijmy: dzień 6:00-18:00, noc 18:00-6:00
  return hour >= 6 && hour < 18 ? "dzienna" : "nocna";
}

export default function TaskList({ data, onToggle, onRemark, onAssign, onDelete, onAdd, onDate }) {
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [showAdd, setShowAdd] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    assignedTo: shifts[0].key,
    date: selectedDate,
    shift: "dzienna"
  });

  // Grupa zadań wg daty i zmiany
  const tasksByDay = {};
  data.forEach(task => {
    const day = task.date || format(new Date(), "yyyy-MM-dd");
    if (!tasksByDay[day]) tasksByDay[day] = { dzienna: [], nocna: [] };
    const shift = task.shift || getShiftTypeByHour(new Date(task.date || Date.now()).getHours());
    tasksByDay[day][shift].push(task);
  });

  // Lista dni (posortowana malejąco)
  const days = Object.keys(tasksByDay).sort((a, b) => b.localeCompare(a));

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Wybór daty */}
      <div className="flex items-center mb-4 gap-2">
        <Calendar className="text-blue-400" />
        <input
          type="date"
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
          className="border px-3 py-2 rounded-lg outline-blue-500"
        />
        <button
          className="ml-auto px-4 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
          onClick={() => setShowAdd(s => !s)}
        >{showAdd ? "Anuluj" : "Dodaj zadanie"}</button>
      </div>
      {/* Dodawanie zadania */}
      {showAdd && (
        <form
          className="glass rounded-2xl p-4 flex flex-col gap-2 mb-6"
          onSubmit={e => {
            e.preventDefault();
            if (!newTask.title) return;
            onAdd({ ...newTask, date: selectedDate, id: Date.now() });
            setShowAdd(false);
            setNewTask({ title: "", assignedTo: shifts[0].key, date: selectedDate, shift: "dzienna" });
          }}
        >
          <input
            placeholder="Treść zadania"
            className="border px-3 py-2 rounded"
            value={newTask.title}
            onChange={e => setNewTask(t => ({ ...t, title: e.target.value }))}
            required
          />
          <div className="flex gap-3 items-center">
            <select
              value={newTask.assignedTo}
              className="border rounded px-3 py-2"
              onChange={e => setNewTask(t => ({ ...t, assignedTo: e.target.value }))}
            >
              {shifts.map(s => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </select>
            <select
              value={newTask.shift}
              className="border rounded px-3 py-2"
              onChange={e => setNewTask(t => ({ ...t, shift: e.target.value }))}
            >
              <option value="dzienna">Zmiana dzienna</option>
              <option value="nocna">Zmiana nocna</option>
            </select>
            <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 font-bold">Dodaj</button>
          </div>
        </form>
      )}

      {/* Lista zadań wg dnia i zmiany */}
      {days.map(day => (
        <div key={day} className="mb-8">
          <div className="flex items-center gap-3 text-lg font-bold mb-2 mt-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-xl">{format(new Date(day), "PPP", { locale: pl })}</span>
            {isToday(new Date(day)) && <span className="ml-2 bg-green-200 text-green-900 px-2 py-1 rounded text-xs">DZIŚ</span>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["dzienna", "nocna"].map(shiftType => (
              <div key={shiftType} className="glass p-4 rounded-2xl shadow border border-blue-100">
                <div className="flex items-center gap-2 mb-2">
                  {shiftType === "dzienna" ? <Sun className="text-yellow-400" /> : <Moon className="text-blue-700" />}
                  <span className="font-bold text-blue-900">{shiftType === "dzienna" ? "Zmiana dzienna" : "Zmiana nocna"}</span>
                </div>
                {tasksByDay[day][shiftType].length === 0 ? (
                  <div className="text-gray-400 text-sm">Brak zadań</div>
                ) : (
                  <ul>
                    {tasksByDay[day][shiftType].map(task => {
                      const shift = getShiftByName(task.assignedTo);
                      return (
                        <li key={task.id} className="flex items-center justify-between p-2 mb-2 bg-white bg-opacity-70 rounded-lg shadow">
                          <div>
                            <span className="font-semibold">{shift.icon} {shift.label}: </span>
                            <span>{task.title}</span>
                          </div>
                          <div className="flex gap-2">
                            <button
                              className={`rounded px-2 py-1 text-xs font-bold ${
                                task.done ? "bg-green-300 text-green-900" : "bg-gray-200 text-gray-600 hover:bg-blue-200"
                              }`}
                              onClick={() => onToggle(task.id)}
                              title={task.done ? "Oznacz jako niedokończone" : "Oznacz jako zrobione"}
                            >{task.done ? "✓" : "–"}</button>
                            <button
                              className="rounded px-2 py-1 text-xs bg-red-100 text-red-600 hover:bg-red-300"
                              onClick={() => onDelete(task.id)}
                              title="Usuń"
                            >🗑</button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
