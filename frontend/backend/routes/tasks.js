// backend/routes/tasks.js
const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// ----------------- POST: Add Task -----------------
router.post("/", async (req, res) => {
  console.log("Received body:", req.body); // Debug: see exactly what React sends

  try {
    const { title, description, team, priority, status, expectedCompletionTime, userEmail } = req.body;

    // Simple validation
    if (!title || !description || !team || !priority || !status || !userEmail) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newTask = new Task({
      title,
      description,
      team,
      priority,
      status,
      expectedCompletionTime: expectedCompletionTime || null,
      userEmail
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error saving task:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// Optional: GET all tasks for testing
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;