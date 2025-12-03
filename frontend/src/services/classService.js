import api from "./api";

export const getAllClasses = () => api.get("/api/classes");
export const createClass = (data) => api.post("/api/classes", data);
export const enrollClass = (id) =>
  api.post(`/api/classes/enroll/${id}`);
export const getMyClasses = () =>
  api.get("/api/classes/my");
