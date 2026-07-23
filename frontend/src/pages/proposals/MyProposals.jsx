import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import ProposalList from "../../components/proposals/ProposalList";

import {
  proposalStart,
  proposalFailure,
  setProposals,
} from "../../redux/slices/proposalSlice";

import {
  getMyProposals,
} from "../../services/proposalApi";

function MyProposals() {
  const dispatch = useDispatch();

  const { proposals, loading } = useSelector((state) => state.proposal);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(proposalStart());
        const { data } = await getMyProposals();
        dispatch(setProposals(data.data));
      } catch (err) {
        dispatch(proposalFailure(err.response?.data?.message));
        toast.error("Unable to load proposals");
      }
    };

    fetchData();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-6xl p-8"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
          My Sent Proposals
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Track the status of all your submitted proposals.
        </p>
      </div>

      {loading && proposals.length === 0 ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <ProposalList proposals={proposals} />
      )}
    </motion.div>
  );
}

export default MyProposals;