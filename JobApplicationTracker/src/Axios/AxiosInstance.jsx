import axios from "axios";

const BaseURL = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Adds the token to every request automatically
BaseURL.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default BaseURL;
