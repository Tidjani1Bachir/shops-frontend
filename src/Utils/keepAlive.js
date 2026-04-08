// src/utils/keepAlive.js
const BACKEND_URL = import.meta.env.VITE_API_URL; // e.g. https://yourapp.onrender.com

export function wakeUpBackend() {
  fetch(`${BACKEND_URL}/api/health`, { method: "GET" }).catch(() => {});
  // Fire-and-forget — don't await, don't block the UI
}