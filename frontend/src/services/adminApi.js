import api from "./axios";

export const getPlatformUsers = () =>
  api.get("/admin/users");

export const suspendUserAccount = (id) =>
  api.put(`/admin/users/${id}/suspend`);

export const verifyFreelancerAccount = (id) =>
  api.put(`/admin/freelancer/${id}/verify`);

export const approvePlatformGig = (id) =>
  api.put(`/admin/gigs/${id}/approve`);

export const getAnalytics = () =>
  api.get("/admin/analytics");
