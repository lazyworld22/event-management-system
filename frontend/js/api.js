const API_URL = "http://localhost:5000/api";

async function apiRequest(endpoint, method, data) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: data ? JSON.stringify(data) : null
  });

  return response.json();
}