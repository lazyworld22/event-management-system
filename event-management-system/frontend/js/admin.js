async function createEvent() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const date = document.getElementById("date").value;
  const location = document.getElementById("location").value;

  const res = await fetch("http://localhost:5000/api/events", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ title, description, date, location })
  });

  const data = await res.text();
  alert(data);
}