import {
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

function ProposalCard({
  proposal,
  isClient = false,
  onAccept,
  onReject,
}) {
  const statusColor = {
    Pending: "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-700",
    Accepted: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-700",
    Rejected: "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-700",
  };

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-900 p-8 shadow-sm border border-slate-200 dark:border-slate-800 transition-colors duration-300">
      
      <div className="mb-6 flex items-start justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white line-clamp-1 break-words">
          {proposal.gig?.title || "Proposal Details"}
        </h2>
        <span
          className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider shrink-0 ${
            statusColor[proposal.status] || "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
          }`}
        >
          {proposal.status}
        </span>
      </div>

      <p className="mb-8 text-slate-600 dark:text-slate-400 line-clamp-4 leading-relaxed break-words">
        {proposal.coverLetter}
      </p>

      <div className="mb-8 grid grid-cols-2 gap-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-6 border border-slate-100 dark:border-slate-700/50">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Bid Amount
          </p>
          <h3 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
            ₹{proposal.bidAmount?.toLocaleString()}
          </h3>
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Estimated Delivery
          </p>
          <h3 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
            {proposal.estimatedDays} Days
          </h3>
        </div>
      </div>

      {isClient && proposal.status === "Pending" && (
        <div className="flex gap-4 border-t border-slate-100 dark:border-slate-800 pt-6">
          <button
            onClick={() => onAccept(proposal._id)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95"
          >
            <CheckCircle size={20} />
            Accept
          </button>
          <button
            onClick={() => onReject(proposal._id)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-500 px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-500/20 active:scale-95"
          >
            <XCircle size={20} />
            Reject
          </button>
          <button
            onClick={async () => {
              try {
                const { createConversation } = await import("../../services/chatApi");
                await createConversation(proposal.freelancer._id);
                window.location.href = "/messages";
              } catch (err) {
                console.log("Failed to create conversation", err);
              }
            }}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95"
          >
            Message
          </button>
        </div>
      )}

      {!isClient && (
        <div className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-6">
          <Clock size={16} />
          Submitted on {new Date(proposal.createdAt || Date.now()).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      )}
    </div>
  );
}

export default ProposalCard;