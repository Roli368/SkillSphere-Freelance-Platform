import api from "./axios";

export const getFavorites = () =>
  api.get("/favorites");

export const toggleFavorite = (gigId) =>
  api.post(`/favorites/${gigId}`);