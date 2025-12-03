import api from "./api";

export const loginUser = (data) => {
  return api.post("/api/auth/login", data);
};

export const signupUser = (data) => {
  return api.post("/api/auth/signup", data);
};
