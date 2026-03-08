import { useState, useEffect, useCallback } from "react";
import API from "../api/axios";

export default function useTasks(currentUserEmail) {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = useCallback(async () => {
    try {
      const res = await API.get("/tasks");

      const email = currentUserEmail || "test@test.com";

      const userTasks = res.data.filter((t) => t.userEmail === email);

      const now = new Date();
      const updatedTasks = userTasks.map((task) => {
        const expected = new Date(task.expectedCompletionTime);

        if (expected && now > expected && task.status !== "Completed") {
          return { ...task, status: "Delayed" };
        }
        return task;
      });

      setTasks(updatedTasks);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  }, [currentUserEmail]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { tasks, setTasks, fetchTasks };
}