import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import Dashboard from "./components/Dashboard.jsx";
import TaskList from "./components/TaskList.jsx";
import DefectList from "./components/DefectList.jsx"; // UWAGA: popraw nazwę pliku jeśli trzeba!
import MaterialList from "./components/MaterialList.jsx";
import { apiGet, apiPost, apiPut, apiDelete } from "./api";

function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);

  const handleLogin = async e => {
    e.preventDefault();
    setErr(null);
    try {
      const res = await apiPost("/login", { username, password });
      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", res.user?.name || username);
        onLogin(res.user?.name || username);
      } else {
        setErr("Nieprawidłowy login lub hasło");
      }
    } catch {
      setErr("Błąd logowania");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <form className="bg-white p-8 rounded-xl shadow-xl min-w-[340px]" onSubmit={handleLogin}>
        <div className="text-2xl font-bold text-blue-900 mb-4 text-center">Logowanie</div>
        <input
          className="w-full border rounded px-3 py-2 mb-3"
          placeholder="Nazwa użytkownika"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          className="w-full border rounded px-3 py-2 mb-3"
          placeholder="Hasło"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {err && <div className="text-red-500 text-sm mb-2">{err}</div>}
        <button
          className="bg-blue-700 hover:bg-blue-800 text-white font-semibold w-full py-2 rounded"
          type="submit"
        >
          Zaloguj się
        </button>
      </form>
    </div>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [user, setUser] = useState(localStorage.getItem("user") || "");
  const [tab, setTab] = useState("dashboard");
  const [tasks, setTasks] = useState([]);
  const [defects, setDefects] = useState([]);
  const [materials, setMaterials] = useState([]);

  // Automatyczne pobieranie danych po zalogowaniu
  useEffect(() => {
    if (!loggedIn) return;
    apiGet("/tasks").then(setTasks);
    apiGet("/defects").then(setDefects);
    apiGet("/materials").then(setMaterials);
  }, [loggedIn]);

  // Handlery do list
  const handleToggleTask = async id => {
    const t = tasks.find(t => t.id === id);
    await apiPut(`/tasks/${id}`, { ...t, done: !t.done });
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };
  const handleRemarkTask = (id, remark) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, remark } : t));
    apiPut(`/tasks/${id}`, { ...tasks.find(t => t.id === id), remark });
  };
  const handleAssignTask = (id, assignedTo) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, assignedTo } : t));
    apiPut(`/tasks/${id}`, { ...tasks.find(t => t.id === id), assignedTo });
  };
  const handleDateTask = (id, date) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, date } : t));
    apiPut(`/tasks/${id}`, { ...tasks.find(t => t.id === id), date });
  };
  const handleAddTask = async (task) => {
    const newTask = { ...task, id: Date.now() };
    setTasks([...tasks, newTask]);
    await apiPost("/tasks", newTask);
  };
  const handleDeleteTask = async (id) => {
    setTasks(tasks.filter(t => t.id !== id));
    await apiDelete(`/tasks/${id}`);
  };

  // NOWOŚĆ: Handlery do usterek (dodawanie, usuwanie)
  const handleStatusDefect = async (id, status) => {
    await apiPut(`/defects/${id}`, { ...defects.find(d => d.id === id), status });
    setDefects(defects.map(d => d.id === id ? { ...d, status } : d));
  };
  const handleAddDefect = async (defect) => {
    setDefects(defs => [...defs, defect]);
    await apiPost("/defects", defect);
  };
  const handleDeleteDefect = async id => {
    setDefects(defs => defs.filter(d => d.id !== id));
    await apiDelete(`/defects/${id}`);
  };

  // Materiały
  const handleAddMaterial = async (mat) => {
    const newMat = { ...mat, id: Date.now() };
    setMaterials([...materials, newMat]);
    await apiPost("/materials", newMat);
  };
  const handleRemoveMaterial = async id => {
    await apiDelete(`/materials/${id}`);
    setMaterials(materials.filter(m => m.id !== id));
  };
  const handleStatusMaterial = (id, status) => {
    setMaterials(materials =>
      materials.map(m => m.id === id ? { ...m, status } : m)
    );
    // Możesz dodać apiPut(`/materials/${id}`, { ...materials.find(m => m.id === id), status });
  };

  // Statystyki do dashboardu
  const stats = {
    tasks: tasks.length,
    defects: defects.filter(d => d.status === "zgłoszona").length,
    completed: tasks.filter(t => t.done).length,
    materials: materials.length,
  };
  const chartData = (() => {
    const days = {};
    defects.forEach(d => {
      const day = (d.timestamp || d.id).toString().slice(0, 10);
      days[day] = (days[day] || 0) + 1;
    });
    return Object.entries(days).map(([day, count]) => ({ day, count }));
  })();

  // Wylogowanie
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLoggedIn(false);
    setUser("");
  };

  if (!loggedIn) return <LoginScreen onLogin={name => { setUser(name); setLoggedIn(true); }} />;

  return (
    <div className="flex min-h-screen bg-blue-50">
      <Sidebar current={tab} setTab={setTab} onLogout={handleLogout} />
      <main className="flex-1 flex flex-col">
        <Header title={{
          dashboard: "Panel Główny",
          tasks: "Zadania",
          defects: "Usterki",
          materials: "Materiały"
        }[tab]} user={user} />
        {tab === "dashboard" && <Dashboard stats={stats} chartData={chartData} />}
        {tab === "tasks" && (
          <TaskList
            data={tasks}
            onToggle={handleToggleTask}
            onRemark={handleRemarkTask}
            onAssign={handleAssignTask}
            onDelete={handleDeleteTask}
            onAdd={handleAddTask}
            onDate={handleDateTask}
          />
        )}
        {tab === "defects" && (
          <DefectList
            data={defects}
            onStatus={handleStatusDefect}
            onAdd={handleAddDefect}
            onDelete={handleDeleteDefect}
          />
        )}
        {tab === "materials" && (
          <MaterialList
            data={materials}
            onAdd={handleAddMaterial}
            onRemove={handleRemoveMaterial}
            onStatus={handleStatusMaterial}
          />
        )}
      </main>
    </div>
  );
}
