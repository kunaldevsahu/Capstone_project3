import api from "./api";

// Match backend routes mounted at /api/members
export const getAllMembers = () => api.get("/api/members");
export const deleteMember = (id) => api.delete(`/api/members/${id}`);
export const updateMemberStatus = (id, status) =>
  api.put(`/api/members/${id}/status`, { status });
