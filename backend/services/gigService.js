import Gig from "../models/Gig.js";
import ApiError from "../utils/ApiError.js";

export const createGig = async (userId, data) => {
  return await Gig.create({
    client: userId,
    ...data,
  });
};

export const getAllGigs = async () => {
  return await Gig.find()
    .populate("client", "fullName avatar")
    .sort({ createdAt: -1 });
};
export const getMyGigs = async (userId) => {
  return await Gig.find({
    client: userId,
  })
    .populate("client", "fullName avatar")
    .sort({ createdAt: -1 });
};

export const getGigById = async (id) => {
  const gig = await Gig.findById(id).populate(
    "client",
    "fullName avatar"
  );

  if (!gig) throw new ApiError(404, "Gig not found");

  return gig;
};

export const updateGig = async (gigId, userId, data) => {
  const gig = await Gig.findOneAndUpdate(
    {
      _id: gigId,
      client: userId,
    },
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!gig) throw new ApiError(404, "Gig not found");

  return gig;
};

export const deleteGig = async (gigId, userId) => {
  const gig = await Gig.findOneAndDelete({
    _id: gigId,
    client: userId,
  });

  if (!gig) throw new ApiError(404, "Gig not found");
};