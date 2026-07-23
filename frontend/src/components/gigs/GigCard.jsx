import { Link } from "react-router-dom";
import { FaMoneyBillWave, FaClock } from "react-icons/fa";
import { Heart, Edit, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";

import { toggleFavorite } from "../../services/favoriteApi";
import { deleteGig } from "../../services/gigApi";
import { setGigs } from "../../redux/slices/gigSlice";

function GigCard({ gig }) {
  const { user } = useSelector((state) => state.auth);
  const isOwner = user?._id === gig.client?._id || user?.id === gig.client?._id || user?._id === gig.client || user?.id === gig.client;

  const handleFavorite = async (e) => {
    e.preventDefault();

    try {
      const { data } = await toggleFavorite(gig._id);

      toast.success(
        data.data.saved
          ? "Gig Saved ❤️"
          : "Removed from Favorites"
      );
    } catch {
      toast.error("Failed to update favorites");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const confirmDelete = window.confirm("Are you sure you want to delete this gig?");
    if (!confirmDelete) return;
    try {
      await deleteGig(gig._id);
      toast.success("Gig deleted successfully");
      // Need a hard refresh or state update to remove from list, but a refresh is okay for now
      window.location.reload();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="group rounded-3xl bg-white dark:bg-slate-900 p-8 shadow-sm border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-brand-300 dark:hover:border-brand-700/50 flex flex-col h-full relative overflow-hidden">
      
      {/* Decorative gradient blob on hover */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 dark:bg-brand-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="mb-4 flex items-start justify-between relative z-10">
        <span className="rounded-full bg-brand-50 dark:bg-brand-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
          {gig.category}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
            {gig.experienceLevel}
          </span>
          {!isOwner && (
            <button
              onClick={handleFavorite}
              className="rounded-full p-2 transition hover:bg-rose-100 dark:hover:bg-rose-900/30 text-slate-400 hover:text-rose-500"
            >
              <Heart size={20} className="transition-colors" />
            </button>
          )}
        </div>
      </div>

      <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white line-clamp-2 relative z-10 break-words">
        {gig.title}
      </h2>

      <p className="mb-6 line-clamp-3 text-slate-600 dark:text-slate-400 relative z-10 flex-grow break-words">
        {gig.description}
      </p>

      <div className="mb-6 flex flex-wrap gap-2 relative z-10">
        {gig.skills?.slice(0, 4).map((skill) => (
          <span
            key={skill}
            className="rounded-md bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
          >
            {skill}
          </span>
        ))}
        {gig.skills?.length > 4 && (
          <span className="rounded-md bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            +{gig.skills.length - 4}
          </span>
        )}
      </div>

      <div className="mb-6 flex justify-between items-center text-sm relative z-10 border-t border-slate-100 dark:border-slate-800 pt-5 mt-auto">
        <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100">
          <FaMoneyBillWave className="text-emerald-500" size={16} />
          ₹{gig.budget?.toLocaleString()}
        </div>
        <div className="flex items-center gap-2 font-medium text-slate-500 dark:text-slate-400">
          <FaClock size={14} />
          {new Date(gig.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
        </div>
      </div>

      <div className="flex gap-2 relative z-10">
        <Link
          to={`/gig/${gig._id}`}
          className="flex-1 rounded-xl px-4 py-3 text-center font-semibold transition-all duration-300 btn-primary shadow-md hover:shadow-lg"
        >
          View Details
        </Link>
        {isOwner && (
          <>
            <Link
              to={`/edit-gig/${gig._id}`}
              className="rounded-xl px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition flex items-center justify-center shadow-sm"
              title="Edit Gig"
            >
              <Edit size={20} />
            </Link>
            <button
              onClick={handleDelete}
              className="rounded-xl px-4 py-3 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 transition flex items-center justify-center shadow-sm"
              title="Delete Gig"
            >
              <Trash2 size={20} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default GigCard;