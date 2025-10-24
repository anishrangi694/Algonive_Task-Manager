import React, { useState } from "react";

function TaskItem({ task, deleteTask, toggleTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const isReminder = task.due && new Date(task.due) - new Date() < 24 * 60 * 60 * 1000;

  const handleSave = () => {
    editTask(task.id, { ...task, title: newTitle });
    setIsEditing(false);
  };

  return (
    <div
      className={`flex justify-between items-center p-3 mb-2 border rounded ${
        isReminder && !task.completed ? "bg-yellow-100" : "bg-gray-50"
      }`}
    >
      <div className="flex flex-col">
        {isEditing ? (
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="border rounded p-1"
          />
        ) : (
          <span className={`${task.completed ? "line-through text-gray-400" : ""}`}>
            {task.title} {task.due && `   ${task.due}`}
          </span>
        )}
        {task.desc && <span className="text-sm text-gray-600">{task.desc}</span>}
      </div>
      <div className="flex gap-2">
        <button onClick={() => toggleTask(task.id)} className="text-black border px-4 py-1 rounded bg-[grey]">Complete</button>
        {isEditing ? (
          <button onClick={handleSave} className="text-black border px-4 py-1 rounded bg-[grey]">save</button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="text-black border px-4 py-1 rounded bg-[grey]">Edit</button>
        )}
        <button onClick={() => deleteTask(task.id)} className="text-black border px-4 py-1 rounded bg-[grey]">Delete</button>
      </div>
    </div>
  );
}

export default TaskItem;
