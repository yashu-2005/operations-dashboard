require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ---------------- 🔥 STEP 1: FORCE CORS HEADERS ----------------

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// ---------------- 🔥 STEP 2: CORS + JSON ----------------

app.use(cors());
app.use(express.json());

// ---------------- 🔥 STEP 3: ROUTES ----------------

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const insightRoutes = require("./routes/insights");

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/insights", insightRoutes);

// ---------------- 🔥 STEP 4: TEST ROUTE ----------------

app.get("/", (req, res) => {
  res.send("Operations Dashboard Backend Running 🚀");
});

// ---------------- 🔥 STEP 5: DATABASE ----------------

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

// ---------------- 🔥 STEP 6: SERVER ----------------

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});