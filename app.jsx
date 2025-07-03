import React, { useState, useEffect } from "react";
import { apiGet, apiPost, apiPut, apiDelete } from "./api";

export default function App() {
  const [tab, setTab] = useState("zadania");
  const [tasks, setTasks] = useState([]);
  const [defects, setDefects] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [logs, setLogs] = useState([]);
  const [newTask, setNewTask] = useState({ desc: "", type: "dzienna", assignedTo: "" });
  const [newDefect, setNewDefect] = useState({ desc: "", priority: "średni", location: "", reportedBy: "" });

  useEffect(() => {
    apiGet("/tasks").then(setTasks);
    apiGet("/defects").then(setDefects);
    apiGet("/materials").then(setMaterials);
    apiGet("/logs").then(setLogs);
  }, [tab]);

  async function addTask() {
    await apiPost("/tasks", { ...newTask, user: "Admin" });
    setNewTask({ desc: "", type: "dzienna", assignedTo: "" });
    apiGet("/tasks").then(setTasks);
  }
  async function updateTask(id, data) {
    await apiPut(`/tasks/${id}`, { ...tasks.find(t => t.id === id), ...data, user: "Admin" });
    apiGet("/tasks").then(setTasks);
  }

  async function addMaterial(name) {
    await apiPost("/materials", { name, user: "Admin" });
    apiGet("/materials").then(setMaterials);
  }
  async function removeMaterial(id) {
    await apiDelete(`/materials/${id}`);
    apiGet("/materials").then(setMaterials);
  }

  async function addDefect() {
    await apiPost("/defects", { ...newDefect, reportedBy: "Admin" });
    setNewDefect({ desc: "", priority: "średni", location: "" });
    apiGet("/defects").then(setDefects);
  }
  async function updateDefect(id, data) {
    await apiPut(`/defects/${id}`, { ...defects.find(d => d.id === id), ...data, user: "Admin" });
    apiGet("/defects").then(setDefects);
  }

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 900, margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>Panel Technika Biurowca</h1>
      <nav style={{ display: "flex", gap: 10, justifyContent: "center", margin: 20 }}>
        <button onClick={() => setTab("zadania")}>Zadania</button>
        <button onClick={() => setTab("materialy")}>Braki materiałów</button>
        <button onClick={() => setTab("usterki")}>Usterki</button>
        <button onClick={() => setTab("logs")}>Logi</button>
      </nav>
      {tab === "zadania" && (
        <div>
          <h2>Zadania</h2>
          <div>
            <input placeholder="Opis zadania"
              value={newTask.desc}
              onChange={e => setNewTask(t => ({ ...t, desc: e.target.value }))}
            />
            <select
              value={newTask.type}
              onChange={e => setNewTask(t => ({ ...t, type: e.target.value }))}
            >
              <option value="dzienna">Dzienna</option>
              <option value="nocna">Nocna</option>
            </select>
            <button onClick={addTask}>Dodaj</button>
          </div>
          <ul>
            {tasks.map(t => (
              <li key={t.id} style={{ margin: 10, background: "#f7f7f7", padding: 10, borderRadius: 8 }}>
                <input type="checkbox" checked={!!t.done} onChange={() => updateTask(t.id, { done: !t.done })} />
                <b style={{ marginLeft: 8 }}>{t.desc}</b>
                <div>
                  Uwagi: <input
                    value={t.remark || ""}
                    onChange={e => updateTask(t.id, { remark: e.target.value })}
                  />
                </div>
                <div>
                  Brakujący materiał: <input
                    value={t.missing || ""}
                    onChange={e => {
                      updateTask(t.id, { missing: e.target.value });
                      if (e.target.value) addMaterial(e.target.value);
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {tab === "materialy" && (
        <div>
          <h2>Braki materiałów</h2>
          <ul>
            {materials.map(m => (
              <li key={m.id} style={{ margin: 5 }}>
                {m.name} <button onClick={() => removeMaterial(m.id)}>Usuń</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {tab === "usterki" && (
        <div>
          <h2>Usterki</h2>
          <div>
            <input placeholder="Opis usterki"
              value={newDefect.desc}
              onChange={e => setNewDefect(d => ({ ...d, desc: e.target.value }))}
            />
            <select
              value={newDefect.priority}
              onChange={e => setNewDefect(d => ({ ...d, priority: e.target.value }))}
            >
              <option value="niski">Niski</option>
              <option value="średni">Średni</option>
              <option value="wysoki">Wysoki</option>
            </select>
            <button onClick={addDefect}>Zgłoś</button>
          </div>
          <ul>
            {defects.map(d => (
              <li key={d.id} style={{ margin: 10, background: "#f7f7f7", padding: 10, borderRadius: 8 }}>
                <b>{d.desc}</b> <span>({d.priority})</span>
                <span style={{
                  background: d.status === "zgłoszona" ? "#ffe48b" : "#b8ffc5",
                  padding: "2px 8px",
                  borderRadius: 6,
                  marginLeft: 10
                }}>{d.status}</span>
                {d.status === "zgłoszona" &&
                  <button style={{ marginLeft: 8 }}
                    onClick={() => updateDefect(d.id, { status: "usunięta" })}>
                    Oznacz jako usuniętą
                  </button>
                }
              </li>
            ))}
          </ul>
        </div>
      )}
      {tab === "logs" && (
        <div>
          <h2>Logi</h2>
          <ul>
            {logs.map(log =>
              <li key={log.id}>
                {log.timestamp}: <b>{log.user}</b> – {log.action}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
