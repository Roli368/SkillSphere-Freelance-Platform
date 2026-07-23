import api from "./axios";

export const getMyFreelancerProfile = () =>
  api.get("/freelancers/me");

export const updateFreelancerProfile = (data) =>
  api.put("/freelancers/me", data);

export const getFreelancerProfile = (id) =>
  api.get(`/freelancers/${id}`);

export const searchFreelancers = (query) =>
  api.get(`/freelancers`, { params: query });
