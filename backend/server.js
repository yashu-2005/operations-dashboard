require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ---------------- CORS (FINAL FIX) ----------------

const allowedOrigins = [
  "http://localhost:5173",
  "https://frontend-seven-rust-77.vercel.app",
  "https://frontend-mlgrsao4s-yasaswiniajuru-6100s-projects.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (mobile apps, postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS not allowed"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// ✅ handle preflight requests
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
  res.send("Operations Dashboard Backend Running");
});

// ---------------- DATABASE ----------------

const connectDB = async () => {
  try {
    console.log("Mongo URI:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected ✅");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

connectDB();

// ---------------- SERVER ----------------

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});