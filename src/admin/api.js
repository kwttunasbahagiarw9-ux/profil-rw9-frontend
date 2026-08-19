const TOKEN_KEY = "rw09_admin_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function apiLogin(username, password) {
  const res = await fetch("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Gagal masuk");
  setToken(json.token);
  return json;
}

export async function fetchContent(key) {
  const res = await fetch(`/api/${key}`);
  if (!res.ok) throw new Error("Gagal memuat konten");
  return res.json();
}

export async function saveContent(key, data) {
  const res = await fetch(`/api/admin/content/${key}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ data })
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Gagal menyimpan konten");
  return json;
}

export async function uploadImage(file) {
  const fd = new FormData();
  fd.append("image", file);
  const res = await fetch("/api/admin/upload", {
    method: "POST",
    headers: authHeaders(),
    body: fd
  });
  const ct = res.headers.get("content-type") || "";
  const json = ct.includes("application/json") ? await res.json() : null;
  if (!res.ok) throw new Error((json && json.error) || `Gagal mengunggah gambar (${res.status})`);
  return json.url;
}