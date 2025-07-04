import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import Dashboard from "./components/Dashboard.jsx";
import TaskList from "./components/TaskList.jsx";
import DefectList from "./components/DefectList.jsx";
import MaterialList from "./components/MaterialList.jsx";
import ArchiveList from "./components/ArchiveList.jsx";
import Grafik from "./components/Grafik.jsx";
import StoreList from "./components/StoreList.jsx";
import { apiGet, apiPost, apiPut, apiDelete } from "./api";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [user, setUser] = useState(localStorage.getItem("user") || "");
  const [tab, setTab] = useState("dashboard");
  const [tasks, setTasks] = useState([]);
  const [defects, setDefects] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);
  const [archivedDefects, setArchivedDefects] = useState([]);
  const [archivedMaterials, setArchivedMaterials] = useState([]);
  const [store, setStore] = useState([]);

  // LOGOWANIE – prosty formularz (możesz zmodyfikować na autoryzację z backendem)
  if (!loggedIn) return <LoginScreen onLogin={(user, token) => {
    setUser(user);
    setLoggedIn(true);
    localStorage.setItem("user", user);
    localStorage.setItem("token", token || "demo");
  }} />;

  useEffect(() => {
    if (!loggedIn) return;
    apiGet("/tasks").then(setTasks);
    apiGet("/defects").then(setDefects);
    apiGet("/materials").then(setMaterials);
    apiGet("/store").then(setStore);
    // Archiwum może być trzymane osobno na backendzie (do rozbudowania)
  }, [loggedIn]);

  // HANDLERY
  const handleToggleTask = async id => {
    const t = tasks.find(t => t.id === id);
    if (!t.done) {
      await apiPut(`/tasks/${id}`, { ...t, done: true });
      setTasks(ts => ts.map(x => x.id === id ? { ...x, done: true } : x));
      setArchivedTasks(at => [...at, { ...t, done: true }]);
    }
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
    const newTask = { ...task, id: Date.now(), done: false };
    setTasks(ts => [...ts, newTask]);
    await apiPost("/tasks", newTask);
  };
  const handleDeleteTask = async id => {
    setTasks(ts => ts.filter(t => t.id !== id));
    await apiDelete(`/tasks/${id}`);
  };

  const handleStatusDefect = async (id, status) => {
    const d = defects.find(x => x.id === id);
    await apiPut(`/defects/${id}`, { ...d, status });
    setDefects(ds => ds.map(x => x.id === id ? { ...x, status } : x));
    if (status === "usunięta") {
      setArchivedDefects(ad => [...ad, { ...d, status }]);
      setDefects(ds => ds.filter(x => x.id !== id));
    }
  };
  const handleAddDefect = async (def) => {
    const newDef = { ...def, id: Date.now(), status: "zgłoszona" };
    setDefects(ds => [...ds, newDef]);
    await apiPost("/defects", newDef);
  };
  const handleDeleteDefect = async id => {
    setDefects(ds => ds.filter(x => x.id !== id));
    await apiDelete(`/defects/${id}`);
  };

  const handleAddMaterial = async (mat) => {
    const newMat = { ...mat, id: Date.now(), status: "na stanie" };
    setMaterials(ms => [...ms, newMat]);
    await apiPost("/materials", newMat);
  };
  const handleRemoveMaterial = async id => {
    const m = materials.find(x => x.id === id);
    setArchivedMaterials(am => [...am, m]);
    setMaterials(ms => ms.filter(x => x.id !== id));
    await apiDelete(`/materials/${id}`);
  };
  const handleStatusMaterial = (id, status) => {
    setMaterials(ms => ms.map(m => m.id === id ? { ...m, status } : m));
  };

  const handleRestore = (type, id) => {
    if (type === "task") {
      const t = archivedTasks.find(x => x.id === id);
      setArchivedTasks(at => at.filter(x => x.id !== id));
      setTasks(ts => [...ts, { ...t, done: false }]);
    }
    if (type === "defect") {
      const d = archivedDefects.find(x => x.id === id);
      setArchivedDefects(ad => ad.filter(x => x.id !== id));
      setDefects(ds => [...ds, { ...d, status: "zgłoszona" }]);
    }
    if (type === "material") {
      const m = archivedMaterials.find(x => x.id === id);
      setArchivedMaterials(am => am.filter(x => x.id !== id));
      setMaterials(ms => [...ms, { ...m, status: "na stanie" }]);
    }
  };

  const stats = {
    tasks: tasks.length,
    defects: defects.filter(d => d.status === "zgłoszona").length,
    completed: archivedTasks.length,
    materials: materials.length,
    store: store.length
  };

  const chartData = (() => {
    const days = {};
    defects.forEach(d => {
      const day = new Date(d.id).toISOString().slice(0, 10);
      days[day] = (days[day] || 0) + 1;
    });
    return Object.entries(days).map(([day, count]) => ({ day, count }));
  })();

  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
    setUser("");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 to-slate-300">
      <Sidebar current={tab} setTab={setTab} onLogout={handleLogout} />
      <main className="flex-1 flex flex-col md:p-8 p-2 glass" style={{ minHeight: "100vh" }}>
        <Header title={{
          dashboard: "Panel Główny",
          tasks: "Zadania",
          defects: "Usterki",
          materials: "Materiały",
          store: "Magazyn",
          archive: "Archiwum",
          grafik: "Grafik"
        }[tab]} user={user} />
        {tab === "dashboard" &&
          <Dashboard stats={stats} chartData={chartData}
            onGoto={setTab}
            mostTasksUser={tasks.reduce((a, c) => (a[c.assignedTo] = (a[c.assignedTo] || 0) + 1, a), {})}
          />}
        {tab === "tasks" && <TaskList data={tasks}
          onToggle={handleToggleTask}
          onRemark={handleRemarkTask}
          onAssign={handleAssignTask}
          onDelete={handleDeleteTask}
          onAdd={handleAddTask}
          onDate={handleDateTask} />}
        {tab === "defects" && <DefectList data={defects} onStatus={handleStatusDefect}
          onAdd={handleAddDefect} onDelete={handleDeleteDefect} />}
        {tab === "materials" && <MaterialList data={materials} onAdd={handleAddMaterial}
          onRemove={handleRemoveMaterial} onStatus={handleStatusMaterial} />}
        {tab === "store" && <StoreList data={store} />}
        {tab === "archive" && <ArchiveList archivedTasks={archivedTasks} archivedDefects={archivedDefects}
          archivedMaterials={archivedMaterials} onRestore={handleRestore} />}
        {tab === "grafik" && <Grafik />}
      </main>
    </div>
  );
}

// Prosty, elegancki formularz logowania
function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);

  const handleLogin = async e => {
    e.preventDefault();
    // Możesz dodać własne warunki / żądania do backendu tutaj
    if (!username) {
      setErr("Podaj login");
      return;
    }
    // demo: każdy login przechodzi
    onLogin(username, "token-demo");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-blue-400">
      <form
        className="glass p-10 rounded-2xl shadow-2xl w-[350px] animate-fade-in"
        onSubmit={handleLogin}
        style={{
          backdropFilter: "blur(18px)",
          background: "rgba(255,255,255,0.55)",
          border: "1px solid rgba(0,70,200,0.11)"
        }}
      >
        <div className="text-2xl font-bold text-blue-900 mb-5 text-center">Logowanie</div>
        <input
          className="w-full border rounded px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-400"
          placeholder="Nazwa użytkownika"
          value={username}
          onChange={e => setUsername(e.target.value)}
          autoFocus
        />
        <input
          className="w-full border rounded px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-400"
          placeholder="Hasło"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {err && <div className="text-red-500 text-sm mb-3">{err}</div>}
        <button
          className="w-full py-2 rounded bg-blue-700 hover:bg-blue-800 text-white font-semibold transition shadow"
          type="submit"
        >
          Zaloguj się
        </button>
      </form>
    </div>
  );
}
