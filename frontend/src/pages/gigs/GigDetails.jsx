import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { gigStart, gigFailure, setCurrentGig } from "../../redux/slices/gigSlice";
import { getGig, deleteGig } from "../../services/gigApi";
import ProposalForm from "../../components/proposals/ProposalForm";

function GigDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentGig, loading } = useSelector((state) => state.gig);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchGig = async () => {
      try {
        dispatch(gigStart());
        const { data } = await getGig(id);
        dispatch(setCurrentGig(data.data));
      } catch (err) {
        dispatch(gigFailure(err.response?.data?.message || "Failed to fetch gig"));
        toast.error("Unable to load gig.");
      }
    };
    fetchGig();
  }, [id, dispatch]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this gig?");
    if (!confirmDelete) return;
    try {
      await deleteGig(currentGig._id);
      toast.success("Gig deleted successfully");
      navigate("/my-gigs");
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!currentGig) {
    return (
      <div className="py-20 text-center text-xl text-slate-500 dark:text-slate-400">
        Gig not found
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-5xl p-8"
    >
      <div className="rounded-3xl bg-white dark:bg-slate-900 p-10 shadow-sm border border-slate-200 dark:border-slate-800 transition-colors">
        
        {/* Header Tags */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-brand-50 dark:bg-brand-500/10 px-4 py-1.5 text-sm font-bold text-brand-600 dark:text-brand-400">
            {currentGig.category}
          </span>
          <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-4 py-1.5 text-sm font-semibold text-slate-600 dark:text-slate-300">
            {currentGig.experienceLevel}
          </span>
        </div>

        {/* Title */}
        <h1 className="mb-6 text-4xl font-extrabold text-slate-900 dark:text-white leading-tight break-words">
          {currentGig.title}
        </h1>

        {/* Description */}
        <p className="mb-10 text-lg leading-relaxed text-slate-600 dark:text-slate-300 break-words">
          {currentGig.description}
        </p>

        {/* Skills */}
        <div className="mb-10 flex flex-wrap gap-2">
          {currentGig.skills?.map((skill) => (
            <span
              key={skill}
              className="rounded-lg bg-slate-100 dark:bg-slate-800/80 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 border border-transparent dark:border-slate-700/50"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Key Info Grid */}
        <div className="mb-12 grid grid-cols-2 gap-6 md:grid-cols-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 p-6 border border-slate-100 dark:border-slate-800/50">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Budget
            </p>
            <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              ₹{currentGig.budget?.toLocaleString()}
            </h2>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Deadline
            </p>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {new Date(currentGig.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
            </h2>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Status
            </p>
            <h2 className={`text-lg font-bold ${currentGig.status === 'Open' ? 'text-brand-600 dark:text-brand-400' : 'text-slate-900 dark:text-white'}`}>
              {currentGig.status}
            </h2>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Proposals
            </p>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {currentGig.proposalsCount}
            </h2>
          </div>
        </div>

        {/* Client Info */}
        <div className="mb-12 rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50 p-6">
          <div className="flex items-center justify-between mb-6 border-b border-slate-200 dark:border-slate-700/50 pb-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Client Information
            </h3>
            {user?.role === "freelancer" && (
              <button
                onClick={async () => {
                  try {
                    const { createConversation } = await import("../../services/chatApi");
                    await createConversation(currentGig.client._id);
                    navigate("/messages");
                  } catch (err) {
                    toast.error("Failed to start conversation");
                  }
                }}
                className="rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-5 py-2.5 font-semibold text-white shadow-sm transition hover:shadow-md hover:shadow-brand-500/20 active:scale-95"
              >
                Message Client
              </button>
            )}
          </div>
          <div className="flex items-center gap-4">
            <img
              src={currentGig.client?.avatar || "https://i.pravatar.cc/100"}
              alt=""
              className="h-16 w-16 rounded-full border-2 border-white dark:border-slate-700 shadow-sm object-cover"
            />
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                {currentGig.client?.fullName}
              </h4>
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                {currentGig.client?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Freelancer Form */}
        {user?.role === "freelancer" && currentGig.status === "Open" && (
          <div className="mt-12 border-t border-slate-200 dark:border-slate-800 pt-8">
            <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
              Submit Proposal
            </h2>
            <ProposalForm gigId={currentGig._id} />
          </div>
        )}

        {/* Client Actions */}
        {user?.role === "client" && (currentGig.client?._id === user?._id || currentGig.client?._id === user?.id) && (
          <div className="mt-12 flex flex-wrap gap-4 border-t border-slate-200 dark:border-slate-800 pt-8">
            <Link
              to={`/edit-gig/${currentGig._id}`}
              className="rounded-xl bg-slate-800 dark:bg-slate-700 px-6 py-3 font-semibold text-white transition hover:bg-slate-700 dark:hover:bg-slate-600 hover:-translate-y-0.5 active:scale-95"
            >
              Edit Gig
            </Link>

            <Link
              to={`/gig-proposals/${currentGig._id}`}
              className="rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-3 font-semibold text-white shadow-sm transition hover:shadow-md hover:shadow-brand-500/20 hover:-translate-y-0.5 active:scale-95"
            >
              View Proposals
            </Link>

            <button
              onClick={handleDelete}
              className="rounded-xl bg-red-50 dark:bg-red-500/10 px-6 py-3 font-semibold text-red-600 dark:text-red-400 transition hover:bg-red-100 dark:hover:bg-red-500/20 active:scale-95"
            >
              Delete Gig
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default GigDetails;