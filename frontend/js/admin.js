// ================= CONFIG =================
const API_URL = "http://localhost:5000/api";

// ================= AUTH CHECK =================
const user = JSON.parse(localStorage.getItem("user"));

console.log("USER:", user); // DEBUG

if (!user || user.role !== "admin") {
  alert("Access denied ❌");
  window.location.href = "login.html";
}
// ================= LOAD EVENTS =================
async function loadEvents() {
  try {
    const res = await fetch(`${API_URL}/events`);
    const events = await res.json();

    const container = document.getElementById("eventsList");
    container.innerHTML = "";

    if (events.length === 0) {
      container.innerHTML = "<p>No events found</p>";
      return;
    }

    events.forEach((event) => {
      const div = document.createElement("div");
      div.classList.add("event-card");

      div.innerHTML = `
        <h3>${event.title}</h3>
        <p>${event.description}</p>
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <button onclick="deleteEvent(${event.id})" style="background:red;color:white;">
          Delete
        </button>
      `;

      container.appendChild(div);
    });
  } catch (err) {
    console.error(err);
    alert("Failed to load events");
  }
}

// ================= CREATE EVENT =================
async function createNewEvent() {
  console.log("Create button clicked"); // DEBUG

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const date = document.getElementById("date").value;
  const location = document.getElementById("location").value;

  console.log({ title, description, date, location }); // DEBUG

  if (!title || !description || !date || !location) {
    alert("Please fill all fields");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, date, location }),
    });

    console.log("Response:", res); // DEBUG

    const data = await res.text();
    alert(data);

    loadEvents();

  } catch (err) {
    console.error("ERROR:", err);
    alert("Error creating event");
  }
}

// ================= DELETE EVENT =================
async function deleteEvent(id) {
  if (!confirm("Are you sure you want to delete this event?")) return;

  try {
    const res = await fetch(`${API_URL}/events/${id}`, {
      method: "DELETE",
    });

    const data = await res.text();
    alert(data);

    loadEvents(); // refresh
  } catch (err) {
    console.error(err);
    alert("Error deleting event");
  }
}

// ================= LOGOUT =================
function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

// ================= INIT =================
loadEvents();