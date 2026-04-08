const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());


// ================= REGISTER =================
app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;

  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

  db.query(sql, [name, email, password], (err, result) => {
    if (err) return res.send("Error");
    res.send("User Registered");
  });
});


// ================= LOGIN =================
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], (err, result) => {
    if (err) return res.send("Error");

    if (result.length === 0) {
      return res.send("User not found");
    }

    if (result[0].password === password) {
      res.send("Login successful");
    } else {
      res.send("Invalid password");
    }
  });
});


// ================= GET EVENTS =================
app.get("/api/events", (req, res) => {
  db.query("SELECT * FROM events", (err, result) => {
    if (err) return res.send("Error");
    res.json(result);
  });
});


// ================= CREATE EVENT =================
app.post("/api/events", (req, res) => {
  const { title, description, date, location } = req.body;

  const sql = "INSERT INTO events (title, description, date, location) VALUES (?, ?, ?, ?)";

  db.query(sql, [title, description, date, location], (err, result) => {
    if (err) return res.send("Error");
    res.send("Event created");
  });
});


// ================= REGISTER EVENT =================
app.post("/api/register-event", (req, res) => {
  const { user_id, event_id } = req.body;

  const sql = "INSERT INTO registrations (user_id, event_id) VALUES (?, ?)";

  db.query(sql, [user_id, event_id], (err, result) => {
    if (err) return res.send("Error");
    res.send("Registered for event");
  });
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});