// frontend/src/pages/Tasks.jsx
import { useState } from "react";
import "../styles/tasks.css";
import useTasks from "../hooks/useTasks";

function Tasks({ currentUserEmail }) {
  // Use our updated hook with `updateTask` helper
  const { tasks, setTasks, fetchTasks, updateTask } = useTasks(currentUserEmail);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [team, setTeam] = useState("General");
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("Pending");
  const [expectedCompletionTime, setExpectedCompletionTime] = useState("");

  // ---------------- Add task ----------------
  const addTask = async () => {
    if (!title || !expectedCompletionTime) return alert("Enter title and expected time");

    const newTask = {
      title,
      description,
      team,
      priority,
      status,
      expectedCompletionTime,
      userEmail: currentUserEmail || "test@test.com",
    };

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      const savedTask = await res.json();

      // Update state locally for instant UI update
      setTasks((prev) => [...prev, savedTask]);

      // Reset form
      setTitle(""); setDescription(""); setTeam("General");
      setPriority("Low"); setStatus("Pending"); setExpectedCompletionTime("");
    } catch (err) {
      console.error("Add task error:", err);
      alert("Failed to add task");
    }
  };

  // ---------------- Toggle completion ----------------
  const toggleComplete = (task) => {
    const updatedFields = {
      status: task.status === "Completed" ? "Pending" : "Completed",
    };
    updateTask(task._id, updatedFields); // UI updates instantly
  };

  return (
    <div className="tasks-container">
      <h1 className="tasks-title">Task Workflow Manager</h1>

      {/* Add Task Form */}
      <div className="add-task">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task Title" />
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        <input type="text" value={team} onChange={(e) => setTeam(e.target.value)} placeholder="Assigned Team" />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>Low</option><option>Medium</option><option>High</option>
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>Pending</option><option>In Progress</option><option>Completed</option>
        </select>
        <input type="datetime-local" value={expectedCompletionTime} onChange={(e) => setExpectedCompletionTime(e.target.value)} />
        <button onClick={addTask}>Add Task</button>
      </div>

      {/* Task List */}
      <div className="tasks-list">
        {tasks.map((t) => (
          <div key={t._id} className={`task-card ${t.priority.toLowerCase()}`}>
            <input type="checkbox" checked={t.status === "Completed"} onChange={() => toggleComplete(t)} />
            <div className="task-info">
              <strong>{t.title}</strong>
              <p>{t.description}</p>
              <p>Team: {t.team}</p>
              <p>Priority: {t.priority}</p>
              <p>Status: {t.status}</p>
              <p>Expected: {new Date(t.expectedCompletionTime).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;