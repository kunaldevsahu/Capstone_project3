import api from "./api";

export const getMyProfile = () => api.get("/api/profile/me");

export const updateMyProfile = (data) =>
  api.put("/api/profile/update", data);

export const changePassword = (data) =>
  api.put("/api/profile/change-password", data);
