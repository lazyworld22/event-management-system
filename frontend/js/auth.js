// Register
async function register() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:5000/api/register", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.text();
  alert(data);
  window.location.href = "login.html";
}

// Login
async function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    console.log("USER:", data.user);
   if (res.ok) {
     localStorage.setItem("user", JSON.stringify(data.user));
   
     if (data.user.role === "admin") {
       window.location.href = "admin.html";
     } else {
       window.location.href = "dashboard.html";
     }
   }
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
}
