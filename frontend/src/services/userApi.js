import api from "./axios";

export const getProfile = () => api.get("/auth/profile");

export const updateProfile = (data) =>
  api.put("/auth/profile", data);

export const logoutUser = () =>
  api.post("/auth/logout");