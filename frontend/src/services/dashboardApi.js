import api from "./axios";

export const dashboardStats = () =>
  api.get("/dashboard");