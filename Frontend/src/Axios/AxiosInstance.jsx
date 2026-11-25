import axios from "axios";

const BaseURL = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001",
  headers: { "Content-Type": "application/json" },
});

// Read the token for every request. This avoids using a stale token captured
// before the user logs in.
BaseURL.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default BaseURL;
