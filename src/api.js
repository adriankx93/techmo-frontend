export const API_URL = "https://techmo.onrender.com";
 // <-- ZMIEŃ na link backendu po deployu!

export async function apiGet(path) {
  const r = await fetch(API + path);
  return await r.json();
}
export async function apiPost(path, data) {
  const r = await fetch(API + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await r.json();
}
export async function apiPut(path, data) {
  const r = await fetch(API + path, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await r.json();
}
export async function apiDelete(path) {
  const r = await fetch(API + path, { method: "DELETE" });
  return await r.json();
}
