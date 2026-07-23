function ReviewList({
  reviews,
}) {
  return (
    <div className="space-y-5">
      {reviews.map((review) => (
        <div
          key={review._id}
          className={`rounded-xl p-5 shadow ${review.isVerified ? 'bg-emerald-50/20 border border-emerald-100' : 'bg-white'}`}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold break-words flex items-center gap-2">
              {review.reviewer?.fullName}
              {review.isVerified && (
                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                  <span>✓</span> Verified Review
                </span>
              )}
            </h3>
            {review.fraudFlag && (
              <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-semibold">
                Flagged
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <p className="text-yellow-500 font-bold">
              ⭐ {review.rating}/5
            </p>
            {review.weight && review.weight > 1 && (
              <span className="text-xs text-slate-400 font-medium ml-2">High Impact Score</span>
            )}
          </div>

          <p className="mt-3 break-words text-slate-700">
            {review.comment}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;