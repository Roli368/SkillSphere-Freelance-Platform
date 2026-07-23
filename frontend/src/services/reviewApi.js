import api from "./axios";

export const addReview = (data) =>
  api.post("/reviews", data);

export const getReviews = (userId) =>
  api.get(`/reviews/${userId}`);