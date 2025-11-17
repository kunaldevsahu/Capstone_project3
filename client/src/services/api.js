import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token for protected routes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (
    token &&
    !config.url.includes("/auth/login") &&
    !config.url.includes("/auth/register")
  ) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export default api;
