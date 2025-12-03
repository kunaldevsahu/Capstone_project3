// import api from "./api";

// export const getAllTrainers = () => api.get("/trainers");

// export const createTrainer = (data) => api.post("/trainers", data);

// export const deleteTrainer = (id) => api.delete(`/trainers/${id}`);


import api from "./api";

export const getAllTrainers = () => api.get("/api/trainers");

// For file upload we must use multipart/form-data instead of JSON
export const createTrainer = (data) =>
  api.post("/api/trainers", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteTrainer = (id) => api.delete(`/api/trainers/${id}`);
