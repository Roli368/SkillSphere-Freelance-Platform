import api from "./axios";

export const changePassword = (data) =>
  api.put(
    "/settings/change-password",
    data
  );