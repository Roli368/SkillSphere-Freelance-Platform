import ClientProfile from "../models/ClientProfile.js";
import ApiError from "../utils/ApiError.js";

export const createProfile = async (userId, data) => {
  const exists = await ClientProfile.findOne({ user: userId });

  if (exists) {
    throw new ApiError(409, "Profile already exists");
  }

  return await ClientProfile.create({
    user: userId,
    ...data,
  });
};

export const getMyProfile = async (userId) => {
  const profile = await ClientProfile.findOne({
    user: userId,
  }).populate("user", "fullName email avatar");

  if (!profile) {
    throw new ApiError(404, "Profile not found");
  }

  return profile;
};

export const updateProfile = async (userId, data) => {
  const profile = await ClientProfile.findOneAndUpdate(
    { user: userId },
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!profile) {
    throw new ApiError(404, "Profile not found");
  }

  return profile;
};

export const getPublicProfile = async (id) => {
  const profile = await ClientProfile.findById(id).populate(
    "user",
    "fullName avatar"
  );

  if (!profile) {
    throw new ApiError(404, "Profile not found");
  }

  return profile;
};