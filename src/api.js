const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

export function apiUrl(path) {
  return `${API_BASE}${path}`;
}

export function mediaUrl(path) {
  if (!path) return path;
  if (/^https?:\/\//.test(path) || path.startsWith("data:")) return path;
  return `${API_BASE}${path}`;
}
