require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ---------------- CORS (SAFE + DEBUG) ----------------

app.use(
  cors({
    origin: "*", // 🔥 allow all (for now to debug)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ handle preflight
app.options("*", cors());

// ---------------- MIDDLEWARE ----------------

app.use(express.json());

// ---------------- REQUEST LOGGER ----------------
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

// ---------------- ROUTES ----------------

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const insightRoutes = require("./routes/insights");

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/insights", insightRoutes);

// ---------------- TEST ROUTE ----------------

app.get("/", (req, res) => {
  res.send("Operations Dashboard Backend Running");
});

// ---------------- DATABASE ----------------

const connectDB = async () => {
  try {
    console.log("Mongo URI:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected ✅");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

connectDB();

// ---------------- ERROR HANDLER ----------------

app.use((err, req, res, next) => {
  console.error("🔥 GLOBAL ERROR:", err);
  res.status(500).json({
    msg: "Server crashed",
    error: err.message,
  });
});

// ---------------- SERVER ----------------

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});