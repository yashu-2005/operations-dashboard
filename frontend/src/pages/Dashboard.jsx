import { useEffect, useState } from "react";
import API from "../api/axios";
import "../styles/dashboard.css";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function Dashboard({ currentUserEmail }) {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    delayed: 0
  });

  const COLORS = ["#48bb78", "#ffce54", "#f56565"];

  const fetchAndUpdateTasks = async () => {
    try {
      const res = await API.get("/tasks");

      // fallback email
      const email = currentUserEmail || "test@test.com";

      let userTasks = res.data.filter(t => t.userEmail === email);

      const now = new Date();

      // detect delayed tasks
      userTasks = userTasks.map(task => {
        const expected = new Date(task.expectedCompletionTime);

        if (expected && now > expected && task.status !== "Completed") {
          return { ...task, status: "Delayed" };
        }

        return task;
      });

      setTasks(userTasks);

      const total = userTasks.length;
      const completed = userTasks.filter(t => t.status === "Completed").length;
      const delayed = userTasks.filter(t => t.status === "Delayed").length;
      const pending = total - completed - delayed;

      setStats({
        total,
        completed,
        pending,
        delayed
      });

    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchAndUpdateTasks();

    const interval = setInterval(fetchAndUpdateTasks, 5000);

    return () => clearInterval(interval);
  }, [currentUserEmail]);

  const data = [
    { name: "Completed", value: stats.completed },
    { name: "Pending", value: stats.pending },
    { name: "Delayed", value: stats.delayed }
  ];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Operations Dashboard</h1>

      <div className="stats-container">
        <div className="stat-card total">
          <h2>{stats.total}</h2>
          <p>Total Tasks</p>
        </div>

        <div className="stat-card completed">
          <h2>{stats.completed}</h2>
          <p>Completed</p>
        </div>

        <div className="stat-card pending">
          <h2>{stats.pending}</h2>
          <p>Pending</p>
        </div>

        <div className="stat-card delayed">
          <h2>{stats.delayed}</h2>
          <p>Delayed</p>
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Dashboard;