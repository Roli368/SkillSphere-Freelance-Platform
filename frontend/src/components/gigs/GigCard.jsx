import { Link } from "react-router-dom";
import { FaMoneyBillWave, FaClock } from "react-icons/fa";

function GigCard({ gig }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl">

      <div className="mb-3 flex items-center justify-between">

        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
          {gig.category}
        </span>

        <span className="text-sm text-slate-500">
          {gig.experienceLevel}
        </span>

      </div>

      <h2 className="mb-3 text-2xl font-bold">
        {gig.title}
      </h2>

      <p className="mb-5 line-clamp-3 text-slate-600">
        {gig.description}
      </p>

      <div className="mb-4 flex flex-wrap gap-2">

        {gig.skills?.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-slate-100 px-3 py-1 text-sm"
          >
            {skill}
          </span>
        ))}

      </div>

      <div className="mb-5 flex justify-between text-sm">

        <div className="flex items-center gap-2">
          <FaMoneyBillWave />

          ₹{gig.budget}
        </div>

        <div className="flex items-center gap-2">
          <FaClock />

          {new Date(gig.deadline).toLocaleDateString()}
        </div>

      </div>

      <Link
        to={`/gig/${gig._id}`}
        className="block rounded-xl bg-blue-600 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
      >
        View Details
      </Link>

    </div>
  );
}

export default GigCard;