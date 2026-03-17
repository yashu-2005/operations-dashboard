const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ------------------- REGISTER -------------------
router.post("/register", async (req, res) => {
  try {
    console.log("REGISTER HIT");

    const { name, email, password } = req.body;
    console.log(name, email);

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    console.log("EXISTING:", existingUser);

    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    console.log("USER CREATED");

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// ------------------- LOGIN -------------------
router.post("/login", async (req, res) => {
  try {
    console.log("🔥 LOGIN HIT");

    const { email, password } = req.body;
    console.log("INPUT:", email, password);

    if (!email || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const user = await User.findOne({ email });
    console.log("USER:", user);

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("MATCH:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    console.log("LOGIN SUCCESS");

    res.json({
      msg: "Login successful",
      user: { name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    console.error("🔥 LOGIN ERROR:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// ------------------- USERS -------------------
router.get("/users", async (req, res) => {
  try {
    console.log("GET USERS");

    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error("USERS ERROR:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;