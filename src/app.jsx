import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import Dashboard from "./components/Dashboard.jsx";
import TaskList from "./components/TaskList.jsx";
import DefectList from "./components/DefectList.jsx";
import MaterialList from "./components/MaterialList.jsx";
import ArchiveList from "./components/ArchiveList.jsx";
import StoreList from "./components/StoreList.jsx";
import Grafik from "./components/Grafik.jsx";
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
        <input className="w-full border rounded px-3 py-2 mb-3" placeholder="Nazwa użytkownika"
          value={username} onChange={e => setUsername(e.target.value)} required />
        <input className="w-full border rounded px-3 py-2 mb-3" placeholder="Hasło" type="password"
          value={password} onChange={e => setPassword(e.target.value)} required />
        {err && <div className="text-red-500 text-sm mb-2">{err}</div>}
        <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold w-full py-2 rounded"
          type="submit">Zaloguj się</button>
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
  const [store, setStore] = useState([]); // magazyn
  const [archivedTasks, setArchivedTasks] = useState([]);
  const [archivedDefects, setArchivedDefects] = useState([]);
  const [archivedMaterials, setArchivedMaterials] = useState([]);

  useEffect(() => {
    if (!loggedIn) return;
    apiGet("/tasks").then(setTasks);
    apiGet("/defects").then(setDefects);
    apiGet("/materials").then(setMaterials);
    apiGet("/store").then(setStore).catch(() => setStore([]));
  }, [loggedIn]);

  // --- Task handlers
  const handleToggleTask = async id => {
    const t = tasks.find(t => t.id === id);
    await apiPut(`/tasks/${id}`, { ...t, done: !t.done });
    setTasks(ts => ts.map(x => x.id === id ? { ...x, done: !x.done } : x));
    // Automatyczne archiwizowanie po oznaczeniu na zielono
    if (!t.done) {
      setTimeout(() => {
        setArchivedTasks(at => [...at, { ...t, done: true }]);
        setTasks(ts => ts.filter(x => x.id !== id));
      }, 1000);
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
  const handleArchiveTask = id => {
    const t = tasks.find(t => t.id === id);
    setArchivedTasks(at => [...at, { ...t, done: true }]);
    setTasks(ts => ts.filter(x => x.id !== id));
  };

  // --- Defect handlers
  const handleStatusDefect = async (id, status) => {
    const d = defects.find(x => x.id === id);
    await apiPut(`/defects/${id}`, { ...d, status });
    setDefects(ds => ds.map(x => x.id === id ? { ...x, status } : x));
    if (status === "usunięta") {
      setTimeout(() => {
        setArchivedDefects(ad => [...ad, { ...d, status }]);
        setDefects(ds => ds.filter(x => x.id !== id));
      }, 1000);
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
  const handleArchiveDefect = id => {
    const d = defects.find(x => x.id === id);
    setArchivedDefects(ad => [...ad, { ...d, status: "usunięta" }]);
    setDefects(ds => ds.filter(x => x.id !== id));
  };

  // --- Material / store handlers
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
    if (status === "zakupiono") {
      const mat = materials.find(m => m.id === id);
      // Przenieś do magazynu (store)
      setStore(st => [...st, { ...mat, status: "w magazynie" }]);
      setMaterials(ms => ms.filter(m => m.id !== id));
      // apiPost("/store", {...mat, status: "w magazynie"});
    } else {
      setMaterials(ms => ms.map(m => m.id === id ? { ...m, status } : m));
    }
  };

  // --- Archiwum przywracanie
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

  // --- Magazyn (usuwanie/przywracanie)
  const handleRemoveStore = id => setStore(st => st.filter(m => m.id !== id));
  const handleReturnToMaterials = id => {
    const m = store.find(x => x.id === id);
    setStore(st => st.filter(x => x.id !== id));
    setMaterials(ms => [...ms, { ...m, status: "na stanie" }]);
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

  if (!loggedIn) return <LoginScreen onLogin={n => { setUser(n); setLoggedIn(true); }} />;

  return (
    <div className="flex min-h-screen bg-gradient-to-tr from-blue-100 via-white to-blue-50">
      <Sidebar current={tab} setTab={setTab} onLogout={handleLogout} />
      <main className="flex-1 flex flex-col px-2 md:px-12 py-8">
        <Header title={{
          dashboard: "Panel Główny",
          tasks: "Zadania",
          defects: "Usterki",
          materials: "Materiały",
          store: "Magazyn",
          grafik: "Grafik",
          archive: "Archiwum"
        }[tab]} user={user} />
        {tab === "dashboard" &&
          <Dashboard stats={stats} chartData={chartData}
            onGoto={setTab}
            mostTasksUser={tasks.reduce((a, c) => (a[c.assignedTo] = (a[c.assignedTo] || 0) + 1, a), {})} />}
        {tab === "tasks" &&
          <TaskList data={tasks} onToggle={handleToggleTask} onRemark={handleRemarkTask}
            onAssign={handleAssignTask} onDelete={handleDeleteTask}
            onAdd={handleAddTask} onDate={handleDateTask} onArchive={handleArchiveTask} />}
        {tab === "defects" &&
          <DefectList data={defects} onStatus={handleStatusDefect}
            onAdd={handleAddDefect} onDelete={handleDeleteDefect}
            onArchive={handleArchiveDefect} />}
        {tab === "materials" &&
          <MaterialList data={materials} onAdd={handleAddMaterial}
            onRemove={handleRemoveMaterial} onStatus={handleStatusMaterial} />}
        {tab === "store" &&
          <StoreList data={store} onRemove={handleRemoveStore} onReturn={handleReturnToMaterials} />}
        {tab === "grafik" && <Grafik />}
        {tab === "archive" &&
          <ArchiveList archivedTasks={archivedTasks} archivedDefects={archivedDefects}
            archivedMaterials={archivedMaterials} onRestore={handleRestore} />}
      </main>
    </div>
  );
}
