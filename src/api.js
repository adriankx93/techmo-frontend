// Adres backendu:
export const API_URL = "https://techmo.onrender.com";

// Pomocnik: pobierz token z localStorage (jeśli jest)
function getToken() {
  return localStorage.getItem("token");
}

// Funkcja do logowania (POST /login)
export async function apiPostLogin(username, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Błąd logowania");
  }
  return await res.json();
}

// GET (np. /tasks, /defects, /materials)
export async function apiGet(path) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      "Authorization": "Bearer " + getToken()
    }
  });
  if (res.status === 401) throw new Error("Brak autoryzacji");
  if (!res.ok) throw new Error("Błąd API");
  return await res.json();
}

// PUT (aktualizacja zadania/usterki)
export async function apiPut(path, data) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + getToken()
    },
    body: JSON.stringify(data)
  });
  if (res.status === 401) throw new Error("Brak autoryzacji");
  if (!res.ok) throw new Error("Błąd API");
  return await res.json();
}

// DELETE (usuwanie materiału)
export async function apiDelete(path) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "DELETE",
    headers: {
      "Authorization": "Bearer " + getToken()
    }
  });
  if (res.status === 401) throw new Error("Brak autoryzacji");
  if (!res.ok) throw new Error("Błąd API");
  return await res.json();
}

// POST – jeśli będziesz potrzebował np. dodawać nowe materiały/usterki
export async function apiPost(path, data) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + getToken()
    },
    body: JSON.stringify(data)
  });
  if (res.status === 401) throw new Error("Brak autoryzacji");
  if (!res.ok) throw new Error("Błąd API");
  return await res.json();
}
