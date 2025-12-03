import api from "./api";

export const getRevenueStats = () =>
  api.get("/api/membership/stats");
