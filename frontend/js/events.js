async function loadEvents() {
  const res = await fetch("http://localhost:5000/api/events");
  const events = await res.json();

  let output = "";

  events.forEach(event => {
output += `
  <div class="card">
    <h3>${event.title}</h3>
    <p>${event.description}</p>
    <p><b>Date:</b> ${event.date}</p>
    <p><b>Location:</b> ${event.location}</p>
    <button onclick="registerEvent(${event.id})">Register</button>
  </div>
`;
  });

  document.getElementById("events").innerHTML = output;
}

async function registerEvent(eventId) {
  const res = await fetch("http://localhost:5000/api/register-event", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      user_id: 1,
      event_id: eventId
    })
  });

  const data = await res.text();
  alert(data);
}

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

loadEvents();