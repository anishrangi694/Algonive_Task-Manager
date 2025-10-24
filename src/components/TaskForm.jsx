import React, { useState } from "react";

function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [due, setDue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    addTask({
      id: Date.now(),
      title,
      desc,
      due,
      completed: false,
    });
    setTitle("");
    setDesc("");
    setDue("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2">
      <input
        className="border p-2 rounded"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="border p-2 rounded"
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <input
        type="date"
        className="border p-2 rounded"
        value={due}
        onChange={(e) => setDue(e.target.value)}
      />
      <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
