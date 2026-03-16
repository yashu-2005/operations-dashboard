// frontend/src/pages/Tasks.jsx
import { useState } from "react";
import API from "../api/axios";
import "../styles/tasks.css";
import useTasks from "../hooks/useTasks";

function Tasks({ currentUserEmail }) {
  const { tasks, setTasks, fetchTasks } = useTasks(currentUserEmail);

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
      await API.post("/tasks", newTask);
      await fetchTasks(); // refresh tasks from backend
      // reset form
      setTitle(""); setDescription(""); setTeam("General");
      setPriority("Low"); setStatus("Pending"); setExpectedCompletionTime("");
    } catch (err) {
      console.error("Add task error:", err);
      alert("Failed to add task");
    }
  };

  // ---------------- Toggle completion ----------------
  const toggleComplete = async (task) => {
    const updatedTask = {
      ...task,
      status: task.status === "Completed" ? "Pending" : "Completed",
    };

    try {
      await API.put(`/tasks/${task._id}`, updatedTask);
      await fetchTasks(); // refresh after update
    } catch (err) {
      console.error("Update task error:", err);
      alert("Failed to update task");
    }
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