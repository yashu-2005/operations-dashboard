const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// ----------------- GET INSIGHTS -----------------
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === "Completed").length;
    const delayedTasks = tasks.filter(t => t.status === "Delayed").length;
    const highPriorityDelayed = tasks.filter(t => t.status === "Delayed" && t.priority === "High").length;

    // Group by priority
    const priorityGroups = {
      High: tasks.filter(t => t.priority === "High").length,
      Medium: tasks.filter(t => t.priority === "Medium").length,
      Low: tasks.filter(t => t.priority === "Low").length,
    };

    // Group by status
    const statusGroups = {
      Pending: tasks.filter(t => t.status === "Pending").length,
      "In Progress": tasks.filter(t => t.status === "In Progress").length,
      Completed: completedTasks,
      Delayed: delayedTasks,
    };

    res.json({
      totalTasks,
      completedTasks,
      delayedTasks,
      highPriorityDelayed,
      priorityGroups,
      statusGroups,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;