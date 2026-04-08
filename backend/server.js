require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

// DB connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.connect((err) => {
  if (err) {
    console.error("DB Error:", err);
  } else {
    console.log("Connected to MySQL ✅");
  }
});
/* ================= AUTH ================= */

// Register
app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;

  db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("User registered successfully");
    }
  );
});

// Login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  console.log("LOGIN TRY:", email, password);

  db.query(
    "SELECT * FROM users WHERE email=? AND password=?",
    [email, password],
    (err, result) => {
      if (err) {
        console.error("SQL ERROR:", err);
        return res.status(500).json({ message: "Server error" });
      }

      if (result.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      res.json({
        message: "Login successful",
        user: result[0],
      });
    }
  );
});

/* ================= EVENTS ================= */

// Get all events
app.get("/api/events", (req, res) => {
  db.query("SELECT * FROM events", (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});

// Create event
app.post("/api/events", (req, res) => {
  const { title, description, date, location } = req.body;

  db.query(
    "INSERT INTO events (title, description, date, location) VALUES (?, ?, ?, ?)",
    [title, description, date, location],
    (err) => {
      if (err) return res.send(err);
      res.send("Event created");
    }
  );
});

// Update event
app.put("/api/events/:id", (req, res) => {
  const { title, description, date, location } = req.body;

  db.query(
    "UPDATE events SET title=?, description=?, date=?, location=? WHERE id=?",
    [title, description, date, location, req.params.id],
    (err) => {
      if (err) return res.send(err);
      res.send("Event updated");
    }
  );
});

// Delete event
app.delete("/api/events/:id", (req, res) => {
  db.query(
    "DELETE FROM events WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.send(err);
      res.send("Event deleted");
    }
  );
});

/* ================= SERVER ================= */

app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});