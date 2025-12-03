import api from "./api";

export const getAdminDashboardStats = () =>
  api.get("/dashboard/admin");
