import Favorite from "../models/Favorite.js";
import Gig from "../models/Gig.js";
import ApiError from "../utils/ApiError.js";

export const toggleFavorite = async (
  userId,
  gigId
) => {
  const gig = await Gig.findById(gigId);

  if (!gig) {
    throw new ApiError(404, "Gig not found");
  }

  const exists =
    await Favorite.findOne({
      user: userId,
      gig: gigId,
    });

  if (exists) {
    await exists.deleteOne();

    return {
      saved: false,
    };
  }

  await Favorite.create({
    user: userId,
    gig: gigId,
  });

  return {
    saved: true,
  };
};

export const getFavorites =
async(userId)=>{

return Favorite.find({
user:userId
})
.populate({
path:"gig",
populate:{
path:"client",
select:"fullName avatar"
}
});

};