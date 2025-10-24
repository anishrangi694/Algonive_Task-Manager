import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import Reminder from "./components/Reminder";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  // Load tasks from localStorage safely
  useEffect(() => {
    try {
      const stored = localStorage.getItem("tasks");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setTasks(parsed);
        } else {
          setTasks([]);
          localStorage.removeItem("tasks");
        }
      }
    } catch (err) {
      console.error("Invalid data in localStorage, clearing it.");
      localStorage.removeItem("tasks");
      setTasks([]);
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => setTasks([...tasks, task]);
  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));
  const toggleTask = (id) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  const editTask = (id, updated) =>
    setTasks(tasks.map((t) => (t.id === id ? updated : t)));

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="max-w-xl mx-auto p-4 mt-10 bg-[#FF8803] shadow-lg rounded-2xl">
      <h1 className="text-3xl font-bold mb-4 text-center"> Task Manager</h1>
      <TaskForm addTask={addTask} />
      <FilterBar filter={filter} setFilter={setFilter} />
      <Reminder tasks={tasks} />
      <TaskList
        tasks={filteredTasks}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
        editTask={editTask}
      />
    </div>
  );
}


