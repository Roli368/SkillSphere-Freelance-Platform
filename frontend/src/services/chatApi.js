import api from "./axios";

export const getConversations = () =>
  api.get("/chat");

export const createConversation = (receiverId) =>
  api.post("/chat", { receiverId });

export const getMessages = (id) =>
  api.get(`/chat/${id}`);

export const sendMessage = (id, payload) =>
  api.post(`/chat/${id}`, payload);