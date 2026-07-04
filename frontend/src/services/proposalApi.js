import api from "./axios";

export const applyProposal = (gigId, data) =>
  api.post(`/proposals/${gigId}`, data);

export const getMyProposals = () =>
  api.get("/proposals/my-proposals");

export const getGigProposals = (gigId) =>
  api.get(`/proposals/gig/${gigId}`);

export const acceptProposal = (id) =>
  api.put(`/proposals/accept/${id}`);

export const rejectProposal = (id) =>
  api.put(`/proposals/reject/${id}`);