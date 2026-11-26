import axios from "axios";

const BaseURL = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

BaseURL.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default BaseURL;
