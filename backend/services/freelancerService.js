import FreelancerProfile from "../models/FreelancerProfile.js";
import ApiError from "../utils/ApiError.js";

/**
 * Create Freelancer Profile
 */
export const createProfile = async (userId, profileData) => {
  const existingProfile = await FreelancerProfile.findOne({
    user: userId,
  });

  if (existingProfile) {
    throw new ApiError(409, "Freelancer profile already exists.");
  }

  const profile = await FreelancerProfile.create({
    user: userId,
    ...profileData,
  });

  return profile;
};

/**
 * Get Logged-in Freelancer Profile
 */
export const getMyProfile = async (userId) => {
  const profile = await FreelancerProfile.findOne({
    user: userId,
  }).populate("user", "fullName email avatar role");

  if (!profile) {
    throw new ApiError(404, "Profile not found.");
  }

  return profile;
};

/**
 * Update Freelancer Profile
 */
export const updateProfile = async (userId, updateData) => {
  const profile = await FreelancerProfile.findOne({
    user: userId,
  });

  if (!profile) {
    throw new ApiError(404, "Profile not found.");
  }

  Object.assign(profile, updateData);

  await profile.save();

  return profile;
};

/**
 * Public Freelancer Profile
 */
export const getPublicProfile = async (id) => {
  const profile = await FreelancerProfile.findById(id)
    .populate("user", "fullName avatar");

  if (!profile) {
    throw new ApiError(404, "Profile not found.");
  }

  return profile;
};

/**
 * Search Freelancers
 */
export const searchFreelancers = async ({
  skill,
  availability,
}) => {
  const query = {};

  if (skill) {
    query["skills.name"] = {
      $regex: skill,
      $options: "i",
    };
  }

  if (availability) {
    query.availability = availability;
  }

  return await FreelancerProfile.find(query).populate(
    "user",
    "fullName avatar"
  );
};