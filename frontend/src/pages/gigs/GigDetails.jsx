import { useEffect } from "react";
import {
  useParams,
  Link,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
  gigStart,
  gigFailure,
  setCurrentGig,
} from "../../redux/slices/gigSlice";

import {
  getGig,
  deleteGig,
} from "../../services/gigApi";

import ProposalForm from "../../components/proposals/ProposalForm";

function GigDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentGig, loading } = useSelector(
    (state) => state.gig
  );

  const { user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const fetchGig = async () => {
      try {
        dispatch(gigStart());

        const { data } = await getGig(id);

        dispatch(setCurrentGig(data.data));
      } catch (err) {
        dispatch(
          gigFailure(
            err.response?.data?.message ||
              "Failed to fetch gig"
          )
        );

        toast.error("Unable to load gig.");
      }
    };

    fetchGig();
  }, [id, dispatch]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this gig?"
    );

    if (!confirmDelete) return;

    try {
      await deleteGig(currentGig._id);

      toast.success("Gig deleted successfully");

      navigate("/my-gigs");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-xl">
        Loading...
      </div>
    );
  }

  if (!currentGig) {
    return (
      <div className="py-20 text-center text-xl">
        Gig not found
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl p-8">

      <div className="rounded-2xl bg-white p-8 shadow-lg">

        {/* Header */}

        <div className="mb-6 flex items-center justify-between">

          <span className="rounded-full bg-blue-100 px-4 py-2 text-blue-700">
            {currentGig.category}
          </span>

          <span className="rounded-full bg-slate-100 px-4 py-2">
            {currentGig.experienceLevel}
          </span>

        </div>

        {/* Title */}

        <h1 className="mb-6 text-4xl font-bold">
          {currentGig.title}
        </h1>

        {/* Description */}

        <p className="mb-8 leading-8 text-slate-700">
          {currentGig.description}
        </p>

        {/* Skills */}

        <div className="mb-8 flex flex-wrap gap-3">

          {currentGig.skills?.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-slate-200 px-4 py-2"
            >
              {skill}
            </span>
          ))}

        </div>

        {/* Info */}

        <div className="mb-10 grid grid-cols-2 gap-6 md:grid-cols-4">

          <div>

            <p className="text-slate-500">
              Budget
            </p>

            <h2 className="text-2xl font-bold text-green-600">
              ₹ {currentGig.budget}
            </h2>

          </div>

          <div>

            <p className="text-slate-500">
              Deadline
            </p>

            <h2 className="font-semibold">
              {new Date(
                currentGig.deadline
              ).toLocaleDateString()}
            </h2>

          </div>

          <div>

            <p className="text-slate-500">
              Status
            </p>

            <h2 className="font-semibold">
              {currentGig.status}
            </h2>

          </div>

          <div>

            <p className="text-slate-500">
              Proposals
            </p>

            <h2 className="font-semibold">
              {currentGig.proposalsCount}
            </h2>

          </div>

        </div>

        {/* Client Info */}

        <div className="mb-10 rounded-xl border bg-slate-50 p-5">

          <h3 className="mb-4 text-xl font-bold">
            Client Information
          </h3>

          <div className="flex items-center gap-4">

            <img
              src={
                currentGig.client?.avatar ||
                "https://i.pravatar.cc/100"
              }
              alt=""
              className="h-14 w-14 rounded-full"
            />

            <div>

              <h4 className="font-semibold">
                {currentGig.client?.fullName}
              </h4>

              <p className="text-slate-500">
                {currentGig.client?.email}
              </p>

            </div>

          </div>

        </div>

        {/* Freelancer */}

        {user?.role === "freelancer" && (
          <div className="mt-10">

            <h2 className="mb-5 text-2xl font-bold">
              Submit Proposal
            </h2>

            <ProposalForm
              gigId={currentGig._id}
            />

          </div>
        )}

        {/* Client Actions */}

        {user?.role === "client" &&
          currentGig.client?._id ===
            user?.id && (

            <div className="mt-10 flex gap-4">

              <Link
                to={`/edit-gig/${currentGig._id}`}
                className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-white hover:bg-yellow-600"
              >
                Edit Gig
              </Link>

              <button
                onClick={handleDelete}
                className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
              >
                Delete Gig
              </button>

            </div>

        )}

      </div>

    </div>
  );
}

export default GigDetails;