import { useEffect } from "react";
import { useParams } from "react-router-dom";
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
  getGigProposals,
  acceptProposal,
  rejectProposal,
} from "../../services/proposalApi";

function GigProposals() {
  const { gigId } = useParams();
  const dispatch = useDispatch();

  const { proposals, loading } = useSelector((state) => state.proposal);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      dispatch(proposalStart());
      const { data } = await getGigProposals(gigId);
      dispatch(setProposals(data.data));
    } catch (err) {
      dispatch(proposalFailure(err.response?.data?.message));
      toast.error("Unable to load proposals");
    }
  };

  const handleAccept = async (id) => {
    await acceptProposal(id);
    toast.success("Proposal Accepted");
    loadData();
  };

  const handleReject = async (id) => {
    await rejectProposal(id);
    toast.success("Proposal Rejected");
    loadData();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-6xl p-8"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
          Review Proposals
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Review and select the best freelancers for your project.
        </p>
      </div>

      {loading && proposals.length === 0 ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <ProposalList
          proposals={proposals}
          isClient
          onAccept={handleAccept}
          onReject={handleReject}
        />
      )}
    </motion.div>
  );
}

export default GigProposals;