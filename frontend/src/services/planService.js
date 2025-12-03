 import api from "./api";

export const getAdminPlans = () => api.get("/api/plans/admin");
export const createPlan = (data) => api.post("/api/plans", data);
export const deletePlan = (id) => api.delete(`/api/plans/${id}`);
export const getActivePlans = () => api.get("/api/plans");
