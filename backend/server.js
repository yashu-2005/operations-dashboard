require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ---------------- CORS (FINAL SIMPLE FIX) ----------------

// allow ALL origins dynamically (works for localhost + Vercel + anything)
app.use(cors({
  origin: true,
  credentials: true
}));

// handle preflight requests
app.options("*", cors());

// ---------------- MIDDLEWARE ----------------

app.use(express.json());

// ---------------- ROUTES ----------------

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const insightRoutes = require("./routes/insights");

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/insights", insightRoutes);

// ---------------- TEST ROUTE ----------------

app.get("/", (req, res) => {
  res.send("Operations Dashboard Backend Running 🚀");
});

// ---------------- DATABASE ----------------

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ✅");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

connectDB();

// ---------------- SERVER ----------------

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});