import Review from "../models/Review.js";

export const addReview = async (data) => {
  return Review.create(data);
};

export const getUserReviews = async (
  userId
) => {
  return Review.find({
    reviewee: userId,
  })
    .populate(
      "reviewer",
      "fullName avatar"
    )
    .sort({
      createdAt: -1,
    });
};