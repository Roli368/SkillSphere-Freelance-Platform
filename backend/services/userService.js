import bcrypt from "bcryptjs";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";

export const changePassword = async (
  userId,
  currentPassword,
  newPassword
) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isMatch = await bcrypt.compare(
    currentPassword,
    user.password
  );

  if (!isMatch) {
    throw new ApiError(
      400,
      "Current password is incorrect"
    );
  }

  user.password = await bcrypt.hash(
    newPassword,
    10
  );

  await user.save();

  return true;
};