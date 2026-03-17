// backend/models/Task.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    team: { type: String, required: true },
    priority: { type: String, required: true },
    status: { type: String, required: true },
    expectedCompletionTime: { type: Date }, // ← matches React
    userEmail: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);