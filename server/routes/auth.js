const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

// GET /api/auth/can-signup — public check if signup is allowed
router.get("/can-signup", async (req, res) => {
  try {
    const anyAdmin = await Admin.findOne();
    res.json({ allowed: !anyAdmin });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });
    if (password.length < 6) return res.status(400).json({ error: "Password must be at least 6 characters" });

    // Only one admin account allowed
    const anyAdmin = await Admin.findOne();
    if (anyAdmin) return res.status(403).json({ error: "Admin account already exists. Only one admin is allowed." });

    const hashed = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ email: email.toLowerCase(), password: hashed });

    const token = jwt.sign({ id: admin._id, email: admin.email, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "8h" });
    res.status(201).json({ token, email: admin.email });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) return res.status(401).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id, email: admin.email, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "8h" });
    res.json({ token, email: admin.email });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
