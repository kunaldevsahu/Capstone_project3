import api from "./api";

export const authService = {
  login: async (credentials) => {
    const res = await api.post("/auth/login", credentials);
    return res.data; // { _id, name, email, token }
  },

  register: async (userInfo) => {
    const res = await api.post("/auth/register", userInfo);
    return res.data; // { _id, name, email, token }
  },

  getProfile: async () => {
    const res = await api.get("/auth/profile");
    return res.data; // { user: {...} }
  },

  logout: () => {
    localStorage.removeItem("token");
  },
};
