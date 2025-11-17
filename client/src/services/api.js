import axios from "axios";

const api = axios.create({
  baseURL: "https://capstone-project3-gyvt.onrender.com/api",
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
