import { useState, useEffect } from "react";
import API from "../api/axios"; // your axios instance
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Reports({ currentUserEmail }) {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users (optional, if needed for your reports)
        const usersRes = await API.get("/auth/users"); 
        setUsers(usersRes.data);

        // Fetch all tasks
        const tasksRes = await API.get("/tasks");
        let fetchedTasks = tasksRes.data;

        // Filter tasks for the current user
        fetchedTasks = fetchedTasks.filter(t => t.userEmail === currentUserEmail);

        // Auto delay detection
        const updatedTasks = fetchedTasks.map(task => {
          const now = new Date();
          const expected = new Date(task.expectedTime);
          if (now > expected && task.status !== "Completed") task.status = "Delayed";
          return task;
        });

        setTasks(updatedTasks);

      } catch (err) {
        console.error("Error fetching tasks/users:", err);
      }
    };

    fetchData();
  }, [currentUserEmail]);

  const completed = tasks.filter(t => t.status === "Completed").length;
  const pending = tasks.filter(t => t.status === "Pending" || t.status === "In Progress").length;
  const delayed = tasks.filter(t => t.status === "Delayed").length;

  const pieData = {
    labels: ["Completed", "Pending", "Delayed"],
    datasets: [
      {
        data: [completed, pending, delayed],
        backgroundColor: ["#34D399", "#3B82F6", "#F87171"],
      },
    ],
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Reports</h1>
      <Pie data={pieData} />
      <h2>Total Tasks: {tasks.length}</h2>
      <h3>
        Completed: {completed} | Pending: {pending} | Delayed: {delayed}
      </h3>
    </div>
  );
}

export default Reports;