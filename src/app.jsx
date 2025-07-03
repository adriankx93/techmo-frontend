import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import { apiGet } from "./api";
// ... import TaskList, DefectList, MaterialList

export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [tasks, setTasks] = useState([]);
  const [defects, setDefects] = useState([]);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    apiGet("/tasks").then(setTasks);
    apiGet("/defects").then(setDefects);
    apiGet("/materials").then(setMaterials);
  }, []);

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

  return (
    <div className="flex min-h-screen bg-blue-50">
      <Sidebar current={tab} setTab={setTab} />
      <main className="flex-1 flex flex-col">
        <Header title={{
          dashboard: "Panel Główny",
          tasks: "Zadania",
          defects: "Usterki",
          materials: "Materiały"
        }[tab]} />
        {tab === "dashboard" && <Dashboard stats={stats} chartData={chartData} />}
        {/* {tab === "tasks" && <TaskList data={tasks} />} */}
        {/* {tab === "defects" && <DefectList data={defects} />} */}
        {/* {tab === "materials" && <MaterialList data={materials} />} */}
        {/* ... */}
      </main>
    </div>
  );
}
