import Gig from "../models/Gig.js";
import ApiError from "../utils/ApiError.js";

export const createGig = async (userId, data) => {
  return await Gig.create({
    client: userId,
    ...data,
  });
};

// Search + Filter + Sort
export const getAllGigs = async (query = {}) => {
  const filter = {};

  // Search by title
  if (query.search) {
    filter.title = {
      $regex: query.search,
      $options: "i",
    };
  }

  // Category
  if (query.category) {
    filter.category = query.category;
  }

  // Experience
  if (query.experienceLevel) {
    filter.experienceLevel =
      query.experienceLevel;
  }

  // Budget Range
  if (query.minBudget || query.maxBudget) {
    filter.budget = {};

    if (query.minBudget) {
      filter.budget.$gte = Number(
        query.minBudget
      );
    }

    if (query.maxBudget) {
      filter.budget.$lte = Number(
        query.maxBudget
      );
    }
  }

  return await Gig.find(filter)
    .populate(
      "client",
      "fullName avatar"
    )
    .sort({
      createdAt: -1,
    });
};

export const getMyGigs = async (userId) => {
  return await Gig.find({
    client: userId,
  })
    .populate(
      "client",
      "fullName avatar"
    )
    .sort({
      createdAt: -1,
    });
};

export const getGigById = async (id) => {
  const gig = await Gig.findById(id)
    .populate(
      "client",
      "fullName email avatar"
    )
    .populate(
      "hiredFreelancer",
      "fullName avatar"
    );

  if (!gig) {
    throw new ApiError(
      404,
      "Gig not found"
    );
  }

  return gig;
};

export const updateGig = async (
  gigId,
  userId,
  data
) => {
  const gig =
    await Gig.findOneAndUpdate(
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

  if (!gig) {
    throw new ApiError(
      404,
      "Gig not found"
    );
  }

  return gig;
};

export const deleteGig = async (
  gigId,
  userId
) => {
  const gig =
    await Gig.findOneAndDelete({
      _id: gigId,
      client: userId,
    });

  if (!gig) {
    throw new ApiError(
      404,
      "Gig not found"
    );
  }

  return gig;
};