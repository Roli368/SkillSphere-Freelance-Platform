import { useState } from "react";
import toast from "react-hot-toast";

import StarRating from "./StarRating";
import { addReview } from "../../services/reviewApi";

function ReviewForm({
  gigId,
  reviewee,
}) {
  const [rating, setRating] =
    useState(5);

  const [comment, setComment] =
    useState("");

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      await addReview({
        gig: gigId,
        reviewee,
        rating,
        comment,
      });

      toast.success(
        "Review submitted"
      );

      setComment("");
      setRating(5);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <StarRating
        rating={rating}
        setRating={setRating}
      />

      <textarea
        rows="4"
        value={comment}
        onChange={(e) =>
          setComment(e.target.value)
        }
        placeholder="Write your review..."
        className="w-full rounded-xl border p-3"
      />

      <button className="rounded-xl bg-blue-600 px-6 py-3 text-white">
        Submit Review
      </button>
    </form>
  );
}

export default ReviewForm;