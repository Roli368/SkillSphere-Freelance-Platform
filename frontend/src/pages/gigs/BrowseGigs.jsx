import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Filter, Briefcase, DollarSign, Award } from "lucide-react";
import { motion } from "framer-motion";

import GigList from "../../components/gigs/GigList";

import {
  gigStart,
  gigFailure,
  setGigs,
} from "../../redux/slices/gigSlice";

import { searchGigs } from "../../services/gigApi";

function BrowseGigs() {
  const dispatch = useDispatch();

  const { gigs, loading } = useSelector(
    (state) => state.gig
  );

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    experienceLevel: "",
    minBudget: "",
    maxBudget: "",
  });

  // Debounce the fetching
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchGigs();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [filters]);

  const fetchGigs = async () => {
    try {
      dispatch(gigStart());
      const { data } = await searchGigs(filters);
      dispatch(setGigs(data.data));
    } catch (err) {
      dispatch(
        gigFailure(
          err.response?.data?.message ||
            "Unable to fetch gigs"
        )
      );
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto w-full"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
          Discover Opportunities
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Find the perfect gig that matches your skills and expertise.
        </p>
      </div>

      {/* Filter Section */}
      <div className="mb-10 rounded-3xl bg-white dark:bg-slate-900 p-6 shadow-sm border border-slate-200 dark:border-slate-800">
        
        <div className="flex items-center gap-2 mb-6">
          <Filter size={20} className="text-brand-500" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Advanced Search</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {/* Search */}
          <div className="relative col-span-1 md:col-span-2 lg:col-span-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              placeholder="Search gigs..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 py-3 pl-11 pr-4 outline-none input-focus dark:text-slate-200 transition-all"
            />
          </div>

          {/* Category */}
          <div className="relative">
            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              placeholder="Category"
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 py-3 pl-11 pr-4 outline-none input-focus dark:text-slate-200 transition-all"
            />
          </div>

          {/* Experience */}
          <div className="relative">
            <Award className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
            <select
              value={filters.experienceLevel}
              onChange={(e) => setFilters({ ...filters, experienceLevel: e.target.value })}
              className="w-full appearance-none rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 py-3 pl-11 pr-4 outline-none input-focus dark:text-slate-200 transition-all text-slate-700 dark:text-slate-300"
            >
              <option value="">Any Experience</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

          {/* Min Budget */}
          <div className="relative">
            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="number"
              placeholder="Min Budget"
              value={filters.minBudget}
              onChange={(e) => setFilters({ ...filters, minBudget: e.target.value })}
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 py-3 pl-11 pr-4 outline-none input-focus dark:text-slate-200 transition-all"
            />
          </div>

          {/* Max Budget */}
          <div className="relative">
            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="number"
              placeholder="Max Budget"
              value={filters.maxBudget}
              onChange={(e) => setFilters({ ...filters, maxBudget: e.target.value })}
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 py-3 pl-11 pr-4 outline-none input-focus dark:text-slate-200 transition-all"
            />
          </div>
        </div>
      </div>

      {loading && gigs.length === 0 ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <GigList gigs={gigs} />
      )}
    </motion.div>
  );
}

export default BrowseGigs;