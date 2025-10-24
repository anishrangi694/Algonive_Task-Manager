import React from "react";

function Reminder({ tasks }) {
  const now = new Date();
  const upcoming = tasks.filter(task => {
    if (!task.due || task.completed) return false;
    const dueDate = new Date(task.due);
    const diff = dueDate - now;
    return diff > 0 && diff <= 24 * 60 * 60 * 1000; 
  });

  if (upcoming.length === 0) return null;

  return (
    <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Upcoming Reminders</h2>
      <ul className="space-y-1">
        {upcoming.map(task => (
          <li key={task.id} className="text-gray-800">
            <span className="font-medium">{task.title}</span> — due on <span className="text-red-600">{task.due}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default  Reminder;
